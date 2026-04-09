import type { Metadata } from "next";
import Link from "next/link";
import RentVsBuyCalc from "@/components/tools/RentVsBuyCalc";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Hyra vs Köpa — FinansRadarn",
  description: "Jämför kostnaden för att hyra mot att köpa bostad över tid med hänsyn till värdeökning och alternativkostnad.",
};

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
        <span className="text-muted/50">/</span>
        <Link href="/verktyg" className="text-muted hover:text-accent transition font-medium">Verktyg</Link>
        <span className="text-muted/50">/</span>
        <span className="font-semibold text-navy">Hyra vs Köpa</span>
      </div>
      <AnimatedSection>
        <h1 className="text-3xl font-black text-navy mb-2">Hyra vs Köpa</h1>
        <p className="text-muted mb-8">Jämför kostnaden för att hyra mot att köpa bostad över tid med hänsyn till värdeökning och alternativkostnad.</p>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <RentVsBuyCalc />
      </AnimatedSection>
    </div>
  );
}
