import { useState } from "react";
import "./LuckyNumber.module.css";

function LuckyNumber() {
  const [number, setNumber] = useState("");

  const handlePrime = (value) => {

    if (!value) return null;
    const arr = value.split("").reduce((sum, a) =>
      sum = sum + Number(a)
      , 0);
    if (arr < 2) {
      return false;
    }

    let prime = true;
    for (let i = 2; i <= Math.sqrt(arr); i++) {
      if (arr % i === 0) {
        prime = false;
        break;
      }
    }

    return prime;

  };

  const result = handlePrime(number) == null ? "" : handlePrime(number) ? "Lucky Number" : "Not a Lucky Number";

  return (
    <div>
      <h1>Lucky Number</h1>
      <p>A number is Lucky if the sum of its digits is a Prime Number </p>

      <div className="container">
        <input type="number" placeholder="Enter a number"
          data-testid="input-box"
          className="input-box"
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <p data-testid="result" className="result">{result}</p>
    </div>
  );
}

export default LuckyNumber;