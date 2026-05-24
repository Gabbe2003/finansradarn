"use client";

import { useEffect } from "react";

const RAW_WP = (process.env.NEXT_PUBLIC_WP_URL || "https://finansradarn.se").trim();
const WP_BASE = RAW_WP.replace(/\/+$/, "").replace(/\/wp-json(\/wp\/v2)?$/, "");

interface Props {
  postId: number;
  /** Delay before counting (ms). Use to filter bouncers. */
  delayMs?: number;
}

export default function ViewTracker({ postId, delayMs = 0 }: Props) {
  useEffect(() => {
    if (!postId) return;

    const fire = () => {
      fetch(`${WP_BASE}/wp-json/post-views/v1/track/${postId}`, {
        method: "POST",
        keepalive: true,
      }).catch(() => {});
    };

    if (delayMs > 0) {
      const t = setTimeout(fire, delayMs);
      return () => clearTimeout(t);
    }

    fire();
  }, [postId, delayMs]);

  return null;
}
