interface Book {
  title: string;
  cached_contributors: {
    author: {
      name: string;
      cachedImage: {
        url: string;
      };
    };
  }[];
  cached_image: {
    url: string;
  };
}

interface UserBook {
  book: Book;
  date_added: string;
}

interface Me {
  user_books: UserBook[];
}

interface BooksData {
  data: {
    me: Me[];
  };
}

interface NewBook {
  title: string;
  rating: number;
  series_name: string;
  series_position: number;
  author_name: string;
  image_url: string;
  progress: number;
  started_at: string;
}
