# YouTube Downloader - Quick Start Guide

## Akses Dashboard

**Local:** http://localhost:20127/downloader
**Production:** https://your-domain.com/downloader

## Cara Pakai

### 1. Paste YouTube URL
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://youtu.be/dQw4w9WgXcQ
```

### 2. Klik tombol format
- **MP3 (Audio)** - untuk musik saja (lebih kecil)
- **MP4 (Video)** - untuk video + audio

### 3. Download otomatis
File langsung download ke device lo (HP/laptop)

## Mobile Responsive

Dashboard sudah optimized untuk HP:
- Layout stack di mobile
- Thumbnail responsive
- Touch-friendly buttons
- Fast loading

## Troubleshooting

### "Download failed"
- Coba URL yang berbeda
- Pastikan video tidak private/age-restricted
- Tunggu beberapa detik, retry

### "Video too long" / Timeout
- **Vercel:** Max 10s (hobby tier)
- **Solution:** Deploy ke Railway (no limits)

### "This video is unavailable"
- Video mungkin copyright-blocked
- Coba video lain

## Tips

1. **Untuk musik:** Pilih MP3 (file lebih kecil)
2. **Untuk MV:** Pilih MP4
3. **Private/Unlisted videos:** Tidak bisa didownload
4. **Live streams:** Tidak support (yet)

## Deploy Options Comparison

| Platform | Setup | Cost | Timeout | Best For |
|----------|-------|------|---------|----------|
| **Vercel** | 1-click | Free | 10s hobby / 60s pro | Quick test, short videos |
| **Railway** | 2 min | $5/mo credit (free tier) | No limit | Production, reliable |
| **VPS** | Manual | $5-10/mo | No limit | Full control |

## Next Steps

**Current:** ytdl-core (works, kadang throttle)
**Upgrade:** yt-dlp (more stable, production-grade)

Kalau lo experience issues dengan ytdl-core, deploy ke Railway dan kita upgrade ke yt-dlp.

---

**Need help?** Check DOWNLOADER.md untuk detail teknis.
