import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="title">Dashboard</div>
      <div className="cards-container">
        <div className="card-container">
          <div className="top">
            <div>
              The research task you set is: <b>Cyrus the Great</b>
            </div>
          </div>
          <div className="bottom">
            <div className="time">3 days left</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
