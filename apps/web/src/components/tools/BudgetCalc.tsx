"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function BudgetCalc() {
  const [income, setIncome] = useState(35000);
  const [housing, setHousing] = useState(10000);
  const [food, setFood] = useState(4000);
  const [transport, setTransport] = useState(2500);
  const [insurance, setInsurance] = useState(1500);
  const [subscriptions, setSubscriptions] = useState(1000);
  const [other, setOther] = useState(3000);

  const totalExpenses = housing + food + transport + insurance + subscriptions + other;
  const remaining = income - totalExpenses;
  const savingsRate = income > 0 ? (remaining / income) * 100 : 0;

  const categories = [
    { name: "Boende", value: housing, set: setHousing, max: 25000, color: "#1D4ED8" },
    { name: "Mat", value: food, set: setFood, max: 10000, color: "#059669" },
    { name: "Transport", value: transport, set: setTransport, max: 8000, color: "#D97706" },
    { name: "Försäkringar", value: insurance, set: setInsurance, max: 5000, color: "#7C3AED" },
    { name: "Abonnemang", value: subscriptions, set: setSubscriptions, max: 5000, color: "#0891B2" },
    { name: "Övrigt", value: other, set: setOther, max: 10000, color: "#DC2626" },
  ];

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg>
        </div>
        <h3 className="font-black text-navy">Budgetplanerare</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Nettoinkomst/mån</span>
            <span className="font-bold text-navy">{fmt(income)} kr</span>
          </div>
          <input type="range" min={10000} max={100000} step={1000} value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        {categories.map((cat) => (
          <div key={cat.name}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted font-medium">{cat.name}</span>
              <span className="font-bold text-navy">{fmt(cat.value)} kr</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
              <input type="range" min={0} max={cat.max} step={500} value={cat.value} onChange={(e) => cat.set(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Totala utgifter</span>
          <span className="font-bold">{fmt(totalExpenses)} kr</span>
        </div>
        <motion.div key={remaining} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between items-center">
          <span className="text-sm text-muted">Kvar att spara</span>
          <span className={`text-xl font-black ${remaining >= 0 ? "text-emerald-600" : "text-red-600"}`}>{remaining >= 0 ? "+" : ""}{fmt(remaining)} kr</span>
        </motion.div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Sparkvot</span>
          <span className={`font-bold ${savingsRate >= 20 ? "text-emerald-600" : savingsRate >= 10 ? "text-amber-600" : "text-red-600"}`}>{savingsRate.toFixed(0)}%</span>
        </div>
        {/* Visual bar */}
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex mt-2">
          {categories.map((cat) => (
            <div key={cat.name} style={{ width: `${income > 0 ? (cat.value / income) * 100 : 0}%`, backgroundColor: cat.color }} className="h-full transition-all duration-500" title={cat.name} />
          ))}
          {remaining > 0 && (
            <div style={{ width: `${(remaining / income) * 100}%` }} className="h-full bg-emerald-400 transition-all duration-500" title="Sparande" />
          )}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-muted">
          {categories.map((cat) => (
            <span key={cat.name} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
              {cat.name}
            </span>
          ))}
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Sparande
          </span>
        </div>
      </div>
    </div>
  );
}
