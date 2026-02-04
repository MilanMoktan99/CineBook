import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function HomeMovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`} className="block">
      <div className="min-w-[180px] bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">
        <img
          src={`${IMAGE_BASE}${movie.poster_path}`}
          alt={movie.title}
          className="h-[300px] w-[300px] object-cover"
        />

        <div className="p-3">
          <h3 className="font-semibold text-sm truncate">{movie.title}</h3>

          <div className="flex items-center gap-1 text-xs text-yellow-400 mt-1">
            <Star size={14} fill="currentColor" />
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
    </Link>
  );
}
