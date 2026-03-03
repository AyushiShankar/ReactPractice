import React, { useState } from "react";
import  style from './ReadMoreToggle.module.css';

function ReadMoreToggle() {
  const text = `React is a popular JavaScript library developed by Facebook for 
  building user interfaces, especially single-page applications. It allows
   developers to create reusable UI components that efficiently update and 
   render as data changes. One of React’s key features is the virtual DOM, 
   which improves performance by minimizing direct manipulation of the actual
    DOM.`;
  const [read, setRead] = useState(false);

  function handleText() {
    return setRead((prev) => !prev);

  }

  return (
    <div className={style["readmore-container"]}>
      <h1 className="title">Read More Toggle</h1>
      <p className={style["readmore-text"]}data-testid="readmore-text">
        {read ? text : `${text.substring(0, 100)}...`}
      </p>
      <button
        className={style["readmore-button"]}
        data-testid="readmore-button"
        onClick={handleText}
      >
        {read ? "Read Less" : "Read More"}
      </button>
    </div>
  );
}

export default ReadMoreToggle;
