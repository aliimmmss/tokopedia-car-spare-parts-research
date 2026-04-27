# AGENTS.md — Project Rules for tokopedia-car-spare-parts-research

> This file provides instructions for AI agents (Hermes, Claude, GPT, etc.)
> working on this repository. Read this file FIRST before making any changes.

---

## Project Overview

**Repository:** `aliimmmss/tokopedia-car-spare-parts-research`
**Purpose:** Comprehensive marketplace research for selling commercial vehicle spare parts on Indonesian e-commerce platforms.
**Business Segment:** Commercial vehicles ONLY — trucks, buses, heavy equipment. NOT consumer cars.

---

## Repo Structure

```
├── docs/              # Canonical content (MkDocs source + GitHub Pages)
│   ├── fundamentals/  # Marketplace rules, listing guides, shipping
│   ├── market-research/  # Pricing, demand, competitor analysis
│   ├── catalogs/      # Product catalogs (engine, brake, filters)
│   ├── analysis/      # B2B, wholesale, marketplace comparison
│   └── tiktok-shop/   # TikTok Shop strategy & checklists
├── research/          # Unique research files WITHOUT docs/ counterpart
│   └── XX-*.md        # Deep dives on topics not yet in docs/
├── wiki/              # Quick-reference wiki pages
│   ├── README.md
│   └── pages/         # Vehicle brands, sourcing, personas, etc.
├── tools/             # Python automation scripts
├── slides/            # Marp presentation files (.md sources)
├── data/              # Product CSV database (29 commercial vehicle parts)
└── AGENTS.md          # This file
```

---

## File Categories

### docs/ — Canonical Content (MkDocs Source)
- **Purpose:** Primary publishing format for GitHub Pages. Single source of truth.
- **Naming:** `kebab-case.md` (descriptive, topic-based)
- **Structure:** Organized by category (`fundamentals/`, `market-research/`, `catalogs/`, `analysis/`, `tiktok-shop/`)
- **Content:** Full research, tables, pricing data, mermaid diagrams
- **Examples:** `fundamentals/product-listing-guide.md`, `catalogs/engine-parts.md`

### research/ — Unique Deep Research (No docs/ Counterpart)
- **Purpose:** Archive for research topics that have NOT been migrated to docs/ yet
- **Naming:** `XX-description.md` (2-digit number)
- **Size:** 200-500 lines minimum
- **Content:** Full market analysis, pricing data, competitor deep dives
- **Examples:** `23-isuzu-iparts-margin-analysis.md`, `26-importer-price-analysis-comparison.md`
- **Rule:** If a topic exists in docs/, do NOT maintain a duplicate in research/

### wiki/pages/ — Quick Reference
- **Naming:** `kebab-case.md` (descriptive)
- **Size:** 50-150 lines
- **Content:** Summaries, quick lookups, operational guides
- **Examples:** `vehicle-brands.md`, `competitor-tracker.md`, `sourcing-guide.md`

---

## Business Context

- **Seller focus:** B2B and B2C hybrid — selling to fleet operators, workshops, and individual truck/bus owners
- **Primary marketplaces:** Tokopedia, Shopee, TikTok Shop
- **Product scope:** Engine parts, brake systems, drivetrain, filters, electrical, body panels
- **Vehicle brands:** Hino, Isuzu, Mitsubishi Fuso, Toyota Dyna, Scania, Volvo, MAN
- **Geographic focus:** Indonesia (Java, Sumatra, Kalimantan priority)

---

## Content Standards

### Research Files (`research/`)
1. **Minimum 200 lines** per file. Target 300-500 lines.
2. **Tables extensively** for pricing data and comparisons
3. **Always include prices in Rupiah (Rp)** with realistic ranges
4. **Multi-marketplace data required** — Tokopedia AND Shopee minimum
5. **Never use placeholder prices** — use `(estimated)` tag if necessary
6. **Include seller details:** Shop name, rating, location, price range
7. **Write in English**

### Wiki Pages (`wiki/pages/`)
1. **Quick reference format** — bullet points, tables, checklists
2. **Link to research files** for deep dives
3. **Updated frequently** as operations change
4. **English**

---

## Research Methodology

1. **Primary search:** Use `web_search` to find product URLs on Tokopedia/Shopee
2. **Deep scrape:** Use `stealthy_fetch` for blocked pages
3. **Cross-reference:** Verify prices across at least 2 marketplaces
4. **B2B pricing:** Note bulk/wholesale pricing, MOQs, fleet discounts
5. **Seasonal factors:** Note fluctuations during Lebaran, year-end, peak seasons

---

## Git Workflow

### Commit Rules
- **Commit after EACH file** — never batch changes
- **Descriptive messages:** `feat: add sourcing guide` or `update: Hino pricing`
- **Push immediately** after each commit
- **Never force push**

### Update Order
When modifying related files:
1. Update `docs/` file (canonical detailed data)
2. Update `wiki/pages/` file (summary/quick ref)
3. Commit separately or together if small changes
4. Push

---

## Quick Commands

### Adding Wiki Page
```
Create wiki/pages/[page-name].md
- Use docs/ files as sources (relative links: ../docs/category/file.md)
- Keep under 150 lines
- Include "Related" section with links
- Commit:
```

### Updating Research
```
Update docs/[category]/[file].md
- Add new pricing data
- Update tables
- Check wiki/pages/ if summary needs update
- Commit each file separately
```

---

## Prohibited Actions

- Do NOT maintain duplicate content in `research/` and `docs/` — `docs/` is canonical
- Do NOT change `research/` file naming convention (XX-*.md)
- Do NOT use placeholder text like "Market dependent" for prices
- Do NOT focus on consumer car parts — commercial vehicles only
- Do NOT batch commits across multiple research files
- Do NOT write in Indonesian — English only
- Do NOT add prices without sourcing from actual marketplace data

---

## Quality Checklist

Before marking file "done":

**Research Files:**
- [ ] File is 200+ lines (300+ preferred)
- [ ] All prices in Rp with real/estimated values
- [ ] No "Market dependent" entries
- [ ] Tokopedia AND Shopee data included
- [ ] Seller details present
- [ ] Tables used for structured data
- [ ] Written in English

**Wiki Pages:**
- [ ] Links to relevant research files
- [ ] Quick reference format (not full research)
- [ ] Under 150 lines
- [ ] Includes "Related" section
