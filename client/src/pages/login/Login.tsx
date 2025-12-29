import React, { JSX, useState } from "react";
import "./login.css";
import { TextField } from "@mui/material";
import Logo from "../../assets/NGAMentorship.png";
import { NavigateFunction, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/common components/SmallLoading/Loading";
import { handleLogin } from "../../api/userApi";
import MessageBox from "../../components/MessageBox/MessageBox";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [button, setButton] = useState<string | JSX.Element>("Login");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  const navigate: NavigateFunction = useNavigate();

  const handleChange = (
    setState: React.Dispatch<React.SetStateAction<string>>,
    e: string
  ) => {
    setState(e);
    setMessage(null);
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButton(<LoadingSpinner />);
    setLoading(true);

    try {
      await handleLogin(email, password).then((res) => {
        if (res === "success") {
          navigate("/");
        } else {
          setMessage({
            text: "Email or password do not match.",
            type: "error",
          });
        }
        setButton("Login");
        setLoading(false);
      });
    } catch (error) {}
  };

  return (
    <div className="login-page-container">
      <div className="left-side">
        <div className="description">
          NGA Mentorship provides a platform for NGA students to collaborate and
          grow under the guidance of their mentors.
        </div>
        <div className="link">
          Get started by{" "}
          <span onClick={() => navigate("/register")}>
            creating an account.
          </span>
        </div>
      </div>
      <div className="right-side">
        <form onSubmit={login}>
          <img src={Logo} alt="" />
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => handleChange(setEmail, e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => handleChange(setPassword, e.target.value)}
          />
          <div className="submit">
            <button type="submit">{button}</button>
          </div>
        </form>
        <MessageBox
          message={message?.text || ""}
          type={message?.type || "error"}
        />
      </div>
    </div>
  );
};

export default Login;
