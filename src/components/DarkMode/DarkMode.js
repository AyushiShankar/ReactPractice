import React, {  useState } from 'react';
import './DarkMode.module.css'

function DarkModeToggle() {

  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle((prev) => !prev);
  }

  return (
    <div className={`container ${toggle ? "dark-mode" : "light-mode"}`}>
      <h1>Dark Mode Toggle</h1>
      <div className="toggle-container" >
        <label className="switch">
          <input type="checkbox" onClick={handleToggle} />
          <span className="slider round"></span>
        </label>
        <span className="mode-text">{toggle ? "Dark Mode" : "Light Mode"}</span>
      </div>
    </div >
  );
}

export default DarkModeToggle;