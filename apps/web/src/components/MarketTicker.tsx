"use client";

import { motion } from "framer-motion";

const marketData = [
  { name: "OMXS30", value: "2 812,4", change: "+1,8%", up: true },
  { name: "EUR/SEK", value: "11,52", change: "+0,6%", up: true },
  { name: "USD/SEK", value: "10,38", change: "+0,3%", up: true },
  { name: "Ericsson B", value: "82,40", change: "+4,3%", up: true },
  { name: "Volvo B", value: "278,50", change: "+2,4%", up: true },
  { name: "Hexagon B", value: "134,20", change: "+7,2%", up: true },
  { name: "Evolution", value: "1 245", change: "+5,8%", up: true },
  { name: "Statsobl. 10Y", value: "2,87%", change: "+4bp", up: false },
  { name: "Guld", value: "$2 342", change: "+0,4%", up: true },
  { name: "Brent Olja", value: "$84,20", change: "-1,2%", up: false },
];

export default function MarketTicker() {
  return (
    <div className="bg-navy-light border-b border-white/5 overflow-hidden py-2.5">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: [0, -1800] }}
        transition={{
          x: {
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {[...marketData, ...marketData].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="text-white/40 font-medium text-xs uppercase tracking-wider">{item.name}</span>
            <span className="font-semibold text-white">{item.value}</span>
            <span className={`text-xs font-bold ${item.up ? "text-emerald-400" : "text-red-400"}`}>
              {item.up ? "▲" : "▼"} {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
