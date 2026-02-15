import React, { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigate: NavigateFunction = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <div>Loading...</div>;

  const role = user?.role;

  return (
    <>
      <div className="dashboard-page-container">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
