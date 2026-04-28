"use client";

import { MessageCircle } from "lucide-react";
import { generateGeneralWhatsAppLink } from "@/lib/products";

export default function Footer() {
  return (
    <footer id="kontak" style={{ borderTop: "1px solid var(--nd-border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: "48px 16px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ border: "1px solid var(--nd-border-visible)", borderRadius: 8 }}
              >
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 18 }}>L</span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.02em" }}>
                  LUXOR
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: "var(--nd-text-disabled)",
                    textTransform: "uppercase",
                  }}
                >
                  AUTOMOTIVE
                </div>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--nd-text-secondary)", lineHeight: 1.6, maxWidth: 400 }}>
              Toko spare part kendaraan niaga di Bandung. Melayani kebutuhan mekanik, bengkel, dan pemilik armada
              dengan spare part truk, bus, dan kendaraan komersial berkualitas.
            </p>
          </div>

          {/* Right: WhatsApp CTA */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "var(--nd-text-disabled)",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 12,
              }}
            >
              BUTUH SPARE PART?
            </span>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--nd-text-secondary)", marginBottom: 20, lineHeight: 1.5 }}>
              Hubungi kami untuk cek ketersediaan stok dan harga terbaik. Tim kami siap membantu Anda.
            </p>
            <a
              href={generateGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              style={{
                background: "var(--nd-success)",
                color: "#FFFFFF",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "12px 24px",
                minHeight: 44,
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "opacity 200ms ease-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <MessageCircle size={16} strokeWidth={1.5} />
              HUBUNGI WHATSAPP
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid var(--nd-border)",
          padding: "20px 16px",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--nd-text-disabled)" }}>
            © 2026 Luxor Automotive. Semua hak dilindungi.
          </span>
          <div className="flex gap-6">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--nd-text-disabled)" }}>
              Bandung, Jawa Barat
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--nd-text-disabled)" }}>
              Senin — Sabtu, 09.00 — 17.00
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
