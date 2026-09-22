# YouTube Downloader - Deployment Checklist

## Pre-Deploy

- [x] ytdl-core installed
- [x] lucide-react icons installed
- [x] API routes created
- [x] Frontend page created
- [x] Mobile responsive UI
- [ ] Build successful
- [ ] Local test passed

## Vercel Deployment (Quick & Free)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add YouTube downloader feature"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repo
4. Framework: **Next.js** (auto-detected)
5. Root Directory: `./` (default)
6. Build Command: `npm run build` (default)
7. Output Directory: `.next` (default)
8. Install Command: `npm install` (default)
9. Click **Deploy**

### Step 3: Test
- Access: `https://your-project.vercel.app/downloader`
- Paste YouTube URL
- Download MP3/MP4

### Vercel Limitations
- **Hobby tier:** 10s timeout (short videos only)
- **Pro tier:** 60s timeout ($20/month)
- Serverless functions (no persistent storage)

**If timeout errors occur:** Deploy to Railway instead.

## Railway Deployment (Production Ready)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: Deploy
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repo
4. Railway auto-detects Next.js
5. Wait for deploy (~3-5 min)

### Step 3: Access
- URL: `https://your-app.up.railway.app/downloader`
- Add custom domain (optional): Settings → Domains

### Railway Benefits
- No timeout limits
- Long-running processes
- Better for large file downloads
- $5/month free credit

## Post-Deploy Testing

### Test Cases
1. **Short video (<5 min):** Should work on both Vercel & Railway
2. **Long video (>10 min):** May timeout on Vercel, works on Railway
3. **Audio only (MP3):** Should work everywhere
4. **Mobile access:** Test on phone
5. **Different URLs:**
   - `youtube.com/watch?v=...`
   - `youtu.be/...`
   - `youtube.com/watch?v=...&list=...` (should extract video only)

### Common Issues

**"Download failed"**
- Check video is public
- Try different video
- Check logs: `vercel logs` or Railway logs

**"Function timeout"**
- Video too long for Vercel hobby
- Upgrade to Vercel Pro or use Railway

**"Module not found: ytdl-core"**
- Run `npm install` locally
- Commit package-lock.json
- Redeploy

## Environment Variables (None Required)

This downloader works without any API keys or env vars.

**Optional:** Add YouTube Data API key for search feature (future enhancement).

## Custom Domain (Optional)

### Vercel
1. Settings → Domains
2. Add domain: `downloader.yourdomain.com`
3. Add DNS records (Vercel provides instructions)

### Railway
1. Project Settings → Domains
2. Click "Generate Domain" or add custom

## Monitoring

### Vercel
- Dashboard → Your Project → Analytics
- View function invocations, errors, bandwidth

### Railway
- Project → Metrics
- CPU, memory, network usage

## Upgrade Path

**Current:** ytdl-core (good for most cases)

**Future:** yt-dlp (if issues arise)
1. Deploy to Railway (VPS-like environment)
2. Run `bash scripts/upgrade-to-ytdlp.sh`
3. Update API routes to use yt-dlp wrapper
4. Test & redeploy

## Security Notes

- No user data stored
- No authentication required
- Download happens client-side
- CORS enabled for API routes
- Rate limiting recommended for production (add later)

## Done! 🚀

Your YouTube downloader is now live and accessible from anywhere, including mobile devices.

**Share the link:** `https://your-domain.com/downloader`
