import { Link } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`} className="block">
      <div className="group cursor-pointer">
        <div className="overflow-hidden rounded-xl bg-gray-800 aspect-[2/3]">
          <img
            src={
              movie.poster_path
                ? IMAGE_BASE + movie.poster_path
                : "/placeholder.jpg"
            }
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="mt-3">
          <h3 className="text-white font-semibold truncate">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-sm">
            ⭐ {movie.vote_average?.toFixed(1)} •{" "}
            {movie.release_date?.slice(0, 4)}
          </p>
        </div>
      </div>
    </Link>
  );
}
