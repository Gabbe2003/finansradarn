import type { Metadata } from "next";
import Link from "next/link";
import CompoundInterestCalc from "@/components/tools/CompoundInterestCalc";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Ränta-på-ränta-beräknare — FinansRadarn",
  description: "Se hur ditt kapital växer exponentiellt med ränta-på-ränta-effekten. Välj ränteperiod och tidshorisont.",
};

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
        <span className="text-muted/50">/</span>
        <Link href="/verktyg" className="text-muted hover:text-accent transition font-medium">Verktyg</Link>
        <span className="text-muted/50">/</span>
        <span className="font-semibold text-navy">Ränta-på-ränta-beräknare</span>
      </div>
      <AnimatedSection>
        <h1 className="text-3xl font-black text-navy mb-2">Ränta-på-ränta-beräknare</h1>
        <p className="text-muted mb-8">Se hur ditt kapital växer exponentiellt med ränta-på-ränta-effekten. Välj ränteperiod och tidshorisont.</p>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <CompoundInterestCalc />
      </AnimatedSection>
    </div>
  );
}
