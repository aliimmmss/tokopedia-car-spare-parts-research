# Isuzu i-Parts Center Catalog

> Official Isuzu Indonesia Parts Catalog System
> Dealer Access Only | Last Updated: 11 April 2025

---

## Overview

| Attribute | Detail |
|-----------|--------|
| **System Name** | Isuzu i-Parts Center |
| **Access Type** | Dealer-Restricted Login |
| **Catalog URL** | https://i-partscenter.com/catalog/index.php |
| **Pricing URL** | https://i-partscenter.com/marketing/partcenter/stock/?q= |
| **Structure** | Illustration-Based (Figure-by-Figure) |
| **Total Vehicles** | 47 models across 22 categories |
| **Figures per Vehicle** | 10 technical diagrams |

---

## Access Credentials

**⚠️ CONFIDENTIAL - DEALER USE ONLY**

| Field | Value |
|-------|-------|
| Username | `admin@partcenter.com` |
| Password | `Iami12345` |
| Status | Active |

---

## Vehicle Coverage

### Commercial Vehicles (Priority)

#### TRAGA Series
| Model | Category Code | Type |
|-------|---------------|------|
| TRAGA | traga | Light Duty |
| TRAGA E4 | traga-e4 | Euro 4 Compliant |

#### ELF / N-Series
| Model | Category Code | Notes |
|-------|---------------|-------|
| NHR/NKR | n-series | Standard ELF |
| NLR/NMR | n-series | Light Duty |
| NPS81/NQR81 | n-series | Medium Duty |
| NLR85/NMR81 E4 | n-series | Euro 4 |
| NPS81/NQR81 E4 | n-series | Euro 4 |
| NQR71 | n-series | 2012 Model |

#### GIGA / F-Series
| Model | Category Code | Notes |
|-------|---------------|-------|
| FTR | f-series | Medium Duty |
| FVM | f-series | Heavy Duty |
| FVZ | f-series | Standard |
| GIGA FVZ | f-series | Premium |
| GIGA FVM | f-series | Premium |
| GIGA FVR | f-series | Premium |
| GIGA FTR | f-series | Premium |
| GIGA FRR | f-series | Premium |
| **GIGA GXZ E4** | f-series-e4 | **Euro 4 - Premium** |
| FVZ-N HP E4 | f-series-e4 | High Performance Euro 4 |
| GVZ E4 | f-series-e4 | Euro 4 |
| GVR E4 | f-series-e4 | Euro 4 |
| FVM E4 | f-series-e4 | Euro 4 |
| FVR E4 | f-series-e4 | Euro 4 |
| FTR E4 | f-series-e4 | Euro 4 |
| FRR E4 | f-series-e4 | Euro 4 |

### Passenger Vehicles

#### PANTHER
| Model | Category Code |
|-------|---------------|
| TBR541 | panther |
| TBR54 (Pickup) | pickup |

#### D-MAX
| Model | Category Code | Year |
|-------|---------------|------|
| D-MAX 2007 | d-max | 1st Gen |
| D-MAX 2012 | d-max2012 | 2nd Gen |
| D-MAX 2016 | d-max2016 | 3rd Gen |
| D-MAX 2019 | d-max2019 | Facelift |
| D-MAX 2021 1.9 E2 | d-max2021 | 1.9L E2 |
| **D-MAX 2022 1.9 E4** | d-max2022 | **Current** |
| **D-MAX 2024 1.9 E4** | d-max2024 | **Latest** |

#### MU-X
| Model | Category Code | Year |
|-------|---------------|------|
| MU-X 2014 | mu-x | 1st Gen |
| MU-X 2016 | mu-x2016 | Facelift |
| MU-X 2017 | mu-x2017 | Minor Update |
| MU-X 2019 | mu-x2019 | Facelift |
| MU-X 2021 1.9 E2 | mu-x2021 | 1.9L E2 |
| **MU-X 2022 1.9 E4** | mu-x2022 | **Current** |
| **MU-X 2022 1.9 E4 (4X2)** | mu-x2022-4x2 | **4x2 Variant** |
| **MU-X 2024 1.9 E4** | mu-x2024 | **Latest** |

---

## Catalog Structure

### Navigation Method

The catalog uses **illustration-based navigation**:

| Layer | Description | Access |
|-------|-------------|--------|
| **Homepage** | Vehicle category selection | Homepage list |
| **Figure Select** | 10 technical diagrams per vehicle | `?grpfig=N` parameter |
| **Illustration** | Interactive exploded view | Click on figure |
| **Part Table** | Detailed part information | Below illustration |

### Figure Categories

Each vehicle has **10 figures (technical diagrams)**:

| Figure | Typical Category |
|--------|------------------|
| Figure 1 | Engine & Engine Accessories |
| Figure 2 | Cooling System |
| Figure 3 | Fuel System |
| Figure 4 | Clutch & Transmission |
| Figure 5 | Propeller Shaft & Differential |
| Figure 6 | Front Axle & Suspension |
| Figure 7 | Rear Axle & Suspension |
| Figure 8 | Brake System |
| Figure 9 | Electrical System |
| Figure 10 | Body & Chassis Parts |

### URL Pattern

```
https://i-partscenter.com/catalog/illustration.php?grpfig={N}&vehicle={CATEGORY}&type={MODEL}

Example:
https://i-partscenter.com/catalog/illustration.php?grpfig=8&vehicle=traga&type=TRAGA
```

### Alternative Views

| View | URL Pattern | Use Case |
|------|-------------|----------|
| Illustration Index | `figure.php?vehicle=X&type=Y` | Quick figure overview |
| Part Number Index | `part.php?vehicle=X&type=Y` | Alphabetic part lookup |

---

## Part Data Structure

Each part listing contains:

| Field | Description | Example |
|-------|-------------|---------|
| **Figure Key** | Position reference number | `1-1`, `8-3A` |
| **Part Number** | Genuine Isuzu Part Number | `8-97371-976-0` |
| **Description** | Part name | "FILTER; OIL" |
| **Qty** | Quantity per vehicle | `1` |
| **Application** | Model/Engine applicability | `4JB1` |

---

## Pricing System

### Search URL
```
https://i-partscenter.com/marketing/partcenter/stock/?q={PART_NUMBER}
```

### Pricing Access
- Requires same login credentials
- Real-time stock availability
- Dealer net pricing (confidential)
- Supports partial number search

---

## Strategic Value

### For Your Business

| Advantage | Description |
|-----------|-------------|
| ✅ Genuine Data | Official Isuzu part numbers |
| ✅ Compatibility | Exact fitment information |
| ✅ Euro 4 Coverage | Critical for 2026+ market |
| ✅ Cross-Reference | Interchange data between models |
| ✅ OEM Pricing | Dealer cost visibility |

### High-Value Models (Commercial Focus)

| Priority | Model | Why It Matters |
|----------|-------|----------------|
| 🔥🔥🔥 | TRAGA E4 | Fleet standard, Euro 4 compliant |
| 🔥🔥🔥 | GIGA E4 Series | Heavy duty market shift |
| 🔥🔥 | ELF N-Series | High volume workshop demand |
| 🔥🔥 | GIGA FVM/FVR | Premium truck segment |
| 🔥 | Standard GIGA | Service/replacement market |

---

## Research Applications

### Use Cases

1. **Part Number Verification**
   - Cross-check marketplace listings
   - Identify counterfeit products
   - Validate seller claims

2. **Compatibility Mapping**
   - Find interchangeable parts
   - Cross-model applications
   - Identify universal components

3. **Pricing Intelligence**
   - Compare dealer cost vs retail
   - Calculate margin opportunities
   - Identify arbitrage gaps

4. **Inventory Planning**
   - High-demand part categories
   - Seasonal replacement cycles
   - Fleet maintenance patterns

---

## Security Notes

⚠️ **DEALER CONFIDENTIAL**
- Do not share credentials publicly
- Pricing data is dealer-only
- Part numbers can be referenced publicly
- Example: "Equivalent to Isuzu P/N 8-97371-976-0"

---

## Related Files

| File | Purpose |
|------|---------|
| [Vehicle Brands](../vehicle-brands.md) | All supported manufacturers |
| [Pricing Calculator](pricing-calculator.md) | Margin calculation tool |
| [Product Catalog Index](product-catalog-index.md) | Parts category overview |

---

**Last Scraped:** 11 April 2025
**Next Update:** Manual trigger
**Maintainer:** Dealer Operations
