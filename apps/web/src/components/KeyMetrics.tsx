"use client";

import AnimatedCounter from "./AnimatedCounter";

export default function KeyMetrics() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <AnimatedCounter
        label="KPIF-inflation"
        value={4.1}
        suffix="%"
        decimals={1}
        trend="up"
      />
      <AnimatedCounter
        label="Styrränta"
        value={3.75}
        suffix="%"
        decimals={2}
        trend="up"
      />
      <AnimatedCounter
        label="Arbetslöshet"
        value={5.8}
        suffix="%"
        decimals={1}
        trend="down"
      />
      <AnimatedCounter
        label="BNP Q1 (kv/kv)"
        value={0.8}
        suffix="%"
        prefix="+"
        decimals={1}
        trend="up"
      />
    </div>
  );
}
