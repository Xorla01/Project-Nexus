"use client"

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Movie, MovieCardProps } from "../types/Movie";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const IMG_PLACEHOLDER = "/images/placeholder-poster.png";

function MovieCard({ movie }: MovieCardProps) {
  const posterPath = movie.poster_path
    ? `${IMG_URL}${movie.poster_path}`
    : `${IMG_PLACEHOLDER}`;

  const rating = movie.vote_average?.toFixed(1);
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  // Lazy initialization 
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window === "undefined") return false;
    const fav = JSON.parse(localStorage.getItem("favorites") || "[]");
    return fav.some((m: Movie) => m.id === movie.id);
  });

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    const fav = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated;
    if (isFavorite) {
      updated = fav.filter((m: Movie) => m.id !== movie.id);
    } else {
      updated = [...fav, movie];
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="relative block h-[350px] w-full rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.03] duration-300 bg-gray-800"
    >
      {/* Heart button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 z-10 text-2xl"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Poster */}
      <div className="relative h-[280px] w-full">
        <Image
          src={posterPath}
          alt={movie.title || "Movie poster"}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 h-10 w-full items-center px-3 mt-3 text-white">
        <h3 className="text-sm font-bold truncate mb-1" title={movie.title}>
          {movie.title}
        </h3>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>{releaseYear}</span>
          <span className="flex items-center space-x-1 bg-yellow-500 text-gray-900 px-1.5 rounded-full font-semibold">
            <span>⭐</span>
            <span>{rating}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
