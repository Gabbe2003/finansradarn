import type { Metadata } from "next";
import Link from "next/link";
import SavingsCalculator from "@/components/tools/SavingsCalculator";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Sparandeberäknare — FinansRadarn",
  description: "Se hur ditt sparande växer med ränta-på-ränta-effekten över tid.",
};

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
        <span className="text-muted/50">/</span>
        <Link href="/#verktyg" className="text-muted hover:text-accent transition font-medium">Verktyg</Link>
        <span className="text-muted/50">/</span>
        <span className="font-semibold text-navy">Sparandeberäknare</span>
      </div>
      <AnimatedSection>
        <h1 className="text-3xl font-black text-navy mb-2">Sparandeberäknare</h1>
        <p className="text-muted mb-8">Beräkna hur ditt sparande utvecklas med ränta-på-ränta-effekten. Ange startbelopp, månadssparande och förväntad avkastning.</p>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <SavingsCalculator />
      </AnimatedSection>
    </div>
  );
}
