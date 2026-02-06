import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const movieSnap = await getDoc(doc(db, "movies", id));
      if (movieSnap.exists())
        setMovie({ id: movieSnap.id, ...movieSnap.data() });

      const showSnap = await getDocs(collection(db, "showtimes"));
      const movieShows = showSnap.docs
        .map((doc) => doc.data())
        .filter((show) => show.movieId.toString() === id);
      setShowtimes(movieShows);

      const theatreSnap = await getDocs(collection(db, "theatres"));
      setTheatres(
        theatreSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    };
    fetchData();
  }, [id]);

  if (!movie) return <div className="text-white p-6">Loading...</div>;

  function getYouTubeID(url) {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match ? match[2] : null;
  }

  // Filter showtimes by selected theatre
  const theatreShowtimes = selectedTheatre
    ? showtimes.filter((s) => s.theatreId === selectedTheatre.id)
    : [];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 md:px-32 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white mb-4 hover:text-gray-300"
      >
        <ChevronLeft size={24} /> Back
      </button>

      <p className="mb-6 text-4xl font-bold">{movie.title}</p>

      {/* Two Columns */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Column 1: Trailer + Details */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Trailer */}
          <div className="bg-black rounded-xl overflow-hidden">
            {movie.trailer && getYouTubeID(movie.trailer) ? (
              <iframe
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${getYouTubeID(
                  movie.trailer,
                )}?autoplay=1&mute=1`}
                title={movie.title}
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              />
            ) : (
              <video
                src="/placeholder_trailer.mp4"
                controls
                autoPlay
                loop
                className="w-full h-[400px] object-cover rounded-xl"
              />
            )}
          </div>

          {/* Details */}
          <div className="bg-gray-800 rounded-xl p-6 flex-1">
            <h3 className="text-2xl font-semibold mb-2">Overview</h3>
            <p className="text-gray-300">{movie.overview}</p>
          </div>
        </div>

        {/* Column 2: Now Showing + Buy Tickets */}
        <div className="w-full md:w-[300px] flex flex-col gap-4">
          {/* Now Showing (1.5x trailer height) */}
          <div className="bg-gray-800 rounded-xl p-6 flex-1 max-h-[450px] flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Now Showing</h2>

            {/* Theatre Selection Dropdown */}
            {!selectedTheatre && (
              <select
                className="p-3 rounded bg-gray-700 text-white w-full mb-4"
                value=""
                onChange={(e) => {
                  const theatre = theatres.find((t) => t.id === e.target.value);
                  setSelectedTheatre(theatre);
                }}
              >
                <option value="" disabled>
                  Select Theatre
                </option>
                {theatres.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} - {t.location}
                  </option>
                ))}
              </select>
            )}

            {/* Showtimes appear only after theatre is selected */}
            {selectedTheatre && (
              <>
                {theatreShowtimes.length === 0 ? (
                  <p className="text-gray-400 mb-4">No showtimes available</p>
                ) : (
                  <div className="flex flex-col gap-2 mb-4">
                    {theatreShowtimes.map((show) => (
                      <button
                        key={show.id}
                        onClick={() => setSelectedShowtime(show)}
                        className={`px-4 py-2 rounded ${
                          selectedShowtime?.id === show.id
                            ? "bg-red-700"
                            : "bg-red-600"
                        }`}
                      >
                        {show.time}
                      </button>
                    ))}
                  </div>
                )}

                {/* Selected Theatre info + Change button */}
                <div className="mt-auto">
                  <p>
                    Theatre:{" "}
                    <span className="font-semibold">
                      {selectedTheatre.name}
                    </span>
                  </p>
                  <button
                    className="mt-2 px-3 py-2 bg-gray-700 rounded hover:bg-gray-600 transition w-full"
                    onClick={() => {
                      setSelectedTheatre(null);
                      setSelectedShowtime(null);
                    }}
                  >
                    Change Theatre
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Buy Tickets below Now Showing */}
          <button
            disabled={!selectedShowtime || !selectedTheatre}
            onClick={() =>
              navigate(
                `/seat-map/${id}/${selectedTheatre.id}/${selectedShowtime.id}`,
              )
            }
            className={`px-6 py-3 rounded-lg font-semibold ${
              selectedShowtime && selectedTheatre
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-700 cursor-not-allowed"
            }`}
          >
            Select Seat
          </button>
        </div>
      </div>
    </div>
  );
}
