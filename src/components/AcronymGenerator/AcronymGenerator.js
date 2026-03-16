import { useState } from "react";

function AcronymGenerator() {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");

  function toAcronym(text) {

    const arr = text.split(" ").map((a) => a.trim()).filter((word) => word.length > 0).map((word) => word[0].toUpperCase()).join("");

    return setResult(arr);

  }

  return (
    <div>
      <h1>Acronym Generator</h1>
      <p>
        An acronym is formed by taking the first letter of each word in a phrase
        and converting them to uppercase.
      </p>

      <div>
        <input
          type="text"
          placeholder="Enter a phrase..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
          data-testid="input"
        />
        <button onClick={() => toAcronym(value)}
          data-testid="generate-button">Generate</button>
        <p data-testid="result">Result : {result}</p>
      </div>
    </div>
  );
}
export default AcronymGenerator;
