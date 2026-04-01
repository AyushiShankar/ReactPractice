import { useState } from "react";

function PasswordGenerator() {
  const [length, setLength] = useState(4);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(false);

  const handleLength = (value) => {
    setError("");
    let newlength = value;
    if (newlength > 20) {
      setError("Max length is 20");
      setMessage("");
      newlength = 20;
    }
    setLength(newlength);

  };


  const handleType = () => {
    setError("");
    if (length == 0 || !length) {
      setError("Length cannot be empty or 0");
      setMessage("");
      return;
    }

    let characters = "";
    let newPassword = '';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) characters += '0123456789';
    if (includeSymbols) characters += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (characters.length === 0) {
      setError("Select at least one option");
      return;
    }
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    setMessage(newPassword);
    setError("");
  };

  return (
    <div className="passwordGenerator">
      <h1>Password Generator</h1>
      <p>Create a secure and Strong Password, to keep your account Safe</p>

      <div className="passwordGenerator-container">
        <label htmlFor="passwordLength">
          Password Length
          <input
            type="number"
            id="passwordLength"
            data-testid="length-input"
            min="1"
            max="20"
            value={length}
            onChange={(e) => handleLength(Number(e.target.value))}
          />
        </label>

        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              data-testid="lowercase-checkbox"
              onChange={() => setIncludeLowercase((prev) => !prev)}
              checked={includeLowercase}

            />
            Include LowerCase
          </label>

          <label>
            <input
              type="checkbox"
              data-testid="uppercase-checkbox"
              onChange={() => setIncludeUppercase((prev) => !prev)}
              checked={includeUppercase}
            />
            Include UpperCase
          </label>

          <label>
            <input
              type="checkbox"
              data-testid="number-checkbox"
              onChange={() => setIncludeNumbers((prev) => !prev)}
              checked={includeNumbers}
            />
            Include Numbers
          </label>

          <label>
            <input
              type="checkbox"
              data-testid="symbols-checkbox"
              onChange={() => setIncludeSymbols((prev) => !prev)}
              checked={includeSymbols}
            />
            Include Symbols
          </label>
        </div>

        <button
          className="generate-btn"
          data-testid="generate-button"
          onClick={handleType}
        >
          Generate
        </button>
        <div className="result" >
          {message && <input data-testid="result" value={message} />}
        </div>

        {error && <p data-testid="error-message" className="error">{error}</p>}

      </div>
    </div>
  );
}
export default PasswordGenerator;
