"use client";

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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import TradingViewMiniChart from "@/components/TradingViewMiniChart";

const chartsByCategory: Record<string, () => React.ReactNode> = {
  penningpolitik: PenningpolitikChart,
  arbetsmarknad: ArbetsmarknadChart,
  finansmarknader: FinansmarknadChart,
  makroekonomi: MakroekonomiChart,
  statistik: StatistikChart,
  "handel-export": HandelChart,
  bostadsmarknad: BostadsmarknadChart,
  konjunktur: KonjunkturChart,
};

export default function ArticleCharts({ categorySlug }: { categorySlug: string }) {
  const ChartFn = chartsByCategory[categorySlug];
  if (!ChartFn) return null;
  return <>{ChartFn()}</>;
}

function PenningpolitikChart() {
  const data = [
    { date: "2024", Riksbanken: 4.0, ECB: 4.5, Fed: 5.5 },
    { date: "Jun 24", Riksbanken: 3.75, ECB: 4.25, Fed: 5.5 },
    { date: "Sep 24", Riksbanken: 3.50, ECB: 3.65, Fed: 5.0 },
    { date: "Dec 24", Riksbanken: 3.50, ECB: 3.15, Fed: 4.5 },
    { date: "Mar 25", Riksbanken: 3.50, ECB: 2.90, Fed: 4.25 },
    { date: "Sep 25", Riksbanken: 3.50, ECB: 2.50, Fed: 4.0 },
    { date: "Apr 26", Riksbanken: 3.75, ECB: 2.50, Fed: 3.75 },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted">Styrräntor globalt — jämförelse</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
          <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" unit="%" domain={[2, 6]} />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} formatter={(v) => [`${v}%`]} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="stepAfter" dataKey="Riksbanken" stroke="#1D4ED8" strokeWidth={2.5} dot={{ r: 4 }} animationDuration={1500} />
          <Line type="stepAfter" dataKey="ECB" stroke="#D97706" strokeWidth={2} dot={{ r: 3 }} animationDuration={1500} animationBegin={200} />
          <Line type="stepAfter" dataKey="Fed" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} animationDuration={1500} animationBegin={400} />
        </LineChart>
      </ResponsiveContainer>
      <div className="pt-2">
        <TradingViewMiniChart symbol="FX:EURSEK" height={180} />
      </div>
    </div>
  );
}

function ArbetsmarknadChart() {
  const data = [
    { sector: "IT & Teknik", jobb: 18000 },
    { sector: "Sjukvård", jobb: 14000 },
    { sector: "Bygg", jobb: 12000 },
    { sector: "Utbildning", jobb: 9000 },
    { sector: "Transport", jobb: 6000 },
    { sector: "Handel", jobb: 4000 },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted">Sysselsättningsökning per sektor (antal)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis type="number" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
          <YAxis type="category" dataKey="sector" tick={{ fontSize: 11 }} stroke="#9CA3AF" width={90} />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} formatter={(v) => [Number(v).toLocaleString("sv-SE"), "Nya jobb"]} />
          <Bar dataKey="jobb" fill="#D97706" radius={[0, 4, 4, 0]} animationDuration={1500} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function FinansmarknadChart() {
  const data = [
    { month: "Jan", OMXS30: 2520, SP500: 5800 },
    { month: "Feb", OMXS30: 2580, SP500: 5900 },
    { month: "Mar", OMXS30: 2620, SP500: 5950 },
    { month: "Apr", OMXS30: 2650, SP500: 6020 },
    { month: "Maj", OMXS30: 2600, SP500: 5980 },
    { month: "Jun", OMXS30: 2680, SP500: 6050 },
    { month: "Jul", OMXS30: 2710, SP500: 6100 },
    { month: "Aug", OMXS30: 2690, SP500: 6080 },
    { month: "Sep", OMXS30: 2730, SP500: 6150 },
    { month: "Okt", OMXS30: 2750, SP500: 6180 },
    { month: "Nov", OMXS30: 2780, SP500: 6210 },
    { month: "Dec", OMXS30: 2812, SP500: 6247 },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted">OMXS30-utveckling 2026</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="omxGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#059669" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
          <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" domain={[2400, 2900]} />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
          <Area type="monotone" dataKey="OMXS30" stroke="#059669" strokeWidth={2.5} fill="url(#omxGrad)" animationDuration={1500} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function MakroekonomiChart() {
  const data = [
    { quarter: "Q1 24", Konsumtion: -0.1, Investeringar: -0.3, Export: 0.2 },
    { quarter: "Q2 24", Konsumtion: 0.1, Investeringar: -0.1, Export: 0.1 },
    { quarter: "Q3 24", Konsumtion: 0.2, Investeringar: 0.0, Export: 0.1 },
    { quarter: "Q4 24", Konsumtion: 0.2, Investeringar: 0.1, Export: 0.1 },
    { quarter: "Q1 25", Konsumtion: 0.3, Investeringar: 0.1, Export: 0.1 },
    { quarter: "Q2 25", Konsumtion: 0.2, Investeringar: 0.0, Export: 0.1 },
    { quarter: "Q3 25", Konsumtion: 0.3, Investeringar: 0.2, Export: 0.1 },
    { quarter: "Q4 25", Konsumtion: 0.2, Investeringar: 0.2, Export: 0.1 },
    { quarter: "Q1 26", Konsumtion: 0.4, Investeringar: 0.3, Export: 0.2 },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted">BNP-bidrag per komponent (procentenheter)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="quarter" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
          <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" unit="pe" />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} formatter={(v) => [`${v} pe`]} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="Konsumtion" stackId="a" fill="#1D4ED8" radius={[0, 0, 0, 0]} animationDuration={1200} />
          <Bar dataKey="Investeringar" stackId="a" fill="#7C3AED" animationDuration={1200} animationBegin={200} />
          <Bar dataKey="Export" stackId="a" fill="#059669" radius={[4, 4, 0, 0]} animationDuration={1200} animationBegin={400} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function StatistikChart() {
  const pieData = [
    { name: "Tjänster", value: 2.1, color: "#1D4ED8" },
    { name: "Livsmedel", value: 0.9, color: "#059669" },
    { name: "Boende", value: 0.7, color: "#D97706" },
    { name: "Transport", value: 0.3, color: "#7C3AED" },
    { name: "Övrigt", value: 0.1, color: "#6B7280" },
  ];

  const lineData = [
    { month: "Okt 25", KPIF: 3.4, TRIM85: 3.6 },
    { month: "Nov 25", KPIF: 3.6, TRIM85: 3.7 },
    { month: "Dec 25", KPIF: 3.5, TRIM85: 3.6 },
    { month: "Jan 26", KPIF: 3.7, TRIM85: 3.8 },
    { month: "Feb 26", KPIF: 3.9, TRIM85: 3.9 },
    { month: "Mar 26", KPIF: 4.1, TRIM85: 3.9 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border p-5 space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted">KPIF-bidrag per varugrupp (procentenheter)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} innerRadius={50} dataKey="value" label={({ name, value }) => `${name}: ${value}`} animationDuration={1500}>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} formatter={(v) => [`${v} pe`]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-card rounded-xl border border-border p-5 space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted">KPIF vs TRIM85 — underliggande inflation</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
            <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" unit="%" domain={[3, 4.5]} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} formatter={(v) => [`${v}%`]} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="KPIF" stroke="#DC2626" strokeWidth={2.5} dot={{ r: 4 }} animationDuration={1500} />
            <Line type="monotone" dataKey="TRIM85" stroke="#7C3AED" strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3 }} animationDuration={1500} animationBegin={300} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function HandelChart() {
  const data = [
    { vara: "Fordon", export: 31.2 },
    { vara: "Läkemedel", export: 22.7 },
    { vara: "Maskiner", export: 19.8 },
    { vara: "Papper", export: 14.3 },
    { vara: "Järn & Stål", export: 11.9 },
    { vara: "Elektronik", export: 9.4 },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted">Varuexport mars 2026 (mdr SEK)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="vara" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
          <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" unit=" mdr" />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} formatter={(v) => [`${v} mdr kr`]} />
          <Bar dataKey="export" fill="#0891B2" radius={[4, 4, 0, 0]} animationDuration={1500} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function BostadsmarknadChart() {
  const data = [
    { month: "Jul 25", BRF: -0.5, Villa: -0.3 },
    { month: "Aug 25", BRF: -0.2, Villa: -0.1 },
    { month: "Sep 25", BRF: 0.1, Villa: 0.0 },
    { month: "Okt 25", BRF: 0.3, Villa: 0.2 },
    { month: "Nov 25", BRF: 0.2, Villa: 0.1 },
    { month: "Dec 25", BRF: 0.5, Villa: 0.3 },
    { month: "Jan 26", BRF: 0.8, Villa: 0.5 },
    { month: "Feb 26", BRF: 1.0, Villa: 0.6 },
    { month: "Mar 26", BRF: 1.3, Villa: 0.8 },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted">Bostadsprisutveckling, månadsförändring (%)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="brfGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#DB2777" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#DB2777" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
          <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" unit="%" />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} formatter={(v) => [`${v}%`]} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="BRF" name="Bostadsrätt" stroke="#DB2777" strokeWidth={2.5} fill="url(#brfGrad)" animationDuration={1500} />
          <Line type="monotone" dataKey="Villa" stroke="#4F46E5" strokeWidth={2} dot={{ r: 3 }} animationDuration={1500} animationBegin={300} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function KonjunkturChart() {
  const data = [
    { month: "Jul 25", Barometer: 96.2 },
    { month: "Aug 25", Barometer: 97.5 },
    { month: "Sep 25", Barometer: 98.8 },
    { month: "Okt 25", Barometer: 100.1 },
    { month: "Nov 25", Barometer: 101.4 },
    { month: "Dec 25", Barometer: 101.9 },
    { month: "Jan 26", Barometer: 102.3 },
    { month: "Feb 26", Barometer: 102.8 },
    { month: "Mar 26", Barometer: 103.7 },
    { month: "Apr 26", Barometer: 108.3 },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted">KI-barometerindikatorn (normalt = 100)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="kiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
          <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" domain={[94, 110]} />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
          {/* Reference line for normal = 100 */}
          <Area type="monotone" dataKey="Barometer" stroke="#4F46E5" strokeWidth={2.5} fill="url(#kiGrad)" animationDuration={1500} />
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted text-center">Värden över 100 indikerar starkare konjunktur än normalt</p>
    </div>
  );
}
