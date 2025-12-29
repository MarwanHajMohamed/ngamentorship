import React from "react";
import "./navbar.css";
import Logo from "../../assets/NGAMentorship.png";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="left-side">
        <img src={Logo} alt="" />
      </div>
      <div className="right-side">
        <div className="profile">MM</div>
      </div>
    </div>
  );
};

export default Navbar;
