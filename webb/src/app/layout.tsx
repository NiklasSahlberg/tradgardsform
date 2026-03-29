import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trädgårdsdesign Stockholm | Fasta priser | Trädgårdsform",
  description:
    "Trädgårdsform erbjuder professionell trädgårdsdesign i Stockholm och Mälardalen. Diplomerad trädgårdsdesigner, fasta priser och kostnadsfria hembesök.",
  keywords:
    "trädgårdsdesign stockholm, trädgårdsplanering, trädgårdsritning, trädgårdsdesigner järfälla",
  openGraph: {
    title: "Trädgårdsdesign Stockholm | Trädgårdsform",
    description:
      "Professionell trädgårdsdesign i Stockholm. Fasta priser, kostnadsfria hembesök och en diplomerad trädgårdsdesigner.",
    url: "https://tradgardsform.se",
    siteName: "Trädgårdsform",
    locale: "sv_SE",
    type: "website",
  },
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Trädgårdsform",
  description:
    "Professionell trädgårdsdesign i Stockholm med fasta priser och kostnadsfria hembesök. Diplomerad trädgårdsdesigner och trädgårdsarkitekt.",
  url: "https://tradgardsform.se",
  telephone: "+46705686509",
  email: "info@tradgardsform.se",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Järfälla",
    addressRegion: "Stockholm",
    addressCountry: "SE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 59.42,
    longitude: 17.83,
  },
  areaServed: ["Stockholm", "Järfälla", "Solna", "Bromma", "Lidingö", "Mälardalen"],
  serviceType: "Trädgårdsdesign",
  priceRange: "4000–45800 SEK",
  openingHours: "Mo-Fr 08:00-17:00",
  sameAs: ["https://www.svenskatradgardsdesigners.se"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
