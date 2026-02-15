import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="title">Dashboard</div>
      <div className="cards-container">
        <div className="card-container">
          <div className="top">
            <div>
              This week's research task is <b>Cyrus the Great</b>
            </div>
          </div>
          <div className="bottom">
            <div className="time">3 days left</div>
            <div className="submission">No submission</div>
          </div>
        </div>
        <div className="card-container">
          <div className="top">
            <div>
              You have submitted <b>2</b> training videos this week.
            </div>
          </div>
          <div className="bottom">
            <div className="time">3 days left</div>
          </div>
        </div>
        <div className="card-container">
          <div className="top">
            <div>You have a new quiz to complete.</div>
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
