#!/bin/bash
# Upgrade script: ytdl-core → yt-dlp
# Use this if ytdl-core has throttling issues

echo "🚀 Upgrading to yt-dlp for better reliability..."

# 1. Install yt-dlp binary
echo "📦 Installing yt-dlp..."
if command -v apt-get &> /dev/null; then
  # Debian/Ubuntu
  sudo apt-get update
  sudo apt-get install -y python3 python3-pip ffmpeg
  sudo pip3 install yt-dlp
elif command -v yum &> /dev/null; then
  # CentOS/RHEL
  sudo yum install -y python3 python3-pip ffmpeg
  sudo pip3 install yt-dlp
elif command -v brew &> /dev/null; then
  # macOS
  brew install yt-dlp ffmpeg
else
  echo "⚠️  Please install yt-dlp manually:"
  echo "   pip install yt-dlp"
  exit 1
fi

# 2. Install Node.js wrapper
echo "📦 Installing Node.js wrapper..."
npm install execa

echo "✅ yt-dlp installed successfully!"
echo ""
echo "Next steps:"
echo "1. Replace ytdl-core imports with yt-dlp wrapper"
echo "2. Update download route to use yt-dlp CLI"
echo "3. Test: npm run dev"
echo ""
echo "See scripts/yt-dlp-wrapper.js for implementation example"
