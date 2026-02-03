import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
  const { user, isLoading } = useAuth();

  const role = user?.role;

  const links = [
    {
      name: "Dashboard",
      path: `/dashboard${
        role === "ADMIN" ? "/admin" : role === "MENTEE" ? "" : "/mentor"
      }`,
      icon: "fa-solid fa-chart-line",
    },
    {
      name: "Research",
      path: "/research",
      icon: "fa-solid fa-magnifying-glass",
    },
    { name: "Training", path: "/training", icon: "fa-solid fa-dumbbell" },
    { name: "Quizzes", path: "/quizzes", icon: "fa-solid fa-question" },
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar-items">
        {links.map(({ name, path, icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) => `item ${isActive ? "active" : ""}`}
          >
            <i className={icon}></i>
            <div>{name}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
