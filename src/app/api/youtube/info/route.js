import { NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

// Parse duration from seconds to readable format
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID required' },
        { status: 400 }
      );
    }

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const info = await ytdl.getInfo(videoUrl);

    return NextResponse.json({
      video: {
        id: info.videoDetails.videoId,
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails[0]?.url || '',
        channel: info.videoDetails.author.name,
        duration: formatDuration(parseInt(info.videoDetails.lengthSeconds)),
        description: info.videoDetails.description
      }
    });

  } catch (error) {
    console.error('Info error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get video info' },
      { status: 500 }
    );
  }
}
