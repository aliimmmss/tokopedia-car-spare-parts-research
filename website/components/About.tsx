"use client";

import { Shield, Truck, Award, Wrench, MapPin, Clock, CreditCard } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Kualitas Terjamin",
    desc: "Semua spare part dari brand resmi dan OEM terpercaya. Garansi pengembalian jika ada cacat produksi.",
  },
  {
    icon: Truck,
    title: "Pengiriman Seluruh Jawa",
    desc: "Kirim ke seluruh Jawa dengan JNE, SiCepat, dan kargo. Lead time 1-3 hari kerja tergantung lokasi.",
  },
  {
    icon: Award,
    title: "30 Tahun Pengalaman",
    desc: "Melayani mekanik dan bengkel sejak 1995. Pengetahuan mendalam tentang spare part kendaraan niaga.",
  },
  {
    icon: Wrench,
    title: "Konsultasi Teknis",
    desc: "Tim kami bisa membantu Anda memilih part yang tepat untuk kendaraan spesifik Anda.",
  },
];

const infoStrip = [
  {
    icon: MapPin,
    label: "Lokasi",
    value: "Jl. Kebon Jati Jl. Dulatip No.22/2, Kec. Andir, Bandung 40181",
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: "Senin — Sabtu, 09.00 — 17.00",
  },
  {
    icon: CreditCard,
    label: "Pembayaran",
    value: "Transfer bank (BCA, Mandiri) atau bayar langsung di toko",
  },
];

export default function About() {
  return (
    <section id="tentang" className="py-20 sm:py-28" style={{ borderTop: "1px solid var(--nd-border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "var(--nd-text-disabled)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 12,
            }}
          >
            TENTANG KAMI
          </span>
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--nd-text-display)",
            }}
          >
            Luxor Automotive
          </h2>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: "var(--nd-text-secondary)",
            maxWidth: 640,
            lineHeight: 1.6,
            marginBottom: 48,
          }}
        >
          Toko spare part kendaraan niaga terpercaya di Bandung. Melayani mekanik, bengkel, dan pemilik armada
          untuk kebutuhan spare part truk, bus, dan kendaraan komersial.
        </p>

        {/* Feature Grid 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "var(--nd-surface)",
                border: "1px solid var(--nd-border)",
                borderRadius: 12,
                padding: 24,
                transition: "background 200ms ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--nd-surface-raised)";
                const icon = e.currentTarget.querySelector("svg") as SVGElement | null;
                if (icon) icon.style.color = "var(--nd-text-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--nd-surface)";
                const icon = e.currentTarget.querySelector("svg") as SVGElement | null;
                if (icon) icon.style.color = "var(--nd-text-disabled)";
              }}
            >
              <f.icon
                size={24}
                strokeWidth={1.5}
                style={{ color: "var(--nd-text-disabled)", marginBottom: 16, transition: "color 200ms ease-out" }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--nd-text-display)",
                  marginBottom: 8,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "var(--nd-text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Info Strip — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {infoStrip.map((info) => (
            <div
              key={info.label}
              style={{
                background: "var(--nd-surface)",
                borderRadius: 8,
                padding: 20,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <info.icon size={14} strokeWidth={1.5} style={{ color: "var(--nd-text-disabled)" }} />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--nd-text-disabled)",
                  }}
                >
                  {info.label}
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--nd-text-secondary)", lineHeight: 1.5 }}>
                {info.value}
              </p>
            </div>
          ))}
        </div>

        {/* Google Maps Embed */}
        <div style={{ background: "var(--nd-surface)", border: "1px solid var(--nd-border)", borderRadius: 12, overflow: "hidden" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9!2d107.6014182!3d-6.9160929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63cf7cb7d8b%3A0x15ce5334f005c7dc!2sLuxor%20Automotive%20Parts!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
            width="100%"
            height="350"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--nd-text-disabled)" }}>
          Kunjungi toko kami di{" "}
          <a
            href="https://maps.app.goo.gl/Apy2fvFQjK6sLbnm7"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--nd-interactive)", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            Buka di Google Maps →
          </a>
        </p>
      </div>
    </section>
  );
}
