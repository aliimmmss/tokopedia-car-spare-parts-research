import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxor Automotive — Spare Part Kendaraan Niaga Bandung",
  description:
    "Toko spare part kendaraan niaga di Bandung sejak 1995. Menyediakan komponen truk, bus, dan kendaraan komersial dari brand terpercaya: Isuzu, Mitsubishi, Hino, Toyota, Suzuki.",
  keywords: [
    "spare part truk bandung",
    "spare part kendaraan niaga",
    "spare part bus bandung",
    "onderdil truk",
    "komponen kendaraan komersial",
    "bengkel truk bandung",
    "rack end",
    "tie rod end",
    "brake master",
    "packing cylinder head",
    "Luxor Automotive",
  ],
  openGraph: {
    title: "Luxor Automotive — Spare Part Kendaraan Niaga Bandung",
    description:
      "Toko spare part kendaraan niaga terpercaya sejak 1995. Truk, bus, kendaraan komersial.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <body className="bg-[#000000] text-white antialiased">{children}</body>
    </html>
  );
}
