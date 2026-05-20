"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  url: string;
  title: string;
};

export default function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const encUrl = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);

  const open = (target: string) => {
    if (typeof window === "undefined") return;
    window.open(target, "_blank", "noopener,noreferrer,width=640,height=560");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for very old browsers — use a temporary input
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }
  };

  const buttons = [
    {
      key: "x",
      label: "Dela på X",
      hover: "hover:bg-black hover:text-white hover:border-black",
      onClick: () =>
        open(`https://twitter.com/intent/tweet?url=${encUrl}&text=${encTitle}`),
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      key: "linkedin",
      label: "Dela på LinkedIn",
      hover: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
      onClick: () =>
        open(`https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`),
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      key: "facebook",
      label: "Dela på Facebook",
      hover: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
      onClick: () =>
        open(`https://www.facebook.com/sharer/sharer.php?u=${encUrl}`),
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-bold uppercase tracking-widest text-muted mr-1">
        Dela:
      </span>
      {buttons.map((b) => (
        <button
          key={b.key}
          type="button"
          onClick={b.onClick}
          aria-label={b.label}
          title={b.label}
          className={`p-2.5 rounded-lg border border-border bg-white text-muted transition-all duration-200 cursor-pointer ${b.hover} hover:shadow-md hover:-translate-y-0.5`}
        >
          {b.svg}
        </button>
      ))}

      {/* Copy link */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Kopiera länk"
        title="Kopiera länk"
        className="relative p-2.5 rounded-lg border border-border bg-white text-muted hover:bg-accent hover:text-white hover:border-accent hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold bg-navy text-white px-2 py-1 rounded-md shadow-lg"
            >
              Länk kopierad
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-navy" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
