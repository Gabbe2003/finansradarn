"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FIRECalculator() {
  const [monthlyExpense, setMonthlyExpense] = useState(25000);
  const [savings, setSavings] = useState(300000);
  const [monthlySave, setMonthlySave] = useState(15000);
  const [returnRate, setReturnRate] = useState(7);
  const [withdrawRate, setWithdrawRate] = useState(4);

  const yearlyExpense = monthlyExpense * 12;
  const fireNumber = yearlyExpense / (withdrawRate / 100);
  const remaining = fireNumber - savings;

  // Calculate years to FIRE
  const r = returnRate / 100 / 12;
  let current = savings;
  let months = 0;
  while (current < fireNumber && months < 600) {
    current = current * (1 + r) + monthlySave;
    months++;
  }
  const yearsToFire = months / 12;

  const savingsRate = monthlySave > 0 && monthlyExpense > 0
    ? (monthlySave / (monthlySave + monthlyExpense)) * 100
    : 0;

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>
        </div>
        <h3 className="font-black text-navy">FIRE-beräknare</h3>
      </div>
      <p className="text-xs text-muted mb-4">Financial Independence, Retire Early</p>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Månatliga utgifter</span>
            <span className="font-bold text-navy">{fmt(monthlyExpense)} kr</span>
          </div>
          <input type="range" min={10000} max={80000} step={1000} value={monthlyExpense} onChange={(e) => setMonthlyExpense(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Sparkapital idag</span>
            <span className="font-bold text-navy">{fmt(savings)} kr</span>
          </div>
          <input type="range" min={0} max={10000000} step={50000} value={savings} onChange={(e) => setSavings(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Månadssparande</span>
            <span className="font-bold text-navy">{fmt(monthlySave)} kr</span>
          </div>
          <input type="range" min={0} max={50000} step={1000} value={monthlySave} onChange={(e) => setMonthlySave(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Uttaksfrekvens</span>
            <span className="font-bold text-navy">{withdrawRate}%</span>
          </div>
          <input type="range" min={2} max={6} step={0.5} value={withdrawRate} onChange={(e) => setWithdrawRate(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        <motion.div key={fireNumber} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between items-center">
          <span className="text-sm text-muted">FIRE-tal</span>
          <span className="text-xl font-black text-navy">{fmt(fireNumber)} kr</span>
        </motion.div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Kvar att spara</span>
          <span className="font-bold text-red-600">{fmt(Math.max(remaining, 0))} kr</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Tid till FIRE</span>
          <span className="font-bold">{months >= 600 ? "50+ år" : `${Math.floor(yearsToFire)} år ${Math.round((yearsToFire % 1) * 12)} mån`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Sparkvot</span>
          <span className="font-bold">{savingsRate.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}
