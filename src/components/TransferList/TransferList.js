import React from "react";
import "./styles.css";

const OPTIONS = [
  { title: "Item A", checked: false },
  { title: "Item B", checked: false },
  { title: "Item C", checked: false },
];

export default function TransferList() {
  const [list, setList] = React.useState(OPTIONS);
  const [selected, setSelected] = React.useState([]);

  const handleCheck = (source, title) => {
    if (source === "list") {
      setList((prev) =>
        prev.map((item) =>
          item.title === title
            ? { ...item, checked: !item.checked }
            : item
        )
      );
    } else {
      setSelected((prev) =>
        prev.map((item) =>
          item.title === title
            ? { ...item, checked: !item.checked }
            : item
        )
      );
    }
  };

  const handleSelected = (direction) => {
    if (direction === "forward") {
      const movedItems = list
        .filter((item) => item.checked)
        .map((item) => ({ ...item, checked: false }));

      setSelected((prev) => [...prev, ...movedItems]);
      setList((prev) => prev.filter((item) => !item.checked));
    } else {
      const movedItems = selected
        .filter((item) => item.checked)
        .map((item) => ({ ...item, checked: false }));

      setList((prev) => [...prev, ...movedItems]);
      setSelected((prev) => prev.filter((item) => !item.checked));
    }
  };

  return (
    <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
      <div>
        <h3>Available</h3>

        {list.map((option) => (
          <label
            key={option.title}
            style={{ display: "block", marginBottom: "8px" }}
          >
            <input
              type="checkbox"
              checked={option.checked}
              onChange={() => handleCheck("list", option.title)}
            />
            {" "}
            {option.title}
          </label>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "40px",
        }}
      >
        <button onClick={() => handleSelected("forward")}>
          →
        </button>

        <button onClick={() => handleSelected("back")}>
          ←
        </button>
      </div>
      <div>
        <h3>Selected</h3>

        {selected.map((option) => (
          <label
            key={option.title}
            style={{ display: "block", marginBottom: "8px" }}
          >
            <input
              type="checkbox"
              checked={option.checked}
              onChange={() => handleCheck("selected", option.title)}
            />
            {" "}
            {option.title}
          </label>
        ))}
      </div>
    </div>
  );
}