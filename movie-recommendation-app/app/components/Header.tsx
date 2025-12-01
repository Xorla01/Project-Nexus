"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
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
          <Link
            href="/movies"
            className="hover:text-yellow-500 text-sm font-medium"
          >
            Movies
          </Link>
          <Link
            href="/tv-shows"
            className="hover:text-yellow-500 text-sm font-medium"
          >
            TV Shows
          </Link>
          <Link
            href="/genres"
            className="hover:text-yellow-500 text-sm font-medium"
          >
            Genres
          </Link>

          <Link
            href="/favorite"
            className="hover:text-yellow-500 text-sm font-medium"
          >
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}

