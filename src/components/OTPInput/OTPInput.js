import React, { useRef, useState } from "react";
import "../styles.css";


function OTPInput({ onChangeOTP }) {
  const length = 4;
  const [otp, setOTP] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const focusInput = (index) => {
    inputsRef.current[index]?.focus();

  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];

    setOTP((prev) => {
      newOtp[index] = value;
      return newOtp;
    });
    if (value && index <= length - 1) {
      focusInput(index + 1);
    }

    const joinedOTP = newOtp.join("");
    if (joinedOTP.length === length && !newOtp.includes("")) { onChangeOTP(joinedOTP); }
  };



  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusInput(index - 1);
    }

  };


  const handlePaste = (e) => {
    e.preventDefault();
    if (!e.clipboardData) return;
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length).split("");
    if (pastedData.length === 0) return;
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];

      if (inputsRef.current[i]) {
        inputsRef.current[i].value = pastedData[i];
      }
    }

    setOTP(newOtp);
    const joinedOTP = newOtp.join("");
    if (joinedOTP.length === length && !newOtp.includes("")) { onChangeOTP(joinedOTP); }

    const nextFocusIndex = Math.min(pastedData.length, length - 1);
    focusInput(nextFocusIndex);

  };

  return (
    <div onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          onFocus={() => focusInput(index)}
          type="text"
          maxLength="1"
          inputMode="numeric"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            width: "40px",
            height: "40px",
            fontSize: "20px",
            textAlign: "center",
            marginRight: "10px"
          }}
        />
      ))}
    </div>
  );
}

export default OTPInput;
