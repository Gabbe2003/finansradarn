"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

const banks = [
  { name: "SBAB", ranta3m: 4.65, ranta1y: 4.29, ranta3y: 3.89, ranta5y: 3.72, rating: 4.5, link: "#" },
  { name: "Skandiabanken", ranta3m: 4.70, ranta1y: 4.35, ranta3y: 3.95, ranta5y: 3.78, rating: 4.3, link: "#" },
  { name: "Nordea", ranta3m: 4.85, ranta1y: 4.49, ranta3y: 4.05, ranta5y: 3.85, rating: 4.1, link: "#" },
  { name: "Handelsbanken", ranta3m: 4.82, ranta1y: 4.45, ranta3y: 3.99, ranta5y: 3.82, rating: 4.2, link: "#" },
  { name: "SEB", ranta3m: 4.88, ranta1y: 4.52, ranta3y: 4.08, ranta5y: 3.88, rating: 4.0, link: "#" },
  { name: "Swedbank", ranta3m: 4.90, ranta1y: 4.55, ranta3y: 4.10, ranta5y: 3.90, rating: 3.9, link: "#" },
  { name: "Länsförsäkringar", ranta3m: 4.75, ranta1y: 4.39, ranta3y: 3.92, ranta5y: 3.75, rating: 4.4, link: "#" },
  { name: "ICA Banken", ranta3m: 4.72, ranta1y: 4.32, ranta3y: 3.90, ranta5y: 3.74, rating: 4.2, link: "#" },
  { name: "Danske Bank", ranta3m: 4.95, ranta1y: 4.59, ranta3y: 4.15, ranta5y: 3.95, rating: 3.8, link: "#" },
  { name: "Avanza", ranta3m: 4.60, ranta1y: 4.25, ranta3y: 3.85, ranta5y: 3.69, rating: 4.6, link: "#" },
];

type SortKey = "ranta3m" | "ranta1y" | "ranta3y" | "ranta5y" | "rating";

export default function BolaneratorPage() {
  const [sortBy, setSortBy] = useState<SortKey>("ranta3m");
  const [loanAmount, setLoanAmount] = useState(3000000);

  const sorted = [...banks].sort((a, b) =>
    sortBy === "rating" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
  );

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");
  const monthlyCost = (rate: number) => Math.round((loanAmount * rate) / 100 / 12);

  const headers: { key: SortKey; label: string }[] = [
    { key: "ranta3m", label: "3 mån" },
    { key: "ranta1y", label: "1 år" },
    { key: "ranta3y", label: "3 år" },
    { key: "ranta5y", label: "5 år" },
    { key: "rating", label: "Betyg" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
        <span className="text-muted/50">/</span>
        <Link href="/jamfor" className="text-muted hover:text-accent transition font-medium">Jämför</Link>
        <span className="text-muted/50">/</span>
        <span className="font-semibold text-navy">Bolåneräntor</span>
      </div>

      <AnimatedSection>
        <h1 className="font-serif text-3xl font-bold text-navy mb-2">Bästa bolåneräntan 2026</h1>
        <p className="text-muted mb-8">Jämför bolåneräntor från Sveriges största banker. Uppdateras dagligen.</p>
      </AnimatedSection>

      {/* Loan amount selector */}
      <AnimatedSection delay={0.1}>
        <div className="bg-surface border border-border p-5 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted">Lånebelopp</span>
            <span className="text-lg font-black text-navy">{fmt(loanAmount)} kr</span>
          </div>
          <input
            type="range"
            min={500000}
            max={10000000}
            step={100000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full accent-accent h-1.5 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-muted mt-1">
            <span>500 000 kr</span>
            <span>10 000 000 kr</span>
          </div>
        </div>
      </AnimatedSection>

      {/* Table */}
      <AnimatedSection delay={0.15}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 pr-4 text-[10px] font-black uppercase tracking-widest text-muted">Bank</th>
                {headers.map((h) => (
                  <th
                    key={h.key}
                    onClick={() => setSortBy(h.key)}
                    className={`text-right py-3 px-3 text-[10px] font-black uppercase tracking-widest cursor-pointer transition ${
                      sortBy === h.key ? "text-accent" : "text-muted hover:text-navy"
                    }`}
                  >
                    {h.label} {sortBy === h.key && "▼"}
                  </th>
                ))}
                <th className="text-right py-3 pl-3 text-[10px] font-black uppercase tracking-widest text-muted">Kostnad/mån</th>
                <th className="text-right py-3 pl-3"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((bank, i) => (
                <tr key={bank.name} className="border-b border-border/60 hover:bg-surface/50 transition">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black text-border w-6">{i + 1}</span>
                      <span className="font-semibold text-navy">{bank.name}</span>
                    </div>
                  </td>
                  {headers.map((h) => (
                    <td
                      key={h.key}
                      className={`text-right py-3.5 px-3 tabular-nums ${
                        sortBy === h.key ? "font-bold text-navy" : "text-muted"
                      }`}
                    >
                      {h.key === "rating" ? (
                        <span className="text-accent font-bold">{bank[h.key].toFixed(1)}</span>
                      ) : (
                        `${bank[h.key].toFixed(2)}%`
                      )}
                    </td>
                  ))}
                  <td className="text-right py-3.5 pl-3 font-bold text-navy tabular-nums">
                    {fmt(monthlyCost(bank[sortBy === "rating" ? "ranta3m" : sortBy]))} kr
                  </td>
                  <td className="text-right py-3.5 pl-3">
                    <span className="px-3 py-1.5 bg-accent text-navy text-[11px] font-black cursor-pointer hover:bg-accent-hover transition">
                      Ansök
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      <p className="text-[11px] text-muted mt-6">* Räntorna är listpriser och kan variera beroende på belåningsgrad, inkomst och övriga engagemang. Senast uppdaterad: april 2026.</p>
    </div>
  );
}
