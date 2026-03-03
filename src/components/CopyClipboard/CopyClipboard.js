import { useState } from "react";


function CopyClipboard() {

  const [text, setText] = useState("");
  const [result, setResult] = useState(false);
  const [error, setError] = useState(null);

  function handleCopy(value) {
    setError("");
    if (!value.trim()) {
      setError("Type some message to copy");
      return;
    }
    navigator.clipboard.writeText(value);
    setResult(true);

    setTimeout(() => setResult(false), 2000);

  }

  return (
    <div className="copyToClipboard">
      <h1>Copy to Clipboard</h1>
      <p>Click the button to copy the text</p>

      <div className="copyToClipboard-container">
        <div className="form">
          <label htmlFor="text">
            Enter your text:
            <input
              type="text"
              id="text"
              data-testid="input-field"
              placeholder="Type Something"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <button
            onClick={() => handleCopy({ text })
            }
            className="btn"
            data-testid="copy-button"
          >
            Copy
          </button>
        </div>
        {result && (<p data-testid="copied-message"
          style={{ color: "green" }}>Copied!</p>)}
        {error && (<p data-testid="error-message" style={{ color: "red" }}>{error}</p>)}
      </div>
    </div >
  );
}

export default CopyClipboard;
