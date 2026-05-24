"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Category } from "@/lib/types";
import EmailOverlay from "@/components/EmailOverlay";

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
    <header className="sticky top-0 z-50">
      {/* Top bar — dark navy */}
      <div className="bg-navy text-white/70 text-[11px] py-1.5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="uppercase tracking-wider">{new Date().toLocaleDateString("sv-SE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setNewsletterOpen(true)}
              className="hidden sm:inline cursor-pointer hover:text-white transition"
            >
              Prenumerera
            </button>
          </div>
        </div>
      </div>

      {/* Main header — deep navy */}
      <div className="bg-navy border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" aria-label="FinansRadarn — startsida" className="flex items-center group">
            <Image
              src="/finansradarn-logo.svg"
              alt="FinansRadarn"
              width={520}
              height={80}
              priority
              loading="eager"
              fetchPriority="high"
              className="h-10 sm:h-11 w-auto group-hover:opacity-90 transition"
            />
          </Link>

          <div className="flex items-center gap-2">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 hover:bg-white/10 rounded-lg transition text-white/70 hover:text-white"
              aria-label="Sök"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2.5 hover:bg-white/10 rounded-lg transition lg:hidden text-white/70 hover:text-white"
              aria-label="Meny"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="bg-navy-light px-4 py-3 border-b border-white/10">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sök artiklar, ämnen, statistik..."
              className="flex-1 px-4 py-2.5 bg-navy border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm text-white placeholder:text-white/30"
              autoFocus
            />
            <button type="submit" className="px-5 py-2.5 bg-accent text-navy rounded-lg text-sm font-bold hover:bg-accent-hover transition">
              Sök
            </button>
          </form>
        </div>
      )}

      {/* Navigation — dark with gold accents */}
      <nav className="bg-navy-light border-b border-white/10 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex gap-0">
            <li>
              <Link href="/" className="block px-4 py-2.5 text-sm font-medium text-white/70 hover:text-accent hover:bg-white/5 transition">
                Hem
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="block px-4 py-2.5 text-sm font-medium text-white/70 hover:text-accent hover:bg-white/5 transition"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="bg-navy-light lg:hidden border-b border-white/10">
          <ul className="py-2">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm font-medium text-white/70 hover:text-accent hover:bg-white/5">
                Hem
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-3 text-sm font-medium text-white/70 hover:text-accent hover:bg-white/5"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>

    <EmailOverlay autoOpen={false} forceOpen={newsletterOpen} onForceClose={() => setNewsletterOpen(false)} />
    </>
  );
}
