import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="main-page-container">
      <Navbar />
      <div className="content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
