import React, { useState } from "react";
import style from "./AgeCalculator.module.css";

function AgeCalculator() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState(false);
  const [message, setMessage] = useState(null);

  function calculateDate(value) {
    setMessage("");
    const d2 = new Date();
    const d1 = new Date(value);
    console.log(date);

    if (!value) {
      setResult(false);
      setMessage("Please select a date");
      return;
    }

    if (d1 > d2) {
      setResult(false);
      setMessage("Birthdate cannot be in the future");
      return;
    } else {
      let years = d2.getFullYear() - d1.getFullYear();
      let months = d2.getMonth() - d1.getMonth();
      let days = d2.getDate() - d1.getDate();

      if (days < 0) {
        months--;
        days += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      setResult(true);
      setMessage({years, months, days});
      return;
    }
  }

  return (
    <div className={style.conatiner}>
      <h2 className={style.title}>Age Calculator</h2>
      <label className={style.label} data-testid="label-birthdate">
        Enter/Select a birthdate:
      </label>
      <input
        id="birthdate"
        type="date"
        className={style["input-date"]}
        data-testid="input-birthdate"
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />
      <button
        className={style["btn-calc"]}
        data-testid="btn-calculate"
        onClick={() => calculateDate(date)}
      >
        Calculate Age
      </button>
      {!result && (
        <p className={style["error-msg"]} data-testid="error-msg">
          {message}
        </p>
      )}
      {result && (
        <p className={style["age-result"]} data-testid="age-result">
          {message.years} years, {message.months} months, {message.days} days
        </p>
      )}
    </div>
  );
}

export default AgeCalculator;
