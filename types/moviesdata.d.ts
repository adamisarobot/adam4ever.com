interface Movie {
  original_title: string;
  overview: string;
  poster_path: string;
}

interface MoviesData {
  results: Movie[];
}
