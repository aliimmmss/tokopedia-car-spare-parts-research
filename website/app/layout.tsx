import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxor Automotive — Spare Part Kendaraan Niaga Bandung",
  description:
    "Toko spare part kendaraan niaga terpercaya di Bandung sejak 1995. Menyediakan spare part truk, bus, dan kendaraan komersial dari brand terpercaya.",
  keywords: [
    "spare part kendaraan niaga",
    "spare part truk Bandung",
    "spare part bus",
    "suku cadang truk Hino",
    "suku cadang Isuzu",
    "spare part Mitsubishi Fuso",
    "bengkel truk Bandung",
    "toko spare part komersial",
  ],
  openGraph: {
    title: "Luxor Automotive — Spare Part Kendaraan Niaga Bandung",
    description:
      "Toko spare part kendaraan niaga terpercaya di Bandung sejak 1995. Melayani mekanik, bengkel, dan pemilik armada.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Doto:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
