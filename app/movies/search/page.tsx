"use client";

import { getMovies } from "@/app/api/request";
import { SearchResults } from "@/app/components/SearchResults";
import type { Movie } from "@/app/types/Movie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

export default function SearchPage() {
  const [inputQuery, setInputQuery] = useState("");
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const logo = "/StreamS_Logo.png";

  /* READ QUERY FROM URL */
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const query = (search.get("query") || "").trim();

    setInputQuery(query);
    setCurrentSearchQuery(query);
  }, []);

  /* FETCH MOVIES WHEN QUERY CHANGES */
  useEffect(() => {
    async function executeFetch(searchQuery: string) {
      if (!searchQuery) {
        setMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const fetchedMovies = await getMovies(searchQuery);
        setMovies(fetchedMovies);
      } catch (err) {
        const error = err as Error;
        setError(`Search failed: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    executeFetch(currentSearchQuery);
  }, [currentSearchQuery]);

  /* HANDLE SEARCH SUBMIT */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuery = inputQuery.trim();

    setCurrentSearchQuery(newQuery);

    const params = new URLSearchParams(window.location.search);
    params.set("query", newQuery);
    window.history.pushState({}, "", `?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center">
      {/* ================= HEADER ================= */}
      <nav className="bg-gray-900 w-full shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setCurrentSearchQuery("");
              setInputQuery("");
              router.push("/"); // <- proper Next.js navigation
            }}
            className="text-2xl font-bold text-yellow-500 hover:text-yellow-400 transition"
          >
            <Image
              src={logo}
              alt="StreamScape Logo"
              width={150}
              height={40}
              className="w-28 sm:w-32 md:w-40 h-auto"
              priority
            />
          </Link>

          {/* SEARCH FORM */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <div className="relative">
              <input
                type="search"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Search movies..."
                className="pl-4 pr-12 py-2 rounded-full bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-yellow-500 text-sm w-64 text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 bg-yellow-500 text-gray-900 rounded-r-full hover:bg-yellow-400 transition-colors text-sm font-semibold"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {currentSearchQuery && (
          <h1 className="text-3xl font-bold text-white mb-8">
            Results for{" "}
            <span className="text-yellow-500">
              &quot;{currentSearchQuery}&quot;
            </span>
          </h1>
        )}

        <SearchResults
          query={currentSearchQuery}
          movies={movies}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}
