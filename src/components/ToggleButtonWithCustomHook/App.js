import { useState } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((prev) => !prev);
  return [value, toggle];
}

export default function App() {

  const [isOn, toggle] = useToggle(false);

  return (
    /* your toggle function for the onClick method */
    <button data-testid="toggle-button" onClick={toggle}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
}
