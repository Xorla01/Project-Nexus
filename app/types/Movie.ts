export interface Movie {
  adult?: boolean;
  backdrop_path?: string | null;
  genre_ids?: number[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  release_date?: string;
  title: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface MovieCardProps {
  movie: Movie;
}

export interface PageProps {
  params: {
    id: string;
  };
}
export interface SearchProps {
  searchParams: {
    query: string;
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface SearchResultsProps {
  query: string;
  movies: Movie[];
  loading: boolean;
  error: string | null;
}
