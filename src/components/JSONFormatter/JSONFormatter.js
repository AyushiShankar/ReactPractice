// JSONFormatter.js
import React, { useState } from "react";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFormat = (value) => {
    if (handleValidate(value)) {
      setError("");
      setSuccess("");
      const formatJSON = JSON.stringify(value, null, 2);
      setFormatted(formatJSON);
      setSuccess("JSON formatted successfully");
    }
  };

  const handleValidate = (value) => {
    if (!value.trim() || !JSON.parse(value)) {
      setError("Invalid JSON: Unexpected token...");
      return false;
    } else {
      setSuccess("Valid JSON");
      return true;
    }
  };

  const handleMinify = (value) => {
    if (handleValidate(value)) {
      setError("");
      setSuccess("");
      const formatJSON = JSON.stringify(value);
      setFormatted(formatJSON);
      setSuccess("JSON minified successfully");
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
      {error ? <p data-testid="error-message">{error}</p> : <p data-testid="success-message">{success}</p>}
      {!error && formatted && <p data-testid="formatted-message">{formatted}</p>}
      {/* TODO: Show formatted output */}
    </div>
  );
}
