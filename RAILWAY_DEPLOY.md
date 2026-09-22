# Railway Deployment Guide - YouTube Downloader

## Prerequisites
- GitHub account
- Railway account (sign up at railway.app)
- Git installed locally

## Step-by-Step Deployment

### 1. Push Code to GitHub

```bash
cd C:/Users/sofya/Desktop/SOFYAN/NGODING/9ROUTER/9router-mibp-version

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Add YouTube downloader with yt-dlp support"

# Create GitHub repo and push
# Go to github.com → New Repository → Create "9router-downloader"
git remote add origin https://github.com/YOUR_USERNAME/9router-downloader.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Railway

1. **Go to Railway**
   - Visit: https://railway.app
   - Click "Login" → Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `9router-downloader` repository

3. **Configure Build**
   Railway will auto-detect Next.js. No manual config needed!
   
   It will:
   - Install Node.js dependencies
   - Install yt-dlp binary (from Dockerfile.railway)
   - Build Next.js app
   - Deploy!

4. **Wait for Deployment**
   - Build takes 3-5 minutes
   - Watch logs in Railway dashboard
   - When done, you'll see "Deployed" status

5. **Get Your URL**
   - Railway gives you: `https://your-app.up.railway.app`
   - Click "Generate Domain" if not auto-generated

### 3. Access Your Downloader

```
https://your-app.up.railway.app/downloader
```

Open from:
- ✅ Laptop browser
- ✅ Phone browser
- ✅ Any device with internet

## Testing

1. **Paste YouTube URL:**
   ```
   https://www.youtube.com/watch?v=kO_AAjLbiys
   ```

2. **Or search by text:**
   ```
   miyeon run away
   ```

3. **Click MP3 or MP4**
   - Download should start immediately
   - Works with all videos (no throttling!)

## Railway Features

### Free Tier
- $5 credit per month
- ~500 hours of runtime
- Enough for personal use

### Auto-Deploy
- Push to GitHub → Railway auto-deploys
- No manual rebuild needed

### Custom Domain (Optional)
1. Railway dashboard → Settings → Domains
2. Add your domain: `downloader.yourdomain.com`
3. Configure DNS (Railway provides instructions)

## Troubleshooting

### Build Failed
```bash
# Check railway.json exists
ls railway.json

# Make sure Dockerfile.railway exists
ls Dockerfile.railway
```

### yt-dlp Not Found
Railway should install it automatically via Dockerfile.
Check build logs for errors.

### Port Issues
Railway auto-assigns PORT env variable.
Next.js will use it automatically.

## Environment Variables (Optional)

Railway dashboard → Variables:
```
NODE_ENV=production
```

No other env vars needed! YouTube API key is hardcoded.

## Monitoring

Railway dashboard shows:
- CPU usage
- Memory usage  
- Request logs
- Error logs

## Updating

```bash
# Make changes locally
git add .
git commit -m "Update downloader"
git push

# Railway auto-deploys!
```

## Cost Estimate

**Free tier ($5/month credit):**
- ~10,000 downloads/month
- Usually enough for personal use

**If you exceed:**
- $0.000463/GB-hour (compute)
- Very cheap for personal use

## Alternative: Use nixpacks Config

If Dockerfile doesn't work, Railway can use nixpacks.

Create `nixpacks.toml`:
```toml
[phases.setup]
nixPkgs = ["python3", "ffmpeg"]

[phases.install]
cmds = ["pip3 install yt-dlp", "npm install"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm start"
```

## Success Indicators

✅ Build logs show: "yt-dlp installed"
✅ App is accessible at Railway URL
✅ `/downloader` page loads
✅ Search works
✅ Download works (MP3 & MP4)

## Need Help?

- Railway docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- yt-dlp docs: https://github.com/yt-dlp/yt-dlp

---

**Ready to deploy?** Follow steps 1-5 above! 🚀
