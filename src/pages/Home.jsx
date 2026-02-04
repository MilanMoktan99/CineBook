import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import HomeMovieCard from "../components/HomeMovieCard";

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=80d491707d8cf7b38aa19c7ccab0952f&sort_by=popularity.desc";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

// genre mapping
const GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  14: "Fantasy",
  27: "Horror",
  878: "Sci-Fi",
  53: "Thriller",
  10749: "Romance",
};

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    fetchMovies();
  }, []);

  // auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 3); // only top 3 hero movies
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchMovies = async () => {
    const res = await axios.get(API_URL);
    setMovies(res.data.results.slice(0, 10)); // limit to 10 movies
  };

  const heroMovies = movies.slice(0, 3);
  const heroMovie = heroMovies[heroIndex];

  const getGenres = (ids) =>
    ids
      ?.slice(0, 2)
      .map((id) => GENRES[id])
      .join(", ");

  const nextSlide = () => setHeroIndex((heroIndex + 1) % heroMovies.length);
  const prevSlide = () =>
    setHeroIndex((heroIndex - 1 + heroMovies.length) % heroMovies.length);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* HERO CAROUSEL */}
      {heroMovie && (
        <div className="relative h-[75vh]">
          {/* Background Image */}
          <img
            src={`${IMAGE_BASE}${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-900 to-transparent" />

          {/* HERO CONTENT */}
          <div className="relative h-full flex items-center max-w-[85%] mx-auto px-6">
            <div>
              <h1 className="text-5xl font-bold mb-3">{heroMovie.title}</h1>

              <p className="text-sm text-gray-300 mb-2">
                {getGenres(heroMovie.genre_ids)} • {heroMovie.release_date}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3 text-yellow-400">
                <Star size={20} fill="currentColor" />
                <span className="text-gray-100 font-semibold">
                  {heroMovie.vote_average.toFixed(1)}
                </span>
              </div>

              <p className="text-gray-300 mb-6">
                {heroMovie.overview.slice(0, 100)}...
              </p>

              <div className="flex gap-4">
                <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold">
                  Buy Tickets
                </button>
                <button className="border border-gray-400 px-6 py-3 rounded-lg hover:bg-white/10">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* ARROWS */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-3 rounded-full cursor-pointer"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-3 rounded-full cursor-pointer"
          >
            <ChevronRight size={28} />
          </button>

          {/* DOTS */}
          <div className="absolute bottom-6 w-full flex justify-center gap-3">
            {heroMovies.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`w-3 h-3 rounded-full transition cursor-pointer ${
                  i === heroIndex ? "bg-red-500" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* POPULAR MOVIES */}
      <div className="px-10 py-14">
        <h2 className="text-3xl font-bold mb-6">Popular Movies</h2>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {movies.map((movie) => (
            <HomeMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
