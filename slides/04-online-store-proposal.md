---
marp: true
theme: default
paginate: true
size: 16:9
style: |
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

  section {
    font-family: var(--font-body);
    background: var(--black);
    color: var(--text-primary);
    padding: 64px 80px;
    font-size: 18px;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: radial-gradient(circle, var(--border) 0.5px, transparent 0.5px);
    background-size: 24px 24px;
  }

  h1 {
    font-family: var(--font-display);
    font-size: 56px;
    font-weight: 700;
    line-height: 1.0;
    letter-spacing: -0.02em;
    color: var(--text-display);
    margin-bottom: 8px;
  }

  h2 {
    font-family: var(--font-body);
    font-size: 36px;
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--text-display);
    margin-bottom: 8px;
  }

  h3 {
    font-family: var(--font-body);
    font-size: 24px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--text-display);
    margin-bottom: 6px;
  }

  h4 {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 6px;
  }

  p { margin-bottom: 10px; line-height: 1.5; }

  em {
    font-style: normal;
    color: var(--accent-green);
    font-weight: 500;
  }

  strong {
    color: var(--accent-gold);
    font-weight: 600;
  }

  .label {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }

  .label::before { content: '[ '; color: var(--text-disabled); }
  .label::after { content: ' ]'; color: var(--text-disabled); }

  .hero-number {
    font-family: var(--font-display);
    font-size: 72px;
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.03em;
    color: var(--text-display);
  }

  .hero-number.green { color: var(--accent-green); }
  .hero-number.gold { color: var(--accent-gold); }

  .hero-label {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 400;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 4px;
  }

  .body-lg {
    font-size: 20px;
    font-weight: 300;
    line-height: 1.5;
    color: var(--text-primary);
  }

  .body-sm {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.01em;
    color: var(--text-secondary);
  }

  .caption {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.04em;
    color: var(--text-disabled);
  }

  a {
    color: var(--accent-green);
    text-decoration: none;
    border-bottom: 1px solid var(--border-visible);
  }

  ul, ol {
    padding-left: 20px;
    margin-bottom: 12px;
  }

  li {
    margin-bottom: 6px;
    line-height: 1.5;
  }

  li::marker { color: var(--text-disabled); }
  li strong { color: var(--text-display); font-weight: 600; }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1px;
    margin: 16px 0;
    background: var(--border);
    border: 1px solid var(--border);
  }

  .card {
    background: var(--surface);
    border: none;
    border-radius: 0px;
    padding: 24px;
    box-shadow: none;
  }

  .card-raised { background: var(--surface-raised); }
  .card-accent-green { border-top: 2px solid var(--accent-green); }
  .card-accent-gold { border-top: 2px solid var(--accent-gold); }

  .callout {
    background: var(--surface);
    border-left: 2px solid var(--border-visible);
    padding: 16px 24px;
    margin: 16px 0;
  }

  .callout-green { border-left-color: var(--accent-green); }
  .callout-gold { border-left-color: var(--accent-gold); }
  .callout-red { border-left-color: var(--accent-red); }

  blockquote {
    background: var(--surface);
    border-left: 2px solid var(--accent-gold);
    padding: 16px 24px;
    border-radius: 0px;
    color: var(--text-secondary);
    font-style: italic;
  }

  blockquote strong { color: var(--accent-gold); }

  hr {
    border: none;
    height: 1px;
    background: var(--border);
    margin: 24px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 15px;
  }

  th {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
    color: var(--text-secondary);
    text-align: left;
    padding: 10px 16px;
    border-bottom: 2px solid var(--border-visible);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    background: transparent;
  }

  td {
    padding: 10px 16px;
    border-bottom: 1px solid var(--border);
    color: var(--text-primary);
  }

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
    background: var(--border);
    border-radius: 0px;
  }

  .segment.filled-green { background: var(--accent-green); }
  .segment.filled-gold { background: var(--accent-gold); }

  .segment-bar-label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .segment-bar-value {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-disabled);
    float: right;
  }

  .status {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 2px 8px;
    border: 1px solid var(--border-visible);
    color: var(--text-secondary);
  }

  .status-green { color: var(--accent-green); border-color: var(--accent-green); }
  .status-gold { color: var(--accent-gold); border-color: var(--accent-gold); }
  .status-red { color: var(--accent-red); border-color: var(--accent-red); }

  section::after {
    content: attr(data-marpit-pagination);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-disabled);
    letter-spacing: 0.04em;
  }

  section.cover {
    justify-content: flex-end;
    align-items: flex-start;
    text-align: left;
    padding: 80px 100px;
    background-image: none;
    background: var(--black);
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
    color: var(--text-secondary);
    margin-bottom: 32px;
    letter-spacing: 0;
    line-height: 1.4;
  }

  section.cover .meta {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-disabled);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  section.cover .gold-rule {
    width: 48px;
    height: 2px;
    background: var(--accent-gold);
    margin: 20px 0;
    border-radius: 0;
  }

  section.divider {
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    padding: 80px 100px;
    background-image: none;
    background: var(--black);
  }

  section.divider .section-idx {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 700;
    color: var(--accent-green);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 12px;
  }

  section.divider h2 {
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.0;
    margin-bottom: 12px;
  }

  section.divider .divider-desc {
    font-size: 18px;
    font-weight: 300;
    color: var(--text-secondary);
    max-width: 560px;
    line-height: 1.5;
  }

  section.divider .rule {
    width: 32px;
    height: 2px;
    background: var(--border-visible);
    margin-top: 24px;
  }

  section.stats {
    justify-content: center;
    background-image: none;
    background: var(--black);
  }

  section.cta {
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    padding: 80px 100px;
    background-image: none;
    background: var(--black);
  }

  section.cta h2 {
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.0;
    margin-bottom: 16px;
  }

  section.cta .cta-desc {
    font-size: 20px;
    font-weight: 300;
    color: var(--text-secondary);
    max-width: 480px;
    line-height: 1.5;
    margin-bottom: 32px;
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
    font-family: var(--font-display);
    font-size: 56px;
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.03em;
    color: var(--text-display);
  }

  .stat-item .stat-value.green { color: var(--accent-green); }
  .stat-item .stat-value.gold { color: var(--accent-gold); }

  .stat-item .stat-unit {
    font-family: var(--font-mono);
    font-size: 18px;
    font-weight: 400;
    color: var(--text-disabled);
    margin-left: 4px;
  }

  .stat-item .stat-label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-secondary);
    margin-top: 6px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

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
    background: var(--border-visible);
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
    background: var(--surface-raised);
    border: 2px solid var(--accent-green);
    border-radius: 0px;
  }

  .timeline-item.gold::before { border-color: var(--accent-gold); }

  .timeline-item .timeline-title {
    font-weight: 600;
    color: var(--text-display);
    font-size: 16px;
  }

  .timeline-item .timeline-desc {
    font-size: 14px;
    color: var(--text-secondary);
    margin-top: 2px;
    line-height: 1.4;
  }

  .timeline-item .timeline-meta {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-disabled);
    margin-top: 2px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .source {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-disabled);
    margin-top: auto;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
---

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

<div class="divider-desc">Indonesia's e-commerce is shifting. Commercial vehicle parts remain underserved while consumer parts saturate.</div>

<div class="rule"></div>

---

<!-- _class: stats -->

<div class="label" style="text-align:center">[ Market Data ]</div>

<div class="stats-row">
<div class="stat-item">
<div class="stat-value gold">100<span class="stat-unit">M+</span></div>
<div class="stat-label">Tokopedia Active Users</div>
</div>
<div class="stat-item">
<div class="stat-value green">130<span class="stat-unit">M</span></div>
<div class="stat-label">TikTok Monthly Users</div>
</div>
<div class="stat-item">
<div class="stat-value green">85<span class="stat-unit">%</span></div>
<div class="stat-label">Auto Parts YoY Growth</div>
</div>
</div>

<div class="segmented-bar hero" style="margin-top:32px;margin-bottom:8px;">
<div class="segment filled-green"></div><div class="segment filled-green"></div><div class="segment filled-green"></div><div class="segment filled-green"></div><div class="segment filled-green"></div>
<div class="segment filled-green"></div><div class="segment filled-green"></div><div class="segment filled-green"></div><div class="segment"></div><div class="segment"></div>
</div>
<div style="display:flex;justify-content:space-between;">
<span class="segment-bar-label">TikTok Shop Market Penetration</span>
<span class="segment-bar-value">80%</span>
</div>

<p class="body-lg" style="margin-top:40px; text-align:center;">
Tokopedia sellers for commercial parts: <strong class="gold">800-1,500</strong><br>
Consumer parts sellers: <strong>10,000+</strong>
</p>

---

<div class="label">Urgency</div>

<h2>Why Now</h2>

<div class="card-grid">
<div class="card">
<div class="label">competition status</div>
<h4>COMPETITOR: YANHAN DIESELINDO</h4>
<div class="hero-number gold">9,917</div>
<div class="hero-label">Orders Completed</div>
<p class="body-sm">Rating 4.9. They are capturing our potential customers <strong>now</strong>.</p>
<span class="status status-red">THREAT</span>
</div>
<div class="card">
<div class="label">behavior shift</div>
<p class="body-sm">COVID permanently moved fleet operators online. Workshops search first, visit second.</p>
<span class="status status-green">OPPORTUNITY</span>
</div>
<div class="card">
<div class="label">geography</div>
<p class="body-sm">Sumatra, Kalimantan, Sulawesi customers cannot find fleet parts locally. They need Bandung.</p>
<span class="status status-green">UNLOCKED</span>
</div>
</div>

<div class="callout callout-green">
<p><em>"We can reach ALL of Indonesia, not just Bandung walk-in customers."</em></p>
</div>

---

<!-- _class: divider -->

<div class="section-idx">03 — Platform Strategy</div>

<h2>Why Tokopedia + TikTok Shop</h2>

<div class="rule"></div>

---

<div class="label">Primary Channel</div>

<h2>Tokopedia — <em class="gold">55% Market Share</em></h2>

<table>
<tr>
<th>Feature</th>
<th>Our Advantage</th>
</tr>
<tr>
<td>Power Merchant Badge</td>
<td><strong>30 years trust</strong> amplified by platform credibility signals</td>
</tr>
<tr>
<td>TopAds</td>
<td>Min Rp 50K/day targets <strong>active searchers</strong></td>
</tr>
<tr>
<td>Grosir Feature</td>
<td>Dedicated for <strong>fleet operators buying 10+ units</strong></td>
</tr>
<tr>
<td>Fee Structure</td>
<td>3.5-6% commission (tiered by transaction value)</td>
</tr>
</table>

<div style="margin-top:24px;">
<h4>Action</h4>
<span class="status status-gold">PRIMARY</span>
<span class="caption" style="margin-left:12px;">Focus: revenue generation through established buyer intent</span>
</div>

---

<div class="label">Growth Channel</div>

<h2>TikTok Shop — <em class="green">+85% YoY Growth</em></h2>

<div class="two-col">
<div>
<h4>Advantages</h4>
<ul>
<li><strong>Video content</strong> shows part details better than photos</li>
<li><strong>Young mechanics active</strong> (workshop owners under 40)</li>
<li><strong>Lower competition</strong> vs Tokopedia in this category</li>
<li><strong>Affiliate program</strong> — others sell for commission</li>
</ul>
</div>
<div>
<h4>Fee Structure</h4>
<table style="font-size:13px;">
<tr><td>Filters</td><td>3-5%</td></tr>
<tr><td>Parts & Components</td><td>3-6%</td></tr>
<tr><td>Tools & Equipment</td><td>4-7%</td></tr>
</table>
</div>
</div>

<div style="margin-top:24px;">
<h4>Action</h4>
<span class="status status-green">GROWTH</span>
<span class="caption" style="margin-left:12px;">Focus: customer acquisition through discovery</span>
</div>

---

<!-- _class: stats -->

<div class="label" style="text-align:center">[ Investment ]</div>

<div class="stats-row">
<div class="stat-item">
<div class="stat-value gold">&lt;5</div>
<div class="stat-unit" style="font-size:14px;">Juta</div>
<div class="stat-label">Total Initial Cost</div>
</div>
<div class="stat-item">
<div class="stat-value">1-2</div>
<div class="stat-unit" style="font-size:14px;">juta/bulan</div>
<div class="stat-label">Operating Cost</div>
</div>
<div class="stat-item">
<div class="stat-value green">0</div>
<div class="stat-unit" style="font-size:14px;">Rp</div>
<div class="stat-label">Seller Registration</div>
</div>
</div>

<p class="body-lg" style="margin-top:40px; text-align:center;">
Monthly cost <strong>less than electricity bill</strong>. Time: 2-3 hours/day.
</p>

<div class="callout callout-green">
<p><em>"Very low risk, very low cost to test."</em></p>
</div>

---

<div class="label">Operational Model</div>

<h2>Online vs Offline</h2>

<table>
<tr>
<th>Aspect</th>
<th>Offline</th>
<th>Online</th>
</tr>
<tr>
<td>Inventory</td>
<td>Same products</td>
<td><strong>Same products, just listed</strong></td>
</tr>
<tr>
<td>Pricing</td>
<td>Rp 300K</td>
<td>Rp 320K (+6.6% covers fees + shipping)</td>
</tr>
<tr>
<td>Customers</td>
<td>Bandung workshops</td>
<td><strong>All Indonesia</strong></td>
</tr>
<tr>
<td>Hours</td>
<td>8AM-5PM</td>
<td><strong class="green">24/7</strong></td>
</tr>
<tr>
<td>Payments</td>
<td>Manual</td>
<td><strong>Automated</strong></td>
</tr>
<tr>
<td>Shipping</td>
<td>Pickup</td>
<td><strong>JNE/J&T/SiCepat pickup</strong></td>
</tr>
</table>

<div class="source" style="margin-top:16px;">Shipping: Surabaya Rp 8-12K (2-4 days), Medan Rp 12-18K (3-5 days)</div>

---

<!-- _class: divider -->

<div class="section-idx">04 — Execution</div>

<h2>Phase 1 Launch Plan</h2>

<div class="divider-desc">First 90 days. Tight focus, fast iterations, data-driven decisions.</div>

<div class="rule"></div>

---

<div class="label">Product Selection</div>

<h2>50 SKUs: Fastest Movers</h2>

<div class="card-grid">
<div class="card card-accent-green">
<h4>Filters</h4>
<p class="body-sm">Oil, Air, Fuel filters for Hino, Isuzu, Mitsubishi</p>
<span class="status status-green">HIGH FREQ</span>
</div>
<div class="card">
<h4>Brake Pads</h4>
<p class="body-sm">All truck models, various grades</p>
<span class="status status-gold">SAFETY CRITICAL</span>
</div>
<div class="card">
<h4>Belts</h4>
<p class="body-sm">Fan belts, timing belts — consumable items</p>
<span class="status status-green">FAST TURN</span>
</div>
<div class="card">
<h4>Electrical</h4>
<p class="body-sm">Starters, alternators, lighting</p>
<span class="status status-gold">MARGIN</span>
</div>
</div>

<p class="body-lg">Photography: <strong>13 min/product</strong> = 11 hours total (2-3 days)</p>

---

<div class="label">Financial Projections</div>

<h2>Revenue Scenarios</h2>

<div class="asymmetric">
<div>
<h3 class="gold">Conservative</h3>
<table>
<tr><th>Period</th><th>Orders/Mo</th><th>Revenue</th></tr>
<tr><td>Month 1-2</td><td>10-20</td><td>Rp 3.5-7M</td></tr>
<tr><td>Month 3-4</td><td>30-50</td><td>Rp 12-20M</td></tr>
<tr><td>Month 5-6</td><td>50-80</td><td>Rp 22.5-36M</td></tr>
</table>
</div>
<div>
<h3 class="green">Realistic (w/ Ads)</h3>
<table>
<tr><th>Period</th><th>Orders/Mo</th></tr>
<tr><td>Month 1-2</td><td>30-50</td></tr>
<tr><td>Month 3-4</td><td>70-100</td></tr>
<tr><td>Month 5-6</td><td>100-150</td></tr>
</table>
<p class="caption">Scale: Rp 50-75M by Month 6</p>
</div>
</div>

<div class="callout">
<p class="body-sm"><strong>Assumption:</strong> Active TopAds Rp 500K-1M/mo, 2-3 TikTok videos/week, 4.5+ star rating</p>
</div>

---

<div class="label">Margin Analysis</div>

<h2>Fee Impact Example</h2>

<table>
<tr>
<th>Line Item</th>
<th>Amount</th>
</tr>
<tr>
<td>Product Cost</td>
<td>Rp 200K</td>
</tr>
<tr>
<td>Offline Selling Price</td>
<td>Rp 300K <span class="caption">(50% margin)</span></td>
</tr>
<tr>
<td>Online Selling Price</td>
<td>Rp 320K <span class="caption">(+fees)</span></td>
</tr>
<tr>
<td>Marketplace Fee (5%)</td>
<td class="gold">-Rp 16K</td>
</tr>
<tr>
<td>Packaging</td>
<td>-Rp 3K</td>
</tr>
<tr>
<td style="border-top:2px solid var(--border-visible)"><strong>Net Profit</strong></td>
<td style="border-top:2px solid var(--border-visible)"><strong class="gold">Rp 101K (31% margin)</strong></td>
</tr>
</table>

<div class="callout callout-green">
<p>Lower per-item margin, but <strong>24/7 volume</strong> compensates. Online customers buy while we sleep.</p>
</div>

---

<div class="label">Team Structure</div>

<h2>Division of Labor</h2>

<table>
<tr>
<th>Task</th>
<th>Who</th>
<th>Time</th>
</tr>
<tr>
<td>Product listing</td>
<td><strong>Son</strong></td>
<td>Week 1-2 (one-time)</td>
</tr>
<tr>
<td>Daily order processing</td>
<td><strong>Son</strong></td>
<td>1-2 hours/day</td>
</tr>
<tr>
<td>Packaging & shipping</td>
<td><strong>Warehouse staff</strong></td>
<td>30 min/order</td>
</tr>
<tr>
<td>Inventory management</td>
<td><strong>Father</strong></td>
<td>Ongoing</td>
</tr>
<tr>
<td>Supplier ordering</td>
<td><strong>Father</strong></td>
<td>Ongoing</td>
</tr>
<tr>
<td>TikTok content</td>
<td><strong>Son</strong></td>
<td>2-3 videos/week</td>
</tr>
<tr>
<td>Customer service</td>
<td><strong>Son</strong></td>
<td>1-2 hours/day</td>
</tr>
</table>

<div class="callout callout-gold">
<p><em>"I will handle the online work. You focus on what you do best — supplier relationships and inventory."</em></p>
</div>

---

<div class="label">Timeline</div>

<h2>90-Day Launch</h2>

<div class="timeline">
<div class="timeline-item">
<div class="timeline-title">Preparation</div>
<div class="timeline-desc">Account registration, 50 products photographed, store profile setup</div>
<div class="timeline-meta">Week 1-2</div>
</div>
<div class="timeline-item">
<div class="timeline-title">Soft Launch</div>
<div class="timeline-desc">20 on Tokopedia, 10 on TikTok, test shipping, get first reviews</div>
<div class="timeline-meta">Week 3-4</div>
</div>
<div class="timeline-item gold">
<div class="timeline-title">Growth</div>
<div class="timeline-desc">Expand to 50 (Tokopedia) + 30 (TikTok), TopAds active, 2-3 videos/week</div>
<div class="timeline-meta">Month 2</div>
</div>
<div class="timeline-item gold">
<div class="timeline-title">Optimization</div>
<div class="timeline-desc">100+ products, analyze bestsellers, target wholesale buyers</div>
<div class="timeline-meta">Month 3</div>
</div>
</div>

---

<!-- _class: divider -->

<div class="section-idx">05 — Risk Mitigation</div>

<h2>Known Concerns</h2>

<div class="rule"></div>

---

<div class="label">Risk Assessment</div>

<h2>Four Primary Risks</h2>

<div class="card-grid">
<div class="card">
<h4>RISK 01 — Low Sales</h4>
<p class="body-sm">"What if nobody buys?"</p>
<p class="body-sm"><strong>Mitigation:</strong> Minimal investment, pausable. 5-10 orders/mo covers costs.</p>
</div>
<div class="card">
<h4>RISK 02 — Shipping</h4>
<p class="body-sm">Damage, returns, lost packages</p>
<p class="body-sm"><strong>Mitigation:</strong> 30 years packaging experience. Return rate 1-3% for spare parts.</p>
</div>
<div class="card">
<h4>RISK 03 — Competition</h4>
<p class="body-sm">Price wars, undercutting</p>
<p class="body-sm"><strong>Mitigation:</strong> We advise. They sell. Dropshippers cannot compete on knowledge + stock.</p>
</div>
<div class="card">
<h4>RISK 04 — Time</h4>
<p class="body-sm">Too demanding to manage</p>
<p class="body-sm"><strong>Mitigation:</strong> 2-3 hours/day Phase 1. Scalable to hire staff (Rp 2-3M/mo).</p>
</div>
</div>

<div class="callout callout-gold">
<p>Worst case: Rp 5M spent over 3 months, lessons learned. <strong>Reversible. Adjustable.</strong></p>
</div>

---

<!-- _class: stats -->

<div class="label" style="text-align:center">[ Success Metrics ]</div>

<div class="stats-row">
<div class="stat-item">
<div class="stat-value gold">6</div>
<div class="stat-unit" style="font-size:14px;">Months</div>
<div class="stat-label">Target Timeline</div>
</div>
<div class="stat-item">
<div class="stat-value green">50-100</div>
<div class="stat-unit" style="font-size:14px;">orders/mo</div>
<div class="stat-label">Order Volume</div>
</div>
<div class="stat-item">
<div class="stat-value gold">20-50</div>
<div class="stat-unit" style="font-size:14px;">juta/mo</div>
<div class="stat-label">Revenue Target</div>
</div>
</div>

<div style="margin-top:40px; text-align:center;">
<h4>Additional</h4>
<p class="body-lg">4.5+ star rating <span class="status status-gold">TARGET</span></p>
<p class="body-lg">3-5 fleet operator relationships <span class="status status-green">B2B</span></p>
</div>

---

<!-- _class: stats -->

<div class="label" style="text-align:center">[ 12-Month Vision ]</div>

<div class="stats-row">
<div class="stat-item">
<div class="stat-value green">150-300</div>
<div class="stat-unit" style="font-size:14px;">orders/mo</div>
<div class="stat-label">Order Volume</div>
</div>
<div class="stat-item">
<div class="stat-value gold">50-100</div>
<div class="stat-unit" style="font-size:14px;">juta/mo</div>
<div class="stat-label">Revenue Target</div>
</div>
<div class="stat-item">
<div class="stat-value">10+</div>
<div class="stat-unit" style="font-size:14px;">affiliates</div>
<div class="stat-label">TikTok Program</div>
</div>
</div>

<div class="callout" style="margin-top:40px;">
<p><em>"This isn't replacing your business. It's extending 30 years of trust to the next generation."</em></p>
</div>

---

<div class="label">Decision Framework</div>

<h2>Why We Should Do This</h2>

<table>
<tr>
<th>Reason</th>
<th>Logic</th>
</tr>
<tr>
<td>Very Low Risk</td>
<td>Rp 1-2M/mo. Adjustable. Pausable.</td>
</tr>
<tr>
<td>Existing Strengths</td>
<td>Inventory, supplier relationships, 30 years trust</td>
</tr>
<tr>
<td>Geographic Expansion</td>
<td>All Indonesia, not just Bandung</td>
</tr>
<tr>
<td>Future Security</td>
<td>Next generation of customers is online</td>
</tr>
<tr>
<td>Competitive Reality</td>
<td>Yanhan Dieselindo (9,917+ orders). Waiting costs market share.</td>
</tr>
</table>

<div class="callout callout-green">
<p class="body-lg" style="text-align:center;"><strong>"We have everything to gain and almost nothing to lose."</strong></p>
</div>

---

<div class="label">Requirements</div>

<h2>What I Need From You</h2>

<div class="two-col">
<div>
<p class="body-lg">✅ <strong>Approval to start</strong><br>
Green light to proceed</p>

<p class="body-lg">✅ <strong>Access to 50 best-selling products</strong><br>
For photography and listing</p>

<p class="body-lg">✅ <strong>Warehouse staff support</strong><br>
30 min per order for packaging</p>
</div>
<div>
<p class="body-lg">✅ <strong>Weekly check-in</strong><br>
30 minutes to review progress</p>

<p class="body-lg">✅ <strong>Decision on store name</strong><br>
Something representing our brand</p>

<p class="body-sm"><strong>My commitment:</strong> I handle daily operations, customer service, TikTok content. You maintain supplier relationships and inventory.</p>
</div>
</div>

---

<div class="label">Next Actions</div>

<h2>Immediate Steps</h2>

<table>
<tr>
<th>Timeline</th>
<th>Action</th>
</tr>
<tr>
<td><strong>This week</strong></td>
<td>Register Tokopedia and TikTok Shop accounts</td>
</tr>
<tr>
<td><strong>Next 2 weeks</strong></td>
<td>Product photography and listing setup</td>
</tr>
<tr>
<td><strong>Week 3</strong></td>
<td>Soft launch with first 20 products</td>
</tr>
<tr>
<td><strong>Week 4</strong></td>
<td>First review and adjustments</td>
</tr>
</table>

<div class="callout callout-gold">
<p style="text-align:center; font-size:20px;"><strong>Let's start small, test the waters, and grow.</strong></p>
<p style="text-align:center;">30 years of trust. Now let's share it with all of Indonesia.</p>
</div>

---

<!-- _class: cta -->

<h2>Questions?</h2>

<div class="cta-desc">Thank you for considering this proposal. Your son.</div>

<div class="gold-rule"></div>

<div class="meta">April 8, 2026 &middot; Bandung</div>

<div class="source" style="margin-top:60px;">Data: Tokopedia Market Research (April 2026), TikTok Shop Analysis, Competitor Analysis. Projections conservative estimates based on actual marketplace data.</div>
