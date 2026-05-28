import { useState } from "react";

const ZigzagString = () => {
  const [data, setData] = useState("");
  const [final, setFinal] = useState("");

  const handleString = (value) => {
    const arr = value.split(",").map((s) => s.trim());
    const length = arr.length;
    for (let i = 0; i < length; i++) {
      if (i % 2 != 0) {
        arr[i] = arr[i].split("").reverse().join("");
      }
    }
    setFinal(arr.join(""));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter strings like one,two,three"
        data-testid="input-box"
        onChange={(e) => setData(e.target.value)}
        value={data}
      />
      <button data-testid="submit-button" onClick={() => handleString(data)}>
        Submit
      </button>
      <p data-testid="output-result">Output: {final}</p>
    </div>
  );
};

export default ZigzagString;
