# Online Store Operations Manual
## 36-Step Day-to-Day Playbook for Commercial Vehicle Spare Parts

**Version:** 1.0  
**Date:** April 2026  
**For:** Family Business — Online Store Expansion  
**Purpose:** Step-by-step operational guide from order to monthly reconciliation

---

## Table of Contents

- [Section 1: Daily Operations (Steps 1-14)](#section-1-daily-operations)
- [Section 2: Weekly Operations (Steps 15-22)](#section-2-weekly-operations)
- [Section 3: Monthly Operations (Steps 23-30)](#section-3-monthly-operations)
- [Section 4: Emergency Procedures (Steps 31-36)](#section-4-emergency-procedures)
- [Checklists & Templates](#checklists--templates)

---

## SECTION 1: DAILY OPERATIONS

### Step 1 — START OF DAY: Check Notifications (5 minutes)

**When:** Arrive at store / Open phone
**Who:** Online Operations Manager (Son)

**Checklist:**
- [ ] Open Telegram Order Bot (`/status` command)
- [ ] Review overnight order notifications
- [ ] Check Tokopedia Seller App for pending orders
- [ ] Check TikTok Shop Seller App for pending orders
- [ ] Note orders that need processing today

**Output:** List of orders to process for the day

**Decision Point:**
- 0-5 orders: Normal day
- 6-15 orders: Busy day — prioritize packaging
- 15+ orders: Very busy — may need warehouse help

---

### Step 2 — Verify Payment Status (10 minutes)

**When:** After Step 1
**Who:** Online Operations Manager

**For Each New Order:**
1. Check payment method:
   - **Auto:** Transfer/wallet (already paid) → Proceed
   - **COD:** Cash on delivery → Mark for packaging
   - **Pending:** Waiting for payment → Hold, check again in 2 hours

2. Verify payment amount matches order total
3. Screenshot payment confirmation
4. Update order tracking spreadsheet

**Template Update:**
| Order ID | Platform | Amount | Status | Action |
|----------|----------|--------|--------|--------|
| 12345 | Tokopedia | 350K | Paid | Package today |
| 12346 | TikTok | 280K | Pending | Wait 2h |

---

### Step 3 — Prepare Packaging Materials (15 minutes)

**When:** Before first order
**Who:** Fulfillment Assistant / Warehouse Staff

**Checklist:**
- [ ] Cardboard boxes (various sizes):
  - Small parts: 15x10x5 cm
  - Medium: 20x15x10 cm
  - Large: 30x20x15 cm
- [ ] Bubble wrap rolls (available at station)
- [ ] Packing tape dispenser
- [ ] Fragile stickers (for alternators, lighting)
- [ ] Airway bill pouches (for AWB attachment)
- [ ] Labels and markers

**Reorder Point:** When any stock below 20 units

---

### Step 4 — Pick Items from Warehouse (Per Order: 10-15 min)

**When:** Order is paid and confirmed
**Who:** Fulfillment Assistant

**Procedure:**
1. Print or write order slip with:
   - Order ID
   - Product name + part number
   - Quantity
   - Customer name (coded for privacy)

2. Locate item in warehouse:
   - Use bin location system (e.g., A-12 = Shelf A, Bin 12)
   - Verify part number matches exactly
   - Check physical condition
   - Count quantity

**Quality Check:**
- [ ] Part number matches
- [ ] No visible damage
- [ ] Quantity correct
- [ ] Clean (wipe if dusty)

**If Item Not Found:**
- Check adjacent bins
- Look in "receiving" area
- Check with inventory manager
- Do NOT substitute without approval

---

### Step 5 — Photograph Before Packaging (3 minutes)

**When:** Items picked, before packing
**Who:** Fulfillment Assistant

**Why:** Documentation for disputes

**Procedure:**
1. Place item(s) on plain surface
2. Photograph showing:
   - Product clearly visible
   - Part number visible
   - Quantity visible
   - Good lighting

3. Save to folder: `order_photos/YYYYMMDD/`
4. Filename: `[order_id]_[part_number].jpg`

---

### Step 6 — Package Order (Per Order: 15-25 min)

**When:** Items photographed
**Who:** Fulfillment Assistant

**Packaging Levels:**

**Level 1 — Light (gaskets, bolts, filters under 1kg):**
- Bubble wrap 2 layers
- Place in poly box
- Seal with tape

**Level 2 — Standard (brake pads, filters 1-3kg):**
- Bubble wrap 3 layers
- Cardboard corner protectors
- Place in box with 2cm padding on all sides
- Seal with tape (H pattern on top)

**Level 3 — Fragile (alternators, starters, lighting 3kg+):**
- Bubble wrap 4+ layers
- Foam or cardboard inserts
- Vibration absorbing material
- "FRAGILE" sticker on box
- Double-box if over Rp 1M value

**Include in Package:**
- [ ] Product(s)
- [ ] Packing slip (order summary)
- [ ] Business card (optional)
- [ ] Thank you note (optional)

**DO NOT Include:**
- Original receipts (customer invoice only)
- Promotional materials without approval

---

### Step 7 — Weigh and Measure Package (2 minutes)

**When:** Package sealed
**Who:** Fulfillment Assistant

**Procedure:**
1. Place on digital scale
2. Record: Weight in kg (round up to nearest 0.1kg)
3. Measure: Length x Width x Height in cm
4. Write on package or label

**Decision: Courier Selection**

| Weight | Courier | Notes |
|--------|---------|-------|
| <1 kg | JNE/SiCepat | Cheapest |
| 1-5 kg | J&T | Fast, reliable |
| 5-10 kg | JNE Truck | For heavy parts |
| >10 kg | Discussion | May need special handling |

---

### Step 8 — Generate Airway Bill (5-10 minutes)

**When:** Package ready to ship
**Who:** Online Operations Manager

**Via Tokopedia Seller Center:**
1. Login → Orders → [Order ID]
2. Click "Cetak Label"
3. Verify:
   - Customer address matches
   - Weight entered correctly
   - Courier selected
4. Download PDF label
5. Print on A6 or A4 paper

**Via TikTok Shop Seller Center:**
1. Login → Orders → To Ship
2. Select order → "Print Shipping Label"
3. Follow same verification steps

**If Order is Split:**
- Check if customer OK with multiple packages
- Create separate labels
- Note "1 of 2", "2 of 2" on packages

---

### Step 9 — Attach Airway Bill (3 minutes)

**When:** AWB printed
**Who:** Fulfillment Assistant

**Procedure:**
1. Fold AWB if necessary
2. Place in clear pouch (airway bill pouch)
3. Attach to package with tape
4. Ensure barcode visible and not crinkled

**Alternative (no pouch):**
- Print on adhesive label paper
- Stick directly on box

---

### Step 10 — Update Order Status (2 minutes)

**When:** AWB attached
**Who:** Online Operations Manager

**Tokopedia:**
1. Order detail → "Perbarui Status"
2. Select: "Dikirim" / "Shipped"
3. Enter AWB number
4. Select courier
5. Save

**TikTok Shop:**
1. Order → "Ship"
2. Confirm AWB
3. Update status

**Template Update:**
| Order ID | AWB | Courier | Status | Estimated |
|----------|-----|---------|--------|-----------|
| 12345 | JNE12345 | JNE REG | Shipped | 3 days |

---

### Step 11 — Arrange Pickup / Drop Off (5 minutes)

**When:** Package ready
**Who:** Fulfillment Assistant or Courier pickup

**Option A — Pickup (Best for 5+ orders/day):**
- Schedule with courier via app
- Time slots: 2PM, 5PM
- Prepare all packages at designated pickup point
- Check each AWB with courier

**Option B — Drop Off:**
- Nearest drop point: [LOCATION]
- Operating hours: 8AM-6PM
- Bring packages + pickup list

**Daily Cutoff:** 5PM for next-day shipping

---

### Step 12 — Customer Communication (Per Order: 2-3 min)

**When:** Order shipped
**Who:** Online Operations Manager

**Message Template (Tokopedia Chat):**
```
Halo [Nama],

Order #[ID] sudah dikirim hari ini.

Resi: [AWB NUMBER]
Kurir: [COURIER]
Estimasi: [X] hari

Silakan tracking di website [COURIER] atau cek langsung di Tokopedia.
Terima kasih! 🙏

[LUXOR AUTO PARTS]
```

**Message Template (TikTok Chat):**
```
Hi! Your order #[ID] is on the way! 📦

Tracking: [AWB]
Courier: [COURIER]
ETA: [X] days

Thanks for your order! ⭐
```

**Timing:** Within 1 hour of shipping
**Tone:** Professional, friendly, appreciative

---

### Step 13 — INVENTORY DEDUCTION (5 minutes)

**When:** Order shipped
**Who:** Online Operations Manager updates system

**Procedure:**
1. Open inventory tracking spreadsheet
2. Find product row
3. Subtract quantity from current stock
4. Update "Last Updated" date
5. Check if stock below reorder threshold

**Example:**
| SKU | Name | Stock | Sold | Remaining | Reorder? |
|-----|------|-------|------|-----------|----------|
| OF-H300 | Filter Oli Hino | 50 | 2 | 48 | NO |
| KR-ELF | Kampas Rem ELF | 15 | 1 | 14 | ALERT |

**Reorder Threshold:**
- High velocity: 20 units
- Medium: 10 units
- Low: 5 units

---

### Step 14 — END OF DAY: Daily Summary (15 minutes)

**When:** Store closing / Evening
**Who:** Online Operations Manager

**Record in Daily Log:**

```
DATE: [YYYY-MM-DD]
ORDERS TODAY:
  Tokopedia: X orders, Rp YYY (list order IDs)
  TikTok: X orders, Rp YYY (list order IDs)
  
SHIPPED TODAY:
  Morning batch: X packages
  Afternoon batch: X packages
  
ISSUES TODAY:
  - [ ] None
  - [ ] Out of stock: [SKU]
  - [ ] Return request: [Order ID]
  - [ ] Other: [describe]

PENDING TOMORROW:
  - [X] Payment confirmation waiting
  - [X] Orders to ship
  - [X] Customer messages to reply

NOTES:
[Any observations, customer feedback, ideas]
```

**Send to Father (if weekly check-in due):**
- Screenshot of today"s orders
- Any issues that need decision

---

## SECTION 2: WEEKLY OPERATIONS

### Step 15 — Monday: Weekly Planning (30 minutes)

**When:** Monday morning
**Who:** Online Operations Manager

**Review Last Week:**
- [ ] Total orders: __ (vs target)
- [ ] Total revenue: Rp __ (vs target)
- [ ] Orders by platform: Tokopedia __, TikTok __
- [ ] Top selling products (3 items)
- [ ] Any returns/refunds
- [ ] Customer complaints

**This Week"s Plan:**
- [ ] Advertising budget: Rp ___ (TopAds + TikTok)
- [ ] New products to add: __ (from product list)
- [ ] TikTok videos to make: __
- [ ] Any promotions running

**Meeting with Father:**
Sign off on:
- Budget
- Product additions
- Any pricing changes

---

### Step 16 — Monday/Tuesday: Product Photography (2-3 hours)

**When:** Weekly batch
**Who:** Online Operations Manager

**Target:** 10-20 products per week

**Setup:**
- Location: [Warehouse area / Home desk]
- Lighting: Natural light from window
- Background: White paper/cardboard
- Equipment: Smartphone + tripod

**Per Product (3 shots):**
1. Main: Full product on white background
2. Detail: Close-up of part number/branding
3. Context: Product in hand or next to ruler

**Post-Processing:**
- Run through photo processor script
- Generate: tokopedia/, tiktok/, thumbnail/
- Rename: `[sku]_main.jpg`, `[sku]_detail.jpg`

---

### Step 17 — Tuesday/Wednesday: New Product Listings (2 hours)

**When:** After photos ready
**Who:** Online Operations Manager

**Per Product:**
1. **Generate description** using AI tool:
   ```bash
   python generate_descriptions.py --csv products.csv --product "Filter Oli Hino"
   ```

2. **Create Tokopedia listing:**
   - Title: [Brand] [Product] [Part Number] - [Vehicle]
   - Upload 3-5 photos
   - Paste description
   - Set price: Retail price + 6.6%
   - Set stock: Current quantity
   - Enable shipping: JNE, J&T, SiCepat
   - Publish

3. **Create TikTok Shop listing:**
   - Shorter title (emoji)
   - Upload vertical photos
   - Paste TikTok description
   - Link to Tokopedia (if allowed)

4. **Record:**
   - SKU in master spreadsheet
   - Listing URLs
   - Date published

---

### Step 18 — Wednesday: Inventory Reconciliation (1 hour)

**When:** Mid-week
**Who:** Online Operations Manager + Inventory Manager (Father)

**Physical Count:**
- [ ] Walk warehouse with tablet
- [ ] Verify stock matches spreadsheet
- [ ] Spot-check: 10 fast-moving items
- [ ] Note discrepancies

**Update System:**
- [ ] Adjust quantities if needed
- [ ] Mark items "Out of Stock" if 0
- [ ] Identify items needing reorder

**Reorder Report for Father:**
| Product | Current Stock | Reorder Point | Suggestion |
|---------|---------------|---------------|------------|
| Filter Oli Hino | 8 | 20 | Order 30 |
| Kampas Rem ELF | 45 | 20 | No action |

---

### Step 19 — Thursday: Advertising Optimization (30 min)

**When:** Weekly
**Who:** Online Operations Manager

**Tokopedia TopAds:**
1. Review last 7 days performance
2. Check which keywords driving clicks
3. Adjust bids:
   - High converting: Increase bid
   - Low converting: Decrease or pause
4. Budget check: Spent vs planned
5. Top products: Ensure all have TopAds enabled

**TikTok Shop:**
1. Review video performance
2. Check which products getting organic views
3. Adjust promotion budget
4. Plan next week"s video content

---

### Step 20 — Friday: Customer Review (30 min)

**When:** Weekly
**Who:** Online Operations Manager

**Check Reviews:**
- [ ] Tokopedia: New reviews this week
- [ ] TikTok Shop: New reviews
- [ ] Respond to all reviews (positive and negative)

**Review Response Templates:**

**Positive:**
```
Terima kasih [Nama]! 🙏 Senang produk sesuai harapan. Jangan ragu order lagi ya. Semoga usahanya lancar! ⭐⭐⭐⭐⭐
```

**Negative (issue resolved):**
```
Mohon maaf atas ketidak nyamanannya. Sudah kami bantu via chat ya. Terima kasih atas masukannya untuk perbaikan kami.
```

**Negative (ongoing):**
```
Mohon maaf [Nama]. Segera kami cek via chat pribadi. Kami akan bantu selesaikan.
```

---

### Step 21 — Friday/Saturday: TikTok Content Creation (2-3 hours)

**When:** Weekend
**Who:** Online Operations Manager (Son)

**Content Ideas:**
1. **Product showcase** (15-30 sec)
   - Hold part, rotate slowly, show details
   - Voiceover: "Filter Oli original Hino, part number..."

2. **Comparison** (30 sec)
   - Original vs fake parts
   - Side-by-side quality differences

3. **Installation tip** (30-60 sec)
   - Quick DIY guide for common part
   - "Ganti kampas rem dalam 5 menit"

4. **Warehouse tour** (15-30 sec)
   - Show stock availability
   - "Stok ready, langsung kirim"

**Posting Schedule:**
- Minimum: 2 videos/week
- Optimal: 1 video/day
- Best times: 6-8 PM WIB

---

### Step 22 — Sunday: Week Wrap-Up (1 hour)

**When:** Sunday evening
**Who:** Online Operations Manager

**Prepare for Father:**
1. **Weekly report summary:**
   - Orders: X
   - Revenue: Rp Y
   - Issues: None / [list]
   - Next week priorities

2. **Review next week"s calendar:**
   - Any holidays affecting shipping?
   - Supplier delivery dates
   - Any planned offline events

3. **Backup:**
   - Export order spreadsheet
   - Copy to cloud storage
   - Photos backup

---

## SECTION 3: MONTHLY OPERATIONS

### Step 23 — Monthly Sales Reconciliation (2 hours)

**When:** 1st of month
**Who:** Online Operations Manager + Accountant/Owner

**Download Reports:**
- [ ] Tokopedia: Monthly sales report (CSV)
- [ ] TikTok Shop: Monthly earnings report
- [ ] Bank statement: Marketplace transfers

**Reconcile:**
```
TOKOPEDIA REPORT:
  Orders: 45
  Gross: Rp 18.500.000
  Fees: Rp 927.000 (5%)
  Shipping: Rp 580.000
  Net: Rp 16.993.000

TIKTOK REPORT:
  Orders: 23
  Gross: Rp 9.800.000
  Fees: Rp 441.000 (4.5%)
  Shipping: Rp 312.000
  Net: Rp 9.047.000

TOTAL NET: Rp 26.040.000
```

**Action:**
- [ ] Verify matches bank deposit
- [ ] Note any discrepancies
- [ ] Calculate per-order profit

---

### Step 24 — Monthly Expense Tracking (1 hour)

**When:** With reconciliation
**Who:** Online Operations Manager

**Track:**
- [ ] TopAds spend: Rp __
- [ ] TikTok ads spend: Rp __
- [ ] Packaging materials: Rp __
- [ ] Shipping costs (reimbursed by customer): Rp __
- [ ] Photography supplies: Rp __
- [ ] Internet: Rp __ (portional if shared)
- [ ] Labor (if hired): Rp __

**Calculate Net Profit:**
```
Net Revenue: Rp 26.040.000
Total Expenses: Rp 2.850.000
NET PROFIT: Rp 23.190.000
PROFIT MARGIN: 89%
```

**Report to Father:**
- Summary table
- Comparison to previous month
- ROI on advertising

---

### Step 25 — Inventory Valuation (2 hours)

**When:** End of month
**Who:** Inventory Manager (Father) + Online Operations Manager

**Physical Count:**
- Full warehouse count (or perpetual inventory)
- Verify 100+ products
- Correct any discrepancies

**Valuation:**
| SKU | Qty | Unit Cost | Total Value |
|-----|-----|-----------|-------------|
| OF-H300 | 48 | Rp 35K | Rp 1.680K |
| KR-ELF | 42 | Rp 78K | Rp 3.276K |

**Track:**
- [ ] Total inventory value
- [ ] Fastest moving items (add order qty last month)
- [ ] Slowest moving items (no orders last 2 months)

**Action:**
- Promote slow-moving items
- Order more fast-movers
- Consider discounting stale stock

---

### Step 26 — Product Performance Analysis (1 hour)

**When:** End of month
**Who:** Online Operations Manager

**Top 10 Products:**
| Rank | Product | Orders | Revenue | Margin | Stock |
|------|---------|--------|---------|--------|-------|
| 1 | Filter Oli Hino | 28 | Rp 1.4M | 35% | 48 |
|-|Kampas Rem ELF | 22 | Rp 2.6M | 42% | 42 |

**Bottom 10 Products:**
| Product | Orders | Last Sold | Action |
|---------|--------|-----------|--------|
| Alternator J08E | 0 | 45 days ago | Discount 10% |

**Decisions:**
- [ ] Which products to promote next month
- [ ] Which to discount/clearance
- [ ] Which new products to add
- [ ] Which to remove

---

### Step 27 — Customer Analysis (30 min)

**When:** End of month
**Who:** Online Operations Manager

**Segment:**
- [ ] Total unique customers
- [ ] Repeat customers (2+ orders)
- [ ] Top customers (by revenue)
- [ ] Geographic distribution
- [ ] Fleet operator vs individual buyers

**Monthly Reach:**
- [ ] Java: 75%
- [ ] Sumatra: 15%
- [ ] Kalimantan: 7%
- [ ] Other: 3%

**Action:**
- Identify top 10 customers for loyalty program
- Plan targeted promotions for repeat buyers

---

### Step 28 — Advertising Review (1 hour)

**When:** End of month
**Who:** Online Operations Manager

**Calculate ROI:**
```
TOPADS SPEND: Rp 850.000
ORDERS FROM ADS: 23
AD REVENUE: Rp 8.050.000
ROI: 9.5x (every Rp 1 spent = Rp 9.50 back)

TIKTOK ADS: Rp 400.000
ORDERS: 12
REVENUE: Rp 4.200.000
ROI: 10.5x
```

**Adjust Next Month:**
- [ ] Increase TopAds budget? (if ROI > 5x)
- [ ] Decrease if ROI < 3x
- [ ] Test new keywords
- [ ] Adjust bids on top performers

---

### Step 29 — Goal Setting for Next Month (1 hour)

**When:** End of month, with Father
**Who:** Online Operations Manager + Owner

**Set Targets:**
| Metric | This Month | Next Month Target |
|--------|-----------|-------------------|
| Orders | 68 | 80 |
| Revenue | Rp 26M | Rp 32M |
| New Products | 20 | 25 |
| Avg Order Value | Rp 382K | Rp 400K |
| Customer Rating | 4.7 | 4.8 |
| Return Rate | 2% | <2% |

**Action Plan:**
- [ ] How to achieve target (promotions, new products, ads)
- [ ] Resources needed
- [ ] Father approvals required

---

### Step 30 — Documentation & Backup (1 hour)

**When:** End of month
**Who:** Online Operations Manager

**Backup:**
- [ ] Order database (CSV export)
- [ ] Financial records (PDF)
- [ ] Customer database
- [ ] Product photos (new ones)
- [ ] Chat history (important conversations)

**Storage:**
- Local NAS: `/backups/online-store/2026/04/`
- Cloud: Google Drive / Dropbox
- Encrypted if contains customer data

**Document:**
- [ ] Monthly summary report
- [ ] Lessons learned
- [ ] Process improvements

---

## SECTION 4: EMERGENCY PROCEDURES

### Step 31 — Out of Stock — Order Already Paid

**Scenario:** Customer orders item we don't actually have

**IMMEDIATE (within 1 hour):**
1. [ ] DO NOT ship substitute without approval
2. [ ] Check warehouse one more time
3. [ ] Check with supplier: Can get same day?
4. [ ] Contact customer via chat:

```
Mohon maaf [Nama], produk [Nama Produk] ternyata habis stok sejak pagi ini.

Opsi kami:
1. Refund 100% via OVO/Dana
2. Ganti ke [produk serupa] + kembalian Rp XX.XXX
3. Tunggu restock 3 hari

Mau yang mana? Terima kasih atas kesabaran.
```

**Follow-through:**
- [ ] Update inventory to 0 immediately
- [ ] Unpublish product
- [ ] Restock alert
- [ ] Document incident

---

### Step 32 — Return/Refund Request

**When:** Customer requests return

**Step 1: Determine Reason**
- Wrong item sent? → Our fault, full refund
- Item damaged in shipping? → Courier insurance claim
- Changed mind? → Customer pays return shipping
- Defective item? → Replace + shipping our cost

**Step 2 (Wrong Item):**
1. [ ] Request photo proof
2. [ ] Apologize profusely
3. [ ] Send correct item + return label
4. [ ] Full refund including shipping
5. [ ] Review: Why did this happen?

**Step 3 (Damaged):**
1. [ ] Photo proof required
2. [ ] Open claim with courier
3. [ ] Send replacement immediately
4. [ ] Courier claim covers cost later

**Document:**
- [ ] Return reason
- [ ] Resolution
- [ ] Cost/loss incurred
- [ ] Prevention for next time

---

### Step 33 — Damaged Package Received by Customer

**When:** Customer reports damage

**IMMEDIATE:**
1. [ ] Request photos of:
   - Package condition
   - Damaged items
   - AWB label visible

2. [ ] Assess:
   - Packaging failure? → Improve process
   - Courier handling? → Insurance claim

**Response:**
```
Mohon maaf atas kerusakan ini. Sedang kami proses ya.

Bisa kirim foto:
1. Kondisi kardus luar
2. Barang yang rusak
3. Label pengiriman

Kami akan kirim gantian 1-2 hari setelah konfirmasi. 🙏
```

**Follow-up:**
- [ ] Send replacement if our fault
- [ ] Submit courier claim
- [ ] Review packaging for that product type

---

### Step 34 — Negative Review (1-2 stars)

**When:** Customer posts bad review

**NEVER:**
- Argue publicly
- Blame customer
- Ignore it

**ALWAYS:**
- Respond within 24 hours
- Apologize
- Offer solution
- Move to private chat

**Response Template:**
```
Mohon maaf [Nama] atas ketidak nyamanannya. Ini tidak sesuai standar kami.

Segera kami bantu via chat pribadi ya untuk solusinya. Kami akan pastikan 
ini tidak terulang lagi.

Terima kasih atas masukannya.

[LUXOR TEAM]
```

**Then in private chat:**
- Understand root cause
- Offer appropriate compensation
- Request review update if resolved

---

### Step 35 — Suspected Fraud Order

**Red Flags:**
- New account + high value (Rp 2M+)
- COD to different city
- Suspicious address details
- Multiple orders same day from same person

**Actions:**
1. [ ] Verify phone number (call)
2. [ ] Check if customer has chat history
3. [ ] For COD > Rp 500K: Require payment first
4. [ ] Cancel if suspicious:
```
Mohon maaf, untuk COD order di atas Rp 500.000 mohon pembayaran dulu ya.
Bisa transfer ke [rekening] atau pakai OVO/Dana.

Setelah konfirmasi pembayaran, langsung kami proses dan kirim. 🙏
```

**If confirmed fraud:**
- [ ] Cancel order
- [ ] Report to marketplace
- [ ] Block user (if repeat)
- [ ] Document pattern

---

### Step 36 — System Failure / Bot Down

**When:** Order Bot stops working

**Immediate:**
1. [ ] Check logs: `tail -50 logs/bot.log`
2. [ ] Restart: `./start_bot.sh`
3. [ ] Check Telegram API status

**If extended downtime:**
- [ ] Alternative: Check Tokopedia/TikTok apps manually
- [ ] Set phone notifications from marketplace apps
- [ ] Inform family: Manual checking required

**Recovery:**
- [ ] Award Coveoverflow bug bounty
- [ ] Restore from last backup
- [ ] Test all functions before declaring "fixed"

---

## CHECKLISTS & TEMPLATES

### Daily Opening Checklist
```
☐ Check Telegram bot status
☐ Review overnight orders
☐ Check inventory alerts
☐ Review today"s production schedule
☐ Check yesterday"s shipped orders status
☐ Reply to any overnight customer messages
```

### Order Processing Checklist
```
☐ Payment verified
☐ Item picked from warehouse
☐ Quality checked
☐ Photos taken
☐ Packaged properly
☐ Weighed
☐ AWB generated
☐ Status updated to "Shipped"
☐ Customer notified
☐ Inventory deducted
```

### New Product Launch Checklist
```
☐ Photos taken (3 shots minimum)
☐ Photos processed
☐ AI description generated
☐ Tokopedia listing created
☐ TikTok listing created
☐ Inventory quantity set
☐ Shipping enabled
☐ TCs applied
☐ SKU added to master spreadsheet
☐ Listing URLs recorded
```

---

## QUICK REFERENCE

### Courier Contacts
| Courier | Phone | WhatsApp | App |
|---------|-------|----------|-----|
| JNE | 021-2927-8888 | Yes | JNE ONE |
| J&T | 021-8066-1888 | Yes | J&T Super |
| SiCepat | 021-5020-0050 | Yes | SiCepat Kilat |

### Store Information (Fill In)
- Store Name: _______________
- Phone/WA: _______________
- Address: _______________
- Email: _______________
- Bank Account: _______________

### Marketplace URLs
- Tokopedia Store: _______________
- TikTok Shop: _______________

---

## VERSION HISTORY

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Apr 2026 | Initial operations manual | Son |

---

*This manual is a living document. Update with lessons learned and process improvements.*
