"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function DebtPayoffCalc() {
  const [debt, setDebt] = useState(150000);
  const [rate, setRate] = useState(15);
  const [payment, setPayment] = useState(5000);

  const monthlyRate = rate / 100 / 12;
  let months = 0;
  let totalPaid = 0;

  if (payment > debt * monthlyRate) {
    months = Math.ceil(Math.log(payment / (payment - debt * monthlyRate)) / Math.log(1 + monthlyRate));
    totalPaid = months * payment;
  }

  const totalInterest = totalPaid - debt;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l-3-3m0 0l3-3m-3 3h12.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
        </div>
        <h3 className="font-black text-navy">Skuldavbetalning</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Skuld</span>
            <span className="font-bold text-navy">{fmt(debt)} kr</span>
          </div>
          <input type="range" min={5000} max={1000000} step={5000} value={debt} onChange={(e) => setDebt(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Ränta</span>
            <span className="font-bold text-navy">{rate}%</span>
          </div>
          <input type="range" min={1} max={30} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Månadsinbetalning</span>
            <span className="font-bold text-navy">{fmt(payment)} kr</span>
          </div>
          <input type="range" min={500} max={50000} step={500} value={payment} onChange={(e) => setPayment(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        {payment <= debt * monthlyRate ? (
          <p className="text-sm text-red-600 font-bold">Inbetalningen täcker inte ens räntan! Öka beloppet.</p>
        ) : (
          <>
            <motion.div key={months} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between items-center">
              <span className="text-sm text-muted">Skuldfri om</span>
              <span className="text-xl font-black text-navy">{years > 0 ? `${years} år ` : ""}{remainingMonths} mån</span>
            </motion.div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Total räntekostnad</span>
              <span className="font-bold text-red-600">{fmt(totalInterest)} kr</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Totalt att betala</span>
              <span className="font-bold">{fmt(totalPaid)} kr</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
