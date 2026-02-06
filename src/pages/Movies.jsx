import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import MovieCard from "../components/MovieCard";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "movies"));
        const moviesData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id, // keep id safe
        }));

        setMovies(moviesData);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movies]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading movies...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-12 pt-10 pb-18">
      <h1 className="text-5xl font-bold text-white mb-10">
        🎬 Now Showing
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
