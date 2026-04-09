import type { Metadata } from "next";
import Link from "next/link";
import FundFeeCalc from "@/components/tools/FundFeeCalc";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Fondavgiftsberäknare — FinansRadarn",
  description: "Se hur mycket fondavgifter kostar dig över tid och hur mycket du sparar med en billigare fond.",
};

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
        <span className="text-muted/50">/</span>
        <Link href="/verktyg" className="text-muted hover:text-accent transition font-medium">Verktyg</Link>
        <span className="text-muted/50">/</span>
        <span className="font-semibold text-navy">Fondavgiftsberäknare</span>
      </div>
      <AnimatedSection>
        <h1 className="text-3xl font-black text-navy mb-2">Fondavgiftsberäknare</h1>
        <p className="text-muted mb-8">Se hur mycket fondavgifter kostar dig över tid och hur mycket du sparar med en billigare fond.</p>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <FundFeeCalc />
      </AnimatedSection>
    </div>
  );
}
