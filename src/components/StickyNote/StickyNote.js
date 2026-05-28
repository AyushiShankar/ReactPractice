import React from "react";
import { Plus, X } from "lucide-react";
import "./styles.css";

function StickyNote() {
  const [stickNote, setStickNote] = React.useState([]);

  const closeNote = (id) => {
    setStickNote((prev) => prev.filter((s) => s.id !== id));
  };

  const handleNotes = () => {
    setStickNote((prev) => [
      ...prev,
      { id: Date.now(), text: "" }
    ]);
  };

  const updateNote = (id, value) => {
    setStickNote((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, text: value } : note
      )
    );
  }

  const OnMouseDown = (e) => {
    const note = e.target.closest(".note");
    if (!note) return;

    const shiftX = e.clientX - note.getBoundingClientRect().left;
    const shiftY = e.clientY - note.getBoundingClientRect().top;

    const moveAt = (pageX, pageY) => {
      note.style.left = pageX - shiftX + "px";
      note.style.top = pageY - shiftY + "px";
    };

    moveAt(e.pageX, e.pageY);

    const onMouseMove = (e) => {
      moveAt(e.pageX, e.pageY);
    };      

    document.addEventListener("mousemove", onMouseMove);

    note.onmouseup = () => {
      document.removeEventListener("mousemove", onMouseMove);
      note.onmouseup = null;
    };
  };

  const OnMouseUp = (e) => {
    const note = e.target.closest(".note");
    if (!note) return;
    note.onmouseup = null;
  };

  const OnMouseMove = (e) => {
    const note = e.target.closest(".note");
    if (!note) return;
  };    


  const Sticky = ({ text }) => {

    return (<div key={text.id} className="note" data-testid="sticky-note">
      <button className="close-btn"
        data-testid="close-button" onClick={() => closeNote(text.id)}>
        <X className="icon-close" data-testid="icon-close" />
      </button>
      <textarea className="note-textarea"
        data-testid="note-textarea"
        placeholder="Enter Text"
        onChange={(e) => updateNote(text.id, e.target.value)}
        value={text.text} 
       onMouseDown={OnMouseDown}
       onMouseUp={OnMouseUp}
       onMouseMove={OnMouseMove}
       />
    </div>);
  };


  return (
    <div className="container" data-testid="sticky-notes-container">
      {stickNote.map((text) => (
        <Sticky key={text.id} text={text} />
      ))}
      <button className="add-note-btn" onClick={handleNotes} >
        <Plus className="icon-add" data-testid="icon-add" />
      </button>
    </div>
  );
}


export default StickyNote;
