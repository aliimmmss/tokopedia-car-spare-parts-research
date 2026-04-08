---
marp: true
theme: default
paginate: true
size: 16:9
---
<style>
@import url('https://fonts.googleapis.com/css2?family=Doto:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
:root {
  --black: #000000;
  --surface: #111111;
  --surface-raised: #1A1A1A;
  --border: #222222;
  --border-visible: #333333;
  --text-disabled: #666666;
  --text-secondary: #999999;
  --text-primary: #E8E8E8;
  --text-display: #FFFFFF;
  --accent-green: #76B900;
  --accent-gold: #D4AF37;
  --accent-red: #D71921;
  --font-display: 'Doto', 'Space Mono', monospace;
  --font-body: 'Space Grotesk', 'DM Sans', system-ui, sans-serif;
  --font-mono: 'Space Mono', 'JetBrains Mono', monospace;
}
/* ===== FORCE DARK THEME — Override Marp Primer ===== */
/* Must use !important because Marp injects GitHub Primer CSS */
section {
  font-family: 'Space Grotesk', 'DM Sans', system-ui, sans-serif !important;
  background: #000000 !important;
  background-image: radial-gradient(circle, #222222 0.5px, transparent 0.5px) !important;
  background-size: 24px 24px !important;
  color: #E8E8E8 !important;
  padding: 64px 80px;
  font-size: 18px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color-scheme: dark !important;
}
h1 {
  font-family: 'Doto', 'Space Mono', monospace !important;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.02em;
  color: #FFFFFF !important;
  margin-bottom: 8px;
  border: none !important;
}
h2 {
  font-family: 'Space Grotesk', 'DM Sans', system-ui, sans-serif !important;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #FFFFFF !important;
  margin-bottom: 8px;
  border: none !important;
}
h3 {
  font-family: 'Space Grotesk', 'DM Sans', system-ui, sans-serif !important;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #FFFFFF !important;
  margin-bottom: 6px;
}
h4 {
  font-family: 'Space Mono', 'JetBrains Mono', monospace !important;
  font-size: 11px;
  font-weight: 700;
  color: #999999 !important;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}
p { margin-bottom: 10px; line-height: 1.5; }
strong { color: #D4AF37 !important; font-weight: 600; }
em {
  font-style: normal !important;
  color: #76B900 !important;
  font-weight: 500;
}
mark {
  background: rgba(212,175,55,0.2) !important;
  color: #FFFFFF !important;
}
a {
  color: #76B900 !important;
  text-decoration: none;
  border-bottom: 1px solid #333333;
}
ul, ol {
  padding-left: 20px;
  margin-bottom: 12px;
}
li {
  margin-bottom: 6px;
  line-height: 1.5;
  color: #E8E8E8 !important;
}
li::marker { color: #666666; }
li strong { color: #FFFFFF !important; }
/* Section Labels — bracket notation */
.label {
  font-family: 'Space Mono', 'JetBrains Mono', monospace !important;
  font-size: 11px;
  font-weight: 700;
  color: #999999 !important;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}
/* Hero Numbers */
.hero-number {
  font-family: 'Doto', 'Space Mono', monospace !important;
  font-size: 72px;
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.03em;
  color: #FFFFFF !important;
}
.hero-number.green { color: #76B900 !important; }
.hero-number.gold { color: #D4AF37 !important; }
.hero-label {
  font-family: 'Space Mono', monospace !important;
  font-size: 12px;
  color: #999999 !important;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 4px;
}
/* Body hierarchy */
.body-lg {
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5;
  color: #E8E8E8 !important;
}
.body-sm {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.01em;
  color: #999999 !important;
}
.caption {
  font-family: 'Space Mono', monospace !important;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: #666666 !important;
}
/* Cards — flat, no shadows */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1px;
  margin: 16px 0;
  background: #222222;
  border: 1px solid #222222;
}
.card {
  background: #111111 !important;
  border: none;
  border-radius: 0px;
  padding: 24px;
}
.card-raised { background: #1A1A1A !important; }
.card-accent-green { border-top: 2px solid #76B900; }
.card-accent-gold { border-top: 2px solid #D4AF37; }
/* Callout */
.callout {
  background: #111111 !important;
  border-left: 2px solid #333333;
  padding: 16px 24px;
  margin: 16px 0;
}
.callout-green { border-left-color: #76B900; }
.callout-gold { border-left-color: #D4AF37; }
/* Blockquote */
blockquote {
  background: #111111 !important;
  border-left: 2px solid #D4AF37 !important;
  padding: 16px 24px;
  border-radius: 0px;
  color: #999999 !important;
  font-style: italic;
}
/* Divider */
hr {
  border: none;
  height: 1px;
  background: #222222 !important;
  margin: 24px 0;
}
/* Tables — THIS IS THE KEY FIX for readability */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 15px;
}
th {
  font-family: 'Space Mono', monospace !important;
  font-size: 11px;
  font-weight: 700;
  color: #999999 !important;
  text-align: left;
  padding: 10px 16px;
  border-bottom: 2px solid #333333 !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: transparent !important;
}
td {
  padding: 10px 16px;
  border-bottom: 1px solid #222222 !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  color: #E8E8E8 !important;
  background: transparent !important;
}
tr:hover td { background: rgba(118,185,0,0.04) !important; }
/* Code */
code {
  font-family: 'JetBrains Mono', monospace !important;
  background: rgba(118,185,0,0.1) !important;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.85em;
  color: #BFF230 !important;
}
/* Segmented Progress Bar */
.segmented-bar {
  display: flex;
  gap: 2px;
  height: 8px;
  margin: 8px 0;
}
.segmented-bar.hero { height: 16px; gap: 3px; }
.segmented-bar.compact { height: 4px; gap: 1px; }
.segment {
  flex: 1;
  background: #222222;
  border-radius: 0px;
}
.segment.filled-green { background: #76B900 !important; }
.segment.filled-gold { background: #D4AF37 !important; }
.segment-bar-label {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #999999 !important;
  text-transform: uppercase;
}
.segment-bar-value {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #666666 !important;
  float: right;
}
/* Status Tags */
.status {
  font-family: 'Space Mono', monospace !important;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 2px 8px;
  border: 1px solid #333333;
  color: #999999 !important;
}
.status-green { color: #76B900 !important; border-color: #76B900; }
.status-gold { color: #D4AF37 !important; border-color: #D4AF37; }
.status-red { color: #D71921 !important; border-color: #D71921; }
/* Slide number */
section::after {
  content: attr(data-marpit-pagination);
  font-family: 'Space Mono', monospace !important;
  font-size: 11px;
  color: #666666 !important;
  letter-spacing: 0.04em;
}
/* ===== SPECIAL SLIDE TYPES ===== */
/* Cover */
section.cover {
  background: #000000 !important;
  background-image: none !important;
  justify-content: flex-end;
  align-items: flex-start;
  text-align: left;
  padding: 80px 100px;
}
section.cover h1 {
  font-size: 64px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.0;
  margin-bottom: 12px;
}
section.cover .subtitle {
  font-size: 22px;
  font-weight: 300;
  color: #999999 !important;
  margin-bottom: 32px;
}
section.cover .meta {
  font-family: 'Space Mono', monospace !important;
  font-size: 11px;
  color: #666666 !important;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
section.cover .gold-rule {
  width: 48px;
  height: 2px;
  background: #D4AF37;
  margin: 20px 0;
}
/* Section Divider */
section.divider {
  background: #000000 !important;
  background-image: none !important;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  padding: 80px 100px;
}
section.divider .section-idx {
  font-family: 'Space Mono', monospace !important;
  font-size: 12px;
  font-weight: 700;
  color: #76B900 !important;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}
section.divider h2 {
  font-family: 'Doto', 'Space Mono', monospace !important;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.0;
  margin-bottom: 12px;
}
section.divider .divider-desc {
  font-size: 18px;
  font-weight: 300;
  color: #999999 !important;
  max-width: 560px;
  line-height: 1.5;
}
section.divider .rule {
  width: 32px;
  height: 2px;
  background: #333333;
  margin-top: 24px;
}
/* Stats */
section.stats {
  background: #000000 !important;
  background-image: none !important;
  justify-content: center;
}
.stats-row {
  display: flex;
  gap: 64px;
  margin: 24px 0;
  justify-content: center;
  align-items: flex-start;
}
.stat-item { text-align: left; }
.stat-item .stat-value {
  font-family: 'Doto', 'Space Mono', monospace !important;
  font-size: 56px;
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.03em;
  color: #FFFFFF !important;
}
.stat-item .stat-value.green { color: #76B900 !important; }
.stat-item .stat-value.gold { color: #D4AF37 !important; }
.stat-item .stat-unit {
  font-family: 'Space Mono', monospace;
  font-size: 18px;
  color: #666666 !important;
  margin-left: 4px;
}
.stat-item .stat-label {
  font-family: 'Space Mono', monospace !important;
  font-size: 11px;
  color: #999999 !important;
  margin-top: 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
/* Two Column / Asymmetric */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin: 16px 0;
}
.asymmetric {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 48px;
  margin: 16px 0;
  align-items: start;
}
/* CTA */
section.cta {
  background: #000000 !important;
  background-image: none !important;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  padding: 80px 100px;
}
section.cta h2 {
  font-family: 'Doto', 'Space Mono', monospace !important;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.0;
  margin-bottom: 16px;
}
section.cta .cta-desc {
  font-size: 20px;
  font-weight: 300;
  color: #999999 !important;
  max-width: 480px;
  line-height: 1.5;
  margin-bottom: 32px;
}
section.cta .cta-button {
  display: inline-block;
  font-family: 'Space Mono', monospace !important;
  background: #D4AF37 !important;
  color: #000000 !important;
  padding: 14px 32px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 0px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
/* Timeline */
.timeline {
  position: relative;
  padding-left: 32px;
  margin: 16px 0;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #333333;
}
.timeline-item {
  position: relative;
  margin-bottom: 24px;
}
.timeline-item::before {
  content: '';
  position: absolute;
  left: -29px;
  top: 6px;
  width: 8px;
  height: 8px;
  background: #1A1A1A;
  border: 2px solid #76B900;
  border-radius: 0px;
}
.timeline-item.gold::before { border-color: #D4AF37; }
.timeline-item .timeline-title {
  font-weight: 600;
  color: #FFFFFF !important;
  font-size: 16px;
}
.timeline-item .timeline-desc {
  font-size: 14px;
  color: #999999 !important;
  margin-top: 2px;
  line-height: 1.4;
}
.timeline-item .timeline-meta {
  font-family: 'Space Mono', monospace !important;
  font-size: 11px;
  color: #666666 !important;
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
/* Footer */
.source {
  font-family: 'Space Mono', monospace !important;
  font-size: 11px;
  color: #666666 !important;
  margin-top: auto;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
/* No grid variants */
.no-grid { background-image: none !important; }
.dot-grid-visible {
  background-image: radial-gradient(circle, #333333 1px, transparent 1px) !important;
  background-size: 16px 16px !important;
}
.dot-grid-subtle {
  background-image: radial-gradient(circle, #222222 0.5px, transparent 0.5px) !important;
  background-size: 12px 12px !important;
}
</style>

<!-- _class: cover -->

# Taking Our Business Online
<span class="subtitle">Extending 30 Years of Trust to Tokopedia and TikTok Shop</span>

<div class="gold-rule"></div>

<div class="meta">Presented by Your Son &middot; April 8, 2026 &middot; Bandung</div>

---

<!-- _class: divider -->

<div class="section-idx">01 — Foundational Strength</div>

<h2>What We Already Have</h2>

<div class="divider-desc">We are not starting from zero. The infrastructure, relationships, and reputation are already in place.</div>

<div class="rule"></div>

---

<div class="label">Foundation</div>

<h2>Our Existing Assets</h2>

<div class="card-grid">
<div class="card card-accent-gold">
<div class="label">legacy</div>
<div class="hero-number gold">30</div>
<div class="hero-label">Years of Trust</div>
<p class="body-sm">Reputation built on quality. Tokopedia reviews will compound fast for established sellers.</p>
</div>
<div class="card">
<div class="label">inventory</div>
<div class="hero-number">500</div>
<div class="hero-label">SKUs Ready</div>
<p class="body-sm">No sourcing needed. Just photograph and list what's already in warehouse.</p>
</div>
<div class="card">
<div class="label">infrastructure</div>
<p class="body-sm"><strong>Same-Day Shipping</strong> from Bandung warehouse. Physical asset others cannot replicate.</p>
</div>
<div class="card">
<div class="label">knowledge</div>
<p class="body-sm"><strong>Deep Expertise</strong> in Hino, Isuzu, Mitsubishi parts. We advise. They just sell.</p>
</div>
</div>

<div class="callout callout-gold">
<blockquote>"We have the hardest part already done. The online store is just the next chapter."</blockquote>
</div>

---

<!-- _class: divider -->

<div class="section-idx">02 — Market Opportunity</div>

<h2>Why Online Now</h2>

<div class="divider-desc">Indonesia's e-commerce landscape has shifted. Commercial vehicle parts buyers are now online.</div>

<div class="rule"></div>

---

<!-- _class: stats -->

<div class="label" style="text-align:center">[ Market Data ]</div>

## The Numbers That Matter

<div class="stats-row">
<div class="stat-item">
<div class="stat-value gold">Rp 450<span class="stat-unit">T</span></div>
<div class="stat-label">GMV projected 2026</div>
</div>
<div class="stat-item">
<div class="stat-value green">8.5<span class="stat-unit">%</span></div>
<div class="stat-label">Annual growth</div>
</div>
<div class="stat-item">
<div class="stat-value gold">138<span class="stat-unit">%</span></div>
<div class="stat-label">LIVE shopping growth</div>
</div>
</div>

<div class="segmented-bar hero" style="margin-top:32px;margin-bottom:8px;">
<div class="segment filled-gold"></div>
<div class="segment filled-gold"></div>
<div class="segment filled-gold"></div>
<div class="segment filled-gold"></div>
<div class="segment"></div>
</div>
<div style="display:flex;justify-content:space-between;">
<span class="segment-bar-label">Market Momentum</span>
<span class="segment-bar-value">4/5 segments filled</span>
</div>

<p class="body-lg" style="margin-top:40px; text-align:center;">
<em>Commercial vehicle parts</em> are moving online. Fleet managers prefer <strong>Reputable Sellers</strong> with fast shipping.
</p>

---

<!-- _class: divider -->

<div class="section-idx">03 — Platform Strategy</div>

<h2>Tokopedia vs TikTok Shop</h2>

<div class="divider-desc">Different strengths. Different audiences. We use both strategically.</div>

<div class="rule"></div>

---

<div class="label">Platform Comparison</div>

<h2>Two Platforms, One Strategy</h2>

<div class="card-grid">
<div class="card card-accent-green" style="background:#111111 !important;">
<div class="label">search-driven</div>
<h3>Tokopedia</h3>
<p class="body-sm">Buyer already knows what they need. Higher conversion rates. Lower marketing cost.</p>
<div style="margin-top:24px;">
<span class="status status-green">Primary</span>
<span class="caption" style="margin-left:12px;">Focus: revenue generation through established buyer intent</span>
</div>
</div>
<div class="card card-accent-gold" style="background:#111111 !important;">
<div class="label">discovery-driven</div>
<h3>TikTok Shop</h3>
<p class="body-sm">Customer discovers us while scrolling. Viral potential. Low acquisition cost per viewer.</p>
<div style="margin-top:24px;">
<span class="status status-gold">Secondary</span>
<span class="caption" style="margin-left:12px;">Focus: customer acquisition through discovery</span>
</div>
</div>
</div>

---

<!-- _class: stats -->

<div class="label" style="text-align:center">[ Investment ]</div>

## What We Need to Start

<div class="stats-row">
<div class="stat-item">
<div class="stat-value">5<span class="stat-unit" style="font-size:14px;">Juta</span></div>
<div class="stat-label">Initial investment</div>
</div>
<div class="stat-item">
<div class="stat-value gold">2<span class="stat-unit" style="font-size:14px;">juta/bulan</span></div>
<div class="stat-label">Operating cost</div>
</div>
<div class="stat-item">
<div class="stat-value green">150<span class="stat-unit" style="font-size:14px;">Rp</span></div>
<div class="stat-label">Payback per order</div>
</div>
</div>

<p class="body-lg" style="margin-top:40px; text-align:center;">
First month: just <strong>7 orders</strong> to break even on operational costs.
</p>

---

<!-- _class: divider -->

<div class="section-idx">04 — Product Catalog</div>

<h2>What We Sell Online</h2>

<div class="divider-desc">Starting with hero products. Expanding based on data.</div>

<div class="rule"></div>

---

<div class="label">Product Categories</div>

<h2>Starter Catalog — High Demand, Easy Ship</h2>

| Category | Example Product | Avg Price | Margin |
|----------|-----------------|-----------|--------|
| **Filters** | Hino Ranger Oil Filter | Rp 85-150K | 25-30% |
| **Belts** | Isuzu NKR Fan Belt | Rp 120-200K | 28-35% |
| **Brake Pads** | Mitsubishi Canter Front | Rp 180-280K | 22-28% |
| **Electrical** | Alternator Brushes | Rp 45-90K | 35-40% |
| **Filters** | Fuel Filter Assembly | Rp 250-400K | 20-25% |

<div class="source" style="margin-top:16px;">Shipping: Surabaya Rp 8-12K (2-4 days), Medan Rp 12-18K (3-5 days)</div>

---

<div class="label">Product Strategy</div>

<h2>Hero Products + Long Tail</h2>

<div class="two-col">
<div>
<h4>Phase 1: Launch (Month 1-2)</h4>
<ul>
<li><strong>50 SKUs</strong> — bestselling filters, belts, brake pads</li>
<li>Focus on <em>fast-moving</em> consumables</li>
<li>Price competitively to build reviews</li>
</ul>
<h4 style="margin-top:24px;">Month 3-6</h4>
<ul>
<li>Expand to <strong>150 SKUs</strong></li>
<li>Add electrical parts</li>
<li>Introduce kits (oil change, brake service)</li>
</ul>
</div>
<div>
<h4>Competitive Advantage</h4>
<div class="callout callout-green">
<p class="body-sm"><strong>Same-day shipping</strong> from Bandung. Some competitors need 2-3 days from Jakarta warehouse.</p>
</div>
<h4 style="margin-top:24px;">Pricing Strategy</h4>
<div class="callout">
<p class="body-sm">List at <em>market price</em> but offer <strong>bundle discounts</strong>. Tokopedia buyers love "Buy 3 Get 1 Free" mechanics.</p>
</div>
</div>
</div>

---

<!-- _class: divider -->

<div class="section-idx">05 — Operations</div>

<h2>How We Run It Daily</h2>

<div class="divider-desc">Lean operation. Same warehouse. Same team. New channel.</div>

<div class="rule"></div>

---

<div class="label">Workflow</div>

<h2>Daily Operations</h2>

<div class="timeline">
<div class="timeline-item gold">
<div class="timeline-title">Morning: Pick & Pack</div>
<div class="timeline-desc">Orders from yesterday packed by 10 AM. Same-day pickup for orders before 2 PM.</div>
<div class="timeline-meta">3 hours / day</div>
</div>
<div class="timeline-item">
<div class="timeline-title">Midday: Inventory Update</div>
<div class="timeline-desc">Sync Tokopedia stock with warehouse system. Mark out-of-stock items immediately.</div>
<div class="timeline-meta">30 min / day</div>
</div>
<div class="timeline-item">
<div class="timeline-title">Afternoon: Customer Response</div>
<div class="timeline-desc">Answer questions. Fast response = higher ranking in Tokopedia search.</div>
<div class="timeline-meta">1 hour / day</div>
</div>
<div class="timeline-item gold">
<div class="timeline-title">Evening: Content Creation</div>
<div class="timeline-desc">Film TikTok videos. Product showcases. Customer testimonials. Educational content.</div>
<div class="timeline-meta">2-3 hours / week</div>
</div>
</div>

---

<div class="label">Logistics</div>

<h2>Fulfillment from Bandung</h2>

<div class="two-col">
<div>
<h4>Shipping Partners</h4>
<table>
<tr>
<th>Partner</th>
<th>Java</th>
<th>Sumatra</th>
</tr>
<tr>
<td><strong>JNE</strong></td>
<td>1-2 days</td>
<td>2-3 days</td>
</tr>
<tr>
<td><strong>SiCepat</strong></td>
<td>1 day</td>
<td>3-4 days</td>
</tr>
<tr>
<td><strong>J&T</strong></td>
<td>1-2 days</td>
<td>2-4 days</td>
</tr>
</table>
</div>
<div>
<h4>Packaging</h4>
<div class="callout">
<p class="body-sm"><strong>Branded boxes</strong> with our logo. Customers remember unboxing experience. Unboxing videos = free TikTok content.</p>
</div>
<h4 style="margin-top:24px;">Returns</h4>
<div class="callout">
<p class="body-sm"><em>3% return rate</em> is typical. Most are size mismatches (wrong fitment). Simple fitment guide fixes 80% of issues.</p>
</div>
</div>
</div>

---

<!-- _class: divider -->

<div class="section-idx">06 — Financial Projections</div>

<h2>The Business Case</h2>

<div class="divider-desc">Conservative projections based on actual marketplace data.</div>

<div class="rule"></div>

---

<div class="label">Unit Economics</div>

<h2>One Average Order</h2>

| Item | Amount |
|------|--------|
| Average Order Value | **Rp 325,000** |
| Product Cost (40%) | Rp 130,000 |
| Shipping Cost | Rp 15,000 |
| Packaging | Rp 8,000 |
| Platform Fee (10%) | Rp 32,500 |
| Payment Fee (2%) | Rp 6,500 |
| Total Cost | Rp 192,000 |
| <strong>Net Profit</strong> | **<span class="gold">Rp 101K (31% margin)</span>** |

---

<!-- _class: stats -->

<div class="label" style="text-align:center">[ Month by Month ]</div>

## Growth Trajectory

<div class="stats-row">
<div class="stat-item">
<div class="stat-value">30</div>
<div class="stat-label">Orders / month (start)</div>
</div>
<div class="stat-item">
<div class="stat-value gold">90</div>
<div class="stat-label">Orders / month (month 6)</div>
</div>
<div class="stat-item">
<div class="stat-value green">200</div>
<div class="stat-label">Orders / month (month 12)</div>
</div>
</div>

<div class="two-col" style="margin-top:40px;">
<div class="callout callout-gold">
<p class="body-sm"><strong>Month 3:</strong> Break even. Covering operational costs.</p>
</div>
<div class="callout callout-green">
<p class="body-sm"><strong>Month 6:</strong> Rp 9.1 juta profit. Payback initial investment.</p>
</div>
</div>

---

<div class="label">12-Month Projection</div>

<h2>Revenue & Profit</h2>

| Month | Orders | Revenue | Net Profit | Cumulative |
|-------|--------|---------|------------|------------|
| 1 | 30 | Rp 9.7 jt | Rp 1.5 jt | -Rp 3.5 jt |
| 2 | 45 | Rp 14.6 jt | Rp 3.2 jt | -Rp 0.3 jt |
| 3 | 60 | Rp 19.5 jt | Rp 4.8 jt | Rp 4.5 jt |
| 6 | 90 | Rp 29.2 jt | Rp 9.1 jt | Rp 28.8 jt |
| 12 | 200 | Rp 65.0 jt | Rp 20.2 jt | Rp 78.5 jt |

<div class="callout callout-green" style="margin-top:24px;">
<p class="body-lg"><strong>Year 1:</strong> Rp 78.5 juta cumulative profit. Initial investment returned 15x.</p>
</div>

---

<!-- _class: divider -->

<div class="section-idx">07 — Competitive Advantage</div>

<h2>Why We Win</h2>

<div class="divider-desc">Established players with online operations. New entrants with capital. Our edge: trust + speed.</div>

<div class="rule"></div>

---

<div class="label">Competition Matrix</div>

<h2>Competitive Landscape</h2>

<div class="two-col">
<div>
<h4>Traditional Competitors</h4>
<ul>
<li><strong>Offline Workshops</strong> — limited reach, no online presence</li>
<li><strong>Jakarta-Based Sellers</strong> — 2-3 day shipping to Java</li>
<li><strong>Generic Parts Shops</strong> — no specialization, low trust</li>
</ul>
</div>
<div>
<h4>New Entrants</h4>
<ul>
<li><strong>Corporate Sellers</strong> — high overhead, slow decisions</li>
<li><strong>Dropshippers</strong> — no inventory control, slow fulfillment</li>
<li><strong>Import-Only Shops</strong> — customs delays, warranty issues</li>
</ul>
</div>
</div>

<div class="callout callout-gold" style="margin-top:24px;">
<p class="body-lg"><strong>Our Moat:</strong> 30 years of reputation + same-day shipping from Bandung central warehouse. <em>They cannot replicate overnight.</em></p>
</div>

---

<div class="label">Risk Analysis</div>

<h2>What Could Go Wrong</h2>

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| <strong>Low Initial Sales</strong> | Medium | Start small. No sunk cost obligation. |
| <strong>Negative Reviews</strong> | Low | Quality control. Fast returns. |
| <strong>Platform Fee Increases</strong> | Medium | Build direct customer relationships. |
| <strong>Competitor Price War</strong> | Low | Focus on service, not just price. |

<div class="callout" style="margin-top:24px;">
<p class="body-sm"><strong>Worst Case:</strong> We lose Rp 5 jt investment. <strong>Best Case:</strong> Rp 78 jt year-one profit. <em>Asymmetric upside.</em></p>
</div>

---

<!-- _class: divider -->

<div class="section-idx">08 — Roadmap</div>

<h2>Timeline to Launch</h2>

<div class="divider-desc">90 days from decision to first sale.</div>

<div class="rule"></div>

---

<div class="label">Phases</div>

<h2>90-Day Launch</h2>

<div class="timeline">
<div class="timeline-item gold">
<div class="timeline-title">Phase 1: Foundation (Day 1-30)</div>
<div class="timeline-desc">Register Tokopedia & TikTok Shop accounts. Photograph 50 hero products. Write descriptions.</div>
<div class="timeline-meta">Week 1-4</div>
</div>
<div class="timeline-item">
<div class="timeline-title">Phase 2: Launch (Day 31-60)</div>
<div class="timeline-desc">List first 50 SKUs. Run pilot ads (Rp 500K budget). Get first 10 customers. Build review base.</div>
<div class="timeline-meta">Week 5-8</div>
</div>
<div class="timeline-item gold">
<div class="timeline-title">Phase 3: Optimize (Day 61-90)</div>
<div class="timeline-desc">Analyze what's selling. Double down on winners. Launch TikTok content weekly. Expand to 100 SKUs.</div>
<div class="timeline-meta">Week 9-12</div>
</div>
</div>

---

<!-- _class: stats -->

<div class="label" style="text-align:center">[ Success Metrics ]</div>

## How We Know It's Working

<div class="stats-row">
<div class="stat-item">
<div class="stat-value green">60</div>
<div class="stat-label">Days to first profit</div>
</div>
<div class="stat-item">
<div class="stat-value gold">200</div>
<div class="stat-label">Orders/mo (month 12)</div>
</div>
<div class="stat-item">
<div class="stat-value">65</div>
<div class="stat-label">juta/mo revenue (Y1)</div>
</div>
</div>

<div style="margin-top:40px; text-align:center;">
<span class="status status-green">Low Risk</span>
<span class="body-sm" style="margin-left:16px;">Investment &lt; Rp 10 jt. ROI 15x in 12 months.</span>
</div>

---

<div class="label" style="text-align:center">[ 12-Month Vision ]</div>

## Where We Are in 12 Months

<div class="stats-row" style="margin-top:32px;">
<div class="stat-item">
<div class="stat-value gold">450</div>
<div class="stat-unit" style="font-size:14px;">orders/mo</div>
<div class="stat-label">Combined platforms</div>
</div>
<div class="stat-item">
<div class="stat-value green">146</div>
<div class="stat-unit" style="font-size:14px;">juta/mo</div>
<div class="stat-label">Monthly revenue</div>
</div>
<div class="stat-item">
<div class="stat-value">50</div>
<div class="stat-unit" style="font-size:14px;">affiliates</div>
<div class="stat-label">Workshop partners</div>
</div>
</div>

<div class="callout" style="margin-top:40px;">
<p class="body-lg"><strong>Year 2 Potential:</strong> Rp 2+ billion annual revenue. 5-person team. Physical <|filename|>experience stores in Surabaya and Medan.</p>
</div>

---

<!-- _class: cta -->

<div class="section-idx">09 — The Ask</div>

<h2>What I Need From You</h2>

<div class="cta-desc">
Not money. Not permission. Just <strong>your experience.</strong>
</div>

<div class="asymmetric">
<div>
<h4>Your Role</h4>
<ul>
<li><strong>Product Knowledge</strong> — Which parts fail most? What should we stock?</li>
<li><strong>Supplier Contacts</strong> — Better pricing on bulk orders?</li>
<li><strong>Quality Control</strong> — Final say on what goes online.</li>
<li><strong>Wisdom</strong> — 30 years of customer insight. I need access to it.</li>
</ul>
</div>
<div>
<h4>My Role</h4>
<div class="callout callout-green">
<p class="body-sm"><strong>Everything technical.</strong> Photography, listing optimization, ads, shipping coordination.</p>
</div>
<p class="body-sm" style="margin-top:24px;">I run the online store. You keep the warehouse running. We <em>complement</em> each other.</p>
</div>
</div>

---

<!-- _class: cta -->

<div class="section-idx">10 — Decision</div>

<h2>Let's Start</h2>

<div class="cta-desc">
The data supports it. The infrastructure exists. The market is ready.
</div>

<div style="margin:40px 0;">
<p class="body-lg" style="text-align:center;"><strong>"We have everything to gain and almost nothing to lose."</strong></p>
</div>

<div class="two-col" style="margin-top:48px;">
<div class="callout">
<p class="body-sm"><strong>Option 1:</strong> Stay offline. Miss the e-commerce shift. Watch competitors take our market.</p>
</div>
<div class="callout callout-green">
<p class="body-sm"><strong>Option 2:</strong> Start small. Test. Learn. Scale. Take our 30 years of trust online.</p>
</div>
</div>

---

<!-- _class: cta -->

## Thank You

<div class="cta-desc" style="margin-top:32px;">
Your trust built this business. Now let's extend it to the digital generation.
</div>

<div style="margin-top:64px;">
<p style="text-align:center; font-size:20px;"><strong>Let's start small, test the waters, and grow.</strong></p>
<p style="text-align:center;">30 years of trust. Now let's share it with all of Indonesia.</p>
</div>

<div class="source" style="margin-top:60px;">Data: Tokopedia Market Research (April 2026), TikTok Shop Analysis, Competitor Analysis. Projections conservative estimates based on actual marketplace data.</div>
