import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Oswald } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { description, live, siteUrl } from "@/lib/site";
import "./globals.css";

// Oswald is the heading font on their current site, kept so the brand still feels like theirs.
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], weight: ["500", "600"] });
const plexSans = IBM_Plex_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

const title = "Power Recycling · Used auto parts in Calgary, Regina & Fort Macleod";

// Share previews (Messenger, Instagram, iMessage) read openGraph; the image is app/opengraph-image.jpg.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · Power Recycling" },
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Power Recycling", locale: "en_CA", url: "/", title, description },
  twitter: { card: "summary_large_image", title, description },
  robots: live ? { index: true, follow: true } : { index: false, follow: false },
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
