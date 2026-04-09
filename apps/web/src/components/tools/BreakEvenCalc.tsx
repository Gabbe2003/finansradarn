"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function BreakEvenCalc() {
  const [fixedCosts, setFixedCosts] = useState(50000);
  const [pricePerUnit, setPricePerUnit] = useState(500);
  const [variableCost, setVariableCost] = useState(200);

  const contribution = pricePerUnit - variableCost;
  const breakEvenUnits = contribution > 0 ? Math.ceil(fixedCosts / contribution) : 0;
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;
  const marginPercent = pricePerUnit > 0 ? (contribution / pricePerUnit) * 100 : 0;

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>
        </div>
        <h3 className="font-black text-navy">Break-even-beräknare</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Fasta kostnader/mån</span>
            <span className="font-bold text-navy">{fmt(fixedCosts)} kr</span>
          </div>
          <input type="range" min={1000} max={500000} step={1000} value={fixedCosts} onChange={(e) => setFixedCosts(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Pris/enhet</span>
            <span className="font-bold text-navy">{fmt(pricePerUnit)} kr</span>
          </div>
          <input type="range" min={10} max={10000} step={10} value={pricePerUnit} onChange={(e) => setPricePerUnit(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Rörlig kostnad/enhet</span>
            <span className="font-bold text-navy">{fmt(variableCost)} kr</span>
          </div>
          <input type="range" min={0} max={pricePerUnit} step={10} value={variableCost} onChange={(e) => setVariableCost(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        <motion.div key={breakEvenUnits} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between items-center">
          <span className="text-sm text-muted">Break-even</span>
          <span className="text-xl font-black text-navy">{fmt(breakEvenUnits)} enheter</span>
        </motion.div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Break-even intäkt</span>
          <span className="font-bold">{fmt(breakEvenRevenue)} kr</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Täckningsbidrag/enhet</span>
          <span className="font-bold text-emerald-600">{fmt(contribution)} kr</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Täckningsgrad</span>
          <span className="font-bold">{marginPercent.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
