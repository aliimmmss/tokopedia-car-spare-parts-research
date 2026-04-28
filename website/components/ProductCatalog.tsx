"use client";

import { useState, useMemo } from "react";
import { Search, MessageCircle, Settings } from "lucide-react";
import { products, formatPrice, generateWhatsAppLink, type Category } from "@/lib/products";

const categories = ["Semua", "Kemudi", "Engine", "Rem", "Suspensi", "Lainnya"] as const;
type FilterCategory = (typeof categories)[number];

const categoryBadgeColors: Record<Category, string> = {
  Kemudi: "var(--nd-text-secondary)",
  Engine: "var(--nd-text-secondary)",
  Rem: "var(--nd-text-secondary)",
  Suspensi: "var(--nd-text-secondary)",
  Lainnya: "var(--nd-text-secondary)",
};

export default function ProductCatalog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("Semua");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "Semua" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <section id="produk" className="py-20 sm:py-28">
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
            KATALOG
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
            Produk Kami
          </h2>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            size={18}
            strokeWidth={1.5}
            style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--nd-text-disabled)" }}
          />
          <input
            type="text"
            placeholder="Cari spare part..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
            style={{
              background: "var(--nd-surface)",
              border: "1px solid var(--nd-border)",
              borderRadius: 8,
              padding: "12px 16px 12px 44px",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--nd-text-primary)",
              outline: "none",
              transition: "border-color 200ms ease-out",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--nd-border-visible)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--nd-border)")}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "8px 16px",
                  minHeight: 36,
                  borderRadius: 999,
                  background: isActive ? "var(--nd-text-display)" : "transparent",
                  color: isActive ? "var(--nd-black)" : "var(--nd-text-secondary)",
                  border: isActive ? "none" : "1px solid var(--nd-border-visible)",
                  cursor: "pointer",
                  transition: "all 200ms ease-out",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--nd-text-disabled)",
            marginBottom: 24,
          }}
        >
          Menampilkan {filtered.length} produk
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              style={{
                background: "var(--nd-surface)",
                border: "1px solid var(--nd-border)",
                borderRadius: 12,
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
              {/* Image Area */}
              <div
                className="relative"
                style={{
                  background: "var(--nd-surface)",
                  aspectRatio: "1/1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <Settings size={48} strokeWidth={1.5} style={{ color: "var(--nd-border-visible)" }} />
                )}
                {/* Category Badge */}
                <span
                  className="absolute top-3 left-3"
                  style={{
                    background: "var(--nd-surface-raised)",
                    borderRadius: 999,
                    padding: "4px 10px",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--nd-text-secondary)",
                  }}
                >
                  {product.category}
                </span>
              </div>

              {/* Info Area */}
              <div style={{ padding: 16 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--nd-text-disabled)",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  {product.brand}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "var(--nd-text-primary)",
                    lineHeight: 1.4,
                    marginBottom: 12,
                    minHeight: 40,
                  }}
                  className="line-clamp-2"
                >
                  {product.name}
                </h3>
                <div style={{ marginBottom: 4 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--nd-text-disabled)",
                      marginRight: 4,
                    }}
                  >
                    Rp
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 24,
                      fontWeight: 700,
                      color: "var(--nd-text-display)",
                    }}
                  >
                    {formatPrice(product.price).replace("Rp", "")}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--nd-text-disabled)",
                    marginBottom: 16,
                  }}
                >
                  {product.quantity}
                </p>
                <a
                  href={generateWhatsAppLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                  style={{
                    background: "var(--nd-success)",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "12px 16px",
                    minHeight: 44,
                    borderRadius: 999,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "opacity 200ms ease-out",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <MessageCircle size={14} strokeWidth={1.5} />
                  PESAN VIA WHATSAPP
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
