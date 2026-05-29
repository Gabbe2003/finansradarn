import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Serif } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmailOverlay from "@/components/EmailOverlay";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import { fetchCategories } from "@/lib/content";
import { fetchAds } from "@/lib/ads/client";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://finansradarn.se").replace(/\/+$/, "");
const SITE_NAME = "FinansRadarn";
const SITE_DESCRIPTION = "Din finansradar. Nyheter, analys och verktyg för din ekonomi.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Din finansradar`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/finansradarn-favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/finansradarn-favicon.svg",
    apple: "/finansradarn-favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Din finansradar`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Din finansradar`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/finansradarn-logo.svg`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "sv-SE",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, headerAdsResponse] = await Promise.all([
    fetchCategories(),
    fetchAds("header"),
  ]);
  const headerAds = headerAdsResponse?.ads ?? [];
  const headerAdsMode = headerAdsResponse?.display_mode ?? "queue";
  return (
    <html
      lang="sv"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Suspense fallback={null}>
          <BreakingNewsBar />
        </Suspense>
        <Header categories={categories} headerAds={headerAds} headerAdsMode={headerAdsMode} />
        <main className="flex-1">{children}</main>
        <Footer categories={categories} />
        <EmailOverlay />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
