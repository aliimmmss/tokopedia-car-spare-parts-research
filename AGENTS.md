# AGENTS.md — Project Rules for tokopedia-car-spare-parts-research

> This file provides instructions for AI agents (Hermes, Claude, GPT, etc.)
> working on this repository. Read this file FIRST before making any changes.

---

## Project Overview

**Repository:** `aliimmmss/tokopedia-car-spare-parts-research`
**Purpose:** Comprehensive marketplace research for selling commercial vehicle spare parts on Indonesian e-commerce platforms.
**Business Segment:** Commercial vehicles ONLY — trucks, buses, heavy equipment. NOT consumer cars.

## Business Context

- **Seller focus:** B2B and B2C hybrid — selling to fleet operators, workshops, and individual truck/bus owners
- **Primary marketplaces:** Tokopedia, Shopee, TikTok Shop (in order of priority)
- **Secondary marketplaces:** Bukalapak, Blibli, JD.ID
- **Product scope:** Engine parts, brake systems, drivetrain, filters, electrical, body panels for commercial vehicles (Hino, Isuzu, Mitsubishi Fuso, Toyota Dyna, Scania, Volvo, MAN)
- **Geographic focus:** Indonesia — all 34 provinces, with emphasis on Java, Sumatra, Kalimantan (high commercial vehicle density)

## File Structure & Content Rules

### Research Files

All research files follow this naming convention: `XX-description.md` where XX is a 2-digit number.

| Range | Category | Files |
|-------|----------|-------|
| 01-04 | Marketplace Fundamentals | Restricted products, brand auth, listing guide, shipping |
| 05-06 | TikTok Shop Strategy | Strategy, action checklist |
| 07-13 | Consumer Car Parts Research | Pricing, demand, competitor analysis, promotions, returns, Euro 4 |
| 14-16 | Commercial Vehicle Parts Catalogs | Engine, brake/drivetrain, filters/electrical/body |
| 17-19 | Market Analysis & B2B | Marketplace comparison, wholesale margins, fleet demand |

### Content Standards

When creating or editing research files:

1. **Minimum 200 lines** per file. Target 300-500 lines for new files.
2. **Use tables extensively** for pricing data, comparisons, and seller listings. Tables are more compact and readable than prose for structured data.
3. **Always include prices in Rupiah (Rp)** with realistic ranges based on actual marketplace data.
4. **Multi-marketplace data required** — every catalog/pricing section must include data from BOTH Tokopedia AND Shopee minimum. TikTok Shop where available.
5. **Never use placeholder prices.** If a price can't be found, use estimated range with `(estimated)` tag based on similar products.
6. **Zero "Market dependent" entries.** Every price field must have a concrete value.
7. **Include seller details:** Shop name, rating, location, price range, stock status.
8. **Write in English** for research files.

## Research Methodology

When searching marketplace data:

1. **Primary search:** Use `web_search` to find product URLs on Tokopedia and Shopee
2. **Deep scrape:** Use `stealthy_fetch` (Scrapling MCP) for product pages that block standard requests
3. **Cross-reference:** Always verify prices across at least 2 marketplaces
4. **B2B pricing:** Note bulk/wholesale pricing, minimum order quantities, and fleet discounts
5. **Seasonal factors:** Note price fluctuations during Hari Raya, year-end, and trucking peak seasons

## Git Workflow

### Commit Rules

- **Commit after EACH file** is completed — never batch multiple file changes
- **Descriptive commit messages:** `Fix: [what was fixed]` or `Add: [what was added]`
- **Push immediately** after each commit
- **Never force push** to main branch

### Branch Rules

- `main` is the primary branch
- Feature branches: `feature/short-description`
- Research updates go directly to `main` (single-developer workflow)

## Common Tasks & Prompts

### Adding a New Product Category

Research [product category] for [vehicle brand/model] commercial vehicles.
Requirements:

- Search Tokopedia AND Shopee for pricing and seller data
- Minimum 10 products with full details (seller, price, rating, location)
- Include B2B/wholesale pricing if available
- Output as markdown table
- Target file size: 300-500 lines
- Commit and push after completion

### Updating Pricing Data

Update pricing data in [file-name.md] for the [product category] section.

- Search current prices on Tokopedia and Shopee
- Replace old prices with current ranges
- Add any new sellers found
- Note any significant price changes (>10%)
- Commit and push after completion


### Expanding a File

Expand [file-name.md] from [current] lines to at least 300 lines.

- Keep all existing content
- Add new sections with detailed, actionable information
- Use tables for structured data
- Include real marketplace examples and data
- Commit and push after completion


## Prohibited Actions

- Do NOT delete any existing research files
- Do NOT change file naming convention
- Do NOT use placeholder text like "Market dependent" for prices
- Do NOT focus on consumer car parts — this is commercial vehicles only
- Do NOT batch commits — commit after each file
- Do NOT write in Indonesian — all research files in English
- Do NOT add prices without sourcing from actual marketplace data

## Quality Checklist

Before considering any file "done," verify:

- [ ] File is 200+ lines (300+ preferred)
- [ ] All prices are in Rp with real/estimated values
- [ ] No "Market dependent" or empty price entries
- [ ] Both Tokopedia and Shopee data included
- [ ] Seller details present (name, rating, location)
- [ ] Tables used for structured/comparison data
- [ ] File committed and pushed to GitHub
