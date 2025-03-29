interface BskyPost {
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
  meta: {
    category: string;
    source: string;
  };
}
