import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jämför — FinansRadarn",
  description: "Jämför bolåneräntor, ISK-konton och andra finansiella produkter.",
};

const comparisons = [
  { name: "Bästa bolåneräntan 2026", href: "/jamfor/bolaneranta", desc: "Jämför räntor från 10 banker — sorterat efter billigast", icon: "🏠" },
  { name: "Bästa ISK-kontot 2026", href: "/jamfor/isk", desc: "Jämför mäklare — avgifter, fondutbud och app-betyg", icon: "💳" },
];

export default function ComparePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
        <span className="text-muted/50">/</span>
        <span className="font-semibold text-navy">Jämför</span>
      </div>

      <AnimatedSection>
        <h1 className="font-serif text-3xl font-bold text-navy mb-2">Jämför finansiella produkter</h1>
        <p className="text-muted mb-8">Hitta bästa bolånet, ISK-kontot och mer — oberoende jämförelser uppdaterade dagligen.</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {comparisons.map((comp, i) => (
          <AnimatedSection key={comp.href} delay={i * 0.1}>
            <Link
              href={comp.href}
              className="group block p-6 bg-white border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-3xl">{comp.icon}</span>
              <h2 className="font-serif text-lg font-bold text-navy mt-3 group-hover:text-accent transition">{comp.name}</h2>
              <p className="text-sm text-muted mt-1">{comp.desc}</p>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
