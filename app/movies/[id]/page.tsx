import React from "react";
import Image from "next/image";
import type { PageProps, Genre, Movie } from "@/app/types/Movie";
import { getMovieDetails, getSimilarMovies } from "@/app/api/request";
import Link from "next/link";

const IMG_URL = "https://image.tmdb.org/t/p/w780";
const IMG_PLACEHOLDER = "/images/placeholder-poster.png";

export default async function MovieDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const movieId = Number(id);

  const movie = await getMovieDetails(movieId);
  const similarMovies = await getSimilarMovies(movieId);

  const backdrop = movie.backdrop_path
    ? `${IMG_URL}${movie.backdrop_path}`
    : IMG_PLACEHOLDER;
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div className="p-5 grid gap-6">
      {/* Movie Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backdrop Image */}
        <div className="relative w-full h-[50vh] md:h-[60vh]">
          <Image
            src={backdrop}
            alt={movie.title}
            fill
            className="object-cover rounded-lg"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        </div>

        {/* Movie Info */}
        <div className="w-full bg-zinc-100 flex flex-col justify-start p-4 md:p-6 rounded-lg">
          <h1
            className="text-2xl md:text-3xl font-extrabold mb-2"
            style={{ textShadow: "2px 1px 3px rgba(0,0,0,0.8)" }}
          >
            {movie.title}
          </h1>
          <span className="font-semibold text-gray-500 text-[16px] mb-3">
            ({releaseYear})
          </span>

          {/* Genres */}
          <div className="flex gap-2 flex-wrap mb-4">
            {movie.genres?.map((g: Genre) => (
              <span
                key={g.id}
                className="px-2 py-1 bg-zinc-200 text-gray-900 rounded-full text-[10px] font-semibold"
              >
                {g.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <div>
            <h2 className="text-xl font-bold mb-2">Overview</h2>
            <p className="text-gray-700">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
          {similarMovies.map((movie: Movie) => {
            const posterPath = movie.poster_path
              ? `${IMG_URL}${movie.poster_path}`
              : IMG_PLACEHOLDER;

            const rating = movie.vote_average?.toFixed(1);
            const releaseYear = movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A";

            return (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="block h-[300px] w-full rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.03] duration-300 bg-gray-800"
              >
                <div className="relative h-60 w-full">
                  <Image
                    src={posterPath}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                </div>

                <div className="grid grid-cols-1 h-10 w-full items-center px-3 mt-2 text-white">
                  <h3
                    className="text-sm font-bold truncate mb-1"
                    title={movie.title}
                  >
                    {movie.title}
                  </h3>

                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{releaseYear}</span>

                    <span className="flex items-center space-x-1 bg-yellow-500 text-gray-900 px-1.5 rounded-full font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.487 7.373l6.561-.955L10 1l2.952 5.418 6.561.955-4.758 4.672 1.123 6.545z" />
                      </svg>
                      <span className="text-sm">{rating}</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
