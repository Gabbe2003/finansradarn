"use client";

import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";

interface FooterProps {
  categories: Category[];
}

export default function Footer({ categories }: FooterProps) {
  return (
    <footer className="bg-navy text-white mt-auto">
      {/* Gold divider */}
      <div className="h-1 bg-linear-to-r from-transparent via-accent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" aria-label="FinansRadarn — startsida" className="inline-flex mb-4">
              <Image
                src="/finansradarn-logo.svg"
                alt="FinansRadarn"
                width={520}
                height={80}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Din finansradar. Nyheter, analys och verktyg för din ekonomi.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4 text-xs uppercase tracking-widest text-accent">Kategorier</h3>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="text-white/50 hover:text-accent text-sm transition">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories */}
          <div>
            <h3 className="font-bold mb-4 text-xs uppercase tracking-widest text-accent">Mer</h3>
            <ul className="space-y-2">
              {categories.slice(5).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="text-white/50 hover:text-accent text-sm transition">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/search" className="text-white/50 hover:text-accent text-sm transition">
                  Sök
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold mb-4 text-xs uppercase tracking-widest text-accent">Nyhetsbrev</h3>
            <p className="text-white/40 text-sm mb-3">Få de senaste ekonomiska analyserna direkt i din inkorg.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="din@epost.se"
                className="flex-1 px-3 py-2 bg-navy-light border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button className="px-4 py-2 bg-accent text-navy rounded-lg text-sm font-bold hover:bg-accent-hover transition">
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} FinansRadarn. Alla rättigheter förbehållna.</p>
          <div className="flex gap-4 text-white/30 text-xs">
            <span className="hover:text-accent cursor-pointer transition">Integritetspolicy</span>
            <span className="hover:text-accent cursor-pointer transition">Användarvillkor</span>
            <span className="hover:text-accent cursor-pointer transition">Kontakt</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
