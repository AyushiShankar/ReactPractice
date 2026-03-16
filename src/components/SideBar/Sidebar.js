import  { useState } from "react";
import "./Sidebar.module.css";
import { Menu } from "lucide-react";

function Sidebar() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className={`sidebar ${toggle ? "open" : "closed"}`} data-testid="sidebar">
      <button className="toggle-btn" onClick={handleToggle} data-testid="btn-toggle" arial-label="Toggle sidebar"><Menu size={24} data-testid="icon-menu" /></button>
      {toggle && (
        <nav className="nav-menu" data-testid="nav-menu">
          <ul className="nav-list">
            <li className="nav-item" data-testid="nav-item-home">Home</li>
            <li className="nav-item" data-testid="nav-item-about">About</li>
            <li className="nav-item" data-testid="nav-item-services">Services</li>
            <li className="nav-item" data-testid="nav-item-contact">Contact</li>
          </ul>
        </nav>)}
    </div>
  );
}

export default Sidebar;
