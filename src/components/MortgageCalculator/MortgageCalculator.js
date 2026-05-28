import { useState } from "react";
import "./MortgageCalculator.module.css";

function MortgageCalculator() {
  const [value, setValue] = useState(null);
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [year, setYear] = useState("");
  const valid = amount > 0 && year > 0 && rate > 0;

  function handleCal(e) {
    e.preventDefault();
    setValue("");

    !valid && setValue("Invalid Input");

    if (valid) {
      const monthlyRate = rate / 12 / 100;
      const months = year * 12;

      const mortgage =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

      setValue(mortgage.toFixed(2));
    }
  }
  return (
    <form onSubmit={handleCal}>
      <h1>Mortgage Calculator</h1>
      <div>
        <label htmlFor="LoanAmount">Loan Amount (INR):</label>
        <input
          type="number"
          id="LoanAmount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <br />
        <label htmlFor="interestRate">Annual Interest Rate (%):</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          id="interestRate"
        />
        <br />
        <label htmlFor="loanTerm">Loan Term (Years):</label>
        <input
          type="number"
          id="loanTerm"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>
      <button type="submit">Calculate</button>
      {value !== null && <p aria-label="result">Monthly Payment: {value}</p>}
    </form>
  );
}

export default MortgageCalculator;
