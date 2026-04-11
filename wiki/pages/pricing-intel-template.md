# Pricing Intelligence Template

> **Purpose:** Structured data entry for product list analysis  
> **Usage:** Populate when product list arrives from boss  
> **Last Updated:** 11 April 2025

---

## Quick Data Entry Guide

### Step 1: Add Your Product Rows

Copy this template row for each SKU:

```markdown
| PART_NUMBER | DESCRIPTION | CATEGORY | YOUR_COST | COMPETITOR_1 | COMPETITOR_2 | COMPETITOR_3 | MARGIN_LOW | MARGIN_HIGH | ACTION |
```

### Step 2: Fill Market Data

Once you have your list, I'll auto-populate market prices via web scrape.

### Step 3: Calculate Margins

Formula: `Margin % = ((Competitor_Avg - Your_Cost) / Your_Cost) * 100`

---

## Master Table (Ready for Import)

| Part Number | Description | Category | Your Cost | Tokopedia Low | Tokopedia High | Shopee Low | Shopee High | Avg Market | Your Margin % | Price Position | Stock Status | Priority |
|-------------|-------------|----------|-----------|---------------|----------------|------------|-------------|------------|---------------|----------------|--------------|----------|
| | | | | | | | | | | | | |

---

## Category Summary View

Use this to see category-level opportunities at a glance:

| Category | Your SKUs | Avg Margin | Market Range | Gap Opportunity | Action |
|----------|-----------|------------|--------------|-----------------|--------|
| | | | | | |

---

## Competitor Details

Track specific competitors per part:

| Part Number | Top Competitor | Shop Name | Rating | Sold Count | Last Seen Price | Notes |
|-------------|----------------|-----------|--------|------------|-----------------|-------|
| | | | | | | |

---

## Price Gap Analysis

### High-Gap Opportunities (>50% margin potential)

| Part Number | Market High | Your Cost | Potential Price | Est. Margin | Urgency |
|-------------|-------------|-----------|-----------------|-------------|---------|
| | | | | | |

### Low-Margin Alerts (<15%)

| Part Number | Market Low | Your Cost | Issue | Suggested Action |
|-------------|------------|-----------|-------|------------------|
| | | | | |

---

## Part Number Prefix Reference

Quick lookup for Isuzu part numbers:

| Prefix | Category | Generation |
|--------|----------|------------|
| 8-981XX-XXX-X | Current standard | 2020+ |
| 8-980XX-XXX-X | Recent | 2016-2019 |
| 8-979XX-XXX-X | Previous | 2012-2015 |
| 8-973XX-XXX-X | Older | 2008-2011 |
| 8-972XX-XXX-X | Legacy | Pre-2008 |

---

## Vehicle-Specific Tabs

Create separate sections per vehicle category:

### TRAGA Parts

| Part Number | Description | Your Cost | Market Price | Notes |
|-------------|-------------|-----------|--------------|-------|
| | | | | |

### ELF N-Series Parts

| Part Number | Description | Your Cost | Market Price | Notes |
|-------------|-------------|-----------|--------------|-------|
| | | | | |

### GIGA Parts

| Part Number | Description | Your Cost | Market Price | Notes |
|-------------|-------------|-----------|--------------|-------|
| | | | | |

---

## Chinese Truck Compatibility

For parts that fit Chinese trucks (Shacman, Sinotruk, Foton):

| Your Part Number | Chinese Model | Fit Notes | Market Gap | Action |
|------------------|---------------|-----------|------------|--------|
| | | | | |

---

## Euro 4 / B50 Ready Parts

Parts compatible with Euro 4 and B50 biodiesel mandate:

| Part Number | Description | Euro 4 Compatible | B50 Ready | Stock Level | Demand Forecast |
|-------------|-------------|---------------------|-----------|-------------|-----------------|
| | | | | | |

---

## Price Update Log

Track when you update pricing data:

| Date | Parts Updated | Source | Actioned By |
|------|---------------|--------|-------------|
| | | | |

---

## Usage Instructions

1. **When product list arrives:**
   - Copy Part Numbers and Descriptions to Master Table
   - Fill "Your Cost" column
   - Leave market columns empty

2. **Run market research:**
   - I will scrape Tokopedia/Shopee for each part number
   - Populate market columns automatically
   - Calculate margins

3. **Review outputs:**
   - Check "Price Gap Analysis" for opportunities
   - Review "Low-Margin Alerts" for issues
   - Set "Priority" column

4. **Action:**
   - Price competitively on high-gap items
   - Bundle low-margin items
   - Stock up on B50-ready filters

---

## Related Files

- [Concurrent Research Findings](../pages/concurrent-research-findings.md) - Market context
- [Isuzu Catalog System](../pages/isuzu-catalog-system.md) - Part number lookup
- [Competitor Tracker](../pages/competitor-tracker.md) - Real-time monitoring

---

*Template Version: 1.0*  
*Ready for: Product List Integration*
