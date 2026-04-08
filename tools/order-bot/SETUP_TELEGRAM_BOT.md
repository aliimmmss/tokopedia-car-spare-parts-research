# Telegram Bot Setup Guide

Order Notification Bot for Tokopedia & TikTok Shop

---

## Prerequisites

- Telegram account
- Tokopedia Seller account (if connecting to real store)
- TikTok Shop Seller account (if connecting to real store)
- WSL Ubuntu or Linux server (to run bot 24/7)

---

## Step 1: Create Telegram Bot

### Via @BotFather

1. **Open Telegram** and search for `@BotFather`
2. **Start** conversation with `/start`
3. **Create new bot** with `/newbot`
4. **Enter name** for your bot (e.g., "Luxor Orders")
5. **Choose username** ending in "bot" (e.g., "luxor_orders_bot")
6. **Save the Bot Token** — it looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

### Bot Configuration Commands

In @BotFather, set these commands:
```
/setcommands
```

Paste this list:
```
start - Mulai bot dan lihat status
orders - 5 order terbaru
summary - Ringkasan hari ini
stock - Cek stok produk (usage: /stock [nama produk])
status - Status kesehatan bot
test - Kirim notifikasi test
pause - Jeda notifikasi
resume - Lanjutkan notifikasi
help - Bantuan penggunaan
```

---

## Step 2: Get Your Chat ID

### Via @userinfobot

1. **Search** for `@userinfobot`
2. **Start** and send any message
3. **Bot will reply** with your info:
```
Id: 123456789
First: Budi
Last: Santoso
Username: @budis
```
4. **Save the ID number**: `123456789`

Alternatively, start the bot and use @RawDataBot - it will show your chat ID.

---

## Step 3: Tokopedia API Credentials (Optional for DEMO mode)

### From Tokopedia Seller Dashboard

1. **Login** to https://seller.tokopedia.com/
2. **Go to**: Settings → API Integration
3. **Click**: Generate New API Key
4. **Fill**: Application name (e.g., "Order Bot")
5. **Copy credentials**:
   - Client ID
   - Client Secret
   - Shop ID

### Required Scopes

Enable these permissions:
- `read_order`
- `read_product`
- `read_shop`

---

## Step 4: TikTok Shop API Credentials (Optional for DEMO mode)

### From TikTok Shop Seller Center

1. **Login** to https://seller.tiktok.com/
2. **Go to**: Account Settings → API Access
3. **Create App**: Click "Create App"
4. **Fill details**:
   - App Name: "Order Notification"
   - Purpose: Order management
5. **Copy credentials**:
   - App Key
   - App Secret
   - Shop ID

### Required Scopes

- `order.read`
- `product.read`

---

## Step 5: Configure Bot

### Edit config.env

```bash
cd ~/order-notification-bot
nano config.env
```

### Fill in your values:

```env
# Required: Telegram
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789

# Optional: Tokopedia (leave as-is for DEMO mode)
TOPED_SHOP_ID=12345678
TOPED_CLIENT_ID=your_client_id
TOPED_CLIENT_SECRET=your_client_secret

# Optional: TikTok (leave as-is for DEMO mode)
TIKTOK_SHOP_ID=123456789012
TIKTOK_APP_KEY=your_app_key
TIKTOK_APP_SECRET=your_app_secret

# Demo mode
DEMO_MODE=false  # Set false when using real APIs
```

---

## Step 6: Install and Run

### Install Dependencies

```bash
cd ~/order-notification-bot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Test in Demo Mode First

```bash
# Make sure DEMO_MODE=true in config.env
python order_bot.py
```

Send `/test` to your bot in Telegram to verify it works.

### Run with Real APIs

1. **Set DEMO_MODE=false** in config.env
2. **Add real API credentials**
3. **Restart bot**:
```bash
python order_bot.py
```

---

## Step 7: Run 24/7

### Using screen (simple)

```bash
# Install screen
sudo apt install screen

# Create new session
screen -S orderbot

# Navigate and run
cd ~/order-notification-bot
source venv/bin/activate
python order_bot.py

# Detach: Press Ctrl+A then D
```

### Reconnect to session

```bash
screen -r orderbot
```

### Using systemd (recommended for production)

```bash
# Create service file
sudo nano /etc/systemd/system/orderbot.service
```

Paste:
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

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable orderbot
sudo systemctl start orderbot
```

Check status:
```bash
sudo systemctl status orderbot
```

---

## Troubleshooting

### "Bot token invalid"
- Check token copied correctly from @BotFather
- No spaces before/after token in config.env

### "Chat ID not found"
- Make sure you started conversation with bot
- Use @userinfobot to verify chat ID
- Chat ID is numeric only (no @)

### "API connection failed"
- Check internet connection
- Verify API credentials
- Check Tokopedia/TikTok API status

### Bot not responding
- Check logs: `tail -f logs/bot.log`
- Verify DEMO_MODE or API credentials set
- Restart bot

---

## Security Checklist

- [ ] Keep config.env private (never commit to git)
- [ ] Use .gitignore for config.env
- [ ] Rotate API keys if compromised
- [ ] Monitor logs for unusual activity
- [ ] Set up firewall if on public server

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `/start` | Welcome message, show status |
| `/orders` | Last 5 orders from both platforms |
| `/summary` | Today's summary (orders, revenue) |
| `/stock [product]` | Check stock for specific product |
| `/status` | Bot health and connection status |
| `/test` | Send test notification |
| `/pause` | Pause notifications |
| `/resume` | Resume notifications |
| `/help` | Show help message |

---

## Notifications

The bot sends notifications for:

- 🛒 **New Orders** — Instant when order received
- 💰 **Payment Confirmed** — When payment verified
- 📦 **Order Shipped** — When tracking number added
- ❌ **Order Cancelled** — When customer cancels
- ⚠️ **Low Stock** — When inventory below threshold
- 📊 **Daily Summary** — Every evening (configurable time)

---

## Next Steps

1. **Test** all notification types in DEMO mode
2. **Get** real API credentials
3. **Switch** to production mode
4. **Monitor** first week closely
5. **Adjust** notification settings as needed

---

## Support

Questions? Check the research docs in:
`~/tokopedia-car-spare-parts-research/`
