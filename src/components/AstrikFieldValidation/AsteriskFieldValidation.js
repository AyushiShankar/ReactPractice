import React, { useState } from "react";
import "./AsteriskFieldValidation.module.css";

function AsteriskFieldValidation() {
  const [name, setName] = useState("");
  const [loc, setLoc] = useState("");
  const [error, setError] = useState({ name: "", loc: "" });
  const [submit, setSubmit] = useState("");


  function handleForm(e) {
    e.preventDefault();
    setSubmit("");
    setError("");
    const newError = { name: "", loc: "" };

    if (!name.trim()) {
      newError.name = "Name is required.";
    }
    if (!loc.trim()) {
      newError.loc = "Location is required.";
    }

    if (!newError.name && !newError.loc) {
      setSubmit(`Submitted Successfully!\nName: ${name}\nLocation: ${loc}`);
    }
    else {
      setError(newError);
    }


  }

  return (
    <div className="container">
      <h1 className="title">Asterisk Field Validation</h1>
      <form className="form" data-testid="form" onSubmit={handleForm}>
        <div className="input-group">
          <label htmlFor="name" className="label">
            Name <span className="asterisk">*</span>
          </label>
          <input
            id="name"
            data-testid="name-input"
            className={error.name ? "input-error" : "input"}
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {error.name && <p className="error"
            data-testid="name-error">{error.name}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="location" className="label">
            Location <span className="asterisk">*</span>
          </label>
          <input
            id="location"
            className="input"
            data-testid="location-input"
            type="text"
            data-testid="location-input"
            placeholder="Enter your location"
            onChange={(e) => setLoc(e.target.value)}
            value={loc}
          />
          {error.loc && <p data-testid="location-error" className="error">{error.loc}</p>}
        </div>

        <button type="submit" className="submit-button"
          data-testid="submit-button">
          Submit
        </button>
      </form>
      {submit && (<pre data-testid="success-message" classname="success-message">{submit}</pre>)
      }
    </div >
  );
}

export default AsteriskFieldValidation;
