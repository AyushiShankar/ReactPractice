import React, { useState } from "react";

function Modal() {

  const [isOpen, setIsOpen] = useState(false);



  return (
    <div style={{ textAlign: "center", padding: "50px", height: "100vh" }}>
      <h1>Modal Popup</h1>
      <button
        style={{ padding: "10px", cursor: "pointer" }} onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>

      {isOpen && <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        data-testid="modal-backdrop"
        onMouseDown={() => setIsOpen(false)}>
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px" }}
          onMouseDown={(e) => e.stopPropagation()}>
          <h1>Modal Header</h1>
          <p>This is the modal body</p>
          <button
            style={{ padding: "10px", cursor: "pointer" }} onClick={() => setIsOpen(false)}
          >
            Close</button>
        </div>

      </div>}
    </div >
  );
}

export default Modal;
