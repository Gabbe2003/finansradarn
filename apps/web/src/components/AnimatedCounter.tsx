"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  label: string;
  trend?: "up" | "down" | "neutral";
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2,
  label,
  trend = "neutral",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  const trendIcon = trend === "up" ? "▲" : trend === "down" ? "▼" : "";
  const trendColor = trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-muted";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between gap-2 px-3 py-2 bg-white rounded-lg border border-border"
    >
      <span className="text-[10px] font-semibold text-muted uppercase tracking-wider truncate">{label}</span>
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-sm font-bold text-navy tabular-nums">
          {prefix}{count.toFixed(decimals)}{suffix}
        </span>
        {trendIcon && (
          <span className={`text-[9px] ${trendColor}`}>{trendIcon}</span>
        )}
      </div>
    </motion.div>
  );
}
