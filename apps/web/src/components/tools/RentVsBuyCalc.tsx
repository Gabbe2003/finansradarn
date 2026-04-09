"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function RentVsBuyCalc() {
  const [price, setPrice] = useState(3500000);
  const [downPayment, setDownPayment] = useState(15);
  const [rate, setRate] = useState(4.95);
  const [rent, setRent] = useState(12000);
  const [appreciation, setAppreciation] = useState(3);
  const [years, setYears] = useState(10);

  const loanAmount = price * (1 - downPayment / 100);
  const downPaymentAmount = price * (downPayment / 100);
  const monthlyRate = rate / 100 / 12;
  const totalPayments = years * 12;
  const monthlyMortgage = monthlyRate > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
    : loanAmount / totalPayments;

  const avgift = 4000; // estimated monthly fee
  const totalBuyCost = (monthlyMortgage + avgift) * totalPayments + downPaymentAmount;
  const propertyValue = price * Math.pow(1 + appreciation / 100, years);
  const equity = propertyValue - loanAmount * 0.5; // simplified remaining loan

  const totalRentCost = rent * totalPayments;
  const rentInvestReturn = downPaymentAmount * Math.pow(1 + 0.06, years); // if invested instead

  const buyNet = equity - totalBuyCost;
  const rentNet = rentInvestReturn - totalRentCost;

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");
  const winner = buyNet > rentNet ? "Köpa" : "Hyra";

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
        </div>
        <h3 className="font-black text-navy">Hyra vs Köpa</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Bostadspris</span>
            <span className="font-bold text-navy">{fmt(price)} kr</span>
          </div>
          <input type="range" min={500000} max={10000000} step={100000} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Kontantinsats</span>
            <span className="font-bold text-navy">{downPayment}% ({fmt(downPaymentAmount)} kr)</span>
          </div>
          <input type="range" min={15} max={50} step={5} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Hyra/mån</span>
            <span className="font-bold text-navy">{fmt(rent)} kr</span>
          </div>
          <input type="range" min={5000} max={30000} step={500} value={rent} onChange={(e) => setRent(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Tidshorisont</span>
            <span className="font-bold text-navy">{years} år</span>
          </div>
          <input type="range" min={1} max={30} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        <div className="grid grid-cols-2 gap-4 text-center pb-3">
          <div className={`p-3 rounded-lg border ${winner === "Köpa" ? "border-emerald-300 bg-emerald-50" : "border-border"}`}>
            <p className="text-xs text-muted font-medium mb-1">Köpa</p>
            <p className="font-black text-navy text-sm">{fmt(monthlyMortgage + avgift)} kr/mån</p>
          </div>
          <div className={`p-3 rounded-lg border ${winner === "Hyra" ? "border-emerald-300 bg-emerald-50" : "border-border"}`}>
            <p className="text-xs text-muted font-medium mb-1">Hyra</p>
            <p className="font-black text-navy text-sm">{fmt(rent)} kr/mån</p>
          </div>
        </div>
        <motion.div key={winner} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-2">
          <p className="text-xs text-muted">Bäst efter {years} år</p>
          <p className="text-lg font-black text-accent">{winner} vinner</p>
        </motion.div>
      </div>
    </div>
  );
}
