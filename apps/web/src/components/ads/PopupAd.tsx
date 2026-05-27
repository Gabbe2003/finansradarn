"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Ad } from "@/lib/ads/types";
import { trackClickUrl, trackImpressionUrl } from "@/lib/ads/client";

type Props = {
  ads: Ad[];
  displayMode?: "queue" | "random";
  config?: { session_cap: number; cooldown_days: number };
  scrollThreshold?: number;
};

const SECTION = "popup" as const;
const SESSION_KEY = "fa_popup_shown";
const COOLDOWN_PREFIX = "fa_popup_dismissed_";
const DEFAULT_BG = "#fdf4e3";
const DEFAULT_BUTTON_BG = "#0b1f3a";

function isValid(ad: Ad): boolean {
  if (ad.use_custom) return Boolean(ad.link && ad.title);
  return Boolean(ad.linked_post);
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function isOnCooldown(adId: number, days: number): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(`${COOLDOWN_PREFIX}${adId}`);
    if (!raw) return false;
    const at = Number(raw);
    if (!Number.isFinite(at)) return false;
    return Date.now() - at < days * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markCooldown(adId: number): void {
  try {
    localStorage.setItem(`${COOLDOWN_PREFIX}${adId}`, String(Date.now()));
  } catch {}
}

function getSessionShows(): number {
  try {
    return Number(sessionStorage.getItem(SESSION_KEY) ?? "0");
  } catch {
    return 0;
  }
}

function bumpSessionShows(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, String(getSessionShows() + 1));
  } catch {}
}

function isDarkHex(hex: string | undefined): boolean {
  if (!hex || !hex.startsWith("#")) return false;
  const c = hex.replace("#", "");
  const full = c.length === 3 ? c.split("").map((ch) => ch + ch).join("") : c;
  if (full.length !== 6) return false;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return false;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
}

export default function PopupAd({
  ads,
  displayMode = "random",
  config,
  scrollThreshold = 600,
}: Props) {
  const sessionCap = config?.session_cap ?? 1;
  const cooldownDays = config?.cooldown_days ?? 7;

  const [ad, setAd] = useState<Ad | null>(null);
  const [open, setOpen] = useState(false);
  const impressionFired = useRef(false);

  const validIds = useMemo(
    () =>
      ads
        .filter(isValid)
        .map((a) => a.id)
        .join(","),
    [ads]
  );

  useEffect(() => {
    if (getSessionShows() >= sessionCap) return;
    const candidates = ads
      .filter(isValid)
      .filter((a) => !isOnCooldown(a.id, cooldownDays));
    if (candidates.length === 0) return;
    setAd(displayMode === "queue" ? candidates[0] : pickRandom(candidates));
  }, [validIds, displayMode, cooldownDays, sessionCap, ads]);

  useEffect(() => {
    if (!ad || open) return;
    const scrollEl: HTMLElement | Window =
      document.querySelector("main") ?? window;
    const getTop = () =>
      scrollEl === window
        ? window.scrollY
        : (scrollEl as HTMLElement).scrollTop;
    const check = () => {
      if (getTop() >= scrollThreshold) setOpen(true);
    };
    check();
    scrollEl.addEventListener("scroll", check, { passive: true });
    return () => scrollEl.removeEventListener("scroll", check);
  }, [ad, open, scrollThreshold]);

  useEffect(() => {
    if (!open || !ad || impressionFired.current) return;
    impressionFired.current = true;
    bumpSessionShows();
    fetch(trackImpressionUrl(SECTION, ad.id), {
      method: "POST",
      keepalive: true,
    }).catch(() => {});
  }, [open, ad]);

  if (!ad || !open) return null;

  const isCustom = ad.use_custom;
  const title = isCustom ? ad.title : ad.linked_post!.title;
  const body = isCustom ? (ad.text || "") : ad.linked_post!.excerpt;
  const link = isCustom ? ad.link : ad.linked_post!.link;
  const image = isCustom ? ad.image : ad.linked_post!.image;
  const buttonLabel = isCustom
    ? (ad.button || ad.cta || "Läs mer")
    : (ad.cta || "Läs mer");
  const target = ad.target_blank ? "_blank" : undefined;
  const rel = ad.target_blank ? "noopener sponsored" : "sponsored";
  const bg = ad.bg_color || DEFAULT_BG;
  const buttonBg = ad.button_bg_color || DEFAULT_BUTTON_BG;
  const dark = isDarkHex(bg);
  const textColor = dark ? "#ffffff" : "#0b1f3a";
  const mutedColor = dark ? "rgba(255,255,255,0.65)" : "rgba(11,31,58,0.65)";
  const buttonText = isDarkHex(buttonBg) ? "#ffffff" : "#0b1f3a";

  const handleClick = () => {
    markCooldown(ad.id);
    fetch(trackClickUrl(SECTION, ad.id), {
      method: "POST",
      keepalive: true,
    }).catch(() => {});
  };

  const handleClose = () => {
    setOpen(false);
    markCooldown(ad.id);
  };

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 sm:w-155 lg:w-205"
    >
      <div
        className="rounded-lg shadow-2xl border border-black/10 overflow-hidden relative"
        style={{ backgroundColor: bg }}
        role="dialog"
        aria-modal="false"
        aria-label="Annons"
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
          }}
          className="absolute top-2 right-3 text-[11px] uppercase tracking-wider font-bold opacity-70 hover:opacity-100 transition cursor-pointer z-20"
          style={{ color: textColor }}
          aria-label="Stäng annons"
        >
          Stäng <span aria-hidden>X</span>
        </button>
        <a
          href={link}
          target={target}
          rel={rel}
          onClick={handleClick}
          className="cursor-pointer group flex flex-col sm:flex-row gap-4 p-4 pt-6 pr-6 items-stretch hover:opacity-95 transition"
        >
          {ad.annons ? (
            <span
              className="absolute top-2 left-4 text-[9px] uppercase tracking-[0.18em] font-bold leading-none z-10"
              style={{ color: mutedColor }}
            >
              Annons
            </span>
          ) : null}
          {image && (
            <div className="relative w-full sm:w-24 lg:w-64 h-32 sm:h-24 lg:h-40 shrink-0 overflow-hidden rounded">
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 96px, 256px"
                className="object-cover group-hover:scale-[1.02] transition duration-300"
              />
            </div>
          )}
          <div className="flex-1 min-w-0 flex flex-col">
            <h3
              className="font-serif text-base sm:text-lg lg:text-xl font-bold leading-snug"
              style={{ color: textColor }}
            >
              {title}
            </h3>
            {body && (
              <div
                className="text-[13px] mt-1 line-clamp-2"
                style={{ color: mutedColor }}
                dangerouslySetInnerHTML={{ __html: body }}
              />
            )}
            <div className="flex items-center justify-end gap-3 mt-auto pt-4">
              <span
                className="inline-flex items-center px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-full group-hover:opacity-90 transition"
                style={{ backgroundColor: buttonBg, color: buttonText }}
              >
                {buttonLabel}
              </span>
            </div>
          </div>
        </a>
      </div>
    </motion.div>
  );
}
