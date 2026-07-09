import { useState } from "react";
import "./styles.css";

const ROW = 10,
  COL = 10;
const REGEX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
export default function CinemaHall() {
  const [booked, setBooked] = useState([]);
  const [select, setSelect] = useState([]);

  const handleSelectSeats = (r, c) => {

    setSelect((prev) => {
      const exists = prev.some(
        (seat) => seat.row === r && seat.col === c
      );

      if (exists) {
        return prev.filter(
          (seat) => !(seat.row === r && seat.col === c)
        );
      }
      return [...prev, { row: r, col: c }];
    });

  };
  const isBooked = (r, c) =>
    booked.some((seat) => seat.row === r && seat.col === c);

  const isSelected = (r, c) =>
    select.some((seat) => seat.row === r && seat.col === c);

  const handleBooked = () => {
    if (select.length === 0) {
      window.alert("Please select at least one seat");
      return;
    }

    setBooked((prev) => [...prev, ...select]);
    setSelect([]);
  };

  return (
    <div className="main-container">
      <h1>Cinema Hall</h1>
      <div className="button-section">
        <button data-testid="book-button" onClick={handleBooked}>
          Book Seats
        </button>
        <button data-testid="clear-button"
          onClick={() => setSelect([])}>
          Clear
        </button>
        <button data-testid="reset-button"
          onClick={() => {
            setSelect([]); setBooked([])
          }}>
          Reset
        </button>
      </div>
      <div className="cinema-hall" data-testid="cinema-hall">
        {Array.from({ length: ROW }, (_, rowIdx) => (
          <div className="row" key={rowIdx}>
            {Array.from({ length: COL }, (_, colIdx) => {
              const bookedSeat = isBooked(rowIdx, colIdx);
              const selectedSeat = isSelected(rowIdx, colIdx);
              return (
                <div
                  className={`col ${bookedSeat
                    ? "disabled-seat"
                    : selectedSeat
                      ? "selected-seat"
                      : "seat"
                    }`}
                  key={colIdx} onClick={() => handleSelectSeats(rowIdx, colIdx)}
                  data-testid={`seat-${REGEX[rowIdx]}${colIdx}`}>
                  {`${REGEX[rowIdx]}${colIdx}`}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
