"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function RetirementCalc() {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [salary, setSalary] = useState(45000);
  const [savings, setSavings] = useState(200000);
  const [monthlySave, setMonthlySave] = useState(5000);
  const [returnRate, setReturnRate] = useState(6);

  const yearsToRetire = Math.max(retireAge - age, 0);
  const months = yearsToRetire * 12;
  const r = returnRate / 100 / 12;
  const futureValue = r > 0
    ? savings * Math.pow(1 + r, months) + monthlySave * ((Math.pow(1 + r, months) - 1) / r)
    : savings + monthlySave * months;

  const monthlyPension = salary * 0.55; // approximate Swedish pension
  const gap = salary - monthlyPension;
  const yearsInRetirement = 90 - retireAge;
  const withdrawalMonthly = futureValue / (yearsInRetirement * 12);

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>
        </div>
        <h3 className="font-black text-navy">Pensionsberäknare</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Din ålder</span>
            <span className="font-bold text-navy">{age} år</span>
          </div>
          <input type="range" min={18} max={64} value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Pensionsålder</span>
            <span className="font-bold text-navy">{retireAge} år</span>
          </div>
          <input type="range" min={55} max={75} value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Månadslön (brutto)</span>
            <span className="font-bold text-navy">{fmt(salary)} kr</span>
          </div>
          <input type="range" min={15000} max={150000} step={1000} value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Sparkapital idag</span>
            <span className="font-bold text-navy">{fmt(savings)} kr</span>
          </div>
          <input type="range" min={0} max={5000000} step={10000} value={savings} onChange={(e) => setSavings(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Månadssparande</span>
            <span className="font-bold text-navy">{fmt(monthlySave)} kr</span>
          </div>
          <input type="range" min={0} max={30000} step={500} value={monthlySave} onChange={(e) => setMonthlySave(Number(e.target.value))} className="w-full accent-accent h-1.5 rounded-full cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        <motion.div key={futureValue} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between items-center">
          <span className="text-sm text-muted">Kapital vid pension</span>
          <span className="text-xl font-black text-navy">{fmt(futureValue)} kr</span>
        </motion.div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Allmän pension (ca 55%)</span>
          <span className="font-bold">{fmt(monthlyPension)} kr/mån</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Pensionsgap</span>
          <span className="font-bold text-red-600">-{fmt(gap)} kr/mån</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Eget uttag (till 90 år)</span>
          <span className="font-bold text-emerald-600">+{fmt(withdrawalMonthly)} kr/mån</span>
        </div>
      </div>
    </div>
  );
}
