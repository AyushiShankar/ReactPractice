import React, { useState } from "react";
import { colorNameToHex } from "./colorData";
import styles from "./ColorExplorer.module.css";

const ColorExplorer = () => {
  const [color, setColor] = useState(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);


  function searchColor() {
    const saved = colorNameToHex(input);
    setColor({name: input, saved});
    !saved ?  setError("Sorry! I couldn't recognise that color"):setError(null);

  }


  return (
    <div className={styles.container}>
      <h1>Color Explorer</h1>
      <div className={styles["input-section"]}>
        <input
          type="text"
          data-testid="color-input"
          placeholder="Type a color name e.g. lavender"
          onChange={(e)=> setInput(e.target.value.toLowerCase().trim())}
          value={input}
        />
        <button data-testid="search-button" onClick={searchColor}>
          🔍
        </button>
      </div>
      {error && <p className={styles.err} data-testid="error-msg">{error}</p> }
      {color && !error && <div className={styles["color-box"]} data-testid="color-box">
        <div
          className={styles.preview}
          role="presentation"
          data-testid="color-preview"
          style={{backgroundColor:color.saved}}
        >
        </div>
        <p data-testid="color-name">
          {color ? <strong>Name:{color.name}</strong> : <strong>Name:</strong>}
        </p>
        <p data-testid="color-hex">
          {color ? <strong>Hex:{color.saved}</strong> : <strong>Hex:</strong>}
        </p>
      </div>}
    </div>
  );
};

export default ColorExplorer;
