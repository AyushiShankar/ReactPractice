import { useState } from "react";
import "./styles.css";

export default function QuizApp({ questions }) {
  const [currentIndex, setCurrenIndex] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [selectedAns, setSelectedAns] = useState("");
  const [message, setMessage] = useState("");

  const totalQuestion = questions.length;

  const getOptionTestId = (index) => {
    return `option-${String.fromCharCode(65 + index)}`; // A, B, C, D
  };

  const handleSelection = (e) => {
    e.preventDefault();
    if (currentIndex < totalQuestion) {
      try {
        if (!selectedAns)
          return setMessage("Please select an option before submitting.");

        if (selectedAns === questions[currentIndex].answer) {
          setCorrectAns((prev) => prev + 1);
        }

        setMessage("");
        setSelectedAns("");
        setCurrenIndex((prev) => prev + 1);
      } catch {
        setMessage("Please select an option before submitting.");
      }
    }
  };

  const handleRestart = () => {
    setCurrenIndex(0);
    setCorrectAns(0);
    setSelectedAns("");
    setMessage("");
  };

  return (
    <div className="App">
      <h1 className="app-title">Quiz App</h1>
      {totalQuestion === 0 && !questions && (
        <p className="warning" data-testid="warning">
          No quiz available
        </p>
      )}
      {totalQuestion > 0 && !(currentIndex >= totalQuestion) && (
        <form className="question-container">
          <h3>Question {questions[currentIndex].id}</h3>
          <p data-testid="question">{questions[currentIndex].question}</p>
          <div className="options">
            {questions[currentIndex].options.map((opt, idx) => (
              <label key={idx} className="option">
                <input
                  type="radio"
                  name="option"
                  value={opt}
                  checked={selectedAns === opt}
                  onChange={() => setSelectedAns(opt)}
                />
                <span data-testid={getOptionTestId(idx)}>{opt}</span>
              </label>
            ))}
          </div>
          {message && (
            <p className="warning" data-testid="warning">
              {message}
            </p>
          )}
          <button
            type="submit"
            className="submit-button"
            onClick={(e) => handleSelection(e)}
          >
            Submit
          </button>
        </form>
      )}
      {currentIndex >= totalQuestion && totalQuestion > 0 && (
        <div className="score-container">
          <h2 data-testid="score">
            Your Score: {correctAns} / {questions.length}
          </h2>
          <button
            className="restart-button"
            data-testid="restart-button"
            onClick={handleRestart}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
