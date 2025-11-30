## API Setup and Usage
This project uses a **Public Movie API** to fetch trending and recommended movies.

---

### 1. Get an API Key
- Sign up at [TMDB](https://www.themoviedb.org/documentation/api) and generate a free API key.

---

### 2. Configure Environment Variables
Create a `.env.local` file in the project root:
```
NEXT_PUBLIC_API_KEY=your_api_key_here
NEXT_PUBLIC_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_IMAGE_URL=https://image.tmdb.org/t/p/w500
Variables prefixed with NEXT_PUBLIC_ are accessible client-side and server-side.
```
### 3. API Utility Functions
Centralize API calls in utils/api.ts:
```
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch trending movies');
  return res.json();
}

export async function getMovieDetails(movieId: string) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return res.json();
}
```
### 4. Using API in Pages
Example: Fetch trending movies in the home page:
```
import { getTrendingMovies } from '../utils/api';

export default async function Home() {
  const data = await getTrendingMovies();
  console.log(data.results);
}
```
### 5. Tips
- Keep .env.local private.
- Use centralized API functions for maintainability.
- Handle loading states and errors for a smooth UX.
