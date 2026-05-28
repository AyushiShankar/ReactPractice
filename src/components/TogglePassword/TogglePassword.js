import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./styles.css";

function TogglePassword() {
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  function handlePassword() {
    setIsVisible((prev) => !prev);
  }
  return (
    <div className="container">
      <h1 className="title">Toggle Password</h1>
      <div className="password-wrapper">
        <input
          type={isVisible ? "text" : "password"}
          id="password"
          placeholder="Enter password"
          className="password-input"
          data-testid="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="icon"
          data-testid="toggle-icon"
          onClick={handlePassword}
        >
          {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
        </span>
      </div>
      <span className="visibility-label" data-testid="visibility-label">
        {isVisible ? "Password Visible" : "Password Hidden"}
      </span>
    </div>
  );
}

export default TogglePassword;
