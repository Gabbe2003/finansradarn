import type { Metadata } from "next";
import Link from "next/link";
import MortgageCalculator from "@/components/tools/MortgageCalculator";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Bolåneberäknare — FinansRadarn",
  description: "Beräkna din månadskostnad, total räntekostnad och amortering för ditt bolån.",
};

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
        <span className="text-muted/50">/</span>
        <Link href="/#verktyg" className="text-muted hover:text-accent transition font-medium">Verktyg</Link>
        <span className="text-muted/50">/</span>
        <span className="font-semibold text-navy">Bolåneberäknare</span>
      </div>
      <AnimatedSection>
        <h1 className="text-3xl font-black text-navy mb-2">Bolåneberäknare</h1>
        <p className="text-muted mb-8">Räkna ut din månadskostnad baserat på lånebelopp, ränta och löptid. Jämför olika scenarion för att hitta den bästa lösningen.</p>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <MortgageCalculator />
      </AnimatedSection>
    </div>
  );
}
