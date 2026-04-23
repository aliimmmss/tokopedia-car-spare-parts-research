#!/bin/bash
# Order Notification Bot Startup Script
# For Tokopedia and TikTok Shop - Commercial Vehicle Spare Parts

# Change to bot directory
cd "$(dirname "$0")"

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Check if dependencies are installed
if ! python -c "import telegram" 2>/dev/null; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
fi

# Check config
if [ ! -f "config.env" ]; then
    echo "ERROR: config.env not found!"
    echo "Please create config.env from config.env.example"
    exit 1
fi

# Create logs directory
mkdir -p logs

# Start bot
echo "Starting Order Notification Bot..."
echo "Logs saved to: logs/bot.log"
echo "Press Ctrl+C to stop"
echo "=========================================="

python order_bot.py 2>&1 | tee logs/bot.log
