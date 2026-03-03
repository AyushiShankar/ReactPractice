import { useEffect, useRef, useState } from "react";
import styles from "./AutoSaveInput.module.css";

const PRIMARY_STORAGE_KEY = "name";
const STORAGE_KEYS = ["autosave-input", PRIMARY_STORAGE_KEY];

function getSavedText() {
  for (const key of STORAGE_KEYS) {
    const value = localStorage.getItem(key);
    if (value !== null) return value;
  }
  return "";
}

function AutoSaveInput() {
  const [text, setText] = useState(getSavedText);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (!text.trim()) {
      STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
      return;
    }

    localStorage.setItem(PRIMARY_STORAGE_KEY, text);
  }, [text]);

  function handleClear() {
    setText("");
  }

  return (
    <section className={styles.card}>
      <h1 className={styles.title}>Auto Save Input</h1>
      <div className={styles.row}>
        <label htmlFor="name-input">Name:</label>
        <input
          id="name-input"
          type="text"
          value={text}
          data-testid="input-field"
          onChange={(e) => setText(e.target.value)}
        />
        <button id="clear-btn" data-testid="clear-btn" onClick={handleClear}>
          Clear
        </button>
      </div>
    </section>
  );
}

export default AutoSaveInput;
