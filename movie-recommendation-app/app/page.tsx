"use client";

import MovieCard from "./components/MovieCard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import PopularMovies from "./movies/[id]/popular";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get("query") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/movies/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header with search */}
      <Header />

      {/* Hero banner */}
      {/* Hero banner */}
      <section className="bg-gray-900 text-white w-full rounded-lg p-8 mb-8 mt-4 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-yellow-500">Welcome.</h1>
        <p className="text-gray-300 mb-6 text-center max-w-xl">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>

        <form
          className="flex items-center justify-center w-full max-w-4xl"
          onSubmit={handleSubmit}
          role="search"
        >
          <div className="relative w-full">
            <input
              type="search"
              name="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full pl-4 pr-20 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-4 bg-yellow-500 text-gray-900 rounded-r-full hover:bg-yellow-400 transition-colors font-semibold text-sm"
            >
              Search
            </button>
          </div>
        </form>
      </section>

      {/* Popular Movies */}
      <PopularMovies />

      {/* Footer */}
      <Footer />
    </div>
  );
}
