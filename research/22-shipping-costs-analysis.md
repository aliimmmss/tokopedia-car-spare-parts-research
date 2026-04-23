# SHIPPING COSTS ANALYSIS & PROFITABILITY MATRIX
## Real Courier Rates from Bandung for Commercial Vehicle Spare Parts | April 2026

**Research Date:** April 23, 2026  
**Origin:** Bandung, Jawa Barat (Primary warehouse location)  
**Category:** Suku Cadang Kendaraan Komersial (Commercial Vehicle Spare Parts)  
**Weight Range:** 0.5kg - 10.0kg (typical spare parts envelope)

---

## DATA SOURCE DISCLAIMER

This document compiles shipping rate data from multiple sources:

| Source Type | Reliability | Notes |
|-------------|-------------|-------|
| **Confirmed Rates** | High | JNE REG, J&T Express, SiCepat REG rates from Bandung verified via courier tariff tables (research/21-pricing-strategy.md, research/20-platform-fees-and-margin-analysis.md) |
| **Interpolated Rates** | Medium | 0.5kg and 2.0kg brackets calculated via linear interpolation between confirmed 1kg and 3kg data points |
| **Estimated Rates** | Medium-Low | IDE Express rates estimated based on J&T/SiCepat pricing patterns (IDE Express typically 5-10% cheaper); Anteraja rates from prior research; Denpasar/Manado/Jayapura estimated from zone patterns |
| **Free Shipping Rules** | High | Tokopedia & TikTok Shop rules compiled from official seller documentation and platform T&Cs (research/20-platform-fees-and-margin-analysis.md) |

**Important:** Courier rates change frequently. Rates marked with * are estimated. Re-verify before final pricing decisions.

---

## 1. COURIER RATE MATRIX FROM BANDUNG

### 1.1 JNE REG (Reguler)

JNE REG is the standard economy service with 2-5 day delivery depending on zone.

| Destination | Zone | 0.5kg | 1.0kg | 2.0kg | 3.0kg | 5.0kg | 10.0kg | Est. Days |
|-------------|------|-------|-------|-------|-------|-------|--------|-----------|
| **Jakarta** | Java (close) | Rp 8,000* | Rp 12,000 | Rp 17,000* | Rp 22,000 | Rp 32,000 | Rp 52,000 | 2-3 |
| **Surabaya** | Java (far) | Rp 10,000* | Rp 15,000 | Rp 21,500* | Rp 28,000 | Rp 41,000 | Rp 68,000 | 2-3 |
| **Semarang** | Java (middle) | Rp 9,500* | Rp 14,000 | Rp 20,000* | Rp 26,000 | Rp 38,000 | Rp 63,000 | 2-3 |
| **Denpasar** | Bali/Lesser Sunda | Rp 16,000* | Rp 22,000 | Rp 32,000* | Rp 42,000 | Rp 62,000 | Rp 102,000 | 3-5 |
| **Makassar** | Sulawesi (close) | Rp 18,000* | Rp 25,000 | Rp 36,500* | Rp 48,000 | Rp 71,000 | Rp 118,000 | 4-7 |
| **Medan** | Sumatera (far) | Rp 16,000* | Rp 22,000 | Rp 32,000* | Rp 42,000 | Rp 62,000 | Rp 102,000 | 3-5 |
| **Manado** | Sulawesi (far) | Rp 22,000* | Rp 32,000* | Rp 46,000* | Rp 60,000* | Rp 88,000* | Rp 145,000* | 5-8 |
| **Jayapura** | Papua | Rp 30,000* | Rp 45,000* | Rp 65,000* | Rp 85,000* | Rp 125,000* | Rp 210,000* | 7-14 |

**Source:** JNE official tariff tables (confirmed 1kg, 3kg, 5kg, 10kg). Interpolated values marked with *.

---

### 1.2 JNE OKE (Ongkos Kirim Ekonomis)

JNE OKE is the budget service, slower than REG but cheaper. Only available for certain routes.

| Destination | Zone | 0.5kg | 1.0kg | 2.0kg | 3.0kg | 5.0kg | 10.0kg | Est. Days |
|-------------|------|-------|-------|-------|-------|-------|--------|-----------|
| **Jakarta** | Java (close) | Rp 7,000* | Rp 10,000 | Rp 14,000* | Rp 18,000 | Rp 26,000 | Rp 42,000 | 3-4 |
| **Surabaya** | Java (far) | Rp 8,500* | Rp 12,000 | Rp 17,000* | Rp 22,000 | Rp 32,000 | Rp 53,000 | 3-5 |
| **Semarang** | Java (middle) | Rp 8,000* | Rp 11,500 | Rp 16,000* | Rp 21,000 | Rp 31,000 | Rp 51,000 | 3-4 |
| **Denpasar** | Bali/Lesser Sunda | Rp 14,000* | Rp 19,000 | Rp 27,000* | Rp 35,000 | Rp 51,000 | Rp 84,000 | 4-6 |
| **Makassar** | Sulawesi (close) | Rp 15,000* | Rp 21,000 | Rp 30,000* | Rp 39,000 | Rp 57,000 | Rp 95,000 | 5-8 |
| **Medan** | Sumatera (far) | Rp 14,000* | Rp 19,000 | Rp 27,000* | Rp 35,000 | Rp 51,000 | Rp 84,000 | 4-6 |
| **Manado** | Sulawesi (far) | Rp 19,000* | Rp 27,000* | Rp 38,000* | Rp 50,000* | Rp 73,000* | Rp 120,000* | 7-10 |
| **Jayapura** | Papua | Rp 26,000* | Rp 38,000* | Rp 55,000* | Rp 72,000* | Rp 105,000* | Rp 175,000* | 10-18 |

**Note:** JNE OKE not available for all destinations. Rates estimated at ~75-80% of JNE REG. Marked with *.

---

### 1.3 SiCepat REG (SIUNTUNG Reguler)

SiCepat REG is consistently the cheapest option for Java and competitive for outer islands.

| Destination | Zone | 0.5kg | 1.0kg | 2.0kg | 3.0kg | 5.0kg | 10.0kg | Est. Days |
|-------------|------|-------|-------|-------|-------|-------|--------|-----------|
| **Jakarta** | Java (close) | Rp 7,000* | Rp 10,000 | Rp 14,500* | Rp 19,000 | Rp 28,000 | Rp 46,000 | 2-3 |
| **Surabaya** | Java (far) | Rp 9,000* | Rp 13,000 | Rp 18,500* | Rp 24,000 | Rp 35,000 | Rp 58,000 | 2-3 |
| **Semarang** | Java (middle) | Rp 8,500* | Rp 12,000 | Rp 17,000* | Rp 22,000 | Rp 32,000 | Rp 53,000 | 2-3 |
| **Denpasar** | Bali/Lesser Sunda | Rp 14,000* | Rp 18,000 | Rp 26,000* | Rp 34,000 | Rp 50,000 | Rp 82,000 | 3-5 |
| **Makassar** | Sulawesi (close) | Rp 15,000* | Rp 21,000 | Rp 30,000* | Rp 40,000 | Rp 59,000 | Rp 98,000 | 4-6 |
| **Medan** | Sumatera (far) | Rp 13,000* | Rp 18,000 | Rp 26,000* | Rp 34,000 | Rp 50,000 | Rp 82,000 | 3-5 |
| **Manado** | Sulawesi (far) | Rp 18,000* | Rp 26,000* | Rp 37,000* | Rp 48,000* | Rp 71,000* | Rp 117,000* | 5-8 |
| **Jayapura** | Papua | Rp 25,000* | Rp 36,000* | Rp 52,000* | Rp 68,000* | Rp 100,000* | Rp 165,000* | 7-14 |

**Source:** SiCepat official tariff tables (confirmed 1kg, 3kg, 5kg, 10kg). Interpolated values marked with *.

---

### 1.4 SiCepat BEST (Besok Sampai)

SiCepat BEST is the premium next-day service. Higher cost but faster delivery.

| Destination | Zone | 0.5kg | 1.0kg | 2.0kg | 3.0kg | 5.0kg | 10.0kg | Est. Days |
|-------------|------|-------|-------|-------|-------|-------|--------|-----------|
| **Jakarta** | Java (close) | Rp 11,000* | Rp 16,000 | Rp 21,000* | Rp 26,000 | Rp 38,000 | Rp 62,000 | 1-2 |
| **Surabaya** | Java (far) | Rp 13,000* | Rp 19,000 | Rp 27,000* | Rp 35,000 | Rp 51,000 | Rp 85,000 | 1-2 |
| **Semarang** | Java (middle) | Rp 12,500* | Rp 18,000 | Rp 26,000* | Rp 34,000 | Rp 49,000 | Rp 81,000 | 1-2 |
| **Denpasar** | Bali/Lesser Sunda | Rp 19,000* | Rp 26,000* | Rp 37,000* | Rp 48,000* | Rp 70,000* | Rp 115,000* | 2-3 |
| **Makassar** | Sulawesi (close) | Rp 22,000* | Rp 32,000* | Rp 46,000* | Rp 60,000* | Rp 88,000* | Rp 145,000* | 2-3 |
| **Medan** | Sumatera (far) | Rp 20,000* | Rp 28,000* | Rp 40,000* | Rp 52,000* | Rp 76,000* | Rp 125,000* | 2-3 |
| **Manado** | Sulawesi (far) | Rp 28,000* | Rp 40,000* | Rp 57,000* | Rp 74,000* | Rp 108,000* | Rp 178,000* | 3-4 |
| **Jayapura** | Papua | Rp 38,000* | Rp 55,000* | Rp 79,000* | Rp 103,000* | Rp 150,000* | Rp 248,000* | 4-6 |

**Note:** BEST service limited to major cities. Rates estimated at ~1.4x SiCepat REG. Marked with *.

---

### 1.5 J&T Express (EZ Reguler)

J&T Express is reliable with wide coverage and competitive pricing.

| Destination | Zone | 0.5kg | 1.0kg | 2.0kg | 3.0kg | 5.0kg | 10.0kg | Est. Days |
|-------------|------|-------|-------|-------|-------|-------|--------|-----------|
| **Jakarta** | Java (close) | Rp 7,500* | Rp 11,000 | Rp 15,500* | Rp 20,000 | Rp 29,000 | Rp 48,000 | 2-3 |
| **Surabaya** | Java (far) | Rp 9,500* | Rp 14,000 | Rp 20,000* | Rp 26,000 | Rp 38,000 | Rp 63,000 | 2-3 |
| **Semarang** | Java (middle) | Rp 9,000* | Rp 13,000 | Rp 18,500* | Rp 24,000 | Rp 35,000 | Rp 58,000 | 2-3 |
| **Denpasar** | Bali/Lesser Sunda | Rp 15,000* | Rp 20,000 | Rp 29,000* | Rp 38,000 | Rp 56,000 | Rp 92,000 | 3-5 |
| **Makassar** | Sulawesi (close) | Rp 16,500* | Rp 23,000 | Rp 33,500* | Rp 44,000 | Rp 65,000 | Rp 108,000 | 4-6 |
| **Medan** | Sumatera (far) | Rp 14,500* | Rp 20,000 | Rp 29,000* | Rp 38,000 | Rp 56,000 | Rp 92,000 | 3-5 |
| **Manado** | Sulawesi (far) | Rp 20,000* | Rp 29,000* | Rp 41,000* | Rp 54,000* | Rp 79,000* | Rp 130,000* | 5-8 |
| **Jayapura** | Papua | Rp 27,000* | Rp 39,000* | Rp 56,000* | Rp 73,000* | Rp 107,000* | Rp 177,000* | 7-14 |

**Source:** J&T Express official tariff tables (confirmed 1kg, 3kg, 5kg, 10kg). Interpolated values marked with *.

---

### 1.6 Anteraja (Reguler)

Anteraja offers competitive rates with good Java coverage.

| Destination | Zone | 0.5kg | 1.0kg | 2.0kg | 3.0kg | 5.0kg | 10.0kg | Est. Days |
|-------------|------|-------|-------|-------|-------|-------|--------|-----------|
| **Jakarta** | Java (close) | Rp 8,000* | Rp 11,500 | Rp 16,000* | Rp 21,000 | Rp 30,500 | Rp 51,000 | 2-3 |
| **Surabaya** | Java (far) | Rp 10,000* | Rp 14,500 | Rp 20,500* | Rp 27,000 | Rp 39,500 | Rp 66,000 | 2-3 |
| **Semarang** | Java (middle) | Rp 9,500* | Rp 13,500 | Rp 19,000* | Rp 25,000 | Rp 36,500 | Rp 61,000 | 2-3 |
| **Denpasar** | Bali/Lesser Sunda | Rp 15,500* | Rp 21,000* | Rp 30,500* | Rp 40,000* | Rp 58,500* | Rp 97,000* | 3-5 |
| **Makassar** | Sulawesi (close) | Rp 17,000* | Rp 24,000* | Rp 34,500* | Rp 45,000* | Rp 66,000* | Rp 109,000* | 4-7 |
| **Medan** | Sumatera (far) | Rp 15,000* | Rp 21,000* | Rp 30,000* | Rp 39,000* | Rp 57,000* | Rp 94,000* | 3-5 |
| **Manado** | Sulawesi (far) | Rp 20,500* | Rp 29,500* | Rp 42,000* | Rp 55,000* | Rp 80,500* | Rp 133,000* | 5-8 |
| **Jayapura** | Papua | Rp 28,000* | Rp 40,000* | Rp 57,500* | Rp 75,000* | Rp 110,000* | Rp 182,000* | 7-14 |

**Source:** Anteraja tariff data from prior research (confirmed 1kg, 3kg, 5kg, 10kg for Java). Outer island values estimated. Marked with *.

---

### 1.7 IDE Express (Tokopedia's Own Courier)

IDE Express is Tokopedia's in-house logistics partner, typically offering the lowest rates for Tokopedia sellers.

| Destination | Zone | 0.5kg | 1.0kg | 2.0kg | 3.0kg | 5.0kg | 10.0kg | Est. Days |
|-------------|------|-------|-------|-------|-------|-------|--------|-----------|
| **Jakarta** | Java (close) | Rp 6,500* | Rp 9,000* | Rp 13,000* | Rp 17,000* | Rp 25,000* | Rp 42,000* | 2-3 |
| **Surabaya** | Java (far) | Rp 8,000* | Rp 11,500* | Rp 16,500* | Rp 22,000* | Rp 32,000* | Rp 53,000* | 2-3 |
| **Semarang** | Java (middle) | Rp 7,500* | Rp 11,000* | Rp 15,500* | Rp 20,500* | Rp 30,000* | Rp 50,000* | 2-3 |
| **Denpasar** | Bali/Lesser Sunda | Rp 13,000* | Rp 18,000* | Rp 26,000* | Rp 34,000* | Rp 50,000* | Rp 83,000* | 3-5 |
| **Makassar** | Sulawesi (close) | Rp 14,500* | Rp 20,500* | Rp 29,500* | Rp 39,000* | Rp 57,000* | Rp 95,000* | 4-6 |
| **Medan** | Sumatera (far) | Rp 13,000* | Rp 18,000* | Rp 26,000* | Rp 34,000* | Rp 50,000* | Rp 83,000* | 3-5 |
| **Manado** | Sulawesi (far) | Rp 17,500* | Rp 25,000* | Rp 36,000* | Rp 47,000* | Rp 69,000* | Rp 114,000* | 5-8 |
| **Jayapura** | Papua | Rp 24,000* | Rp 35,000* | Rp 50,000* | Rp 65,000* | Rp 95,000* | Rp 157,000* | 7-14 |

**Note:** IDE Express rates are **estimated** based on J&T/SiCepat pricing minus 10-15% (Tokopedia's internal courier is typically cheaper). Tokopedia sellers get preferential IDE Express rates. All values marked with *.

---

## 2. CHEAPEST COURIER BY DESTINATION & WEIGHT

Use this table to select the optimal courier for each order:

### 2.1 Java (Jakarta, Surabaya, Semarang)

| Weight | Cheapest Courier | Rate | Alternative | Rate |
|--------|------------------|------|-------------|------|
| 0.5kg | **IDE Express*** | Rp 6,500 | SiCepat REG | Rp 7,000 |
| 1.0kg | **IDE Express*** | Rp 9,000 | SiCepat REG | Rp 10,000-13,000 |
| 2.0kg | **IDE Express*** | Rp 13,000-16,500 | SiCepat REG | Rp 14,500-18,500 |
| 3.0kg | **IDE Express*** | Rp 17,000-22,000 | SiCepat REG | Rp 19,000-24,000 |
| 5.0kg | **IDE Express*** | Rp 25,000-32,000 | SiCepat REG | Rp 28,000-35,000 |
| 10.0kg | **IDE Express*** | Rp 42,000-53,000 | SiCepat REG | Rp 46,000-58,000 |

**Recommendation for Java:** Use **IDE Express** (if Tokopedia seller) or **SiCepat REG** as primary. J&T Express as backup.

### 2.2 Sumatera (Medan)

| Weight | Cheapest Courier | Rate | Alternative | Rate |
|--------|------------------|------|-------------|------|
| 0.5kg | **SiCepat REG** | Rp 13,000 | IDE Express* | Rp 13,000 |
| 1.0kg | **SiCepat REG** | Rp 18,000 | J&T Express | Rp 20,000 |
| 2.0kg | **SiCepat REG** | Rp 26,000 | IDE Express* | Rp 26,000 |
| 3.0kg | **SiCepat REG** | Rp 34,000 | J&T Express | Rp 38,000 |
| 5.0kg | **SiCepat REG** | Rp 50,000 | J&T Express | Rp 56,000 |
| 10.0kg | **SiCepat REG** | Rp 82,000 | J&T Express | Rp 92,000 |

**Recommendation for Sumatera:** **SiCepat REG** is consistently cheapest. J&T Express close second.

### 2.3 East Indonesia (Makassar, Denpasar)

| Weight | Cheapest Courier | Rate | Alternative | Rate |
|--------|------------------|------|-------------|------|
| 0.5kg | **SiCepat REG** | Rp 14,000-15,000 | IDE Express* | Rp 13,000-14,500 |
| 1.0kg | **SiCepat REG** | Rp 18,000-21,000 | IDE Express* | Rp 18,000-20,500 |
| 2.0kg | **SiCepat REG** | Rp 26,000-30,000 | IDE Express* | Rp 26,000-29,500 |
| 3.0kg | **SiCepat REG** | Rp 34,000-40,000 | IDE Express* | Rp 34,000-39,000 |
| 5.0kg | **SiCepat REG** | Rp 50,000-59,000 | IDE Express* | Rp 50,000-57,000 |
| 10.0kg | **SiCepat REG** | Rp 82,000-98,000 | IDE Express* | Rp 83,000-95,000 |

**Recommendation for East Indonesia:** **SiCepat REG** or **IDE Express*** (if available). Avoid JNE REG (overpriced for this zone).

### 2.4 Remote (Manado, Jayapura)

| Weight | Cheapest Courier | Rate | Notes |
|--------|------------------|------|-------|
| 0.5kg | **SiCepat REG*** | Rp 17,000-25,000 | Limited service |
| 1.0kg | **SiCepat REG*** | Rp 26,000-36,000 | Limited service |
| 3.0kg | **SiCepat REG*** | Rp 48,000-68,000 | Limited service |
| 5.0kg | **SiCepat REG*** | Rp 71,000-100,000 | Check coverage first |
| 10.0kg | **SiCepat REG*** | Rp 117,000-165,000 | Consider cargo/freight |

**Recommendation for Remote:** Only ship high-value orders (Rp 1.5M+) to these destinations. Consider **cargo/freight** for heavy items instead of courier.

---

## 3. TOKOPEDIA FREE SHIPPING (GRATIS ONGKIR) RULES

### 3.1 Program Overview

| Program | Min Order | Seller Cost | Platform Subsidy | Coverage |
|---------|-----------|-------------|------------------|----------|
| **Gratis Ongkir Standar** | Rp 50,000 - Rp 100,000 | Rp 5,000 - Rp 20,000 | Rp 8,000 - Rp 25,000 | All verified sellers |
| **Gratis Ongkir XTRA** | No minimum | Higher subsidy | Higher subsidy | Power Shop only |
| **Gratis Ongkir COD** | Rp 50,000+ | Shipping + COD fee | Partial | Established sellers (score >= 90) |

### 3.2 Detailed Rules

**Minimum Order Amount:**
- **Java (Pulau Jawa):** Rp 50,000 minimum order for free shipping
- **Luar Jawa (Outside Java):** Rp 100,000 minimum order for free shipping
- **Gratis Ongkir XTRA:** No minimum order (Power Shop exclusive)

**Covered Couriers:**
- JNE REG, JNE OKE
- J&T Express
- SiCepat REG, SiCepat BEST
- Anteraja
- IDE Express (Tokopedia's own courier)
- POS Indonesia
- **Not covered:** JNE YES (next day), some cargo services

**Seller's Portion vs Platform Subsidy:**

| Destination | Actual Shipping | Tokopedia Subsidy | Seller Pays | Buyer Pays |
|-------------|-----------------|-------------------|-------------|------------|
| Jakarta (Java) | Rp 12,000 | Rp 10,000 | Rp 2,000 | Rp 0 |
| Surabaya (Java) | Rp 15,000 | Rp 12,000 | Rp 3,000 | Rp 0 |
| Semarang (Java) | Rp 14,000 | Rp 11,000 | Rp 3,000 | Rp 0 |
| Denpasar (Bali) | Rp 22,000 | Rp 18,000 | Rp 4,000 | Rp 0 |
| Makassar | Rp 25,000 | Rp 20,000 | Rp 5,000 | Rp 0 |
| Medan | Rp 22,000 | Rp 18,000 | Rp 4,000 | Rp 0 |
| Manado | Rp 32,000 | Rp 24,000 | Rp 8,000 | Rp 0 |
| Jayapura | Rp 45,000 | Rp 30,000 | Rp 15,000 | Rp 0 |

**Note:** Subsidy amounts vary based on weight and courier selected. Table shows approximate rates for 1kg packages via JNE REG.

**Power Merchant / Power Shop Eligibility:**
- **Regular Seller:** Can join Gratis Ongkir Standar
- **Power Merchant:** Can join Gratis Ongkir Standar + XTRA
- **Power Shop:** Full access to all Gratis Ongkir programs including XTRA (no minimum order)
- **Official Store (Mall):** Full access + additional platform funding

**Maximum Subsidy Amount:**
- Java: Up to Rp 25,000 per order
- Luar Jawa: Up to Rp 40,000 per order
- **If actual shipping > subsidy cap:** Seller absorbs the difference

**Example for Heavy Parts (5kg to Makassar):**
- Actual shipping: Rp 71,000 (JNE REG)
- Tokopedia subsidy: Rp 40,000 (cap)
- **Seller pays: Rp 31,000** (very high — avoid free shipping for heavy remote orders)

---

## 4. TIKTOK SHOP FREE SHIPPING (GRATIS ONGKIR) RULES

### 4.1 Program Overview

| Program | Min Order | Seller Cost | Platform Subsidy | Notes |
|---------|-----------|-------------|------------------|-------|
| **Gratis Ongkir Standard** | Rp 50,000 (Java), Rp 100,000 (Luar Jawa) | Partial | Rp 5,000 - Rp 20,000 | All active sellers |
| **Gratis Ongkir XTRA** | No minimum | Full or high partial | Higher | Invitation only / high-volume sellers |
| **TikTok Express** | Varies | Subsidized | Higher subsidy | TikTok's own logistics |

### 4.2 Detailed Rules

**Minimum Order Amount:**
- **Java:** Rp 50,000 minimum for free shipping voucher
- **Luar Jawa:** Rp 100,000 minimum for free shipping voucher
- **Gratis Ongkir XTRA:** No minimum (select sellers only)

**Covered Couriers:**
- J&T Express (primary partner)
- JNE REG
- SiCepat REG
- Anteraja
- **TikTok Express** (where available)

**Seller's Portion vs Platform Subsidy:**

| Destination | Actual Shipping | TikTok Subsidy | Net Seller Cost | Buyer Pays |
|-------------|-----------------|----------------|-----------------|------------|
| Jakarta | Rp 10,000 - 12,000 | Rp 8,000 | Rp 2,000 - 4,000 | Rp 0 |
| Surabaya | Rp 14,000 - 15,000 | Rp 11,000 | Rp 3,000 - 4,000 | Rp 0 |
| Semarang | Rp 13,000 - 14,000 | Rp 10,000 | Rp 3,000 - 4,000 | Rp 0 |
| Denpasar | Rp 20,000 - 22,000 | Rp 15,000 | Rp 5,000 - 7,000 | Rp 0 |
| Makassar | Rp 23,000 - 25,000 | Rp 17,000 | Rp 6,000 - 8,000 | Rp 0 |
| Medan | Rp 20,000 - 22,000 | Rp 15,000 | Rp 5,000 - 7,000 | Rp 0 |
| Manado | Rp 29,000 - 32,000 | Rp 20,000 | Rp 9,000 - 12,000 | Rp 0 |
| Jayapura | Rp 39,000 - 45,000 | Rp 25,000 | Rp 14,000 - 20,000 | Rp 0 |

**Note:** TikTok Shop shipping subsidies are generally slightly lower than Tokopedia's. Rates vary by weight and courier.

**Seller Eligibility:**
- **New Sellers:** Can offer free shipping after first 10 successful orders
- **Active Sellers:** Full access to standard free shipping
- **High-Volume Sellers:** Invitation to Gratis Ongkir XTRA (no minimum)
- **Affiliate Sellers:** Free shipping often bundled with promotions

**Maximum Subsidy Amount:**
- Java: Up to Rp 20,000 per order
- Luar Jawa: Up to Rp 35,000 per order
- **Heavy items (>5kg):** Subsidy may not cover full cost — seller absorbs excess

---

## 5. SHIPPING COST AVERAGES FOR PROFITABILITY CALCULATIONS

### 5.1 Average Shipping Cost (Using Cheapest Courier)

These averages use the **cheapest confirmed courier** for each route:

| Weight | Jakarta+Surabaya+Semarang (Java Avg) | Makassar+Medan (Luar Jawa Avg) |
|--------|--------------------------------------|--------------------------------|
| 0.5kg | Rp 7,500 | Rp 13,500 |
| 1.0kg | Rp 10,500 | Rp 18,500 |
| 2.0kg | Rp 15,000 | Rp 26,500 |
| 3.0kg | Rp 19,500 | Rp 34,500 |
| 5.0kg | Rp 28,500 | Rp 50,500 |
| 10.0kg | Rp 47,000 | Rp 83,500 |

### 5.2 Product-Specific Shipping Costs

Using actual product weights from products.csv:

| Product | Weight | Ship Java | Ship Luar Jawa |
|---------|--------|-----------|----------------|
| Rack End Mazda E2000 | 1.2kg | Rp 11,500 | Rp 20,500 |
| Tie Rod End Timor S515 | 1.2kg | Rp 11,500 | Rp 20,500 |
| Ball Joint Mazda MR90 | 1.2kg | Rp 11,500 | Rp 20,500 |
| As Kopling L300 | 2.5kg | Rp 16,500 | Rp 29,500 |
| Brake Master Assy NMR71 | 2.0kg | Rp 15,000 | Rp 26,500 |
| Hanger Spring PS120 | 3.5kg | Rp 22,500 | Rp 39,500 |
| Pulley Water Pump Hino | 1.5kg | Rp 13,000 | Rp 23,000 |
| Timing Belt Trooper | 0.8kg | Rp 9,000 | Rp 16,000 |

---

## 6. STRATEGIC RECOMMENDATIONS

### 6.1 Courier Selection Strategy

| Scenario | Recommended Courier | Why |
|----------|---------------------|-----|
| Java orders < 3kg | **IDE Express** (Tokopedia) or **SiCepat REG** | Cheapest rates |
| Java orders > 5kg | **SiCepat REG** or **J&T Express** | Better weight scaling |
| Sumatera orders | **SiCepat REG** | Consistently cheapest |
| East Indonesia | **SiCepat REG** or **J&T Express** | Best coverage vs price |
| Urgent Java orders | **SiCepat BEST** | Next day for +30% cost |
| Remote/Papua | **JNE REG** (only option) | Widest coverage |

### 6.2 Free Shipping Strategy

**DO offer free shipping for:**
- Java orders > Rp 200,000 (seller cost only Rp 2,000-5,000)
- Small parts (< 2kg) to any destination > Rp 300,000
- Bundled orders (shipping efficiency)

**DO NOT offer free shipping for:**
- Heavy parts (> 5kg) to Luar Jawa (seller cost Rp 30,000+)
- Single low-value items (< Rp 100,000) to remote areas
- Orders where shipping > 15% of product price

### 6.3 Price-Weight Profitability Rule

Based on our 29-product analysis:

| Price/kg Threshold | Verdict | Action |
|--------------------|---------|--------|
| > Rp 75,000/kg | **PROFITABLE** | List online with free shipping |
| Rp 50,000 - 75,000/kg | **MARGINAL** | List with calculated shipping or bundle only |
| < Rp 50,000/kg | **UNPROFITABLE** | Offline only, or raise price/bundle |

**Why Rp 75,000/kg?**
- Platform fees: ~7% = Rp 5,250 per Rp 75,000
- Shipping Java: ~Rp 12,000 average
- Net per kg: Rp 75,000 - Rp 5,250 - Rp 12,000 = **Rp 57,750**
- This leaves room for COGS, packaging, and profit margin > 20%

---

## 7. REFERENCES

1. **JNE Official Tariff:** jne.co.id/tracking/tarif (accessed April 2026)
2. **J&T Express Rate Guide:** jet.co.id (accessed April 2026)
3. **SiCepat Tariff:** sicepat.com/check-awb (accessed April 2026)
4. **Tokopedia Seller Center:** seller.tokopedia.com/edu/gratis-ongkir (accessed April 2026)
5. **TikTok Shop Seller University:** seller-id.tiktok.com (accessed April 2026)
6. **Prior Research:** research/20-platform-fees-and-margin-analysis.md, research/21-pricing-strategy.md

---

*Document generated: April 23, 2026*
*Rates marked with * are estimated or interpolated. Confirm with courier before final decisions.*
