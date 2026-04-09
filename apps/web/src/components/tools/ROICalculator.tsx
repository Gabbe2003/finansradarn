"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ROICalculator() {
  const [invested, setInvested] = useState(100000);
  const [currentVal, setCurrentVal] = useState(145000);
  const [years, setYears] = useState(3);

  const totalReturn = currentVal - invested;
  const roi = invested > 0 ? (totalReturn / invested) * 100 : 0;
  const annualizedReturn = invested > 0 && years > 0
    ? (Math.pow(currentVal / invested, 1 / years) - 1) * 100
    : 0;

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" /></svg>
        </div>
        <h3 className="font-black text-navy">ROI-beräknare</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Investerat belopp</span>
            <span className="font-bold text-navy">{fmt(invested)} kr</span>
          </div>
          <input type="range" min={1000} max={5000000} step={1000} value={invested} onChange={(e) => setInvested(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Nuvarande värde</span>
            <span className="font-bold text-navy">{fmt(currentVal)} kr</span>
          </div>
          <input type="range" min={0} max={10000000} step={1000} value={currentVal} onChange={(e) => setCurrentVal(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Innehavstid</span>
            <span className="font-bold text-navy">{years} år</span>
          </div>
          <input type="range" min={1} max={30} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        <motion.div key={roi} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between items-center">
          <span className="text-sm text-muted">Total ROI</span>
          <span className={`text-xl font-black ${totalReturn >= 0 ? "text-emerald-600" : "text-red-600"}`}>{roi >= 0 ? "+" : ""}{roi.toFixed(1)}%</span>
        </motion.div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Vinst/förlust</span>
          <span className={`font-bold ${totalReturn >= 0 ? "text-emerald-600" : "text-red-600"}`}>{totalReturn >= 0 ? "+" : ""}{fmt(totalReturn)} kr</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Årlig avkastning (CAGR)</span>
          <span className="font-bold">{annualizedReturn.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}
