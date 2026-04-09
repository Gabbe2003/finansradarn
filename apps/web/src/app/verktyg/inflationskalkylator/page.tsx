import type { Metadata } from "next";
import Link from "next/link";
import InflationCalculator from "@/components/tools/InflationCalculator";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Inflationsberäknare — FinansRadarn",
  description: "Se hur inflationen urholkar dina pengars köpkraft över tid.",
};

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
        <span className="text-muted/50">/</span>
        <Link href="/#verktyg" className="text-muted hover:text-accent transition font-medium">Verktyg</Link>
        <span className="text-muted/50">/</span>
        <span className="font-semibold text-navy">Inflationsberäknare</span>
      </div>
      <AnimatedSection>
        <h1 className="text-3xl font-black text-navy mb-2">Inflationsberäknare</h1>
        <p className="text-muted mb-8">Vad är dina pengar värda om 5, 10 eller 20 år? Räkna ut köpkraftsförlusten baserat på aktuell eller historisk inflation.</p>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <InflationCalculator />
      </AnimatedSection>
    </div>
  );
}
