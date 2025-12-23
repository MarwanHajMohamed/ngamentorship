import React from "react";
import "./login.css";
import { TextField } from "@mui/material";
import Logo from "../../assets/NGAMentorship.png";

const Login = () => {
  return (
    <div className="login-page-container">
      <div className="left-side">
        <div className="description">
          NGA Mentorship provides a platform for NGA students to collaborate and
          grow under the guidance of their mentors.
        </div>
        <div className="link">
          Get started by <span>creating an account.</span>
        </div>
      </div>
      <div className="right-side">
        <form action="">
          <img src={Logo} alt="" />
          <TextField variant="outlined" label="Email" type="email" />
          <TextField variant="outlined" label="Password" type="password" />
          <div className="submit">
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
