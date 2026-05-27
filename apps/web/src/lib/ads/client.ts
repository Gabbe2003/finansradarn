import type { AdSection, AdsResponse } from "./types";

const RAW_ADS =
  (process.env.NEXT_PUBLIC_WP_ADS_URL || process.env.NEXT_PUBLIC_WP_URL || "https://cms.finansradarn.se").trim();
const WP_URL = RAW_ADS.replace(/\/+$/, "").replace(/\/wp-json(\/wp\/v2)?$/, "");
const NS = "finansradarn/v1";

export const AD_CACHE_TAG = (section: AdSection) => `ads:${section}`;

export async function fetchAds(section: AdSection): Promise<AdsResponse | null> {
  try {
    const res = await fetch(`${WP_URL}/wp-json/${NS}/ads/${section}`, {
      next: { revalidate: 1800, tags: [AD_CACHE_TAG(section)] },
    });
    if (!res.ok) return null;
    return (await res.json()) as AdsResponse;
  } catch {
    return null;
  }
}

export function trackImpressionUrl(section: AdSection, id: number): string {
  return `${WP_URL}/wp-json/${NS}/track/impression/${section}/${id}`;
}

export function trackClickUrl(section: AdSection, id: number): string {
  return `${WP_URL}/wp-json/${NS}/track/click/${section}/${id}`;
}
