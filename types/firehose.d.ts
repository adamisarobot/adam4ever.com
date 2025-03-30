import type { ParsedContent } from '@nuxt/content';

type Meta = {
  category: string;
  source: 'blog' | 'bluesky' | 'tmdb' | 'hardcover';
};

export interface Movie {
  id: number;
  uuid: string;
  adult: number;
  backdrop_path: string;
  genre_ids: string;
  genre_names: string;
  tmdb_id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: number;
  vote_average: number;
  vote_count: number;
  created_at: string;
  meta: Meta & { source: 'tmdb' };
}

export interface BskyPost {
  id: number;
  uuid: string;
  bluesky_id: string;
  author_did: string;
  author_displayName: string;
  author_avatar: string;
  record_text: string;
  record_createdAt: string;
  embed_thumb: string;
  embed_fullsize: string;
  embed_alt: string;
  embed_aspectRatio: string;
  likes: number;
  reposts: number;
  replies: number;
  quote: number;
  created_at: string;
  meta: Meta & { source: 'bluesky' };
}

export interface Book {
  id: number;
  uuid: string;
  title: string;
  author_name: string;
  series_name: string;
  series_position: number;
  image_url: string;
  progress: number | null;
  started_at: string;
  rating: number;
  created_at: string;
  meta: Meta & { source: 'hardcover' };
  data?: string;
}

export interface BlogPost extends ParsedContent {
  created_at: string;
  meta: Meta & { source: 'blog' };
}

export interface Firehose {
  data: (Movie | BskyPost | Book)[];
}

export type Post = Movie | BskyPost | Book | BlogPost;

export type FirehoseData = Post[];
