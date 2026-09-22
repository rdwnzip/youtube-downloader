@echo off
REM Quick start YouTube Downloader in development mode (Windows)

echo 🎵 Starting YouTube Downloader...
echo.

REM Check if dependencies installed
if not exist "node_modules\" (
  echo 📦 Installing dependencies...
  call npm install
)

REM Start dev server
echo 🚀 Starting development server...
echo.
echo Access downloader at:
echo 👉 http://localhost:20127/downloader
echo.
echo Press Ctrl+C to stop
echo.

call npm run dev
