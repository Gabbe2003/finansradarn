"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function DividendCalc() {
  const [invested, setInvested] = useState(500000);
  const [dividendYield, setDividendYield] = useState(4);
  const [growth, setGrowth] = useState(5);
  const [years, setYears] = useState(10);
  const [reinvest, setReinvest] = useState(true);

  let portfolio = invested;
  let yearlyDividend = 0;
  let totalDividends = 0;

  for (let y = 0; y < years; y++) {
    yearlyDividend = portfolio * (dividendYield / 100);
    totalDividends += yearlyDividend;
    if (reinvest) {
      portfolio += yearlyDividend;
    }
    portfolio *= 1 + growth / 100;
  }

  const monthlyIncome = yearlyDividend / 12;
  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
        </div>
        <h3 className="font-black text-navy">Utdelningsberäknare</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Investerat</span>
            <span className="font-bold text-navy">{fmt(invested)} kr</span>
          </div>
          <input type="range" min={10000} max={5000000} step={10000} value={invested} onChange={(e) => setInvested(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Direktavkastning</span>
            <span className="font-bold text-navy">{dividendYield}%</span>
          </div>
          <input type="range" min={0.5} max={12} step={0.5} value={dividendYield} onChange={(e) => setDividendYield(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Utdelningstillväxt/år</span>
            <span className="font-bold text-navy">{growth}%</span>
          </div>
          <input type="range" min={0} max={15} step={1} value={growth} onChange={(e) => setGrowth(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Tidshorisont</span>
            <span className="font-bold text-navy">{years} år</span>
          </div>
          <input type="range" min={1} max={30} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={reinvest} onChange={(e) => setReinvest(e.target.checked)} className="accent-accent w-4 h-4" />
          <span className="text-sm font-medium">Återinvestera utdelningar</span>
        </label>
      </div>
      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        <motion.div key={yearlyDividend} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between items-center">
          <span className="text-sm text-muted">Årlig utdelning (år {years})</span>
          <span className="text-xl font-black text-navy">{fmt(yearlyDividend)} kr</span>
        </motion.div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Månadsutdelning</span>
          <span className="font-bold text-emerald-600">{fmt(monthlyIncome)} kr</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Totala utdelningar</span>
          <span className="font-bold">{fmt(totalDividends)} kr</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Portföljvärde</span>
          <span className="font-bold">{fmt(portfolio)} kr</span>
        </div>
      </div>
    </div>
  );
}
