"use client";

import type { SearchResultsProps } from "@/app/types/Movie";
import Image from "next/image";
import Link from "next/link";

export function SearchResults({
  query,
  movies,
  loading,
  error,
}: SearchResultsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="aspect-2/3 bg-gray-800 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-500 p-6 rounded-lg text-red-300 text-center shadow-xl">
        <p className="font-bold text-lg mb-2">API Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="p-10 text-center text-gray-400 min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-2">Start Searching</h2>
        <p>Enter a movie title to find results.</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">
        <h2 className="text-xl font-semibold">No results found</h2>
        <p>Try searching for a different title.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movies/${movie.id}`}
          className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <div className="aspect-2/3 w-full bg-gray-700 relative">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="object-cover"
                fill
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/500x750/374151/e5e7eb?text=No+Poster")
                }
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600 flex-col">
                <span className="text-4xl mb-2">🎬</span>
                <span className="text-xs uppercase font-bold tracking-wider">
                  No Poster
                </span>
              </div>
            )}

            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded">
              ★ {movie.vote_average?.toFixed(1)}
            </div>
          </div>
          <div className="p-3">
            <h3 className="text-white font-semibold text-sm md:text-base line-clamp-1 group-hover:text-yellow-500 transition-colors">
              {movie.title}
            </h3>
            <p className="text-gray-400 text-xs mt-1">
              {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
