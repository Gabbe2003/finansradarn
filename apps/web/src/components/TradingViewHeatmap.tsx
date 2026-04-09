"use client";

import { useEffect, useRef } from "react";

export default function TradingViewHeatmap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      exchanges: ["STO"],
      dataSource: "OMXS30",
      grouping: "sector",
      blockSize: "market_cap_basic",
      blockColor: "change",
      locale: "sv_SE",
      symbolUrl: "",
      colorTheme: "light",
      hasTopBar: false,
      isDataSetEnabled: false,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      width: "100%",
      height: 400,
    });
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container rounded-xl overflow-hidden border border-border" style={{ height: 400 }}>
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
