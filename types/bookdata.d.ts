interface Book {
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
  meta?: {
    category: string;
    source: string;
  };
  data?: string;
}
