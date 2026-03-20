import React, { useState } from "react";
import styles from './ChipsInput.module.css';
function ChipsInput() {
  const [text, setText] = useState("");
  const [arr, setArr] = useState([]);

 function handleChip(value) {
    const chip = value.trim();
    if (!chip) return;
    setArr((prev) => [...prev, chip]);
    setText("");
  }

  return (
    <div className={styles["main-container"]}>
      <h2>Chips Input</h2>
      <input
        type="text"
        placeholder="Type a chip and press tag"
        className={styles["input"]}
        value={text}
        onChange={(e)=>setText(e.target.value)}
        onKeyDown={(e)=>{
            if(e.key === "Enter"){
                e.preventDefault();
                handleChip(text);
            }
        }}
      />
     {arr.map((a,i)=>
  (
  <div key={`${a}-${i}`} className={styles.chip}>
        <span>{a}</span>
        <button onClick={() => setArr((prev)=> prev.filter((a,id)=> id!==i))}>
          ×
        </button>
      </div>
  ))}
    </div>
  );
}

export default ChipsInput;