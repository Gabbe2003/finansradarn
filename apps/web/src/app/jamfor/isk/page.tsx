"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

const brokers = [
  { name: "Avanza", avgift: "0 kr", fondutbud: 1800, iskFri: true, app: 4.7, courtage: "0 kr (< 50k)", freeIndex: true, link: "#" },
  { name: "Nordnet", avgift: "0 kr", fondutbud: 1600, iskFri: true, app: 4.5, courtage: "0 kr (< 50k)", freeIndex: true, link: "#" },
  { name: "SAVR", avgift: "0 kr", fondutbud: 900, iskFri: true, app: 4.3, courtage: "39 kr", freeIndex: true, link: "#" },
  { name: "Nordea", avgift: "0 kr", fondutbud: 600, iskFri: true, app: 4.0, courtage: "0,025%", freeIndex: false, link: "#" },
  { name: "SEB", avgift: "0 kr", fondutbud: 550, iskFri: true, app: 3.9, courtage: "0,025%", freeIndex: false, link: "#" },
  { name: "Handelsbanken", avgift: "0 kr", fondutbud: 400, iskFri: true, app: 3.8, courtage: "0,03%", freeIndex: false, link: "#" },
  { name: "Swedbank", avgift: "0 kr", fondutbud: 500, iskFri: true, app: 3.7, courtage: "0,025%", freeIndex: false, link: "#" },
  { name: "Lysa", avgift: "0,24%/år", fondutbud: 0, iskFri: true, app: 4.4, courtage: "—", freeIndex: true, link: "#" },
];

export default function ISKComparisonPage() {
  const [sortBy, setSortBy] = useState<"fondutbud" | "app">("app");

  const sorted = [...brokers].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
        <span className="text-muted/50">/</span>
        <Link href="/jamfor" className="text-muted hover:text-accent transition font-medium">Jämför</Link>
        <span className="text-muted/50">/</span>
        <span className="font-semibold text-navy">ISK-konton</span>
      </div>

      <AnimatedSection>
        <h1 className="font-serif text-3xl font-bold text-navy mb-2">Bästa ISK-kontot 2026</h1>
        <p className="text-muted mb-8">Jämför investeringssparkonton från Sveriges största mäklare och banker.</p>
      </AnimatedSection>

      {/* Info box */}
      <AnimatedSection delay={0.1}>
        <div className="bg-navy text-white p-5 mb-6">
          <h3 className="font-black text-sm mb-2">Vad är ISK?</h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Investeringssparkonto (ISK) är en kontoform där du betalar en låg schablonskatt istället för 30% kapitalvinstskatt.
            Skatten baseras på kontots genomsnittliga värde och statslåneräntan. Under 2026 är den effektiva skattesatsen cirka 1,09%.
          </p>
        </div>
      </AnimatedSection>

      {/* Table */}
      <AnimatedSection delay={0.15}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 pr-4 text-[10px] font-black uppercase tracking-widest text-muted">Mäklare</th>
                <th className="text-right py-3 px-3 text-[10px] font-black uppercase tracking-widest text-muted">Avgift</th>
                <th
                  onClick={() => setSortBy("fondutbud")}
                  className={`text-right py-3 px-3 text-[10px] font-black uppercase tracking-widest cursor-pointer transition ${sortBy === "fondutbud" ? "text-accent" : "text-muted hover:text-navy"}`}
                >
                  Fonder {sortBy === "fondutbud" && "▼"}
                </th>
                <th className="text-right py-3 px-3 text-[10px] font-black uppercase tracking-widest text-muted">Courtage</th>
                <th className="text-center py-3 px-3 text-[10px] font-black uppercase tracking-widest text-muted">Gratis index</th>
                <th
                  onClick={() => setSortBy("app")}
                  className={`text-right py-3 px-3 text-[10px] font-black uppercase tracking-widest cursor-pointer transition ${sortBy === "app" ? "text-accent" : "text-muted hover:text-navy"}`}
                >
                  App {sortBy === "app" && "▼"}
                </th>
                <th className="text-right py-3 pl-3"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((broker, i) => (
                <tr key={broker.name} className="border-b border-border/60 hover:bg-surface/50 transition">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black text-border w-6">{i + 1}</span>
                      <span className="font-semibold text-navy">{broker.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-3.5 px-3 text-muted">{broker.avgift}</td>
                  <td className={`text-right py-3.5 px-3 tabular-nums ${sortBy === "fondutbud" ? "font-bold text-navy" : "text-muted"}`}>
                    {broker.fondutbud > 0 ? broker.fondutbud : "Auto"}
                  </td>
                  <td className="text-right py-3.5 px-3 text-muted">{broker.courtage}</td>
                  <td className="text-center py-3.5 px-3">
                    {broker.freeIndex ? (
                      <span className="text-emerald-600 font-bold">✓</span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className={`text-right py-3.5 px-3 tabular-nums ${sortBy === "app" ? "font-bold text-accent" : "text-muted"}`}>
                    {broker.app.toFixed(1)}
                  </td>
                  <td className="text-right py-3.5 pl-3">
                    <span className="px-3 py-1.5 bg-accent text-navy text-[11px] font-black cursor-pointer hover:bg-accent-hover transition">
                      Öppna
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      <p className="text-[11px] text-muted mt-6">* Uppgifterna är hämtade från respektive banks/mäklares hemsida. Senast uppdaterad: april 2026.</p>
    </div>
  );
}
