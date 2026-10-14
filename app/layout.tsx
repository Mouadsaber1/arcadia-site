import type { Metadata, Viewport } from "next";
import "@fontsource/cinzel/400.css";
import "@fontsource/cinzel/500.css";
import "@fontsource-variable/hanken-grotesk/wght.css";
import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700.css";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcadia — Casablanca",
  description: "Arcadia, promoteur immobilier à Casablanca. Trois adresses : Californie, Abdelmoumen, Ghandi. Visite sur rendez-vous.",
};

export const viewport: Viewport = { themeColor: "#2E4A44" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
