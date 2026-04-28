import { MapPin, Clock, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section id="beranda" className="relative min-h-screen flex flex-col justify-center dot-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1 flex flex-col justify-center">
        {/* Trust Badge */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 border border-[#222222] px-4 py-1.5 text-xs tracking-[0.15em] text-[#888888] uppercase">
            <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse" />
            Buka Sejak 1995
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-[var(--font-heading)] tracking-[-0.02em] leading-[0.95]">
          <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold">Spare Part</span>
          <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold mt-1">Kendaraan Niaga</span>
          <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold mt-1 text-[#25D366]">Bandung</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-[#888888] text-base sm:text-lg max-w-xl leading-relaxed">
          Menyediakan spare part kendaraan niaga berkualitas — truk, bus, dan kendaraan komersial.
          Melayani mekanik, bengkel, dan pemilik armoda di seluruh Jawa.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mt-8">
          <a
            href="#produk"
            className="bg-white text-black px-6 py-3 text-sm font-medium hover:bg-[#E0E0E0] transition-colors"
          >
            Lihat Katalog
          </a>
          <a
            href="#tentang"
            className="border border-[#222222] text-white px-6 py-3 text-sm font-medium hover:border-[#444444] transition-colors"
          >
            Tentang Kami
          </a>
        </div>

        {/* Info Strip */}
        <div className="flex flex-wrap gap-6 mt-12 text-xs text-[#666666]">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#888888]" />
            Bandung, Jawa Barat
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-[#888888]" />
            Senin — Sabtu, 08.00 — 17.00
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] text-[#444444] uppercase">Scroll</span>
        <div
          className="w-[1px] h-8"
          style={{ background: "linear-gradient(to bottom, #444444, transparent)" }}
        />
      </div>
    </section>
  );
}
