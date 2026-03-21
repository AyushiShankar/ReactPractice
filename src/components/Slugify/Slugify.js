import { useState } from "react";
import "./Slugify.module.css";

function Slugify() {
  const [text, setText] = useState("");
  function slugifyString(str) {
    if (!str) return "";
       const arr = str.trim().normalize("NFKD").split(" ").map((a, i) => a.toLowerCase()).filter(Boolean).join("-").replace(/[\u0300-\u036f]/g, "");
    console.log("String", arr);

    return arr;
  }

  const result = slugifyString(text);

  return (
    <div>
      <h1>Slugify a String</h1>
      <div className="container"><input type="text" value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-box"
        data-testid="input-box"
        placeholder="Type your text here..."
      /></div>
      <p data-testid="result" className="result">{result}</p>
    </div>
  );
}
export default Slugify;
