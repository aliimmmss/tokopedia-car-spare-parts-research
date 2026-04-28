import { Phone, MapPin, Clock } from "lucide-react";
import { generateGeneralWhatsAppLink } from "@/lib/products";

export default function Footer() {
  return (
    <footer id="kontak" className="border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 border border-[#222222] flex items-center justify-center">
                <span className="text-lg font-bold font-[var(--font-heading)] tracking-tight">L</span>
              </div>
              <div>
                <div className="text-sm font-bold tracking-[-0.02em] font-[var(--font-heading)]">LUXOR</div>
                <div className="text-[10px] tracking-[0.15em] text-[#888888] uppercase">Automotive</div>
              </div>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed max-w-sm">
              Spare part kendaraan niaga terpercaya sejak 1995. Melayani mekanik, bengkel, dan pemilik
              armada truk, bus, dan kendaraan komersial di seluruh Indonesia.
            </p>
          </div>

          {/* Right — CTA */}
          <div className="md:text-right">
            <h3 className="text-lg font-bold tracking-[-0.02em] font-[var(--font-heading)] mb-2">
              Butuh spare part?
            </h3>
            <p className="text-xs text-[#666666] mb-5">Hubungi kami via WhatsApp untuk cek stok dan harga terbaru.</p>
            <a
              href={generateGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-black px-6 py-3 text-sm font-medium hover:bg-[#20BD5A] transition-colors"
            >
              <Phone size={14} />
              Hubungi WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#666666]">
            &copy; {new Date().getFullYear()} Luxor Automotive. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-[#666666]">
            <span className="flex items-center gap-1.5">
              <MapPin size={11} /> Bandung, Jawa Barat
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} /> Senin — Sabtu, 08.00 — 17.00
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
