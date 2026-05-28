import { useCallback, useEffect, useState } from "react";
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

  const currentMessage = messages[currentMessageIndex] ?? "";

  const startTyping = useCallback(() => {
    setIsTyping(true);
    setShowSkip(true);
    setDisplayedText("");
  }, []);

  const skipTyping = useCallback(() => {
    setDisplayedText(currentMessage);
    setIsTyping(false);
    setShowSkip(false);
  }, []);

  const nextMessage = useCallback(() => {
    if (isTyping) return;
    setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    setDisplayedText("");
    setIsTyping(false);
    setShowSkip(false);
  }, []);

  useEffect(() => {
    if (!isTyping) return;
    let charIndex = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (charIndex <= currentMessage.length) {
        setDisplayedText((prev) => prev + currentMessage.charAt(charIndex));
        charIndex += 1;
      } else {
        setIsTyping(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentMessage, isTyping]);

  return (
    <div className="typewriter-container">
      <h1>Typewriter Effect</h1>

      <div className="message-display">
        <p className="displayed-text">{displayedText}</p>
        {isTyping && <span className="cursor">|</span>}
      </div>

      <div className="controls">
        <button
          onClick={startTyping}
          className={isTyping ? "start-button disabled" : "start-button"}
          disabled={isTyping}
        >
          Start Typing
        </button>

        {showSkip && (
          <button onClick={skipTyping} className="skip-button">
            Skip
          </button>
        )}

        <button
          onClick={nextMessage}
          className={isTyping ? "next-button disabled" : "next-button"}
          disabled={isTyping}
        >
          Next Message
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
