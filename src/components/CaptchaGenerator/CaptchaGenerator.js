import React, { useEffect, useState } from "react";

const generateCaptcha = (length = 5) => {
  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const getCharStyle = () => {
  const rotation = Math.floor(Math.random() * 31) - 15;
  const skew = Math.floor(Math.random() * 11) - 5;

  return {
    display: "inline-block",
    transform: `rotate(${rotation}deg) skew(${skew}deg)`,
    margin: "0 2px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#000",
    textShadow: "1px 1px #ccc",
  };
};

export default function CaptchaGenerator() {
  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input || (input !== captcha)) {
      setMessage("Incorrect")
    }
    else {
      setMessage("Correct");
    }

  };

  const resetCaptcha = () => {
    setCaptcha(generateCaptcha());
    setInput("");
    setMessage("");

  };

  return (
    <div className="container" style={{ fontFamily: "monospace" }}>
      <h2>Captcha Generator</h2>

      <div className="captcha-box">
        {captcha.split("").map((char, i) => (
          <span key={i} style={getCharStyle()}>
            {char}
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter captcha"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={resetCaptcha}>
          Regenerate
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
