// yt-dlp wrapper for Node.js
// Use this to replace ytdl-core if you need better reliability

import { execa } from 'execa';
import { createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';

export class YtDlp {
  /**
   * Get video info
   * @param {string} videoUrl - YouTube URL
   * @returns {Promise<Object>} Video metadata
   */
  static async getInfo(videoUrl) {
    const { stdout } = await execa('yt-dlp', [
      '--dump-json',
      '--no-warnings',
      videoUrl
    ]);
    
    const info = JSON.parse(stdout);
    
    return {
      id: info.id,
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      channel: info.uploader,
      description: info.description
    };
  }

  /**
   * Download video/audio
   * @param {string} videoUrl - YouTube URL
   * @param {Object} options
   * @param {string} options.format - 'mp3' or 'mp4'
   * @param {string} options.quality - 'best', 'worst', '720p', etc
   * @returns {Promise<string>} Path to downloaded file
   */
  static async download(videoUrl, { format = 'mp4', quality = 'best' } = {}) {
    const outputPath = join(tmpdir(), `${randomUUID()}.${format}`);
    
    const args = [
      '--no-warnings',
      '--no-playlist',
      '-o', outputPath
    ];

    if (format === 'mp3') {
      args.push(
        '-x', // Extract audio
        '--audio-format', 'mp3',
        '--audio-quality', '0' // Best quality
      );
    } else {
      args.push(
        '-f', `bestvideo[height<=${quality.replace('p', '')}]+bestaudio/best`,
        '--merge-output-format', 'mp4'
      );
    }

    args.push(videoUrl);

    await execa('yt-dlp', args);
    
    return outputPath;
  }

  /**
   * Stream download (for API route)
   * @param {string} videoUrl
   * @param {string} format
   * @returns {Promise<ReadableStream>}
   */
  static async streamDownload(videoUrl, format = 'mp4') {
    const filePath = await this.download(videoUrl, { format });
    
    // Return file stream and cleanup function
    return {
      path: filePath,
      cleanup: async () => {
        try {
          await unlink(filePath);
        } catch (err) {
          console.error('Cleanup error:', err);
        }
      }
    };
  }
}

// Usage example in API route:
/*
import { YtDlp } from '@/lib/yt-dlp-wrapper';
import { createReadStream } from 'fs';

export async function POST(request) {
  const { videoUrl, format } = await request.json();
  
  // Get video info first
  const info = await YtDlp.getInfo(videoUrl);
  
  // Download to temp file
  const { path, cleanup } = await YtDlp.streamDownload(videoUrl, format);
  
  // Stream to client
  const stream = createReadStream(path);
  
  // Cleanup after streaming
  stream.on('end', cleanup);
  stream.on('error', cleanup);
  
  return new Response(stream, {
    headers: {
      'Content-Type': format === 'mp3' ? 'audio/mpeg' : 'video/mp4',
      'Content-Disposition': `attachment; filename="${info.title}.${format}"`
    }
  });
}
*/
