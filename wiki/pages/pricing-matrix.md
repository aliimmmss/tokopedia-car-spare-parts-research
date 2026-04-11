# Pricing Intelligence Matrix

> **Source:** i-Parts Center Dealer Pricing + Future Marketplace Data  
> **Date:** 11 April 2025  
> **Status:** Dealer pricing complete | Marketplace pricing pending  

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Dealer Parts Analyzed | 65 |
| Categories Covered | 4 (Filter, Brake, Clutch, Belt) |
| Catalog Parts Matched | 0 |
| Avg Dealer Price Range | Rp 290,000 - Rp 4,000,000 |

---

## TRAGA Catalog Part Pricing

Sample parts from i-Parts Catalog (Figure 1 Engine) with dealer prices:

| Part Number | Description | Category | Dealer Retail | IADG Price | Status |
|-------------|-------------|----------|---------------|------------|--------|
| 8-98165-071-0 | FILTER; OIL | Engine | Not in dealer stock | - | ⚠ No match |
| 8-98014-447-1 | FILTER, FUEL, CARTRIDGE | Engine | Not in dealer stock | - | ⚠ No match |
| 8-97247-514-0 | FILTER; FUEL | Engine | Not in dealer stock | - | ⚠ No match |
| 8-98165-073-0 | FILTER, AIR | Engine | Not in dealer stock | - | ⚠ No match |
| 8-97371-976-0 | BELT, COOLANT PUMP | Engine | Not in dealer stock | - | ⚠ No match |
| 8-98030-840-1 | BELT, FAN & ALTERNATOR | Engine | Not in dealer stock | - | ⚠ No match |
| 8-98055-454-1 | BELT, FAN & ALTERNATOR | Engine | Not in dealer stock | - | ⚠ No match |

---

## Dealer Pricing Samples by Category

### Filters

| Part Number | Description | Dealer Retail | Notes |
|-------------|-------------|-------------|-------|
| I1-34119 121-0 | BRACKET AIR FILTER REG, FVZ VD00 | 290.000 | Euro 4 parts marked with `#` |
| I1-33549 379-0 | VALVE ASM AIR FILTER REG, FVZ VD00 | - | Euro 4 parts marked with `#` |
| I8-97556 966-0 | VALVE ASM AIR FILTER REG, FVZ VD00 | 4.000.000 | Euro 4 parts marked with `#` |
| I9-88513 264-0 | FILTER OIL,HD | - | Euro 4 parts marked with `#` |
| I5-87615 000-0 | ELEMENT OIL FILTER MU-X | - | Euro 4 parts marked with `#` |
| I5-87615 002-0 | FILTER ACL MU-X | - | Euro 4 parts marked with `#` |
| I8-98270 184-A | FUEL FILTER,N# | - | Euro 4 parts marked with `#` |
| I8-98269 584-A | FUEL FILTER ASM,N# | - | Euro 4 parts marked with `#` |
| I8-98350 716-0 | FILTER KIT PUMP,DEF DCM SPLY, GXZ V | - | Euro 4 parts marked with `#` |
| I8-97096 677-0 | BODY OIL FILTER,LT | - | Euro 4 parts marked with `#` |

### Brake Parts

| Part Number | Description | Dealer Retail | Notes |
|-------------|-------------|-------------|-------|
| I9-92051 232-0 | BOLT S/ABS. BRAKE,LT | - | Check fitment |
| I0-20801 232-0 | BOLT S/ABS. BRAKE,LT | - | Check fitment |
| I5-47416 776-0 | BRAKE PIPE ASM,LT | - | Check fitment |
| I8-98068 178-0 | BRAKE UNIT EXH NPS | - | Check fitment |
| I8-98227 170-0 | BRAKE UNIT EXH NPS | - | Check fitment |
| I8-97017 493-0 | CALIPER DISC BRAKE LH PT | - | Check fitment |
| I8-97017 492-0 | CALIPER DISC BRAKE RH PT | 3.800.000 | Check fitment |
| I8-98283 244-0 | BRAKE PAD,TRAGA | - | Check fitment |

---

## Pricing Analysis Framework

### When Product List Arrives

1. **Cross-reference your part numbers** against this dealer pricing
2. **Scrape Tokopedia/Shopee** for same part numbers
3. **Calculate margin formulas:**

```
Margin % = ((Marketplace_Avg - Your_Cost) / Your_Cost) * 100

Price Position = (Your_Price - Lowest_Competitor) / (Highest - Lowest) * 100
```

### Target Margins by Category

| Category | Minimum Margin | Target Margin | Premium Position |
|----------|----------------|---------------|------------------|
| Filters | 25% | 35% | 45% |
| Brake Pads | 20% | 30% | 40% |
| Belts | 30% | 40% | 50% |
| Clutch Parts | 15% | 25% | 35% |
| Electrical | 35% | 45% | 55% |

---

## Price Gap Detection Matrix (Template)

Ready to populate when marketplace data available:

| Part Number | Dealer Cost | Tokopedia Low | Tokopedia High | Est. Retail Range | Gap % | Action |
|-------------|-------------|---------------|------------------|-------------------|-------|--------|
| | | | | | | |

---

## Competitive Pricing Tiers

| Tier | Strategy | Margin Range |
|------|----------|--------------|
| **Undercut** | Match lowest + 5% | 15-20% |
| **Parity** | Match average | 25-35% |
| **Premium** | Match highest | 40-50% |
| **Bundle** | Pair low + high margin | 30% blended |

---

## Euro 4 / B50 Pricing Strategy

### Premium Categories (From Dealer Data)

Parts with higher dealer base cost (indicate complexity):
- DEF/DPF filters: Check for premium pricing
- SCR system parts: Rare = high margin opportunity
- Advanced emissions sensors: Dealer lock = higher retail spread

### Biodiesel-Ready Bundles

When B50 hits July 2026:

**Bundle Example:**
- Fuel Filter (Euro 4) Rp xxx,xxx
- Add Cleaner Additive Rp xx,xxx  
- Labor recommendation value Rp xx,xxx
- **Bundle Price: Rp yyy,yyy** (Save Rp zz,zzz)

---

## Part Number Prefix Intelligence

From Dealer Data Analysis:

| Prefix | Category | Typical Price | Notes |
|--------|----------|---------------|-------|
| I8-98xxx | Current generation | High | Euro 4 compliant |
| I8-97xxx | Previous gen | Medium | Pre-Euro 4 |
| I8-96xxx | Legacy | Low | Older stock |
| I1-3xxxx | Heavy-duty components | Variable | FVZ/GIGA |
| I5-87xxx | MU-X / Passenger | Medium | Car output |

---

## Data Source Notes

**Dealer Pricing Source:** i-Parts Center (admin@partcenter.com)  
**Pricing Type:** Retail Inc. PPN 11% (Consumer price with VAT)  
**IADG Column:** Alternative pricing tier (possibly workshop direct)  
**Status Column:** Stock availability indicator

---

## Next Steps

1. **Receive product list** from boss
2. **Match your part numbers** to dealer pricing
3. **Scrape Tokopedia/Shopee** for live market prices  
4. **Populate Gap Detection Matrix**
5. **Identify high-opportunity SKUs** (wide spread, low competition)
6. **Set pricing strategy** by category

---

## Related Documents

- [Concurrent Research Findings](./research-concurrent-findings.md) — Market context
- [Isuzu Catalog System](./isuzu-catalog-system.md) — Catalog access guide
- [Pricing Intel Template](./pricing-intel-template.md) — Data entry framework

---

*Generated: 11 April 2025*  
*Parts cataloged: 65*  
*Dealer prices extracted: 10*
