import React, { useState } from "react";
import './styles.css'

function GuessTheNumber() {
  const [number, setNumber] = useState("");
  const [guess, setGuess] = useState(0);
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);

  // Function to handle guess checking
  const handleGuess = (value) => {

    const val = Number(value);

    if (val > 100 || val < 1 || !val) {
      setMessage("Please enter a number between 1 and 100.");
      return;
    }

    setGuess((prev) => {
      const guessed = prev + 1;

      (target === val) ? setMessage(`congratulations! you guessed the number in ${guessed} attempts`) : (target > val) ?
        setMessage("Too low! Try again.") : setMessage("Too high! Try again.");
      return guessed;
    })
  };

  // Function to reset the game
  const resetGame = () => {
    setNumber("");
    setGuess();
    setMessage("");
    setTarget(Math.floor(Math.random() * 100) + 1);

  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "50px 0" }}>
      <h2>Guess the Number</h2>
      <input
        placeholder="Enter a number between 1 and 100"
        style={{ width: "300px", padding: "5px" }}
        id="guess-input"
        onChange={(e) => setNumber(e.target.value)}
        value={number}
      />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "20px 0" }}>
        <button onClick={() => handleGuess(number)}>Check Guess</button>
        <button onClick={resetGame}>Reset Game</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default GuessTheNumber;
