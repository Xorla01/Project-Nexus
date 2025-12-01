import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto w-full">
      <div className="max-w-7xl px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center md:justify-between">
        {/* LOGO / BRAND */}
        <div className="mb-4 md:mb-0">
          <Link
            href="/"
            className="text-yellow-500 font-bold text-xl hover:text-yellow-400 transition"
          >
            StreamScape
          </Link>
        </div>

        {/* LINKS */}
        <div className="flex flex-wrap justify-center md:justify-end gap-6">
          <Link href="/movies" className="hover:text-white transition">
            Movies
          </Link>
          <Link href="/tv-shows" className="hover:text-white transition">
            TV Shows
          </Link>
          <Link href="/genres" className="hover:text-white transition">
            Genres
          </Link>
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="w-full text-sm text-gray-500 text-center border-t border-gray-700 py-2">
        &copy; {new Date().getFullYear()} <em>StreamScape</em>. All rights
        reserved. Powered by The Movie Database (TMDB)
      </div>
    </footer>
  );
}
