"use client";

import { useEffect, useRef } from "react";

export default function TradingViewTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Clear any existing content
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "OMXSTO:OMXS30", title: "OMXS30" },
        { proName: "FX:EURSEK", title: "EUR/SEK" },
        { proName: "FX:USDSEK", title: "USD/SEK" },
        { proName: "OMXSTO:ERIC_B", title: "Ericsson B" },
        { proName: "OMXSTO:VOLV_B", title: "Volvo B" },
        { proName: "OMXSTO:HM_B", title: "H&M B" },
        { proName: "OMXSTO:ATCO_A", title: "Atlas Copco A" },
        { proName: "OMXSTO:SEB_A", title: "SEB A" },
        { proName: "OMXSTO:HEXA_B", title: "Hexagon B" },
        { proName: "TVC:GOLD", title: "Guld" },
        { proName: "TVC:USOIL", title: "Olja WTI" },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: "light",
      locale: "sv_SE",
    });
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container border-b border-border">
      <div ref={containerRef} />
    </div>
  );
}
