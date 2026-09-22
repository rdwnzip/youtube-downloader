import { NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

const YOUTUBE_API_KEY = 'AIzaSyCdaigYsf3kq4lu062UW0in_q04sTdX-9Y';

// Parse ISO 8601 duration (PT4M33S) to readable format
function parseDuration(duration) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Parse duration from seconds to readable format
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter required' },
        { status: 400 }
      );
    }

    // Check if query is a YouTube URL
    const urlPattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = query.match(urlPattern);

    if (match) {
      // If it's a URL, use YouTube API to get video info
      const videoId = match[1];
      
      try {
        const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
        
        const response = await fetch(detailsUrl);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || 'YouTube API error');
        }
        
        if (!data.items || data.items.length === 0) {
          return NextResponse.json(
            { error: 'Video not found. It might be private or deleted.' },
            { status: 404 }
          );
        }
        
        const video = data.items[0];
        
        return NextResponse.json({
          videos: [{
            id: video.id,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url || '',
            channel: video.snippet.channelTitle,
            duration: parseDuration(video.contentDetails.duration)
          }]
        });
      } catch (apiError) {
        console.error('YouTube API error for URL:', apiError);
        return NextResponse.json(
          { error: 'Failed to fetch video info: ' + apiError.message },
          { status: 500 }
        );
      }
    }

    // Text search using YouTube Data API v3
    try {
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'YouTube API error');
      }
      
      if (!data.items || data.items.length === 0) {
        return NextResponse.json({
          videos: [],
          error: 'No results found'
        });
      }
      
      // Get video details (duration) for each result
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
      
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();
      
      const durationsMap = {};
      if (detailsData.items) {
        detailsData.items.forEach(item => {
          durationsMap[item.id] = parseDuration(item.contentDetails.duration);
        });
      }
      
      // Map results
      const videos = data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url || '',
        channel: item.snippet.channelTitle,
        duration: durationsMap[item.id.videoId] || '0:00'
      }));
      
      return NextResponse.json({ videos });
      
    } catch (apiError) {
      console.error('YouTube API error:', apiError);
      return NextResponse.json(
        { error: 'Search failed: ' + apiError.message },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to search' },
      { status: 500 }
    );
  }
}
