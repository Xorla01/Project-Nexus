import type { Movie } from "../types/Movie";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const getPopularMovies = async () => {
  if (!BASE_URL || !API_KEY) {
    throw new Error("BASE_URL or API_KEY is not defined");
  }

  const res = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&api_key=${API_KEY}&page=1`
  );

  if (!res.ok) {
    throw new Error("Error fetching popular movies");
  }

  const data = await res.json();
  const filteredMovies = (data.results as Movie[]).filter(
    (movie) =>
      typeof movie.vote_average === "number" && movie.vote_average >= 3.5
  );

  return filteredMovies;

  return data.results;
};

export const getMovieDetails = async (movieId: number) => {
  if (!BASE_URL || !API_KEY) {
    throw new Error("BASE_URL or API_KEY is not defined");
  }

  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?language=en-US&api_key=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Error fetching movie details");
  }

  const data = await res.json();

  return data;
};

export const getSimilarMovies = async (movieId: number) => {
  if (!BASE_URL || !API_KEY) {
    throw new Error("BASE_URL or API_KEY is not defined");
  }

  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/similar?language=en-US&api_key=${API_KEY}&page=1`
  );

  if (!res.ok) {
    throw new Error("Error fetching similar movie");
  }

  const data = await res.json();
  const filteredMovies = (data.results as Movie[]).filter(
    (movie) =>
      typeof movie.vote_average === "number" && movie.vote_average >= 3.5
  );

  return filteredMovies;

  return data.results;
};

export async function getMovies(query: string): Promise<Movie[]> {
  if (!query) return [];

  const apiUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US&page=1`;

  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error(`Failed with status: ${res.status}`);
  }

  const data = await res.json();

  const filteredMovies = (data.results as Movie[]).filter(
    (movie) =>
      typeof movie.vote_average === "number" && movie.vote_average >= 3.5
  );

  return filteredMovies;

  return data.results as Movie[];
}
