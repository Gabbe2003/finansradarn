"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Ad } from "@/lib/ads/types";
import { trackClickUrl, trackImpressionUrl } from "@/lib/ads/client";

type Props = {
  ads: Ad[];
  displayMode?: "queue" | "random";
};

const SECTION = "header" as const;
const QUEUE_KEY = `fa_queue_${SECTION}`;

function isValid(ad: Ad): boolean {
  if (ad.use_custom) return Boolean(ad.link && ad.title);
  return Boolean(ad.linked_post);
}

function pickFromQueue(ads: Ad[]): Ad {
  if (typeof window === "undefined") return ads[0];
  const last = Number(sessionStorage.getItem(QUEUE_KEY) ?? "-1");
  const next = Number.isFinite(last) ? (last + 1) % ads.length : 0;
  try {
    sessionStorage.setItem(QUEUE_KEY, String(next));
  } catch {}
  return ads[next];
}

function pickRandom(ads: Ad[]): Ad {
  return ads[Math.floor(Math.random() * ads.length)];
}

export default function HeaderAd({ ads, displayMode = "queue" }: Props) {
  const valid = useMemo(() => ads.filter(isValid), [ads]);
  const [ad, setAd] = useState<Ad | null>(null);
  const lastImpressionId = useRef<number | null>(null);

  useEffect(() => {
    if (valid.length === 0) {
      setAd(null);
      return;
    }
    if (valid.length === 1) {
      setAd(valid[0]);
      return;
    }
    setAd(displayMode === "random" ? pickRandom(valid) : pickFromQueue(valid));
  }, [valid, displayMode]);

  useEffect(() => {
    if (!ad) return;
    if (lastImpressionId.current === ad.id) return;
    lastImpressionId.current = ad.id;
    fetch(trackImpressionUrl(SECTION, ad.id), {
      method: "POST",
      keepalive: true,
    }).catch(() => {});
  }, [ad]);

  if (!ad) return null;

  const isCustom = ad.use_custom;
  const title = isCustom ? ad.title : ad.linked_post!.title;
  const link = isCustom ? ad.link : ad.linked_post!.link;
  const target = ad.target_blank ? "_blank" : undefined;
  const rel = ad.target_blank ? "noopener sponsored" : "sponsored";
  const hasLink = Boolean(link);

  const handleClick = () => {
    fetch(trackClickUrl(SECTION, ad.id), {
      method: "POST",
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <div className="bg-navy border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center gap-3">
        {ad.annons ? (
          <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-accent leading-none shrink-0">
            Annons
          </span>
        ) : null}
        <a
          href={link}
          target={target}
          rel={rel}
          onClick={handleClick}
          className="group inline-flex items-center gap-2 min-w-0"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 animate-pulse"
            aria-hidden
          />
          <span
            className={`text-xs sm:text-sm font-medium text-white line-clamp-1 group-hover:text-accent transition ${
              hasLink ? "underline underline-offset-[3px] decoration-2 decoration-accent group-hover:decoration-white" : ""
            }`}
          >
            {title}
          </span>
        </a>
      </div>
    </div>
  );
}
