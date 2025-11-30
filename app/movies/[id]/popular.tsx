import { getPopularMovies } from "@/app/api/request";
import MovieCard from "@/app/components/MovieCard";
import type { Movie } from "@/app/types/Movie";

export default async function PopularMovies() {
  const movies: Movie[] = await getPopularMovies();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex-1">
      <h2 className="text-3xl font-bold mb-4">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
