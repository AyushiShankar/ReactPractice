import { useContext } from "react";
import { UserContext } from "./userContext";

const Navbar = () => {
  const { handleToggle, toggle } = useContext(UserContext);

  return (
    <nav>
      <h1>App</h1>
      <p>{toggle && "Welcome, User!"}</p>
      <button onClick={handleToggle}>{toggle ? "Logout" : "Login"}</button>
    </nav>
  );
};

export default Navbar;
