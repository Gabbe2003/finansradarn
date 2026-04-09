"use client";

import { useEffect, useRef, useState } from "react";

function EmbedWidget({ src, config }: { src: string; config: Record<string, unknown> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    setLoaded(false);
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify(config);
    script.onload = () => setLoaded(true);
    ref.current.appendChild(script);

    const timer = setTimeout(() => setLoaded(true), 5000);
    return () => clearTimeout(timer);
  }, [src, config]);

  return (
    <div className="relative flex-1 min-h-0 w-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="flex items-center gap-2 text-muted text-sm">
            <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            Laddar marknadsdata...
          </div>
        </div>
      )}
      <div ref={ref} className="absolute inset-0" />
    </div>
  );
}

const tabs = [
  { id: "overview", label: "Översikt" },
  { id: "stocks", label: "Aktier" },
  { id: "currencies", label: "Valutor" },
  { id: "commodities", label: "Råvaror" },
];

export default function MarketSection() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all relative rounded-t-lg cursor-pointer ${
              activeTab === tab.id
                ? "text-accent bg-accent/5"
                : "text-muted hover:text-navy hover:bg-surface"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main widget area */}
        <div className="lg:col-span-8 border border-border overflow-hidden h-[700px]" key={activeTab}>
          {activeTab === "overview" && (
            <EmbedWidget
              src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"

              config={{
                colorTheme: "light",
                dateRange: "1D",
                showChart: true,
                locale: "sv_SE",
                isTransparent: false,
                showSymbolLogo: true,
                showFloatingTooltip: true,
                width: "100%",
                height: 700,
                tabs: [
                  {
                    title: "Index",
                    symbols: [
                      { s: "OMXSTO:OMXS30", d: "OMXS30" },
                      { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
                      { s: "INDEX:DEU40", d: "DAX" },
                      { s: "FOREXCOM:UKXGBP", d: "FTSE 100" },
                      { s: "INDEX:NKY", d: "Nikkei 225" },
                    ],
                  },
                  {
                    title: "Valutor",
                    symbols: [
                      { s: "FX:EURSEK", d: "EUR/SEK" },
                      { s: "FX:USDSEK", d: "USD/SEK" },
                      { s: "FX:EURUSD", d: "EUR/USD" },
                      { s: "FX:GBPSEK", d: "GBP/SEK" },
                    ],
                  },
                  {
                    title: "Råvaror",
                    symbols: [
                      { s: "TVC:GOLD", d: "Guld" },
                      { s: "TVC:SILVER", d: "Silver" },
                      { s: "TVC:USOIL", d: "Olja WTI" },
                      { s: "NYMEX:NG1!", d: "Naturgas" },
                    ],
                  },
                ],
              }}
            />
          )}

          {activeTab === "stocks" && (
            <EmbedWidget
              src="https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js"

              config={{
                colorTheme: "light",
                dateRange: "1D",
                exchange: "STO",
                showChart: true,
                locale: "sv_SE",
                isTransparent: false,
                showSymbolLogo: true,
                showFloatingTooltip: true,
                width: "100%",
                height: 700,
              }}
            />
          )}

          {activeTab === "currencies" && (
            <EmbedWidget
              src="https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js"

              config={{
                colorTheme: "light",
                isTransparent: false,
                locale: "sv_SE",
                width: "100%",
                height: 700,
                currencies: ["EUR", "USD", "GBP", "SEK", "NOK", "DKK", "CHF", "JPY"],
              }}
            />
          )}

          {activeTab === "commodities" && (
            <EmbedWidget
              src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"

              config={{
                colorTheme: "light",
                dateRange: "1D",
                showChart: true,
                locale: "sv_SE",
                isTransparent: false,
                showSymbolLogo: true,
                width: "100%",
                height: 700,
                tabs: [
                  {
                    title: "Råvaror",
                    symbols: [
                      { s: "TVC:GOLD", d: "Guld" },
                      { s: "TVC:SILVER", d: "Silver" },
                      { s: "TVC:USOIL", d: "Olja WTI" },
                      { s: "TVC:UKOIL", d: "Brent" },
                      { s: "NYMEX:NG1!", d: "Naturgas" },
                      { s: "CBOT:ZW1!", d: "Vete" },
                      { s: "TVC:COPPER", d: "Koppar" },
                    ],
                  },
                ],
              }}
            />
          )}
        </div>

        {/* Right sidebar — winners/losers/index */}
        <div className="lg:col-span-4 flex flex-col gap-5 h-[700px] overflow-auto">
          <div className="border border-border p-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-navy mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Vinnare idag
            </h3>
            <div className="divide-y divide-border/60">
              {[
                { name: "Hexagon B", price: "134,20", change: "+7,2%" },
                { name: "Evolution", price: "1 245", change: "+5,8%" },
                { name: "Ericsson B", price: "82,40", change: "+4,3%" },
                { name: "Atlas Copco A", price: "198,50", change: "+3,1%" },
                { name: "Volvo B", price: "278,50", change: "+2,4%" },
              ].map((stock) => (
                <div key={stock.name} className="flex items-center justify-between py-2">
                  <span className="text-[13px] font-medium text-navy">{stock.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-muted tabular-nums">{stock.price}</span>
                    <span className="text-[12px] font-bold text-emerald-600 tabular-nums w-14 text-right">{stock.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border p-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-navy mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Förlorare idag
            </h3>
            <div className="divide-y divide-border/60">
              {[
                { name: "SBB B", price: "4,82", change: "-4,8%" },
                { name: "Embracer B", price: "32,10", change: "-3,2%" },
                { name: "Sinch", price: "28,45", change: "-2,9%" },
                { name: "Telia", price: "28,90", change: "-1,8%" },
                { name: "Boliden", price: "342,00", change: "-1,5%" },
              ].map((stock) => (
                <div key={stock.name} className="flex items-center justify-between py-2">
                  <span className="text-[13px] font-medium text-navy">{stock.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-muted tabular-nums">{stock.price}</span>
                    <span className="text-[12px] font-bold text-red-500 tabular-nums w-14 text-right">{stock.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border p-4 flex-1">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-navy mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              Index
            </h3>
            <div className="divide-y divide-border/60">
              {[
                { name: "OMXS30", value: "2 812", change: "+1,8%", up: true },
                { name: "OMXSPI", value: "987,3", change: "+1,5%", up: true },
                { name: "S&P 500", value: "6 247", change: "+2,3%", up: true },
                { name: "DAX", value: "18 420", change: "+0,9%", up: true },
                { name: "Nikkei", value: "39 800", change: "-0,3%", up: false },
              ].map((idx) => (
                <div key={idx.name} className="flex items-center justify-between py-2">
                  <span className="text-[13px] font-medium text-navy">{idx.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-muted tabular-nums">{idx.value}</span>
                    <span className={`text-[12px] font-bold tabular-nums w-14 text-right ${idx.up ? "text-emerald-600" : "text-red-500"}`}>{idx.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
