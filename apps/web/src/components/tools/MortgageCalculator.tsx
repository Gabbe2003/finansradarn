"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function MortgageCalculator() {
  const [loan, setLoan] = useState(3000000);
  const [rate, setRate] = useState(4.95);
  const [years, setYears] = useState(30);

  const monthlyRate = rate / 100 / 12;
  const totalPayments = years * 12;
  const monthlyPayment = monthlyRate > 0
    ? (loan * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1)
    : loan / totalPayments;
  const totalCost = monthlyPayment * totalPayments;
  const totalInterest = totalCost - loan;

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>
        <h3 className="font-black text-navy">Bolåneberäknare</h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Lånebelopp</span>
            <span className="font-bold text-navy">{fmt(loan)} kr</span>
          </div>
          <input
            type="range"
            min={500000}
            max={10000000}
            step={100000}
            value={loan}
            onChange={(e) => setLoan(Number(e.target.value))}
            className="w-full accent-accent h-1.5 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-muted mt-0.5">
            <span>500 000</span>
            <span>10 000 000</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Ränta</span>
            <span className="font-bold text-navy">{rate.toFixed(2)}%</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={10}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-accent h-1.5 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-muted mt-0.5">
            <span>0,50%</span>
            <span>10,00%</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Löptid</span>
            <span className="font-bold text-navy">{years} år</span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-accent h-1.5 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-muted mt-0.5">
            <span>5 år</span>
            <span>50 år</span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        <motion.div
          key={monthlyPayment}
          initial={{ scale: 0.95, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-between items-center"
        >
          <span className="text-sm text-muted">Månadskostnad</span>
          <span className="text-xl font-black text-navy">{fmt(monthlyPayment)} kr</span>
        </motion.div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Total räntekostnad</span>
          <span className="font-bold text-red-600">{fmt(totalInterest)} kr</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Totalt att betala</span>
          <span className="font-bold">{fmt(totalCost)} kr</span>
        </div>
      </div>
    </div>
  );
}
