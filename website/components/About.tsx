import { Shield, Truck, Award, Wrench, MapPin, Clock, CreditCard } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Kualitas Terjamin",
    desc: "Semua spare part dari brand OEM dan aftermarket terpercaya. Kami jamin keaslian setiap produk yang dijual.",
  },
  {
    icon: Truck,
    title: "Pengiriman Seluruh Jawa",
    desc: "Kirim ke Bandung, Jakarta, Surabaya, dan kota lain di Jawa. Packing aman, bisa COD untuk area Bandung.",
  },
  {
    icon: Award,
    title: "30 Tahun Pengalaman",
    desc: "Buka sejak 1995, melayani ribuan mekanik dan pemilik armada. Pengalaman panjang di spare part kendaraan niaga.",
  },
  {
    icon: Wrench,
    title: "Konsultasi Teknis",
    desc: "Tidak yakin part mana yang cocok? Tim kami bisa bantu cek kompatibilitas dengan kendaraan Anda.",
  },
];

export default function About() {
  return (
    <section id="tentang" className="py-20 sm:py-28 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs tracking-[0.15em] text-[#888888] uppercase block mb-3">Tentang Kami</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] font-[var(--font-heading)]">
            Luxor Automotive
          </h2>
          <p className="mt-4 text-[#888888] text-sm max-w-2xl leading-relaxed">
            Luxor Automotive adalah toko spare part kendaraan niaga di Bandung yang sudah beroperasi sejak 1995.
            Kami menyediakan komponen untuk truk, bus, dan kendaraan komersial dari brand seperti Isuzu, Mitsubishi,
            Hino, Toyota, Suzuki, dan lainnya. Melayani pembelian satuan maupun grosir untuk bengkel dan armoda.
          </p>
        </div>

        {/* Features Grid — 2x2 with 1px gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-[#222222] mb-16">
          {features.map((f) => (
            <div key={f.title} className="bg-[#0A0A0A] p-6 sm:p-8">
              <f.icon size={20} className="text-[#888888] mb-4" />
              <h3 className="text-sm font-bold tracking-[-0.02em] mb-2">{f.title}</h3>
              <p className="text-xs text-[#666666] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Info Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-[#222222]">
          <div className="bg-[#0A0A0A] p-5 flex items-start gap-3">
            <MapPin size={16} className="text-[#888888] mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold mb-1">Lokasi</div>
              <div className="text-xs text-[#666666]">Bandung, Jawa Barat</div>
            </div>
          </div>
          <div className="bg-[#0A0A0A] p-5 flex items-start gap-3">
            <Clock size={16} className="text-[#888888] mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold mb-1">Jam Operasional</div>
              <div className="text-xs text-[#666666]">Senin — Sabtu, 08.00 — 17.00</div>
            </div>
          </div>
          <div className="bg-[#0A0A0A] p-5 flex items-start gap-3">
            <CreditCard size={16} className="text-[#888888] mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold mb-1">Pembayaran</div>
              <div className="text-xs text-[#666666]">Transfer Bank, Tunai di Toko</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
