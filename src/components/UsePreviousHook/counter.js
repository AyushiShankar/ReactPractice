import "./styles.css";
import { useState } from "react";
import usePrevious from "./usePrevious";

export default function Counter() {

  const [current, setCurrent] = useState(0);
  const previousCount = usePrevious(current);

  const handleDec = () => {
    return setCurrent((prev) => prev - 1);

  };
  const handleIn = () => {
    return setCurrent((prev) => prev + 1);
  };

  const handleReset = () => {
    return setCurrent(0);

  };
  return (
    <div className="App">
      <h2>Current Count: {current}</h2>
      <h2>Previous Count: {previousCount}</h2>
      <button onClick={handleDec}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleIn}>Increment</button>
    </div>
  );
}
