"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { generateGeneralWhatsAppLink } from "@/lib/products";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Produk", href: "#produk" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#000000]/95 backdrop-blur-sm border-b border-[#222222]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#222222] flex items-center justify-center">
              <span className="text-lg font-bold font-[var(--font-heading)] tracking-tight">L</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold tracking-[-0.02em] font-[var(--font-heading)]">LUXOR</div>
              <div className="text-[10px] tracking-[0.15em] text-[#888888] uppercase">Automotive</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#888888] hover:text-white transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop WhatsApp */}
          <a
            href={generateGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-[#25D366] text-black px-4 py-2 text-sm font-medium hover:bg-[#20BD5A] transition-colors"
          >
            <Phone size={14} />
            WhatsApp
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#222222] bg-[#000000] py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm text-[#888888] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={generateGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mx-4 mt-3 bg-[#25D366] text-black px-4 py-3 text-sm font-medium justify-center"
            >
              <Phone size={14} />
              Hubungi via WhatsApp
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
