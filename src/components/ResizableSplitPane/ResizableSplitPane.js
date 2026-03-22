import { useState, useRef } from "react";
import "./ResizableSplitPane.module.css";

function ResizableSplitPane() {
  const [leftWidth, setLeftWidth] = useState(200);
  const container = useRef(null);
  const drag = useRef(false);

  const handleStart = () => {
    drag.current = true;
  }
  const handleStop = () => {
    drag.current = false;
  }
  const handleMove = (e) => {
    if (!drag.current) return;
    const change = container.current.getBoundingClientRect().left;
    const newWidth = e.clientX - change;

    if (newWidth >= 100) { setLeftWidth(newWidth); }
  }

  return (
    <div>
      <h1>Resizable Split Pane</h1>

      <div className="container" data-testid="container"
        onMouseUp={handleStop}
        onMouseMove={handleMove}
        ref={container}>
        <div className="left-pane" data-testid="left-pane"
          style={{ width: leftWidth }}>
          <p>Left Pane</p>
        </div>
        <div className="divider" data-testid="divider" onMouseDown={handleStart} ref={drag}></div>
        <div className="right-pane" data-testid="right-pane">
          <p>Right Pane (auto expands)</p>
        </div>
      </div>
    </div>
  );
}
export default ResizableSplitPane;