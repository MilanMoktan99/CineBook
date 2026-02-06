import { useState } from "react";
import { Armchair } from "lucide-react";

export default function SeatMap() {
  const rows = ["A","B","C","D","E","F","G","H","I","J"];
  const seatsPerRow = 10;

  // Create seat data dynamically
  const [seats, setSeats] = useState(
    rows.flatMap(row =>
      Array.from({ length: seatsPerRow }, (_, i) => ({
        id: `${row}${i+1}`,
        seatId: `${row}${i+1}`,
        row,
        status: "available" // can be "available", "reserved", "sold", "unavailable"
      }))
    )
  );

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (seat.status !== "available") return;

    setSelectedSeats(prev =>
      prev.includes(seat.id)
        ? prev.filter(id => id !== seat.id)
        : [...prev, seat.id]
    );
  };

  const seatStyle = (seat) => {
    if (selectedSeats.includes(seat.id)) return "text-yellow-400 scale-110";
    switch (seat.status) {
      case "available":
        return "text-teal-400 hover:text-teal-300";
      case "reserved":
        return "text-blue-500 cursor-not-allowed";
      case "sold":
        return "text-red-500 cursor-not-allowed";
      case "unavailable":
        return "text-gray-600 cursor-not-allowed";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Select Your Seat</h1>

      {/* Screen */}
      <div className="w-full max-w-3xl mb-8 flex flex-col items-center">
        <div className="text-gray-400 text-sm mb-2">Screen</div>
        <div className="w-3/4 h-8 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-t-[50%] border-t-4 border-cyan-500 shadow-[0_-10px_20px_rgba(6,182,212,0.3)]"></div>
      </div>

      {/* Seat Grid */}
      <div className="space-y-3">
        {rows.map(row => (
          <div key={row} className="flex items-center gap-2 justify-center">
            {seats
              .filter(seat => seat.row === row)
              .map(seat => (
                <button
                  key={seat.id}
                  onClick={() => toggleSeat(seat)}
                  disabled={seat.status !== "available"}
                  className={`w-8 h-8 rounded-t-lg flex items-center justify-center transition-colors ${seatStyle(seat)}`}
                >
                  <Armchair
                    size={20}
                    className={selectedSeats.includes(seat.id) ? "fill-current" : ""}
                  />
                </button>
              ))}
          </div>
        ))}
      </div>

      {/* Selected Seats */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 text-lg">
          Selected:{" "}
          <span className="text-teal-400 font-bold">{selectedSeats.join(", ")}</span>
        </div>
      )}

      <button
        disabled={!selectedSeats.length}
        className="mt-6 bg-gray-700 text-white text-lg px-12 py-3 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Buy Now
      </button>

      {/* Legend */}
      <div className="mt-8 flex gap-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Armchair size={20} className="text-teal-400" /> Available
        </div>
        <div className="flex items-center gap-2">
          <Armchair size={20} className="text-yellow-400 fill-yellow-400" /> Selected
        </div>
        <div className="flex items-center gap-2">
          <Armchair size={20} className="text-red-500" /> Sold
        </div>
        <div className="flex items-center gap-2">
          <Armchair size={20} className="text-gray-600" /> Unavailable
        </div>
      </div>
    </div>
  );
}
