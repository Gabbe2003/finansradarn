"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ISKCalculator() {
  const [value, setValue] = useState(500000);
  const [deposit, setDeposit] = useState(5000);
  const [returnRate, setReturnRate] = useState(8);

  // ISK tax = statslåneränta (nov 30 prev year) + 1%, min 1.25%, * 30% capital tax
  const govRate = 2.62; // approximate
  const iskRate = Math.max(govRate + 1, 1.25);
  const iskTaxRate = iskRate * 0.3;

  // Approximate: tax on average capital value
  const yearlyDeposits = deposit * 12;
  const avgValue = value + yearlyDeposits / 2;
  const yearlyTax = avgValue * (iskTaxRate / 100);

  const grossReturn = value * (returnRate / 100);
  const netReturn = grossReturn - yearlyTax;
  const effectiveTaxRate = grossReturn > 0 ? (yearlyTax / grossReturn) * 100 : 0;

  // Compare with traditional kapitalförsäkring (30% on gains)
  const tradTax = grossReturn * 0.3;

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>
        </div>
        <h3 className="font-black text-navy">ISK-skatteberäknare</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Kontovärde</span>
            <span className="font-bold text-navy">{fmt(value)} kr</span>
          </div>
          <input type="range" min={10000} max={10000000} step={10000} value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Månadssparande</span>
            <span className="font-bold text-navy">{fmt(deposit)} kr</span>
          </div>
          <input type="range" min={0} max={30000} step={500} value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Förväntad avkastning</span>
            <span className="font-bold text-navy">{returnRate}%</span>
          </div>
          <input type="range" min={0} max={25} step={1} value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Schablonränta (SLR + 1%)</span>
          <span className="font-bold">{iskRate.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">ISK-skatt/år</span>
          <span className="font-bold text-red-600">{fmt(yearlyTax)} kr</span>
        </div>
        <motion.div key={netReturn} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between items-center">
          <span className="text-sm text-muted">Nettoavkastning</span>
          <span className="text-xl font-black text-navy">{fmt(netReturn)} kr</span>
        </motion.div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Effektiv skattesats</span>
          <span className="font-bold">{effectiveTaxRate.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t border-border">
          <span className="text-muted">Jämförelse: 30% kapitalskatt</span>
          <span className="font-bold text-red-600">{fmt(tradTax)} kr</span>
        </div>
        <div className="text-xs text-emerald-600 font-bold text-right">
          {yearlyTax < tradTax ? `ISK sparar dig ${fmt(tradTax - yearlyTax)} kr/år` : `Kapitalskatt billigare med ${fmt(yearlyTax - tradTax)} kr/år`}
        </div>
      </div>
    </div>
  );
}
