import { useState } from "react";

function URLValidator() {
  const [input, setInput] = useState();
  const [isValid, setIsValid] = useState(null);

  function validateUrl(value) {
    try {
      if (!value || /\s/.test(value)) return false;
      if (!value.includes("://")) return false;
      const url = new URL(value);
      const isHTTP = url.protocol === "https:" || url.protocol === "http:";
      const hasValidHost = url.hostname === "localhost" || /\w+\.\w+/.test(url.hostname);
      return isHTTP && hasValidHost;
    }
    catch (error) {
      return false;
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    setInput(value);
    setIsValid(validateUrl(value));
  }

  return (
    <div>
      <h1>URL Validator</h1>
      <div className="container">
        <label className="url-label" >Enter URL:</label>
        <input data-testid="url-input" value={input} onChange={handleChange} placeholder="Enter Url" />
        {isValid !== null && <p data-testid="result"
          style={{ color: isValid ? "green" : "red" }}>{(isValid && input) ? "Valid URL" : "Invalid URL"}</p>}
      </div>
    </div>
  );
}
export default URLValidator;
