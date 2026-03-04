import React, { useState } from "react";
import style from './ConfirmationModal.module.css';

function ConfirmationModal() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function handleModal(value) {

    setOpen((prev) => !prev);
    if (value === "confirm") { setMessage("Confirmed"); }
    if (value === "cancel") { setMessage("Cancelled"); }
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <div className={style["modal-container"]}>
      <button className={style["open-modal-btn"]} data-testid="open-modal-button" onClick={handleModal}>Open Confirmation Modal</button>

      {open && <div className={style["modal-backdrop"]}>
        <div className={style["modal-box"]} data-testid="confirmation-modal" >
          <h2 className={style["modal-title"]} data-testid="modal-title" >Confirm Action</h2>
          <p className={style["modal-message"]} data-testid="modal-message" >Are you sure you want to proceed?</p>

          <div className={style["modal-buttons"]}>
            <button className={style["confirm-btn"]}
              data-testid="confirm-button"
              onClick={() => handleModal("confirm")}>Confirm</button>
            <button className={style["cancel-btn"]}
              data-testid="cancel-button" onClick={() => handleModal("cancel")}>Cancel</button>
          </div>
        </div>
      </div>}

      {message && <div className={style["action-status"]}
        data-testid="action-status">{message}</div>}
    </div>
  );
}

export default ConfirmationModal;
