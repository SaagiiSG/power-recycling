import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Oswald } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// Oswald is the heading font on their current site, kept so the brand still feels like theirs.
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], weight: ["500", "600"] });
const plexSans = IBM_Plex_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Power Recycling · Used, new and aftermarket auto parts",
  description:
    "Quality used, new and aftermarket auto parts from three yards in Calgary, Regina and Fort Macleod. Search the inventory online or request a part.",
  // Demo until the owner says yes: keep it out of Google.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${oswald.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
