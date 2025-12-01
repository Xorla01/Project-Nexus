"use client";

import { Suspense } from "react";
import React, { useState } from "react";
import type { Movie } from "../types/Movie";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";

export default function FavoritePage() {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    if (typeof window !== "undefined") {
      const fav = localStorage.getItem("favorites");
      return fav ? JSON.parse(fav) : [];
    }
    return [];
  });

  const handleFavoriteChange = (movie: Movie, isFavorite: boolean) => {
    setFavorites((prev) => {
      let updated: Movie[];

      if (isFavorite) {
        const exists = prev.find((m) => m.id === movie.id);
        if (exists) return prev;
        updated = [...prev, movie];
      } else {
        updated = prev.filter((m) => m.id !== movie.id);
      }

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="pb-20 md:pb-8">
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <h1 className="text-3xl md:text-3xl font-semibold">My Favorites</h1>

        <p className="text-red-600 mb-6 italic font-">
          {favorites.length} {favorites.length === 1 ? "movie" : "movies"} saved
        </p>

        {favorites.length === 0 ? (
          <p className="text-center mt-10 text-white">
            No favorite movies added.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
