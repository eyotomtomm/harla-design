/**
 * Live content from Substack and Spotify, fetched server-side and cached for
 * an hour. Every function degrades to a sensible fallback on any failure.
 */
import 'server-only';
import { SPOTIFY_SHOW_URL, SUBSTACK_URL, PODCAST_NAME } from '@/data/links';

export interface FeedPost {
  title: string;
  url: string;
  date: string; // ISO
}

export interface PodcastInfo {
  name: string;
  url: string;
  image?: string;
  description?: string;
}

const REVALIDATE = 3600;

function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .trim();
}

function tag(xml: string, name: string): string {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : '';
}

export async function getSubstackPosts(limit = 3): Promise<FeedPost[]> {
  try {
    const res = await fetch(`${SUBSTACK_URL}/feed`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.split('<item>').slice(1);
    return items
      .map(item => ({ title: tag(item, 'title'), url: tag(item, 'link'), date: new Date(tag(item, 'pubDate')).toISOString() }))
      .filter(p => p.title && p.url)
      .slice(0, limit);
  } catch {
    return [];
  }
}

export async function getPodcast(): Promise<PodcastInfo> {
  const fallback: PodcastInfo = { name: PODCAST_NAME, url: SPOTIFY_SHOW_URL };
  try {
    const res = await fetch(SPOTIFY_SHOW_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HarlaDesignBot/1.0)' },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return fallback;
    const html = await res.text();
    const meta = (p: string) => html.match(new RegExp(`<meta property="og:${p}" content="([^"]*)"`))?.[1];
    const name = meta('title');
    return {
      name: name ? decode(name) : fallback.name,
      url: SPOTIFY_SHOW_URL,
      image: meta('image'),
      description: meta('description') ? decode(meta('description')!) : undefined,
    };
  } catch {
    return fallback;
  }
}

export function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
}
