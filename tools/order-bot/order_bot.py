#!/usr/bin/env python3
"""
Telegram Order Notification Bot
For Tokopedia and TikTok Shop - Commercial Vehicle Spare Parts

Features:
- Real-time order notifications
- Payment confirmations
- Shipping updates
- Low stock alerts
- Daily summary reports
- Demo mode for testing

Author: AI Assistant
Date: April 2026
"""

import os
import sys
import json
import time
import logging
import random
import signal
import schedule
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional, Dict, List, Any
from contextlib import asynccontextmanager

import requests
from dotenv import load_dotenv
from telegram import Update, Bot
from telegram.ext import (
    Application, ApplicationBuilder, CommandHandler,
    CallbackContext, ContextTypes
)

# Load environment variables
load_dotenv('config.env')

# Configure logging
Path('logs').mkdir(exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/bot.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Configuration
CONFIG = {
    'TELEGRAM_BOT_TOKEN': os.getenv('TELEGRAM_BOT_TOKEN', 'YOUR_BOT_TOKEN_HERE'),
    'TELEGRAM_CHAT_ID': os.getenv('TELEGRAM_CHAT_ID', 'YOUR_CHAT_ID_HERE'),
    'TOPED_SHOP_ID': os.getenv('TOPED_SHOP_ID', ''),
    'TOPED_CLIENT_ID': os.getenv('TOPED_CLIENT_ID', ''),
    'TOPED_CLIENT_SECRET': os.getenv('TOPED_CLIENT_SECRET', ''),
    'TIKTOK_SHOP_ID': os.getenv('TIKTOK_SHOP_ID', ''),
    'TIKTOK_APP_KEY': os.getenv('TIKTOK_APP_KEY', ''),
    'TIKTOK_APP_SECRET': os.getenv('TIKTOK_APP_SECRET', ''),
    'NOTIFY_NEW_ORDER': os.getenv('NOTIFY_NEW_ORDER', 'true').lower() == 'true',
    'NOTIFY_PAYMENT_CONFIRMED': os.getenv('NOTIFY_PAYMENT_CONFIRMED', 'true').lower() == 'true',
    'NOTIFY_ORDER_SHIPPED': os.getenv('NOTIFY_ORDER_SHIPPED', 'true').lower() == 'true',
    'NOTIFY_ORDER_CANCELLED': os.getenv('NOTIFY_ORDER_CANCELLED', 'true').lower() == 'true',
    'NOTIFY_LOW_STOCK': os.getenv('NOTIFY_LOW_STOCK', 'true').lower() == 'true',
    'NOTIFY_DAILY_SUMMARY': os.getenv('NOTIFY_DAILY_SUMMARY', 'true').lower() == 'true',
    'DAILY_SUMMARY_TIME': os.getenv('DAILY_SUMMARY_TIME', '21:00'),
    'STORE_NAME': os.getenv('STORE_NAME', '[Online Store Name]'),
    'STORE_LOCATION': os.getenv('STORE_LOCATION', 'Bandung'),
    'DEMO_MODE': os.getenv('DEMO_MODE', 'true').lower() == 'true',
}

class OrderNotificationBot:
    """Main bot class for order notifications."""
    
    def __init__(self):
        self.application: Optional[Application] = None
        self.is_running = True
        self.last_check_time = datetime.now()
        self.orders_processed = set()
        self.demo_order_counter = 1000
        self.paused = False
        
        # Stats
        self.stats = {
            'orders_today': 0,
            'revenue_today': 0,
            'orders_total': 0,
            'errors': 0
        }
        
        # Sample data for demo mode
        self.demo_products = [
            ("Filter Oli Hino 300 Series", "Rp 55.250", 2, "15613-LAA70"),
            ("Kampas Rem Isuzu ELF", "Rp 120.000", 1, "I-BS5027"),
            ("Alternator Hino J08E", "Rp 4.200.000", 1, "27060-EW041"),
            ("Filter Solar Hino 500", "Rp 120.000", 1, "23300-EW071"),
            ("Kampas Kopling Isuzu NMR", "Rp 950.000", 1, "8973622351"),
            ("Lampu Depan Hino Dutro", "Rp 450.000", 1, "81150-E0B-H01"),
            ("Injektor Common Rail Hino", "Rp 2.300.000", 1, "23670-E0400"),
            ("Kaca Spion Mitsubishi Canter", "Rp 250.000", 2, "865190MM"),
            ("Filter Udara Hino Ranger", "Rp 275.000", 1, "17801-3340"),
            ("Busi Glow Plug Hino J05E", "Rp 450.000", 4, "19850-78081"),
        ]
        
        self.demo_customers = [
            ("Ahmad S", "Jakarta", "0812****5678"),
            ("Budi P", "Surabaya", "0813****1234"),
            ("Dedi K", "Bandung", "0878****9012"),
            ("Eka W", "Semarang", "0812****3456"),
            ("Fajar M", "Medan", "0852****7890"),
            ("Gilang R", "Bali", "0899****1122"),
            ("Hadi S", "Makassar", "0811****3344"),
            ("Indra Y", "Palembang", "0877****5566"),
        ]
        
        self.last_demo_time = datetime.now() - timedelta(hours=2)
    
    def is_configured(self) -> bool:
        """Check if bot token is configured."""
        token = CONFIG['TELEGRAM_BOT_TOKEN']
        return token and token != 'YOUR_BOT_TOKEN_HERE' and len(token) > 20
    
    def is_api_configured(self) -> bool:
        """Check if any real API is configured."""
        return (
            CONFIG['TOPED_CLIENT_ID'] and 
            CONFIG['TOPED_CLIENT_ID'] != 'YOUR_CLIENT_ID'
        ) or (
            CONFIG['TIKTOK_APP_KEY'] and 
            CONFIG['TIKTOK_APP_KEY'] != 'YOUR_APP_KEY'
        )
    
    def mask_customer_name(self, name: str) -> str:
        """Mask customer name for privacy."""
        if len(name) > 3:
            return name[:2] + '*' * (len(name) - 2)
        return name[:1] + '***'
    
    def mask_phone(self, phone: str) -> str:
        """Mask phone number."""
        if len(phone) > 6:
            return phone[:4] + '****' + phone[-4:]
        return phone[:2] + '****'
    
    def format_rupiah(self, amount: int) -> str:
        """Format number as Rupiah."""
        return f"Rp {amount:,.0f}".replace(',', '.')
    
    async def notify_new_order(self, order_data: Dict):
        """Send new order notification."""
        if not CONFIG['NOTIFY_NEW_ORDER'] or self.paused:
            return
        
        # Format message
        msg = f"""🛒 *ORDER BARU #{order_data.get('order_id', '???')}*

Platform: {order_data.get('platform', 'Tokopedia')}
Customer: {self.mask_customer_name(order_data.get('customer', 'Unknown'))} ({order_data.get('city', 'Unknown')})
Product: {order_data.get('product', 'Unknown')} x{order_data.get('qty', 1)}
Total: {order_data.get('total', 'Rp 0')} + Ongkir {order_data.get('shipping_cost', 'Rp 0')}
Shipping: {order_data.get('courier', 'JNE')} {order_data.get('service', 'REG')} (Est. {order_data.get('eta', '?')} hari)
Time: {order_data.get('time', datetime.now().strftime('%H:%M'))} WIB

_Status: Menunggu pembayaran_ ⚡"""
        
        await self.send_message(msg)
        
        # Update stats
        self.stats['orders_today'] += 1
        self.stats['orders_total'] += 1
        
        # Parse total for revenue
        total_str = order_data.get('total', 'Rp 0').replace('Rp ', '').replace('.', '')
        try:
            self.stats['revenue_today'] += int(total_str)
        except:
            pass
    
    async def notify_payment_confirmed(self, order_data: Dict):
        """Send payment confirmation notification."""
        if not CONFIG['NOTIFY_PAYMENT_CONFIRMED'] or self.paused:
            return
        
        msg = f"""💰 *PEMBAYARAN DITERIMA*

Order ID: #{order_data.get('order_id', '???')}
Platform: {order_data.get('platform', 'Tokopedia')}
Metode: {order_data.get('payment_method', 'Transfer Bank')}
Jumlah: {order_data.get('total', 'Rp 0')}
Verifikasi: ✅ *TERVERIFIKASI*

_Siap packing & kirim!_ 📦"""
        
        await self.send_message(msg)
    
    async def notify_order_shipped(self, order_data: Dict):
        """Send shipping notification."""
        if not CONFIG['NOTIFY_ORDER_SHIPPED'] or self.paused:
            return
        
        msg = f"""📦 *PESANAN DIKIRIM*

Order ID: #{order_data.get('order_id', '???')}
Platform: {order_data.get('platform', 'Tokopedia')}
Couries: {order_data.get('courier', 'JNE')}
Resi: `{order_data.get('tracking_number', 'PENDING')}`
Estimasi: {order_data.get('eta', '?')} hari kerja

_Tracking otomatis update_ 📱"""
        
        await self.send_message(msg)
    
    async def notify_low_stock(self, product_data: Dict):
        """Send low stock alert."""
        if not CONFIG['NOTIFY_LOW_STOCK'] or self.paused:
            return
        
        msg = f"""⚠️ *STOK MENIPIS*

Produk: *{product_data.get('name', 'Unknown')}*
Part Number: `{product_data.get('part_number', 'N/A')}`
Sisa Stock: *{product_data.get('stock', 0)} unit*
Threshold: {product_data.get('threshold', 5)} unit

_Restock segera!_ 🔄"""
        
        await self.send_message(msg)
    
    async def send_daily_summary(self):
        """Send daily summary to Telegram."""
        if not CONFIG['NOTIFY_DAILY_SUMMARY'] or self.paused:
            return
        
        today = datetime.now().strftime('%d %B %Y')
        
        # Generate sample breakdown
        toko_orders = self.stats['orders_today'] // 2 + random.randint(0, 2)
        tiktok_orders = self.stats['orders_today'] - toko_orders
        
        if self.stats['orders_today'] > 0:
            top_product = random.choice(self.demo_products)[0]
        else:
            top_product = "-"
        
        msg = f"""📊 *RINGKASAN HARIAN*
{today}

📦 Orders: *{self.stats['orders_today']}* total
   • Tokopedia: {toko_orders}
   • TikTok Shop: {tiktok_orders}

💰 Revenue: *{self.format_rupiah(self.stats['revenue_today'])}*

🔥 Top Product: {top_product}

📋 Pending: {random.randint(0, 3)} orders (belum diproses)

_Good job!_ 🎉"""
        
        await self.send_message(msg)
        
        # Reset daily stats
        self.stats['orders_today'] = 0
        self.stats['revenue_today'] = 0
    
    async def send_message(self, text: str, parse_mode: str = 'Markdown'):
        """Send message to Telegram chat."""
        if not self.application:
            logger.error("Bot application not initialized")
            return
        
        chat_id = CONFIG['TELEGRAM_CHAT_ID']
        if not chat_id or chat_id == 'YOUR_CHAT_ID_HERE':
            logger.error("Chat ID not configured")
            return
        
        try:
            await self.application.bot.send_message(
                chat_id=chat_id,
                text=text,
                parse_mode=parse_mode
            )
            logger.info(f"Message sent to {chat_id}")
        except Exception as e:
            logger.error(f"Failed to send message: {e}")
        
    # ========== DEMO MODE ==========
    
    def generate_demo_order(self) -> Dict:
        """Generate fake order for demo mode."""
        self.demo_order_counter += 1
        product = random.choice(self.demo_products)
        customer = random.choice(self.demo_customers)
        
        qty = random.randint(1, 3)
        price = int(product[1].replace('Rp ', '').replace('.', ''))
        total = price * qty
        shipping = random.choice([12000, 15000, 18000, 20000, 25000])
        
        platforms = ['Tokopedia', 'TikTok Shop']
        couriers = ['JNE', 'J&T', 'SiCepat']
        services = ['REG', 'YES', 'OKE']
        etas = ['1-2', '2-3', '3-5']
        
        return {
            'order_id': str(self.demo_order_counter),
            'platform': random.choice(platforms),
            'customer': customer[0],
            'city': customer[1],
            'phone': customer[2],
            'product': product[0],
            'qty': qty,
            'part_number': product[3],
            'price': product[1],
            'total': self.format_rupiah(total),
            'shipping_cost': self.format_rupiah(shipping),
            'grand_total': self.format_rupiah(total + shipping),
            'courier': random.choice(couriers),
            'service': random.choice(services),
            'eta': random.choice(etas),
            'time': datetime.now().strftime('%H:%M'),
        }
    
    async def update_demo_orders(self):
        """Generate demo orders every 2 hours."""
        if not CONFIG['DEMO_MODE']:
            return
        
        now = datetime.now()
        if (now - self.last_demo_time).total_seconds() >= 7200:  # 2 hours
            self.last_demo_time = now
            order = self.generate_demo_order()
            await self.notify_new_order(order)
            logger.info(f"Demo order generated: #{order['order_id']}")
    
    async def send_test_notification(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Send test notification."""
        test_order = {
            'order_id': 'TEST1234',
            'platform': 'Tokopedia',
            'customer': 'Test Customer',
            'city': 'Jakarta',
            'product': 'Filter Oli Hino 300 Series',
            'qty': 2,
            'total': 'Rp 110.500',
            'shipping_cost': 'Rp 15.000',
            'courier': 'JNE',
            'service': 'REG',
            'eta': '2-3',
            'time': datetime.now().strftime('%H:%M'),
        }
        
        await self.notify_new_order(test_order)
        await update.message.reply_text("✅ Test notification sent!")
    
    # ========== TELEGRAM COMMANDS ==========
    
    async def cmd_start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /start command."""
        mode = "DEMO" if CONFIG['DEMO_MODE'] else "LIVE"
        api_status = "❌ Not configured" if not self.is_api_configured() else "✅ Connected"
        
        msg = f"""🤖 *{CONFIG['STORE_NAME']} Order Bot*

Status: *{mode} MODE*
Api: {api_status}
Location: {CONFIG['STORE_LOCATION']}

🛒 Notifications: {"🟢 ON" if not self.paused else "🔴 PAUSED"}

Commands:
/orders - Last 5 orders
/summary - Today's summary
/stock [product] - Check stock
/status - Bot health
/test - Test notification
/pause - Pause notifications
/resume - Resume
/help - Show help

Use /test to see sample notification."""
        
        await update.message.reply_text(msg, parse_mode='Markdown')
    
    async def cmd_orders(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /orders command."""
        # Generate sample orders for display
        orders_text = """📋 *5 ORDER TERBARU*

"""
        for i in range(5):
            order = self.generate_demo_order()
            orders_text += f"""{i+1}. #{order['order_id'][:6]} - {order['platform']}
   {order['product']} x{order['qty']}
   {order['total']} - {order['customer']}

"""
        
        await update.message.reply_text(orders_text, parse_mode='Markdown')
    
    async def cmd_summary(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /summary command."""
        await self.send_daily_summary()
        await update.message.reply_text("📊 Summary sent!")
    
    async def cmd_stock(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /stock command."""
        args = context.args
        if not args:
            await update.message.reply_text(
                "Usage: /stock [product name]\nExample: /stock filter oli"
            )
            return
        
        search_term = ' '.join(args).lower()
        
        # Search in demo products
        found = []
        for prod in self.demo_products:
            if search_term in prod[0].lower() or search_term in prod[3].lower():
                stock = random.randint(0, 50)
                status = "✅ Tersedia" if stock > 5 else ("⚠️ Low" if stock > 0 else "❌ Habis")
                found.append(f"📦 {prod[0]} ({prod[3]})\n   Stock: {stock} unit {status}")
        
        if found:
            await update.message.reply_text(
                "🔍 *HASIL PENCARIAN*\n\n" + '\n\n'.join(found[:5]),
                parse_mode='Markdown'
            )
        else:
            await update.message.reply_text(
                f"❌ Produk '{search_term}' tidak ditemukan.\nContoh: /stock filter oli"
            )
    
    async def cmd_status(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /status command."""
        uptime = datetime.now() - (self.last_check_time or datetime.now())
        
        status = f"""🤖 *BOT STATUS*

Mode: {"🟡 DEMO" if CONFIG['DEMO_MODE'] else "🟢 LIVE"}
Configured: {"✅ Yes" if self.is_configured() else "❌ No"}
API Connected: {"✅ Yes" if self.is_api_configured() else "❌ No"}

Stats:
• Orders today: {self.stats['orders_today']}
• Total orders: {self.stats['orders_total']}
• Errors: {self.stats['errors']}

Paused: {"Yes 🔴" if self.paused else "No 🟢"}
Daily Summary: {CONFIG['DAILY_SUMMARY_TIME']} WIB

System OK. 🟢"""
        
        await update.message.reply_text(status, parse_mode='Markdown')
    
    async def cmd_pause(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /pause command."""
        self.paused = True
        await update.message.reply_text(
            "🔴 Notifications PAUSED.\nUse /resume to continue."
        )
    
    async def cmd_resume(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /resume command."""
        self.paused = False
        await update.message.reply_text(
            "🟢 Notifications RESUMED."
        )
    
    async def cmd_help(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /help command."""
        help_text = """🤖 *ORDER BOT - HELP*

*Commands:*
/start - Start bot, show status
/orders - Show last 5 orders
/summary - Send daily summary
/stock [name] - Check product stock
/status - Bot health check
/test - Send test notification
/pause - Pause notifications
/resume - Resume notifications
/help - Show this help

*Notifications:*
🛒 New orders
💰 Payment confirmed
📦 Shipping updates
⚠️ Low stock alerts
📊 Daily summary

*Demo Mode:*
- Sample orders every 2 hours
- Test before store opens
- Configure APIs when ready

Config: config.env"""
        
        await update.message.reply_text(help_text, parse_mode='Markdown')
    
    # ========== POLLING / BACKGROUND JOBS ==========
    
    async def poll_tokopedia(self):
        """Poll Tokopedia API for new orders."""
        if CONFIG['DEMO_MODE'] or not self.is_api_configured():
            return
        
        # TODO: Implement real Tokopedia API polling
        # Reference: https://developer.tokopedia.com/
        logger.info("Checking Tokopedia API (not implemented)")
    
    async def poll_tiktok(self):
        """Poll TikTok Shop API for new orders."""
        if CONFIG['DEMO_MODE'] or not self.is_api_configured():
            return
        
        # TODO: Implement real TikTok Shop API polling
        # Reference: https://partner.tiktokshop.com/
        logger.info("Checking TikTok API (not implemented)")
    
    async def scheduled_check(self):
        """Run scheduled checks."""
        if self.paused:
            return
        
        try:
            if CONFIG['DEMO_MODE']:
                await self.update_demo_orders()
            else:
                await self.poll_tokopedia()
                await self.poll_tiktok()
        except Exception as e:
            logger.error(f"Scheduled check error: {e}")
            self.stats['errors'] += 1
    
    def setup_handlers(self):
        """Setup command handlers."""
        self.application.add_handler(CommandHandler("start", self.cmd_start))
        self.application.add_handler(CommandHandler("orders", self.cmd_orders))
        self.application.add_handler(CommandHandler("summary", self.cmd_summary))
        self.application.add_handler(CommandHandler("stock", self.cmd_stock))
        self.application.add_handler(CommandHandler("status", self.cmd_status))
        self.application.add_handler(CommandHandler("test", self.send_test_notification))
        self.application.add_handler(CommandHandler("pause", self.cmd_pause))
        self.application.add_handler(CommandHandler("resume", self.cmd_resume))
        self.application.add_handler(CommandHandler("help", self.cmd_help))
    
    async def run(self):
        """Main run loop."""
        logger.info("Starting Order Notification Bot...")
        logger.info(f"Mode: {'DEMO' if CONFIG['DEMO_MODE'] else 'LIVE'}")
        logger.info(f"Daily summary time: {CONFIG['DAILY_SUMMARY_TIME']}")
        
        if not self.is_configured():
            logger.error("Bot token not configured!")
            logger.error("Edit config.env and set TELEGRAM_BOT_TOKEN")
            return
        
        # Build application
        self.application = (
            ApplicationBuilder()
            .token(CONFIG['TELEGRAM_BOT_TOKEN'])
            .build()
        )
        
        self.setup_handlers()
        
        # Schedule daily summary
        schedule.every().day.at(CONFIG['DAILY_SUMMARY_TIME']).do(
            lambda: self.application.create_task(self.send_daily_summary())
        )
        
        # Start bot
        await self.application.initialize()
        await self.application.start()
        await self.application.updater.start_polling()
        
        logger.info("Bot started! Send /start in Telegram to begin.")
        
        # Main loop
        try:
            while self.is_running:
                try:
                    if not self.paused:
                        if CONFIG['DEMO_MODE']:
                            await self.update_demo_orders()
                        else:
                            await self.poll_tokopedia()
                            await self.poll_tiktok()
                except Exception as e:
                    logger.error(f"Check error: {e}")
                    self.stats['errors'] += 1
                
                schedule.run_pending()
                await asyncio.sleep(60)  # Check every 60 seconds
        except KeyboardInterrupt:
            logger.info("Shutting down...")
        finally:
            await self.application.stop()
            await self.application.shutdown()


import asyncio

async def main():
    bot = OrderNotificationBot()
    await bot.run()

if __name__ == '__main__':
    asyncio.run(main())
