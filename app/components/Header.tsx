"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get("query") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/movies/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const logo = "/StreamS_Logo.png";

  return (
    <nav className="bg-gray-900 text-white shadow-lg w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center px-5 shrink-0">
          <Image
            src={logo}
            alt="StreamScape Logo"
            width={150}
            height={40}
            className="w-28 sm:w-32 md:w-40 h-auto"
            priority
          />
        </Link>

        {/* LINKS */}
        <div className="flex items-center space-x-5">
          <Link href="/movies" className="hover:text-yellow-500 text-sm font-medium">
            Movies
          </Link>
          <Link href="/tv-shows" className="hover:text-yellow-500 text-sm font-medium">
            TV Shows
          </Link>
          <Link href="/genres" className="hover:text-yellow-500 text-sm font-medium">
            Genres
          </Link>
        </div>

        {/* SEARCH BAR */}
        <form
          className="hidden md:flex items-center"
          onSubmit={handleSubmit}
          role="search"
        >
          <div className="relative">
            <input
              type="search"
              name="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="pl-4 pr-12 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm w-64 transition-all focus:w-80 text-white placeholder-gray-400"
            />

            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-4 bg-yellow-500 text-gray-900 rounded-r-full hover:bg-yellow-400 transition-colors font-semibold text-sm"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
}
