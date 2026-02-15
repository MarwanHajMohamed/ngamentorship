import "./menteedashboard.css";
import Dashboard from "./Dashboard/Dashboard";
import Team from "./Team/Team";

const MenteeDashboard = () => {
  return (
    <div className="mentee-dashboard-container">
      <Dashboard />
      <Team />
    </div>
  );
};

export default MenteeDashboard;
