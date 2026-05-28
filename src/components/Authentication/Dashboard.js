import { useContext } from "react";
import { UserContext } from "./userContext";

const Dashboard = () => {
  const { toggle } = useContext(UserContext);

  return (
    <div className="dashboard">
      <h2>
        {toggle
          ? `This is your dashboard`
          : `Please login to access your dashboard`}
      </h2>
    </div>
  );
};

export default Dashboard;
