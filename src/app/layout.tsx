import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Instrument_Sans, Spectral } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

// Fonts are downloaded at build time and served from this site, so pages make no third-party requests.
const sans = Instrument_Sans({ variable: "--font-sans", subsets: ["latin"] });
const serif = Spectral({ variable: "--font-serif", subsets: ["latin"], weight: ["300", "400"], style: ["normal", "italic"] });
const mono = Fragment_Mono({ variable: "--font-mono", subsets: ["latin"], weight: "400" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quiet-suppression.vercel.app";
const DESCRIPTION = "Collusion and watchdog capture in AI grievance pipelines. A companion site to the Apart Research AI Collusion Research Sprint report.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Quiet Suppression", template: "%s · Quiet Suppression" },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    title: "Quiet Suppression",
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Quiet Suppression: collusion and watchdog capture in AI grievance pipelines" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = { themeColor: "#0b1224", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
