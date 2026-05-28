import { useState } from "react";
import "./TabSwitcher.module.css";

// Sample tab data
const tabs = [
  { id: "home", label: "Home", content: "Welcome to the Home tab!" },
  { id: "profile", label: "Profile", content: "This is your Profile." },
  { id: "settings", label: "Settings", content: "Adjust your Settings here." },
];

export default function TabSwitcher() {
  const [isActive, setIsActive] = useState("home");

  return (
    <div className="tab-switcher">
      <h1>Tab Switcher</h1>
      <div className="tab-buttons">
        {tabs.map((tab, id) => (
          <button
            key={id}
            data-testid={`tab-button-${tab.id}`}
            onClick={() => setIsActive(tab.id)}
            className={isActive === tab.id ? "active" : null}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content" data-testid="tab-content">
        {tabs.map(
          (tab, id) => isActive === tab.id && <p key={id}>{tab.content}</p>
        )}
      </div>
    </div>
  );
}
