import { useState } from "react";
import "./RockPaperScissor.module.css";

function RockPaperScissor() {
  const choices = ["rock", "paper", "scissor"];
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("Press Any One");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  function PlayGame(value) {
    setPlayerChoice(value);
    const genComputerChoice =
      choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(genComputerChoice);
    if (value === genComputerChoice) {
      setResult("It's a Tie");
    } else if (
      (value === "rock" && genComputerChoice === "scissor") ||
      (value === "paper" && genComputerChoice === "rock") ||
      (value === "scissor" && genComputerChoice === "paper")
    ) {
      setResult("You Win");
      setPlayerScore((prev) => prev + 1);
    } else {
      setResult("You Lose");
      setComputerScore((prev) => prev + 1);
    }
  }

  function Reset() {
    setResult("Press Any One");
    setPlayerChoice(null);
    setComputerChoice(null);
    setPlayerScore(0);
    setComputerScore(0);
  }

  return (
    <div className="rockPaperScissor">
      <h1>Rock Paper Scissor</h1>
      <p>
        A two-player hand game where each player chooses rock, paper, or
        scissors.
      </p>

      <div className="container">
        <div className="choices">
          <button data-testid="btn-rock" onClick={() => PlayGame(choices[0])}>
            👊
          </button>
          <button data-testid="btn-paper" onClick={() => PlayGame(choices[1])}>
            🖐️
          </button>
          <button
            data-testid="btn-scissor"
            onClick={() => PlayGame(choices[2])}
          >
            ✌️
          </button>
        </div>
        <div className="rockPaperScissor-result">
          <p data-testid="player-choice">
            You Chose: {playerChoice}
            <b></b>
          </p>
          <p data-testid="computer-choice">
            Computer Choose : {computerChoice}
            <b></b>
          </p>
          <p className="win-result" data-testid="result">
            {result}
          </p>
        </div>
        <div className="rockPaperScissor-scores">
          <h3 className="playerScore" data-testid="player-score">
            Player Score: {playerScore}
          </h3>
          <h3 className="computerScore" data-testid="computer-score">
            Computer Score: {computerScore}
          </h3>
        </div>

        <div className="reset-scores">
          <button onClick={Reset} data-testid="reset">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
export default RockPaperScissor;
