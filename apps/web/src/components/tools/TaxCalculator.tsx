"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function TaxCalculator() {
  const [grossSalary, setGrossSalary] = useState(45000);
  const [municipality, setMunicipality] = useState("Stockholm");

  const taxRates: Record<string, number> = {
    "Stockholm": 30.24,
    "Göteborg": 32.32,
    "Malmö": 33.12,
    "Uppsala": 32.59,
    "Linköping": 31.66,
    "Örebro": 32.60,
    "Umeå": 34.25,
    "Lund": 31.44,
  };

  const taxRate = taxRates[municipality] || 30.24;
  const monthlyTax = grossSalary * (taxRate / 100);
  const netSalary = grossSalary - monthlyTax;
  const yearlyGross = grossSalary * 12;
  const yearlyNet = netSalary * 12;
  const employerFee = grossSalary * 0.3142;

  const fmt = (n: number) => Math.round(n).toLocaleString("sv-SE");

  return (
    <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-accent">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
          </svg>
        </div>
        <h3 className="font-black text-navy">Löneberäknare</h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted font-medium">Bruttolön/mån</span>
            <span className="font-bold text-navy">{fmt(grossSalary)} kr</span>
          </div>
          <input
            type="range"
            min={15000}
            max={150000}
            step={1000}
            value={grossSalary}
            onChange={(e) => setGrossSalary(Number(e.target.value))}
            className="w-full accent-accent h-1.5 rounded-full cursor-pointer"
          />
        </div>

        <div>
          <label className="text-sm text-muted font-medium block mb-1.5">Kommun</label>
          <select
            value={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/50 font-medium"
          >
            {Object.keys(taxRates).map((city) => (
              <option key={city} value={city}>{city} ({taxRates[city]}%)</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-border space-y-2.5">
        <motion.div
          key={netSalary}
          initial={{ scale: 0.95, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-between items-center"
        >
          <span className="text-sm text-muted">Nettolön/mån</span>
          <span className="text-xl font-black text-navy">{fmt(netSalary)} kr</span>
        </motion.div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Kommunalskatt</span>
          <span className="font-bold text-red-600">-{fmt(monthlyTax)} kr</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Arbetsgivaravgift</span>
          <span className="font-bold text-muted">{fmt(employerFee)} kr</span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t border-border">
          <span className="text-muted">Årslön netto</span>
          <span className="font-bold">{fmt(yearlyNet)} kr</span>
        </div>
      </div>
    </div>
  );
}
