// App.js
import { useState } from "react";
import "./styles.css";


export default function App() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFormat = (value) => {
    const parsedValue = handleValidate(value);
    if (parsedValue) {
      setError("");
      setSuccess("");
      const formatJSON = JSON.stringify(parsedValue, null, 2);
      setFormatted(formatJSON);
      setSuccess("JSON formatted successfully!");
    }
  };

  const handleValidate = (value) => {
    if (!value.trim()) {
      setError("Invalid JSON: Unexpected token...");
      setFormatted("");
      setSuccess("");
      return null;
    }

    try {
      const parsedValue = JSON.parse(value);
      setError("");
      setFormatted("");
      setSuccess("Valid JSON!");
      return parsedValue;
    } catch {
      setError("Invalid JSON: Unexpected token...");
      setFormatted("");
      setSuccess("");
      return null;
    }
  };

  const handleMinify = (value) => {
    const parsedValue = handleValidate(value);
    if (parsedValue) {
      setError("");
      setSuccess("");
      const formatJSON = JSON.stringify(parsedValue);
      setFormatted(formatJSON);
      setSuccess("JSON minified successfully!");
    }
  };

  const handleClear = () => {
    setInput("");
    setFormatted("");
    setError("");
    setSuccess("");
  };

  return (
    <div>
      <h1>JSON Formatter & Validator</h1>
      <textarea
        type="text"
        value={input}
        data-testid="json-input"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter json"
      />
      <span>
        <button data-testid="format-btn" onClick={() => handleFormat(input)}>
          Format
        </button>
        <button
          data-testid="validate-btn"
          onClick={() => handleValidate(input)}
        >
          Validate
        </button>
        <button data-testid="minify-btn" onClick={() => handleMinify(input)}>
          Minify
        </button>
        <button data-testid="clear-btn" onClick={handleClear}>
          Clear
        </button>
      </span>
      {error && <p data-testid="error-message">{error}</p>}
      {success && <p data-testid="success-message">{success}</p>}
      {!error && formatted && <p data-testid="formatted-output">{formatted}</p>}
      {/* TODO: Show formatted output */}
    </div>
  );
}
