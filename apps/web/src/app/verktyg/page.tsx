import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Ekonomiska verktyg — FinansRadarn",
  description: "Alla ekonomiska beräkningsverktyg samlade. Bolån, sparande, pension, skatt och mycket mer.",
};

const allTools = [
  { name: "Bolåneberäknare", href: "/verktyg/bolanekalkylator", desc: "Räkna ut månadskostnad och total räntekostnad", icon: "🏠" },
  { name: "Sparandeberäknare", href: "/verktyg/sparandekalkylator", desc: "Se hur ditt sparande växer med ränta-på-ränta", icon: "📈" },
  { name: "Inflationsberäknare", href: "/verktyg/inflationskalkylator", desc: "Köpkraft över tid med aktuell inflation", icon: "💰" },
  { name: "Löneberäknare", href: "/verktyg/lonekalkylator", desc: "Nettolön efter kommunalskatt", icon: "🧮" },
  { name: "Ränta-på-ränta", href: "/verktyg/ranta-pa-ranta", desc: "Exponentiell tillväxt och 72-regeln", icon: "🔄" },
  { name: "Pensionsberäknare", href: "/verktyg/pensionskalkylator", desc: "Pensionskapital och pensionsgap", icon: "☀️" },
  { name: "ISK-skatteberäknare", href: "/verktyg/isk-skatt", desc: "Schablonsskatt vs kapitalskatt", icon: "💳" },
  { name: "Skuldavbetalning", href: "/verktyg/skuldavbetalning", desc: "Tid och kostnad till skuldfrihet", icon: "⬅️" },
  { name: "ROI-beräknare", href: "/verktyg/roi-beraknare", desc: "Total ROI och årlig CAGR", icon: "📊" },
  { name: "Utdelningsberäknare", href: "/verktyg/utdelningskalkylator", desc: "Framtida utdelningsinkomst", icon: "💵" },
  { name: "FIRE-beräknare", href: "/verktyg/fire-kalkylator", desc: "Ekonomisk frihet — tid till FIRE", icon: "🔥" },
  { name: "Hyra vs Köpa", href: "/verktyg/hyra-vs-kopa", desc: "Jämför boendekostnad över tid", icon: "⚖️" },
  { name: "Fondavgiftsberäknare", href: "/verktyg/fondavgifter", desc: "Avgifternas påverkan på avkastning", icon: "🥧" },
  { name: "Budgetplanerare", href: "/verktyg/budget", desc: "Planera din månadsbudget", icon: "📋" },
  { name: "Break-even", href: "/verktyg/break-even", desc: "Antal enheter till lönsamhet", icon: "📉" },
];

export default function ToolsIndex() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <AnimatedSection>
        <h1 className="text-3xl font-black text-navy mb-2">Ekonomiska verktyg</h1>
        <p className="text-muted mb-8">Alla beräkningsverktyg samlade. Välj ett verktyg nedan för att komma igång.</p>
      </AnimatedSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allTools.map((tool, i) => (
          <AnimatedSection key={tool.href} delay={i * 0.04}>
            <Link
              href={tool.href}
              className="group block p-5 bg-white rounded-xl border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tool.icon}</span>
                <div>
                  <p className="font-bold text-navy group-hover:text-accent transition">{tool.name}</p>
                  <p className="text-xs text-muted mt-1">{tool.desc}</p>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
