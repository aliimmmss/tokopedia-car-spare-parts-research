# 🚗 Tokopedia x TikTok Shop - Master Research Guide for Commercial Vehicle Spare Parts

Welcome to the comprehensive operational manual for selling commercial vehicle spare parts in the Indonesian market via Tokopedia, Shopee, and TikTok Shop. This repository serves as a living document to ensure compliance, optimize sales, and scale growth.

## 📌 Project Scope

This research targets commercial vehicles ONLY — trucks, buses, and heavy equipment (NOT consumer cars). Key product categories:

- **Brake Systems:** Pads, linings, discs, brake boosters
- **Engine Parts:** Injectors, filters, gaskets, pistons
- **Drivetrain:** Axles, shafts, differentials
- **Suspension:** Shock absorbers, bushings, control arms
- **Electrical:** Alternators, starters, sensors

**Vehicle brands:** Hino, Isuzu, Mitsubishi Fuso, Toyota Dyna, Scania, Volvo, MAN

## 🗺️ Repository Structure

```
tokopedia-car-spare-parts-research/
├── data/              # Product database (29 commercial vehicle parts, CSV)
├── docs/              # Canonical content (MkDocs source + GitHub Pages)
│   ├── fundamentals/  # Marketplace rules, listing guides, shipping
│   ├── market-research/  # Pricing, demand, competitor analysis
│   ├── catalogs/      # Product catalogs (engine, brake, filters, etc.)
│   ├── analysis/      # B2B, wholesale, marketplace comparison
│   └── tiktok-shop/   # TikTok Shop strategy & checklists
├── research/          # Unique research files (deep dives not in docs/)
├── wiki/              # Quick-reference wiki pages (daily ops, calculators)
├── tools/             # Python automation scripts
│   ├── photo-processor/    # Background removal, watermarking
│   ├── description-generator/  # AI product descriptions
│   └── order-bot/          # Telegram order notifications
├── slides/            # Marp presentation files (.md sources)
└── AGENTS.md          # Project rules for AI agents
```

**Current status:** 5 products already listed on Tokopedia. Using direct platform management (no web dashboard — Luxor Studio removed).

---

## 🎯 Quick Start

### Understanding the Documentation

| Section | Purpose | What's Inside |
|---------|---------|---------------|
| **[docs/](./docs/)** | Canonical knowledge base | Platform rules, pricing guides, compliance, catalog specs |
| **[wiki/](./wiki/)** | Daily operations | Checklists, pricing calculator, competitor tracker |
| **[research/](./research/)** | Deep market research | Full pricing analysis, margin studies, buyer psychology |
| **[tools/](./tools/)** | Automation scripts | Photo processing, description generation, order notifications |
| **[data/](./data/)** | Product database | 29 commercial vehicle parts with profitability matrices |

### Key Documents

Start here:
1. **[Product Catalog Index (wiki)](./wiki/pages/product-catalog-index.md)** — All 29 products with pricing
2. **[Pricing Calculator (wiki)](./wiki/pages/pricing-calculator.md)** — Profitability formulas
3. **[Competitor Tracker (wiki)](./wiki/pages/competitor-tracker.md)** — Live marketplace monitoring
4. **[Action Checklist (docs)](./docs/tiktok-shop/action-checklist.md)** — 90-day launch plan
5. **[Operations Manual (docs)](./docs/business-plans/05-operations-manual.md)** — Full SOP

---

## 📊 Current State

**Products:** 29 commercial vehicle spare parts catalogued in `data/products.csv` with:
- Complete pricing (buy/sell, Tokopedia/TikTok fees, shipping)
- Profitability calculations (Net Java / Non-Java)
- Verdict: All marked PROFITABLE

**Platforms:** Research covers Tokopedia, Shopee, TikTok Shop (Indonesia)

**Lists:** 5 products already live on Tokopedia (as of April 2026)

---

## 🛠️ Tools

The `tools/` directory contains three Python automation tools:

1. **Photo Processor** — Remove backgrounds, add watermarks
2. **Description Generator** — AI-powered product descriptions
3. **Order Bot** — Telegram notifications for new orders

Install dependencies from each tool's `requirements.txt` and run locally.

---

## 📈 Next Steps

1. **Expand catalog:** Add 50+ more SKUs using research from `docs/catalogs/`
2. **Launch TikTok Shop:** Follow `docs/tiktok-shop/strategy.md`
3. **Scale B2B:** Use `docs/analysis/fleet-demand-b2b.md` to target fleet operators
4. **Monitor competitors:** Update `wiki/pages/competitor-tracker.md` weekly

---

## 📚 Research Sources

- Original project research: April 2026
- Platform policies: Tokopedia, Shopee, TikTok Shop Seller Academies
- Market data: Live scraping, importer price lists, i-Parts Center database
- Business: Luxor Parts (Bandung) — operational context

## 📄 License

Private business research. Not for redistribution.
