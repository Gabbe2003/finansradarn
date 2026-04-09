"use client";

export default function NewsletterBanner() {
  return (
    <section className="bg-navy">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-black text-white mb-1">Morgonbrevet</h2>
          <p className="text-white/50 text-sm">Ekonomiska nyheter, marknadsdata och statistik — varje morgon kl 07:00.</p>
        </div>
        <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Din e-postadress"
            className="flex-1 md:w-72 px-4 py-2.5 bg-navy-light border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <button className="px-6 py-2.5 bg-accent text-navy rounded-lg text-sm font-black hover:bg-accent-hover transition shrink-0">
            Prenumerera
          </button>
        </form>
      </div>
    </section>
  );
}
