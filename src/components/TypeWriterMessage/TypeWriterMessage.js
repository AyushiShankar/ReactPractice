import React, { useState, useEffect } from "react";
import "./styles.css";

const messages = [
  "Hello, welcome to the typewriter effect!",
  "This demonstrates useEffect and setInterval in React.",
  "Watch as each character appears one by one.",
  "You can skip the animation if you're impatient!",
  "Thanks for watching the typewriter in action!",
];

export function TypeWriterMessage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  const startTyping = () => {
    setDisplayedText(messages[{currentMessageIndex}]);
    setIsTyping((prev)=>!prev);
  };

  const skipTyping = () => {
    setShowSkip((prev)=> !prev);
}

  const nextMessage = () => {
    setCurrentMessageIndex((prev)=> prev+1);
    setDisplayedText(messages[{currentMessageIndex}]);
  };

  useEffect(() => {
    setInterval(()=> {
        setDisplayedText(messages[{currentMessageIndex}],1000)

    })
  }, [currentMessageIndex]);

  return (
    <div className="typewriter-container">
      <h1>Typewriter Effect</h1>

      <div className="message-display">
        <p className="displayed-text">{displayedText}</p>
        {isTyping && <span className="cursor">|</span>}
      </div>

      <div className="controls">
        <button onClick={startTyping} className={isTyping ? "start-button disabled" : "start-button"}>
          Start
        </button>

        {showSkip && (
          <button onClick={skipTyping} className="skip-button">
            Skip
          </button>
        )}

        <button onClick={nextMessage} className={isTyping ? "next-button disabled" : "next-button"}>
          Next
        </button>
      </div>

      <div className="message-info">
        <p>
          Message {currentMessageIndex + 1} of {messages.length}
        </p>
        <p className="instruction">
          Watch the typewriter effect or use the Skip button to see the full
          message instantly!
        </p>
      </div>
    </div>
  );
}
