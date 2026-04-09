"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function InflationCalculator() {
  const [amount, setAmount] = useState(100000);
  const [inflation, setInflation] = useState(4.1);
  const [years, setYears] = useState(10);

  const futureValue = amount / Math.pow(1 + inflation / 100, years);
  const purchasingPowerLoss = amount - futureValue;
  const lossPercent = (purchasingPowerLoss / amount) * 100;

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <h3 className="font-black text-navy">Inflationsberäknare</h3>
      </div>

      <p className="text-xs text-muted mb-4">Vad är dina pengar värda i framtiden med dagens inflation?</p>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Belopp idag</span>
            <span className="font-bold text-navy">{fmt(amount)} kr</span>
          </div>
          <input
            type="range"
            min={10000}
            max={5000000}
            step={10000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-accent h-1.5 rounded-full cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Inflation/år</span>
            <span className="font-bold text-navy">{inflation.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={10}
            step={0.1}
            value={inflation}
            onChange={(e) => setInflation(Number(e.target.value))}
            className="w-full accent-accent h-1.5 rounded-full cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Tidshorisont</span>
            <span className="font-bold text-navy">{years} år</span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
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
          <span className="text-sm text-muted">Köpkraft om {years} år</span>
          <span className="text-xl font-black text-navy">{fmt(futureValue)} kr</span>
        </motion.div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Köpkraftsförlust</span>
          <span className="font-bold text-red-600">-{fmt(purchasingPowerLoss)} kr ({lossPercent.toFixed(0)}%)</span>
        </div>
      </div>
    </div>
  );
}
