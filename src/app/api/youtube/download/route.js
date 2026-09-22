import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { createReadStream, unlinkSync, existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';

const execAsync = promisify(exec);

// Helper to sanitize filename
function sanitizeFilename(name) {
  return name
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 200);
}

// Check if yt-dlp is available
async function checkYtDlp() {
  try {
    await execAsync('yt-dlp --version');
    return true;
  } catch {
    return false;
  }
}

export async function POST(request) {
  let tempFile = null;
  
  try {
    const { videoId, format } = await request.json();

    if (!videoId || !format) {
      return NextResponse.json(
        { error: 'Video ID and format required' },
        { status: 400 }
      );
    }

    if (!['mp3', 'mp4'].includes(format)) {
      return NextResponse.json(
        { error: 'Format must be mp3 or mp4' },
        { status: 400 }
      );
    }

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    // Check if yt-dlp is available
    const hasYtDlp = await checkYtDlp();
    
    if (!hasYtDlp) {
      return NextResponse.json(
        { error: 'yt-dlp not installed. Please deploy to Railway or VPS.' },
        { status: 500 }
      );
    }

    console.log(`[yt-dlp] Downloading ${videoId} as ${format}`);

    // Generate temp file path
    const tempId = randomUUID();
    const outputTemplate = join(tmpdir(), `ytdl_${tempId}`);
    tempFile = `${outputTemplate}.${format === 'mp3' ? 'mp3' : 'mp4'}`;

    // Build yt-dlp command
    let command;
    if (format === 'mp3') {
      // Audio only
      command = `yt-dlp -x --audio-format mp3 --audio-quality 0 -o "${outputTemplate}.%(ext)s" "${videoUrl}"`;
    } else {
      // Video with audio (best quality up to 1080p)
      command = `yt-dlp -f "bestvideo[height<=1080]+bestaudio/best[height<=1080]" --merge-output-format mp4 -o "${outputTemplate}.%(ext)s" "${videoUrl}"`;
    }

    console.log(`[yt-dlp] Command: ${command}`);

    // Execute yt-dlp
    const { stdout, stderr } = await execAsync(command, {
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
      timeout: 120000 // 2 minutes timeout
    });

    if (stderr) {
      console.log(`[yt-dlp] stderr: ${stderr}`);
    }

    // Check if file exists
    if (!existsSync(tempFile)) {
      throw new Error('Download failed - file not created');
    }

    console.log(`[yt-dlp] Download complete: ${tempFile}`);

    // Get filename from yt-dlp output or use videoId
    let filename = `${videoId}.${format}`;
    const titleMatch = stdout.match(/\[download\] Destination: (.+)/);
    if (titleMatch) {
      const fullPath = titleMatch[1];
      const baseName = fullPath.split('/').pop().split('\\').pop();
      filename = sanitizeFilename(baseName);
    }

    // Read file and stream to client
    const fileStream = createReadStream(tempFile);

    // Clean up temp file after streaming
    fileStream.on('end', () => {
      try {
        if (tempFile && existsSync(tempFile)) {
          unlinkSync(tempFile);
          console.log(`[yt-dlp] Cleaned up temp file: ${tempFile}`);
        }
      } catch (err) {
        console.error('[yt-dlp] Failed to cleanup:', err);
      }
    });

    fileStream.on('error', () => {
      try {
        if (tempFile && existsSync(tempFile)) {
          unlinkSync(tempFile);
        }
      } catch (err) {
        console.error('[yt-dlp] Failed to cleanup on error:', err);
      }
    });

    // Convert to web stream
    const { Readable } = await import('stream');
    const webStream = Readable.toWeb(fileStream);

    // Return file
    return new NextResponse(webStream, {
      headers: {
        'Content-Type': format === 'mp3' ? 'audio/mpeg' : 'video/mp4',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('[yt-dlp] Error:', error);

    // Clean up temp file on error
    if (tempFile && existsSync(tempFile)) {
      try {
        unlinkSync(tempFile);
      } catch {}
    }
    
    let errorMessage = 'Download failed';
    
    if (error.message.includes('not found') || error.message.includes('not installed')) {
      errorMessage = 'yt-dlp not available. Deploy to Railway to enable downloads.';
    } else if (error.message.includes('Private video')) {
      errorMessage = 'This video is private.';
    } else if (error.message.includes('available in your country')) {
      errorMessage = 'This video is not available in your region.';
    } else if (error.message.includes('timeout')) {
      errorMessage = 'Download timeout. Video might be too large.';
    } else {
      errorMessage = error.message || 'Download failed';
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export const maxDuration = 300; // 5 minutes for large files
