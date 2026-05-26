import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

export default function SearchableDropdown({ options }) {
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef(null);
  const highlightRef = useRef(null);

  const availableOptions = options.filter(
    (opt) =>
      !selected.includes(opt.value) &&
      opt.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (value) => {
    setSelected([...selected, value]);
    setInputValue("");
    setIsOpen(false);
    setHighlightedIndex(0);
  };

  const handleOptions = (val) => {
    setSelected(selected.filter((s) => s != val));
  }

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev + 1 >= availableOptions.length ? 0 : prev + 1);

    }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev - 1 < 0 ? availableOptions.length - 1 : prev - 1);
    }
    else if (e.key === "Enter") {
      e.preventDefault();
      const opt = availableOptions[highlightedIndex];
      if (opt) {
        handleSelect(opt.value);
      }
    }

  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current.contains(e.target)) setIsOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside)
  }, []);

  useEffect(() => {
    highlightRef.current?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <div className="selected-tags">
        {selected.map((s) => {
          const label = options.find((o) => o.value === s)?.label;
          return (
            <span className="tag" key={s} data-testid={`selected-tag-${s}`}>
              <button onClick={() => handleOptions(s)} data-testid={`remove-tag-${s}`}>{label}&nbsp;*</button>
            </span>
          )
        })}
      </div>

      <input
        data-testid="search-input"
        placeholder="Search fruits..."
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
          setHighlightedIndex(0);
        }}
        value={inputValue}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />

      {isOpen && (<ul className="dropdown" data-testid="dropdown-container">
        {availableOptions.map((opt, index) => (
          <li
            key={opt.value}
            data-testid={`dropdown-option-${opt.value}`}
            className={`dropdown-option ${index === highlightedIndex ? "highlighted" : " "}`}
            ref={index === highlightedIndex ? highlightRef : null}
            onClick={() => handleSelect(opt.value)}
          >
            {opt.label}
          </li>
        ))}
        {availableOptions.length === 0 && (
          <li className="no-options">No options</li>
        )}
      </ul>)
      }
    </div>
  );
}
