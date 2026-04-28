"use client";

import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { generateGeneralWhatsAppLink } from "@/lib/products";

const navLinks = [
  { label: "BERANDA", href: "#beranda" },
  { label: "PRODUK", href: "#produk" },
  { label: "CARA PESAN", href: "#cara-pesan" },
  { label: "TENTANG", href: "#tentang" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0,0,0,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--nd-border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{ border: "1px solid var(--nd-border-visible)", borderRadius: 8 }}
            >
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 18 }}>L</span>
            </div>
            <div className="hidden sm:block">
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
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center">
                {i > 0 && (
                  <span style={{ color: "var(--nd-border-visible)", margin: "0 8px", fontSize: 11 }}>|</span>
                )}
                <a
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    color: "var(--nd-text-disabled)",
                    transition: "color 200ms ease-out",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nd-text-display)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nd-text-disabled)")}
                >
                  {link.label}
                </a>
              </span>
            ))}
          </nav>

          {/* Desktop WhatsApp */}
          <a
            href={generateGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2"
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
              transition: "opacity 200ms ease-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <MessageCircle size={16} strokeWidth={1.5} />
            WHATSAPP
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            style={{ color: "var(--nd-text-primary)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden py-4"
            style={{ borderTop: "1px solid var(--nd-border)", background: "var(--nd-black)" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  color: "var(--nd-text-disabled)",
                  textTransform: "uppercase",
                  transition: "color 200ms ease-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nd-text-display)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nd-text-disabled)")}
              >
                {link.label}
              </a>
            ))}
            <a
              href={generateGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mx-4 mt-3"
              style={{
                background: "var(--nd-success)",
                color: "#FFFFFF",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "12px 24px",
                borderRadius: 999,
              }}
            >
              <MessageCircle size={16} strokeWidth={1.5} />
              HUBUNGI WHATSAPP
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
