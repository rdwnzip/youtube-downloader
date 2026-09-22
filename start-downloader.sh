#!/bin/bash
# Quick start YouTube Downloader in development mode

echo "🎵 Starting YouTube Downloader..."
echo ""

# Check if dependencies installed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Start dev server
echo "🚀 Starting development server..."
echo ""
echo "Access downloader at:"
echo "👉 http://localhost:20127/downloader"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm run dev
