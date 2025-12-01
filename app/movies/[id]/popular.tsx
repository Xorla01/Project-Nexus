"use client";

import React, { useState, useEffect } from "react";
import { getPopularMovies } from "@/app/api/request";
import MovieCard from "@/app/components/MovieCard";
import type { Movie } from "@/app/types/Movie";

export default function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    if (typeof window === "undefined") return [];
    const fav = localStorage.getItem("favorites");
    return fav ? JSON.parse(fav) : [];
  });

  useEffect(() => {
    getPopularMovies().then(setMovies);
  }, []);

  const handleFavoriteChange = (movie: Movie, isFavorite: boolean) => {
    let updated: Movie[];
    if (isFavorite) {
      updated = [...favorites, movie];
    } else {
      updated = favorites.filter((m) => m.id !== movie.id);
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex-1">
      <h2 className="text-3xl font-bold mb-4">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavoriteChange={handleFavoriteChange} // pass callback
          />
        ))}
      </div>
    </div>
  );
}
