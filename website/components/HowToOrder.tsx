"use client";

import { MessageCircle, Phone, CreditCard, Truck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: MessageCircle,
    title: "Pilih Produk",
    desc: "Cari spare part dari katalog kami",
  },
  {
    num: "02",
    icon: Phone,
    title: "Chat WhatsApp",
    desc: "Konfirmasi ketersediaan dan harga",
  },
  {
    num: "03",
    icon: CreditCard,
    title: "Pembayaran",
    desc: "Transfer bank atau bayar di toko",
  },
  {
    num: "04",
    icon: Truck,
    title: "Pengiriman",
    desc: "Dikirim seluruh Jawa, 1-3 hari kerja",
  },
];

export default function HowToOrder() {
  return (
    <section id="cara-pesan" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
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
            CARA PESAN
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
            Cara Pemesanan
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                background: "var(--nd-surface)",
                border: "1px solid var(--nd-border)",
                borderRadius: 12,
                padding: 24,
                position: "relative",
                overflow: "hidden",
                transition: "background 200ms ease-out, border-color 200ms ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--nd-surface-raised)";
                e.currentTarget.style.borderColor = "var(--nd-border-visible)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--nd-surface)";
                e.currentTarget.style.borderColor = "var(--nd-border)";
              }}
            >
              {/* Step Number */}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 48,
                  fontWeight: 700,
                  color: "var(--nd-border-visible)",
                  position: "absolute",
                  top: 12,
                  right: 16,
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {step.num}
              </span>

              <step.icon size={24} strokeWidth={1.5} style={{ color: "var(--nd-text-disabled)", marginBottom: 16 }} />
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--nd-text-display)",
                  marginBottom: 8,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "var(--nd-text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
