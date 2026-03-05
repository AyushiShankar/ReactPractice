import React, { useState } from 'react';
import "./PasswordStrength.module.css";

export const checkPasswordStrength = (value) => {
  if (!value) return "Weak Password";
  const checks = [
    value.length >= 8,
    /[A-Z]/.test(value),
    /[a-z]/.test(value),
    /[0-9]/.test(value),
    /[^A-Za-z0-9]/.test(value),
  ];

  const passed = checks.filter(Boolean).length;

  if (passed === 1) return "Level 1";
  if (passed === 2 || passed === 3) return "Level 2";
  if (passed === 4 || passed === 5) return "Level 3";
};

const PasswordStrength = () => {

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleCheck = () => {
    setMessage(checkPasswordStrength(password));
  }

  return (
    <div>
      <h2>Password Strength Checker</h2>
      <input className="password" data-testid="password" placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)} />
      <button className="check-btn" onClick={handleCheck}>Check Strength</button>
      {message && <p >Strength: <strong>{message}</strong></p>}
    </div>
  );
};

export default PasswordStrength;