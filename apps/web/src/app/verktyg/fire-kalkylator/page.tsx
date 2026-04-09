import type { Metadata } from "next";
import Link from "next/link";
import FIRECalculator from "@/components/tools/FIRECalculator";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "FIRE-beräknare — FinansRadarn",
  description: "Räkna ut ditt FIRE-tal och hur lång tid det tar att nå ekonomisk frihet.",
};

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-muted hover:text-accent transition font-medium">Hem</Link>
        <span className="text-muted/50">/</span>
        <Link href="/verktyg" className="text-muted hover:text-accent transition font-medium">Verktyg</Link>
        <span className="text-muted/50">/</span>
        <span className="font-semibold text-navy">FIRE-beräknare</span>
      </div>
      <AnimatedSection>
        <h1 className="text-3xl font-black text-navy mb-2">FIRE-beräknare</h1>
        <p className="text-muted mb-8">Räkna ut ditt FIRE-tal och hur lång tid det tar att nå ekonomisk frihet.</p>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <FIRECalculator />
      </AnimatedSection>
    </div>
  );
}
