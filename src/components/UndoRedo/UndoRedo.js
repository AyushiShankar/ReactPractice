import { useState } from "react";
import styles from './UndoRedo.module.css';

function UndoRedo() {
  const [text, setText] = useState("");
  const [history, setHistory]= useState([""]);
  const [currentIndex, setCurrentIndex]=useState(0);

function handleChange(e) {
    const newValue = e.target.value;

    const update = history.slice(0, currentIndex + 1);
    setHistory([...update, newValue]);
    setCurrentIndex(update.length);
    setText(newValue);

  }

  function handleRedo() {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setText(history[currentIndex + 1]);
    }

  }

  function handleUndo() { 
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setText(history[currentIndex - 1]);
    }
  }

  return (
    <div className={styles.undoRedo}>
      <h1>Undo Redo History</h1>

      <div className={styles.container}>
        <textarea onChange={handleChange} data-testid="textarea"
          value={text} className={styles.textarea}/>

        <div className={styles.buttons}>
          <button onClick={handleRedo} data-testid="redo-button" disabled={currentIndex === history.length - 1}>
            Redo
          </button>
          <button onClick={handleUndo} data-testid="undo-button" disabled={currentIndex === 0}>
            Undo
          </button>
        </div>
      </div>
    </div>
  );
}

export default UndoRedo;
