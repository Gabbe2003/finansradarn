/**
 * Live Swedish macro indicators.
 *
 * Currently wired:
 *  - Riksbanken (https://api.riksbank.se/swea/v1/) — policy rate + FX rates.
 *    No auth, public, CORS-friendly. Updated daily.
 *
 * TODO: SCB integration for KPIF / unemployment / BNP.
 *    SCB's PXWeb API requires per-table JSON-stat queries with the right
 *    `ContentsCode` per indicator. The endpoints respond with 400 when the
 *    query is missing required selections, so each indicator needs a
 *    hand-tuned query body. Plug those in below in `fetchScbLatest()`.
 *
 *    Working tables to start from (browse at https://www.statistikdatabasen.scb.se):
 *      - KPIF YoY:        /PR/PR0101/PR0101G/KPIfaCFM         (ContentsCode 000004VV)
 *      - Unemployment:    /AM/AM0401/AM0401A/NAKUBefolkning2  (15-74 y, season-adj)
 *      - BNP QoQ:         /NR/NR0103/NR0103S/NR0103ENS2010T01Q
 *
 * Falls back gracefully — every field is optional, so missing data just
 * lets the UI fall back to its current static numbers.
 */

export interface MacroPoint {
  value: number;
  date: string; // ISO date or e.g. "2026M04"
}

export interface MacroIndicators {
  policyRate?: MacroPoint;   // Styrränta — Riksbanken
  eurSek?: MacroPoint;        // EUR/SEK — Riksbanken
  usdSek?: MacroPoint;        // USD/SEK — Riksbanken
  kpif?: MacroPoint;          // KPIF YoY % — SCB (not wired yet)
  unemployment?: MacroPoint;  // Arbetslöshet % — SCB (not wired yet)
  bnp?: MacroPoint;           // BNP QoQ % — SCB (not wired yet)
}

const RB_BASE = "https://api.riksbank.se/swea/v1";
const REVALIDATE_MACRO_SECONDS = 21600; // 6 hours

async function fetchRiksbankLatest(seriesId: string): Promise<MacroPoint | undefined> {
  try {
    const res = await fetch(`${RB_BASE}/Observations/Latest/${seriesId}`, {
      next: { revalidate: REVALIDATE_MACRO_SECONDS, tags: ["macro"] },
    });
    if (!res.ok) return undefined;
    const j = (await res.json()) as { date?: string; value?: number };
    if (typeof j?.value !== "number" || !j.date) return undefined;
    return { value: j.value, date: j.date };
  } catch {
    return undefined;
  }
}

export async function fetchMacroIndicators(): Promise<MacroIndicators> {
  const [policyRate, eurSek, usdSek] = await Promise.allSettled([
    // Series IDs documented at https://api.riksbank.se/swea/v1/swagger/
    fetchRiksbankLatest("SECBREPOEFF"), // policy rate, effective
    fetchRiksbankLatest("SEKEURPMI"),   // EUR/SEK reference rate
    fetchRiksbankLatest("SEKUSDPMI"),   // USD/SEK reference rate
  ]);
  const settled = <T,>(p: PromiseSettledResult<T>): T | undefined =>
    p.status === "fulfilled" ? p.value : undefined;

  return {
    policyRate: settled(policyRate),
    eurSek: settled(eurSek),
    usdSek: settled(usdSek),
    // kpif / unemployment / bnp left undefined until SCB queries are wired.
  };
}

/** Format a macro point for display in Swedish locale. */
export function formatMacro(point: MacroPoint | undefined, suffix = "%", decimals = 2): string {
  if (!point) return "—";
  return `${point.value.toLocaleString("sv-SE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;
}
