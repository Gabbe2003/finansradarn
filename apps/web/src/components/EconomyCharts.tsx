"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const inflationData = [
  { month: "Apr 25", KPIF: 2.3, KPI: 3.1, Mål: 2.0 },
  { month: "Maj 25", KPIF: 2.5, KPI: 3.3, Mål: 2.0 },
  { month: "Jun 25", KPIF: 2.8, KPI: 3.5, Mål: 2.0 },
  { month: "Jul 25", KPIF: 3.0, KPI: 3.7, Mål: 2.0 },
  { month: "Aug 25", KPIF: 3.2, KPI: 3.9, Mål: 2.0 },
  { month: "Sep 25", KPIF: 3.1, KPI: 3.8, Mål: 2.0 },
  { month: "Okt 25", KPIF: 3.4, KPI: 4.1, Mål: 2.0 },
  { month: "Nov 25", KPIF: 3.6, KPI: 4.3, Mål: 2.0 },
  { month: "Dec 25", KPIF: 3.5, KPI: 4.2, Mål: 2.0 },
  { month: "Jan 26", KPIF: 3.7, KPI: 4.4, Mål: 2.0 },
  { month: "Feb 26", KPIF: 3.9, KPI: 4.6, Mål: 2.0 },
  { month: "Mar 26", KPIF: 4.1, KPI: 4.8, Mål: 2.0 },
];

const gdpData = [
  { quarter: "Q1 24", BNP: -0.2 },
  { quarter: "Q2 24", BNP: 0.1 },
  { quarter: "Q3 24", BNP: 0.3 },
  { quarter: "Q4 24", BNP: 0.4 },
  { quarter: "Q1 25", BNP: 0.5 },
  { quarter: "Q2 25", BNP: 0.3 },
  { quarter: "Q3 25", BNP: 0.6 },
  { quarter: "Q4 25", BNP: 0.5 },
  { quarter: "Q1 26", BNP: 0.8 },
];

const rateData = [
  { date: "Jun 24", Riksbanken: 3.75, ECB: 4.25 },
  { date: "Sep 24", Riksbanken: 3.50, ECB: 3.65 },
  { date: "Dec 24", Riksbanken: 3.50, ECB: 3.15 },
  { date: "Mar 25", Riksbanken: 3.50, ECB: 2.90 },
  { date: "Jun 25", Riksbanken: 3.50, ECB: 2.65 },
  { date: "Sep 25", Riksbanken: 3.50, ECB: 2.50 },
  { date: "Dec 25", Riksbanken: 3.50, ECB: 2.50 },
  { date: "Mar 26", Riksbanken: 3.50, ECB: 2.50 },
  { date: "Apr 26", Riksbanken: 3.75, ECB: 2.50 },
];

const unemploymentData = [
  { month: "Jul 25", rate: 7.2 },
  { month: "Aug 25", rate: 7.0 },
  { month: "Sep 25", rate: 6.8 },
  { month: "Okt 25", rate: 6.7 },
  { month: "Nov 25", rate: 6.5 },
  { month: "Dec 25", rate: 6.4 },
  { month: "Jan 26", rate: 6.3 },
  { month: "Feb 26", rate: 6.2 },
  { month: "Mar 26", rate: 5.8 },
];

function ChartWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-xl border border-border p-5 hover:shadow-lg transition-shadow duration-300"
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}

export function InflationChart() {
  return (
    <ChartWrapper title="Inflation (KPIF vs KPI), senaste 12 mån">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={inflationData}>
          <defs>
            <linearGradient id="kpifGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="kpiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
          <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" domain={[0, 6]} unit="%" />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }}
            formatter={(value) => [`${value}%`]}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="KPIF" stroke="#1D4ED8" strokeWidth={2.5} fill="url(#kpifGrad)" />
          <Area type="monotone" dataKey="KPI" stroke="#DC2626" strokeWidth={2} fill="url(#kpiGrad)" />
          <Line type="monotone" dataKey="Mål" stroke="#059669" strokeWidth={2} strokeDasharray="6 4" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export function GDPChart() {
  return (
    <ChartWrapper title="BNP-tillväxt, kvartalsförändring (%)">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={gdpData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="quarter" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
          <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" unit="%" />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }}
            formatter={(value) => [`${value}%`, "BNP"]}
          />
          <Bar
            dataKey="BNP"
            radius={[4, 4, 0, 0]}
            fill="#1D4ED8"
            animationDuration={1500}
            animationBegin={300}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export function RateChart() {
  return (
    <ChartWrapper title="Styrräntor: Riksbanken vs ECB">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={rateData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
          <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" unit="%" domain={[2, 5]} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }}
            formatter={(value) => [`${value}%`]}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="stepAfter"
            dataKey="Riksbanken"
            stroke="#1D4ED8"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#1D4ED8" }}
            animationDuration={1500}
          />
          <Line
            type="stepAfter"
            dataKey="ECB"
            stroke="#D97706"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#D97706" }}
            animationDuration={1500}
            animationBegin={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export function UnemploymentChart() {
  return (
    <ChartWrapper title="Arbetslöshet (%), säsongsrensat">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={unemploymentData}>
          <defs>
            <linearGradient id="unempGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D97706" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
          <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" unit="%" domain={[5, 8]} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }}
            formatter={(value) => [`${value}%`, "Arbetslöshet"]}
          />
          <Area
            type="monotone"
            dataKey="rate"
            name="Arbetslöshet"
            stroke="#D97706"
            strokeWidth={2.5}
            fill="url(#unempGrad)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
