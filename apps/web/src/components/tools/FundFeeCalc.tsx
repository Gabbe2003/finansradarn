"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FundFeeCalc() {
  const [invested, setInvested] = useState(500000);
  const [monthly, setMonthly] = useState(3000);
  const [returnRate, setReturnRate] = useState(8);
  const [feeHigh, setFeeHigh] = useState(1.5);
  const [feeLow, setFeeLow] = useState(0.2);
  const [years, setYears] = useState(20);

  function calcWithFee(fee: number) {
    const r = (returnRate - fee) / 100 / 12;
    const months = years * 12;
    return r > 0
      ? invested * Math.pow(1 + r, months) + monthly * ((Math.pow(1 + r, months) - 1) / r)
      : invested + monthly * months;
  }

  const highFeeResult = calcWithFee(feeHigh);
  const lowFeeResult = calcWithFee(feeLow);
  const feeDifference = lowFeeResult - highFeeResult;

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>
        </div>
        <h3 className="font-black text-navy">Fondavgiftsberäknare</h3>
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
            <span className="text-muted font-medium">Månadssparande</span>
            <span className="font-bold text-navy">{fmt(monthly)} kr</span>
          </div>
          <input type="range" min={0} max={20000} step={500} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Dyr fond (avgift)</span>
            <span className="font-bold text-navy">{feeHigh}%</span>
          </div>
          <input type="range" min={0.5} max={3} step={0.1} value={feeHigh} onChange={(e) => setFeeHigh(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Billig fond (avgift)</span>
            <span className="font-bold text-navy">{feeLow}%</span>
          </div>
          <input type="range" min={0} max={1} step={0.05} value={feeLow} onChange={(e) => setFeeLow(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Spartid</span>
            <span className="font-bold text-navy">{years} år</span>
          </div>
          <input type="range" min={1} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Dyr fond ({feeHigh}%)</span>
          <span className="font-bold">{fmt(highFeeResult)} kr</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Billig fond ({feeLow}%)</span>
          <span className="font-bold">{fmt(lowFeeResult)} kr</span>
        </div>
        <motion.div key={feeDifference} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between items-center pt-2 border-t border-border">
          <span className="text-sm text-muted">Du sparar</span>
          <span className="text-xl font-black text-emerald-600">+{fmt(feeDifference)} kr</span>
        </motion.div>
      </div>
    </div>
  );
}
