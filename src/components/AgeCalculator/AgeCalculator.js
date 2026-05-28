import { useState } from "react";
import "./styles.css";

function AgeCalculator() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState("");
  const [age, setAge] = useState(null);

  function calculateDate(value) {
    setResult("");

    if (!value) {
      setAge(null);
      setResult("Please select a date");
      return;
    }

    const d2 = new Date();
    const d1 = new Date(value);

    if (d1 > d2) {
      setAge(null);
      setResult("Birthdate cannot be in the future");
      return;
    }

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months--;
      days += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  }

  return (
    <div className="container">
      <h2 className="title">Age Calculator</h2>

      <label
        htmlFor="birthdate"
        className="label"
        data-testid="label-birthdate"
      >
        Enter/Select a birthdate:
      </label>

      <input
        id="birthdate"
        type="date"
        className="input-date"
        data-testid="input-birthdate"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        type="button"
        className="btn-calc"
        data-testid="btn-calculate"
        onClick={() => calculateDate(date)}
      >
        Calculate Age
      </button>

      {result && (
        <p className="error-msg" data-testid="error-msg">
          {result}
        </p>
      )}

      {!result && age && (
        <p className="age-result" data-testid="age-result">
          {age.years} years, {age.months} months, {age.days} days
        </p>
      )}
    </div>
  );
}

export default AgeCalculator;
