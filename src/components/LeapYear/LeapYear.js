import React, { useState } from "react";

export default function LeapYear() {
  const [year, setYear] = useState("");
  const [isleap, setIsLeap] = useState(false);
  const [message, setMessage] = useState("");

  function handleYear(value) {
    setMessage("");
    if (!value) { return setMessage("Please enter a year") }
    else if (value % 400 === 0 || (value % 4 === 0 && value % 100 != 0)) {
      setIsLeap(true);
      setMessage(`${year} is a Leap Year`);

    }
    else {
      setIsLeap(false);
      setMessage(`${year} is not a Leap Year`);
    };
  }

  return (
    <div className="container">
      <h1>Leap Year Checker</h1>
      <label data-testid="label-date">Enter a year:</label>
      <input
        type="text"
        data-testid="year-input"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
      />

      <button data-testid="check-btn" onClick={() => handleYear(year)}>
        Check
      </button>
      {isleap && (<p className="result" data-testid="result">{message}</p>)}
      {!isleap && year && <p className="result" data-testid="result">{message}</p>}
      {!year && <p className="error-msg"
        data-testid="error-msg">{message}</p>}
    </div>
  );
}
