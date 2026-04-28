"use client";

import { MapPin, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section id="beranda" className="relative min-h-screen flex flex-col justify-center dot-grid-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1 flex flex-col justify-center">
        {/* Trust Badge */}
        <div className="mb-8">
          <span
            className="inline-flex items-center gap-2"
            style={{
              border: "1px solid var(--nd-border-visible)",
              borderRadius: 999,
              padding: "6px 16px",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--nd-accent)" }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "var(--nd-text-secondary)",
                textTransform: "uppercase",
              }}
            >
              BUKA SEJAK 1995
            </span>
          </span>
        </div>

        {/* Headline — Doto / Space Mono fallback */}
        <h1 style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em", lineHeight: 0.95 }}>
          <span
            className="block"
            style={{ fontSize: "clamp(48px, 8vw, 72px)", fontWeight: 700, color: "var(--nd-text-display)" }}
          >
            SPARE PART
          </span>
          <span
            className="block mt-1"
            style={{ fontSize: "clamp(48px, 8vw, 72px)", fontWeight: 700, color: "var(--nd-text-secondary)" }}
          >
            KENDARAAN NIAGA
          </span>
          <span
            className="block mt-1"
            style={{ fontSize: "clamp(48px, 8vw, 72px)", fontWeight: 700, color: "var(--nd-success)" }}
          >
            BANDUNG
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: "var(--nd-text-secondary)",
            maxWidth: 512,
            lineHeight: 1.6,
          }}
        >
          Menyediakan spare part kendaraan niaga berkualitas — truk, bus, dan kendaraan komersial.
          Melayani mekanik, bengkel, dan pemilik armada di seluruh Jawa.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mt-8">
          <a
            href="#produk"
            style={{
              background: "var(--nd-text-display)",
              color: "var(--nd-black)",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "12px 24px",
              minHeight: 44,
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              transition: "opacity 200ms ease-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            LIHAT KATALOG
          </a>
          <a
            href="#tentang"
            style={{
              background: "transparent",
              color: "var(--nd-text-primary)",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "12px 24px",
              minHeight: 44,
              borderRadius: 999,
              border: "1px solid var(--nd-border-visible)",
              display: "inline-flex",
              alignItems: "center",
              transition: "border-color 200ms ease-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--nd-text-secondary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--nd-border-visible)")}
          >
            TENTANG KAMI
          </a>
        </div>

        {/* Bottom Info Strip */}
        <div className="flex flex-wrap gap-6 mt-12">
          <div className="flex items-center gap-2" style={{ color: "var(--nd-text-disabled)" }}>
            <MapPin size={14} strokeWidth={1.5} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Bandung, Jawa Barat
            </span>
          </div>
          <div className="flex items-center gap-2" style={{ color: "var(--nd-text-disabled)" }}>
            <Clock size={14} strokeWidth={1.5} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Senin — Sabtu, 08.00 — 17.00
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
