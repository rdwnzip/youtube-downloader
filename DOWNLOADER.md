# YouTube Downloader Dashboard

Dashboard untuk download musik dan video dari YouTube tanpa iklan. Built with Next.js.

## Features

- 🎵 Download MP3 (audio only)
- 🎬 Download MP4 (video)
- 🔍 Paste YouTube URL langsung
- 📱 Mobile responsive
- 🚫 No ads, no tracking
- ⚡ Fast & secure

## Usage

1. Buka `/downloader`
2. Paste YouTube URL (contoh: `https://youtube.com/watch?v=...`)
3. Pilih format: MP3 (audio) atau MP4 (video)
4. Download otomatis ke device

## Deployment

### Option 1: Vercel (Instant Deploy)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

**Pros:** Free, instant, auto-deploy from Git
**Cons:** Timeout 10s (hobby) / 60s (pro), kadang video panjang gagal

1. Push repo to GitHub
2. Import to Vercel
3. Deploy (no environment variables needed)
4. Access: `https://your-app.vercel.app/downloader`

### Option 2: Railway (Recommended for Production)

**Pros:** No timeout limits, more stable, support long downloads
**Cons:** Free tier limited ($5/month credit)

1. Push repo to GitHub
2. Go to [Railway](https://railway.app)
3. "New Project" → "Deploy from GitHub repo"
4. Select this repo
5. Railway auto-detects Next.js and deploys
6. Access: `https://your-app.up.railway.app/downloader`

### Option 3: VPS (Full Control)

```bash
# Clone repo
git clone <your-repo>
cd 9router-mibp-version

# Install dependencies
npm install

# Build
npm run build

# Start (production)
npm start
```

Access: `http://your-vps-ip:20127/downloader`

## Tech Stack

- **Frontend:** Next.js 16 + React 19
- **Styling:** Tailwind CSS 4
- **YouTube:** @distube/ytdl-core
- **Icons:** lucide-react

## API Routes

### GET `/api/youtube/info?videoId={id}`
Get video metadata

### POST `/api/youtube/download`
Download video as MP3 or MP4
```json
{
  "videoId": "dQw4w9WgXcQ",
  "format": "mp3"
}
```

## Limitations

### ytdl-core (current)
- Kadang kena YouTube throttling
- Rate limiting on IP
- Works for most videos

### Upgrade to yt-dlp (future)
If you need more reliability:
1. Deploy to Railway/VPS
2. Install yt-dlp binary
3. Replace ytdl-core with yt-dlp wrapper
4. More stable, supports more formats

## License

MIT - Use freely for personal projects
