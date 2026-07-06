import React, { useEffect, useState } from 'react';
import './styles.css'

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isRunning) setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, seconds])

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Time: {seconds}s</h1>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Stop</button>
      <button onClick={() => { setIsRunning(false); setSeconds(0) }}>Reset</button>
    </div>
  );
}

export default Stopwatch;