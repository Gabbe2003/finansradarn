"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [compounding, setCompounding] = useState(12);

  const total = principal * Math.pow(1 + rate / 100 / compounding, compounding * years);
  const interest = total - principal;
  const doubleTime = rate > 0 ? 72 / rate : 0;

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5" /></svg>
        </div>
        <h3 className="font-black text-navy">Ränta-på-ränta</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Kapital</span>
            <span className="font-bold text-navy">{fmt(principal)} kr</span>
          </div>
          <input type="range" min={1000} max={5000000} step={1000} value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Ränta/år</span>
            <span className="font-bold text-navy">{rate}%</span>
          </div>
          <input type="range" min={0.5} max={20} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Tid</span>
            <span className="font-bold text-navy">{years} år</span>
          </div>
          <input type="range" min={1} max={50} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <label className="text-sm text-muted font-medium block mb-1.5">Ränteperiod</label>
          <select value={compounding} onChange={(e) => setCompounding(Number(e.target.value))} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/50 font-medium">
            <option value={1}>Årligen</option>
            <option value={4}>Kvartalsvis</option>
            <option value={12}>Månadsvis</option>
            <option value={365}>Dagligen</option>
          </select>
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        <motion.div key={total} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between items-center">
          <span className="text-sm text-muted">Slutvärde</span>
          <span className="text-xl font-black text-navy">{fmt(total)} kr</span>
        </motion.div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Räntevinst</span>
          <span className="font-bold text-emerald-600">+{fmt(interest)} kr</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Fördubblingstid (72-regeln)</span>
          <span className="font-bold">~{doubleTime.toFixed(1)} år</span>
        </div>
      </div>
    </div>
  );
}
