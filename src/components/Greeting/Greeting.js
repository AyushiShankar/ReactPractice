import React, { useState, useEffect } from "react";

export default function Greeting() {
  const [text, setText] = useState("");
  const [greet, setGreet] = useState("");

  useEffect(() => {
    const time = () => {
      const current = new Date();
      const hours = current.getHours();

      setText(current.toLocaleTimeString());

      if (hours >= 5 && hours < 12) setGreet("Good Morning! ☀️");
      else if (hours >= 12 && hours < 17) setGreet("Good Afternoon! 🌤️");
      else if (hours >= 17 && hours < 21) setGreet("Good Evening! 🌆");
      else setGreet("Good Night! 🌙✨");
    };

    time();
    const timer = setInterval(time, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="modal-content"
      style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        color: "#333",
      }}
    >
      <p data-testid="greeting">{greet}</p>
      <time data-testid="time" className="updated-time">{text}</time>
    </div>
  );
}
