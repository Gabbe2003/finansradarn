"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SavingsCalculator() {
  const [initial, setInitial] = useState(50000);
  const [monthly, setMonthly] = useState(3000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(15);

  const monthlyRate = rate / 100 / 12;
  const months = years * 12;

  const futureValue = monthlyRate > 0
    ? initial * Math.pow(1 + monthlyRate, months) +
      monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
    : initial + monthly * months;

  const totalDeposited = initial + monthly * months;
  const totalReturn = futureValue - totalDeposited;
  const returnPercent = totalDeposited > 0 ? (totalReturn / totalDeposited) * 100 : 0;

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
          </svg>
        </div>
        <h3 className="font-black text-navy">Sparandeberäknare</h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Startbelopp</span>
            <span className="font-bold text-navy">{fmt(initial)} kr</span>
          </div>
          <input
            type="range"
            min={0}
            max={1000000}
            step={10000}
            value={initial}
            onChange={(e) => setInitial(Number(e.target.value))}
            className="w-full accent-accent h-1.5 rounded-full cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Månadssparande</span>
            <span className="font-bold text-navy">{fmt(monthly)} kr</span>
          </div>
          <input
            type="range"
            min={0}
            max={20000}
            step={500}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full accent-accent h-1.5 rounded-full cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Årlig avkastning</span>
            <span className="font-bold text-navy">{rate.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={15}
            step={0.5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-accent h-1.5 rounded-full cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Spartid</span>
            <span className="font-bold text-navy">{years} år</span>
          </div>
          <input
            type="range"
            min={1}
            max={40}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-accent h-1.5 rounded-full cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        <motion.div
          key={futureValue}
          initial={{ scale: 0.95, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-between items-center"
        >
          <span className="text-sm text-muted">Slutvärde</span>
          <span className="text-xl font-black text-navy">{fmt(futureValue)} kr</span>
        </motion.div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Totalt insatt</span>
          <span className="font-bold">{fmt(totalDeposited)} kr</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Avkastning</span>
          <span className="font-bold text-emerald-600">+{fmt(totalReturn)} kr ({returnPercent.toFixed(0)}%)</span>
        </div>
      </div>
    </div>
  );
}
