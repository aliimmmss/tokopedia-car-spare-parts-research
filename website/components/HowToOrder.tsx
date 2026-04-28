"use client";

import { Search, MessageCircle, Wallet, Truck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Pilih Produk",
    desc: "Cari spare part yang Anda butuhkan dari katalog kami",
  },
  {
    num: "02",
    icon: MessageCircle,
    title: "Chat WhatsApp",
    desc: "Klik tombol WhatsApp untuk konfirmasi stok dan harga",
  },
  {
    num: "03",
    icon: Wallet,
    title: "Pembayaran",
    desc: "Transfer bank atau bayar langsung di toko kami",
  },
  {
    num: "04",
    icon: Truck,
    title: "Pengiriman",
    desc: "Barang dikirim ke seluruh Jawa dalam 1-3 hari kerja",
  },
];

export default function HowToOrder() {
  return (
    <section id="cara-pesan" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div style={{ marginBottom: 8 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "var(--nd-text-disabled)",
              textTransform: "uppercase",
              display: "block",
            }}
          >
            CARA PESAN
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--nd-text-display)",
            marginBottom: 16,
          }}
        >
          Cara Pemesanan
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: "var(--nd-text-secondary)",
            maxWidth: 512,
            lineHeight: 1.6,
            marginBottom: 48,
          }}
        >
          Proses mudah, cepat, dan aman
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {steps.map((step, index) => (
            <div key={step.num} className="flex items-stretch">
              <div
                style={{
                  background: "var(--nd-surface)",
                  border: "1px solid var(--nd-border)",
                  borderRadius: 12,
                  padding: 24,
                  position: "relative",
                  overflow: "hidden",
                  flex: 1,
                  transition: "background 300ms cubic-bezier(0.25, 0.1, 0.25, 1), border-color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
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
                    color: "var(--nd-surface-raised)",
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

              {/* Connector — desktop only */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:flex items-center justify-center"
                  style={{ width: 24, flexShrink: 0 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{ color: "var(--nd-border-visible)" }}
                  >
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
