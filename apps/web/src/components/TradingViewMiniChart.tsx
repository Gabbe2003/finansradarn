"use client";

import { useEffect, useRef } from "react";

interface TradingViewMiniChartProps {
  symbol?: string;
  width?: string;
  height?: number;
}

export default function TradingViewMiniChart({
  symbol = "OMXSTO:OMXS30",
  width = "100%",
  height = 220,
}: TradingViewMiniChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      width,
      height,
      locale: "sv_SE",
      dateRange: "1M",
      colorTheme: "light",
      isTransparent: true,
      autosize: false,
      largeChartUrl: "",
    });
    containerRef.current.appendChild(script);
  }, [symbol, width, height]);

  return (
    <div className="tradingview-widget-container" style={{ height }}>
      <div ref={containerRef} />
    </div>
  );
}
