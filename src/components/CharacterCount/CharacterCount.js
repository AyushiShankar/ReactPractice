import { useState } from "react";


function CharacterCount() {
  const [max, setMax] = useState(50);
  const [text, setText] = useState("");

  const charCount = text.length;
  const warningLimit = Math.floor(max * 0.9);
  const overLimit = charCount > max;
  const warning = charCount >= warningLimit;



  function handleChange(e) {
    setText(e.target.value);

  }

  return (
    <div className="characterCount">
      <h1>Character Count</h1>
      <p>Track your input length with live character warnings.</p>

      <div className="container">
        <div className="inputs">
          <label>
            Max length:
            <input type="number" min="0" max="1000" data-testid="maxlength"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))} />
          </label>
        </div>
        <textarea
          className="text"
          placeholder="Start Typing"
          data-testid="textarea"
          value={text}
          onChange={handleChange}
        ></textarea>

        <div className="char-info" data-testid="char-info">
          {charCount} / {max}</div>

        <div className="warnings">

          {warning && !overLimit && <p className="warning-text" data-testid="warning-text">You are close to the limit!</p>}

          {overLimit && <p className="error-message" data-testid="error-text">{`Limit exceeded by ${charCount - max} characters`}</p>}
        </div>
      </div>
    </div>
  );
}
export default CharacterCount;
