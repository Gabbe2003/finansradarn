"use client";

import { useEffect, useRef } from "react";

interface TradingViewChartProps {
  symbol?: string;
  height?: number;
}

export default function TradingViewChart({ symbol = "OMXSTO:OMXS30", height = 400 }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Europe/Stockholm",
      theme: "light",
      style: "1",
      locale: "sv_SE",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
      height,
    });
    containerRef.current.appendChild(script);
  }, [symbol, height]);

  return (
    <div className="tradingview-widget-container rounded-xl overflow-hidden border border-border" style={{ height }}>
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
