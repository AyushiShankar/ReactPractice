import React, { useState } from "react";
import "./styles.css";

export default function GetWeekday() {
  const [valid, setValid] = useState(false);
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");

  const handleFindDay = (value) => {
    setDay("");
    if (!value) { return setValid(false) };
    const d1 = new Date(value);
    let count = d1.getDay();
    switch (count) {
      case 1:
        setDay("Monday");
        break;

      case 2:
        setDay("Tuesday");
        break;

      case 3:
        setDay("Wednesday");
        break;
      case 4:
        setDay("Thursday");
        break;
      case 5:
        setDay("Friday");
        break;
      case 6:
        setDay("Saturday");
        break;
      default:
        setDay("Sunday");
        break;
    }
    setValid(true);
    return;

  }

  return (
    <div className="container">
      <h1>Get Weekday</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        data-testid="date-input"
      />
      <button data-testid="find-day-btn" onClick={() => handleFindDay(date)}>
        Find Day
      </button>
      {valid && <p className="result" data-testid="result">{`This date falls on ${day}`}</p>
      }

    </div>
  );
}
