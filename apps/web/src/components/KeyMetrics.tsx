import AnimatedCounter from "./AnimatedCounter";
import { fetchMacroIndicators } from "@/lib/macro";

// Static fallbacks (used only when the live source is unavailable).
const FALLBACK = {
  kpif: 4.1,
  policyRate: 3.75,
  unemployment: 5.8,
  bnp: 0.8,
};

export default async function KeyMetrics() {
  const macro = await fetchMacroIndicators();
  const policyRate = macro.policyRate?.value ?? FALLBACK.policyRate;
  // KPIF / unemployment / BNP not wired live yet — fall back to static.
  const kpif = macro.kpif?.value ?? FALLBACK.kpif;
  const unemployment = macro.unemployment?.value ?? FALLBACK.unemployment;
  const bnp = macro.bnp?.value ?? FALLBACK.bnp;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <AnimatedCounter
        label="KPIF-inflation"
        value={kpif}
        suffix="%"
        decimals={1}
        trend="up"
      />
      <AnimatedCounter
        label="Styrränta"
        value={policyRate}
        suffix="%"
        decimals={2}
        trend={policyRate >= FALLBACK.policyRate ? "up" : "down"}
      />
      <AnimatedCounter
        label="Arbetslöshet"
        value={unemployment}
        suffix="%"
        decimals={1}
        trend="down"
      />
      <AnimatedCounter
        label="BNP Q1 (kv/kv)"
        value={bnp}
        suffix="%"
        prefix="+"
        decimals={1}
        trend="up"
      />
    </div>
  );
}
