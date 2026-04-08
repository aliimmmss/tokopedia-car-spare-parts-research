# Telegram Order Notification Bot

Real-time notifications for Tokopedia and TikTok Shop orders.

---

## Overview

**Purpose:** Get instant Telegram notifications when:
- 🛒 New order received
- 💰 Payment confirmed
- 📦 Order shipped
- ❌ Order cancelled
- ⚠️ Low stock detected
- 📊 Daily summary (every evening)

**Demo Mode:** Works without API credentials - generates sample orders every 2 hours for testing.

---

## Features

### Notification Types

| Type | Trigger | Format |
|------|---------|--------|
| New Order | Order received | 🛒 ORDER BARU #12345 |
| Payment | Confirmed payment | 💰 PEMBAYARAN DITERIMA |
| Shipping | Label created | 📦 PESANAN DIKIRIM |
| Cancelled | Customer cancelled | ❌ ORDER DIBATALKAN |
| Low Stock | Stock < threshold | ⚠️ STOK MENIPIS |
| Daily Summary | Every evening | 📊 RINGKASAN HARIAN |

### Telegram Commands

| Command | Description |
|---------|-------------|
| `/start` | Start bot, show status |
| `/orders` | Last 5 orders |
| `/summary` | Send daily summary |
| `/stock [product]` | Check stock |
| `/status` | Bot health check |
| `/test` | Test notification |
| `/pause` | Pause notifications |
| `/resume` | Resume notifications |
| `/help` | Show help |

---

## Installation

### Step 1: Clone Repository

```bash
cd ~
git clone https://github.com/aliimmmss/order-notification-bot.git
cd order-notification-bot
```

### Step 2: Setup Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Step 3: Configure Bot

#### Create Bot via @BotFather

1. Open Telegram, search `@BotFather`
2. Send `/newbot`
3. Enter name: "Luxor Orders" (or your store name)
4. Choose username: `yourstore_orders_bot` (must end in bot)
5. **Save the token**: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

#### Get Your Chat ID

1. Search `@userinfobot` in Telegram
2. Send any message
3. Bot replies with your ID (e.g., `123456789`)

#### Edit config.env

```bash
nano config.env
```

Fill in your details:

```env
# Required
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789

# Store Info
STORE_NAME=LUXOR AUTO PARTS
STORE_LOCATION=Bandung

# Demo mode (for testing)
DEMO_MODE=true

# Optional: Real APIs
TOPED_CLIENT_ID=your_client_id
TIKTOK_APP_KEY=your_app_key
```

### Step 4: Start Bot

```bash
chmod +x start_bot.sh
./start_bot.sh
```

Or directly:

```bash
python order_bot.py
```

---

## Demo Mode

**Default mode** - generates fake orders every 2 hours.

**Purpose:**
- Test notifications before store opens
- Familiarize with message formats
- Train family on bot commands

**To enable:**
```env
DEMO_MODE=true
```

**To disable:**
```env
DEMO_MODE=false
```

---

## API Integration (Production)

### Tokopedia API

1. Login: https://seller.tokopedia.com/
2. Settings → API Integration
3. Create new app, get:
   - Client ID
   - Client Secret
   - Shop ID

### TikTok Shop API

1. Login: https://seller.tiktok.com/
2. Account Settings → API Access
3. Create app, get:
   - App Key
   - App Secret
   - Shop ID

**Update config.env** with real credentials and set `DEMO_MODE=false`.

---

## Run 24/7

### Using screen (simple)

```bash
# Create session
screen -S orderbot

# Run bot
cd ~/order-notification-bot
source venv/bin/activate
python order_bot.py

# Detach: Ctrl+A then D
```

**Reconnect:**
```bash
screen -r orderbot
```

### Using systemd (production)

```bash
# Create service
sudo nano /etc/systemd/system/orderbot.service
```

Content:
```ini
[Unit]
Description=Order Notification Bot
After=network.target

[Service]
Type=simple
User=yourusername
WorkingDirectory=/home/yourusername/order-notification-bot
ExecStart=/home/yourusername/order-notification-bot/venv/bin/python order_bot.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable orderbot
sudo systemctl start orderbot
```

**Check status:**
```bash
sudo systemctl status orderbot
```

---

## Sample Notifications

### New Order

```
🛒 ORDER BARU #12345
Platform: Tokopedia
Customer: Ahmad S (Jakarta)
Product: Filter Oli Hino x2
Total: Rp 110.500 + Ongkir Rp 15.000
Shipping: JNE REG (Est. 2-3 hari)
Time: 14:30 WIB

_Status: Menunggu pembayaran_ ⚡
```

### Daily Summary

```
📊 RINGKASAN HARIAN
08 April 2026

📦 Orders: 12 total
   • Tokopedia: 7
   • TikTok Shop: 5

💰 Revenue: Rp 4.850.000

🔥 Top Product: Filter Oli Hino 300

📋 Pending: 2 orders

_Good job!_ 🎉
```

---

## File Structure

```
order-notification-bot/
├── config.env              # API keys and settings
├── order_bot.py           # Main bot script
├── start_bot.sh           # Startup script
├── requirements.txt       # Dependencies
├── SETUP_TELEGRAM_BOT.md # Detailed setup guide
├── README.md             # This file
├── logs/
│   └── bot.log          # Activity log
└── venv/                # Virtual environment
```

---

## Troubleshooting

### Bot not responding

- Check token in config.env
- Verify chat ID is correct
- Look at logs: `cat logs/bot.log`

### No notifications

- Check if paused: `/status`
- Verify `/test` command works
- Check DEMO_MODE setting

### API errors

- Verify credentials
- Check internet connection
- Review logs for details

### Memory usage

- Bot uses <50 MB RAM
- Restart weekly recommended
- Logs rotate automatically

---

## Security

- Never commit config.env to git
- Keep API keys private
- Use separate bot for testing
- Monitor logs for abuse

---

## Support

Questions? Check:
`SETUP_TELEGRAM_BOT.md` for detailed setup
tokopedia-car-spare-parts-research/ for business research
