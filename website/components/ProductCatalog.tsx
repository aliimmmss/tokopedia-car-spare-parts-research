"use client";

import { useState, useMemo } from "react";
import { Search, MessageCircle, Settings } from "lucide-react";
import { products, formatPrice, generateWhatsAppLink, type Category } from "@/lib/products";

const categories: { label: string; value: Category | "Semua" }[] = [
  { label: "Semua Produk", value: "Semua" },
  { label: "Kemudi", value: "Kemudi" },
  { label: "Engine", value: "Engine" },
  { label: "Rem", value: "Rem" },
  { label: "Suspensi", value: "Suspensi" },
  { label: "Lainnya", value: "Lainnya" },
];

const categoryBadgeColors: Record<Category, string> = {
  Kemudi: "bg-[#1A1A2E] text-[#8888CC]",
  Engine: "bg-[#1A2E1A] text-[#88CC88]",
  Rem: "bg-[#2E1A1A] text-[#CC8888]",
  Suspensi: "bg-[#2E2E1A] text-[#CCCC88]",
  Lainnya: "bg-[#1A2E2E] text-[#88CCCC]",
};

export default function ProductCatalog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "Semua">("Semua");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "Semua" || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <section id="produk" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs tracking-[0.15em] text-[#888888] uppercase block mb-3">Katalog</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] font-[var(--font-heading)]">
            Produk Kami
          </h2>
          <p className="mt-3 text-[#888888] text-sm max-w-lg">
            Spare part kendaraan niaga dari brand terpercaya. Klik &quot;Pesan via WhatsApp&quot; untuk cek ketersediaan.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]" />
          <input
            type="text"
            placeholder="Cari produk, brand, atau kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#222222] text-white text-sm pl-11 pr-4 py-3 placeholder:text-[#666666] focus:outline-none focus:border-[#444444] transition-colors"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 text-xs tracking-wide transition-colors ${
                activeCategory === cat.value
                  ? "bg-white text-black font-medium"
                  : "border border-[#222222] text-[#888888] hover:border-[#444444] hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-xs text-[#666666] mb-6">
          Menampilkan {filtered.length} produk
        </p>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1px] bg-[#222222]">
            {filtered.map((product) => (
              <div key={product.id} className="bg-[#0A0A0A] flex flex-col">
                {/* Image Placeholder */}
                <div className="relative aspect-square bg-[#111111] flex items-center justify-center">
                  <Settings size={48} className="text-[#222222]" />
                  <span className="absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase px-2 py-1 bg-[#111111] border border-[#222222] text-[#888888]">
                    {product.category}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] tracking-[0.15em] text-[#666666] uppercase mb-1.5">
                    {product.brand}
                  </span>
                  <h3 className="text-sm text-white leading-snug line-clamp-2 mb-3 flex-1">
                    {product.name}
                  </h3>
                  <div className="text-lg font-bold tracking-tight mb-1">
                    {formatPrice(product.price)}
                  </div>
                  <p className="text-[11px] text-[#666666] mb-4">{product.quantity}</p>

                  <a
                    href={generateWhatsAppLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-black px-4 py-2.5 text-xs font-medium hover:bg-[#20BD5A] transition-colors w-full"
                  >
                    <MessageCircle size={14} />
                    Pesan via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-[#222222]">
            <p className="text-[#666666] text-sm">Tidak ada produk yang cocok dengan pencarian.</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("Semua");
              }}
              className="mt-4 text-xs text-white underline underline-offset-4 hover:text-[#888888] transition-colors"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
