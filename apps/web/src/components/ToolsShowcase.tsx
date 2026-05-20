"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

import MortgageCalculator from "@/components/tools/MortgageCalculator";
import SavingsCalculator from "@/components/tools/SavingsCalculator";
import CompoundInterestCalc from "@/components/tools/CompoundInterestCalc";
import TaxCalculator from "@/components/tools/TaxCalculator";
import ISKCalculator from "@/components/tools/ISKCalculator";
import FIRECalculator from "@/components/tools/FIRECalculator";
import DebtPayoffCalc from "@/components/tools/DebtPayoffCalc";
import RentVsBuyCalc from "@/components/tools/RentVsBuyCalc";
import DividendCalc from "@/components/tools/DividendCalc";
import InflationCalculator from "@/components/tools/InflationCalculator";
import BudgetCalc from "@/components/tools/BudgetCalc";
import ROICalculator from "@/components/tools/ROICalculator";
import FundFeeCalc from "@/components/tools/FundFeeCalc";
import RetirementCalc from "@/components/tools/RetirementCalc";
import BreakEvenCalc from "@/components/tools/BreakEvenCalc";

type Tool = {
  id: string;
  name: string;
  desc: string;
  explain: string;
  href: string;
  Comp: React.ComponentType;
};

const TOOLS: Tool[] = [
  {
    id: "bolan",
    name: "Bolåneberäknare",
    desc: "Månadskostnad & ränta",
    explain:
      "Räkna månadskostnaden för ditt bolån utifrån lånebelopp, ränta och löptid — och se totala räntekostnaden över hela perioden.",
    href: "/verktyg/bolanekalkylator",
    Comp: MortgageCalculator,
  },
  {
    id: "sparande",
    name: "Sparande",
    desc: "Månadssparande & ränta",
    explain:
      "Beräkna hur ditt sparande växer över tid med engångsinsättning, månadssparande och ränta-på-ränta-effekten.",
    href: "/verktyg/sparandekalkylator",
    Comp: SavingsCalculator,
  },
  {
    id: "ranta",
    name: "Ränta-på-ränta",
    desc: "Exponentiell tillväxt",
    explain:
      "Visualisera hur exponentiell tillväxt påverkar kapitalet år för år — inklusive 72-regeln för fördubblingstid.",
    href: "/verktyg/ranta-pa-ranta",
    Comp: CompoundInterestCalc,
  },
  {
    id: "lon",
    name: "Löneberäknare",
    desc: "Nettolön efter skatt",
    explain:
      "Räkna ut nettolönen efter kommunal- och statlig inkomstskatt baserat på din bruttolön och kommun.",
    href: "/verktyg/lonekalkylator",
    Comp: TaxCalculator,
  },
  {
    id: "isk",
    name: "ISK-skatt",
    desc: "Schablonsskatt",
    explain:
      "Räkna årlig schablonsskatt på ditt investeringssparkonto utifrån statslåneränta och kapitalunderlag.",
    href: "/verktyg/isk-skatt",
    Comp: ISKCalculator,
  },
  {
    id: "fire",
    name: "FIRE",
    desc: "Ekonomisk frihet",
    explain:
      "Räkna ut när du kan bli ekonomiskt oberoende med 4 %-regeln och ditt sparkapital — Financial Independence, Retire Early.",
    href: "/verktyg/fire-kalkylator",
    Comp: FIRECalculator,
  },
  {
    id: "skuld",
    name: "Skuldavbetalning",
    desc: "Tid till skuldfrihet",
    explain:
      "Se hur snabbt du blir skuldfri med olika månadsbelopp, samt totala räntekostnaden för ditt lån.",
    href: "/verktyg/skuldavbetalning",
    Comp: DebtPayoffCalc,
  },
  {
    id: "hyra",
    name: "Hyra vs Köpa",
    desc: "Jämför boende",
    explain:
      "Jämför långsiktig kostnad för att hyra mot att köpa bostad — inklusive ränta, amortering och alternativkostnad.",
    href: "/verktyg/hyra-vs-kopa",
    Comp: RentVsBuyCalc,
  },
  {
    id: "utdelning",
    name: "Utdelningar",
    desc: "Utdelningsinkomst",
    explain:
      "Räkna ut passiv utdelningsinkomst utifrån direktavkastning, innehav och tillväxt år för år.",
    href: "/verktyg/utdelningskalkylator",
    Comp: DividendCalc,
  },
  {
    id: "inflation",
    name: "Inflation",
    desc: "Köpkraft över tid",
    explain:
      "Se hur inflationen urholkar köpkraften i dina pengar över tid och vad ett belopp motsvarar i framtida värde.",
    href: "/verktyg/inflationskalkylator",
    Comp: InflationCalculator,
  },
  {
    id: "budget",
    name: "Budget",
    desc: "Planera utgifter",
    explain:
      "Planera dina månatliga inkomster, fasta kostnader och rörliga utgifter — se vad som blir kvar varje månad.",
    href: "/verktyg/budget",
    Comp: BudgetCalc,
  },
  {
    id: "roi",
    name: "ROI",
    desc: "Avkastning & CAGR",
    explain:
      "Räkna ut total avkastning, vinst i kronor och årlig avkastning (CAGR) på en investering.",
    href: "/verktyg/roi-beraknare",
    Comp: ROICalculator,
  },
  {
    id: "fond",
    name: "Fondavgifter",
    desc: "Avgifters påverkan",
    explain:
      "Se hur mycket av avkastningen som äts upp av förvaltningsavgifter över tid — små procent gör stor skillnad.",
    href: "/verktyg/fondavgifter",
    Comp: FundFeeCalc,
  },
  {
    id: "pension",
    name: "Pension",
    desc: "Pensionsgap & kapital",
    explain:
      "Räkna ut pensionsgapet och vad du behöver spara månadsvis för att nå ditt pensionsmål.",
    href: "/verktyg/pensionskalkylator",
    Comp: RetirementCalc,
  },
  {
    id: "breakeven",
    name: "Break-even",
    desc: "Enheter till lönsamhet",
    explain:
      "Räkna ut hur många enheter du behöver sälja för att täcka fasta kostnader och nå nollresultat.",
    href: "/verktyg/break-even",
    Comp: BreakEvenCalc,
  },
];

export default function ToolsShowcase() {
  const [activeId, setActiveId] = useState<string>("bolan");
  const [openTip, setOpenTip] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpenTip(null);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const active = TOOLS.find((t) => t.id === activeId) ?? TOOLS[0];
  const ActiveComp = active.Comp;

  return (
    <section id="verktyg" className="bg-surface border-y border-border py-10">
      <div className="max-w-7xl mx-auto px-4" ref={containerRef}>
        <AnimatedSection>
          <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-black mb-1 flex items-center gap-3">
                <span className="w-1 h-6 bg-accent rounded-full" />
                Ekonomiska verktyg
              </h2>
              <p className="text-sm text-muted ml-4">
                Välj ett verktyg — testa direkt här på sidan, utan att navigera bort.
              </p>
            </div>
            <Link
              href="/verktyg"
              className="text-sm font-bold text-accent hover:text-accent-hover transition hidden sm:inline-flex items-center gap-1"
            >
              Visa alla verktyg
              <span aria-hidden>→</span>
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT — Active live tool */}
          <AnimatedSection className="lg:col-span-5" delay={0.05}>
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Live verktyg
              </span>
              <Link
                href={active.href}
                className="text-[11px] font-bold text-muted hover:text-accent transition inline-flex items-center gap-1"
              >
                Öppna fullskärm <span aria-hidden>↗</span>
              </Link>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <ActiveComp />
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>

          {/* RIGHT — tool tiles */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {TOOLS.map((tool, i) => {
                const isActive = tool.id === activeId;
                const isTipOpen = openTip === tool.id;
                return (
                  <AnimatedSection key={tool.id} delay={0.08 + i * 0.02}>
                    <div
                      className="relative h-full"
                      onMouseLeave={() =>
                        setOpenTip((c) => (c === tool.id ? null : c))
                      }
                    >
                      <button
                        type="button"
                        onClick={() => setActiveId(tool.id)}
                        aria-pressed={isActive}
                        className={`w-full h-full text-left p-3.5 pr-10 rounded-xl border cursor-pointer transition-all duration-200 ${
                          isActive
                            ? "border-accent bg-accent/5 shadow-sm"
                            : "border-border bg-white hover:border-accent/50 hover:shadow-md hover:-translate-y-0.5"
                        }`}
                      >
                        <p
                          className={`font-bold text-sm truncate transition ${
                            isActive ? "text-accent" : "text-navy"
                          }`}
                        >
                          {tool.name}
                        </p>
                        <p className="text-[11px] text-muted truncate mt-0.5">{tool.desc}</p>
                        {isActive && (
                          <span className="absolute bottom-1.5 left-3.5 text-[9px] font-black uppercase tracking-widest text-accent">
                            Visas nu
                          </span>
                        )}
                      </button>

                      {/* Help button */}
                      <button
                        type="button"
                        aria-label={`Förklaring: ${tool.name}`}
                        aria-expanded={isTipOpen}
                        onMouseEnter={() => setOpenTip(tool.id)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenTip((c) => (c === tool.id ? null : tool.id));
                        }}
                        className={`absolute top-2 right-2 w-6 h-6 inline-flex items-center justify-center rounded-full text-[12px] font-bold cursor-help transition ${
                          isTipOpen
                            ? "bg-navy text-accent"
                            : "bg-slate-100 text-muted hover:bg-navy hover:text-accent"
                        }`}
                      >
                        ?
                      </button>

                      {/* Tooltip — sibling of tile button so it can span tile width on mobile */}
                      <AnimatePresence>
                        {isTipOpen && (
                          <motion.div
                            role="tooltip"
                            initial={{ opacity: 0, y: -4, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-20 left-2 right-2 top-10 sm:left-auto sm:right-2 sm:w-56 p-3 rounded-lg bg-navy text-white text-[12px] leading-relaxed shadow-xl ring-1 ring-black/10"
                          >
                            <p className="font-bold text-accent text-[11px] uppercase tracking-widest mb-1">
                              {tool.name}
                            </p>
                            <p className="text-white/85">{tool.explain}</p>
                            <span
                              aria-hidden
                              className="absolute -top-1 right-3 w-2 h-2 rotate-45 bg-navy"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection delay={0.4}>
              <Link
                href="/verktyg"
                className="sm:hidden mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent hover:text-accent-hover transition"
              >
                Visa alla verktyg <span aria-hidden>→</span>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
