import React, { JSX, useState } from "react";
import "./register.css";
import { TextField } from "@mui/material";
import Logo from "../../assets/NGAMentorship.png";
import { NavigateFunction, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/common components/SmallLoading/Loading.tsx";
import { handleRegister } from "../../api/userApi.ts";
import MessageBox from "../../components/MessageBox/MessageBox.tsx";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

const Register = () => {
  const navigate: NavigateFunction = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [dob, setDob] = useState<Dayjs | null>(null);
  const [city, setCity] = useState<string>("");
  const [button, setButton] = useState<string | JSX.Element>("Register");
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  const handleChange = (
    setState: React.Dispatch<React.SetStateAction<string>>,
    e: string
  ) => {
    setState(e);
    setMessage(null);
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButton(<LoadingSpinner />);
    setMessage(null);

    if (password !== confPassword) {
      setMessage({ text: "Your passwords do not match.", type: "error" });
      setButton("Register");
      return;
    }

    if (dob === null) {
      return;
    }

    try {
      await handleRegister({
        firstName,
        surname,
        email,
        password,
        dob: dob.format("DD/MM/YYYY"),
        city,
      }).then((res) => {
        if (res === "duplicate") {
          setMessage({
            text: "User with this email address already exists.",
            type: "error",
          });
        } else if (res === "success") {
          setMessage({
            text: "You have successfully registered your account!",
            type: "success",
          });
          setFirstName("");
          setSurname("");
          setDob(null);
          setCity("");
          setEmail("");
          setPassword("");
          setConfPassword("");
        }
        setButton("Register");
      });
    } catch (error) {
      setMessage({
        text: "Failed to register. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="register-page-container">
      <div className="left-side">
        <form onSubmit={register}>
          <img src={Logo} alt="" />
          <div className="row">
            <TextField
              variant="outlined"
              label="First name"
              type="text"
              value={firstName}
              onChange={(e) => handleChange(setFirstName, e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              label="Surname"
              type="text"
              value={surname}
              onChange={(e) => handleChange(setSurname, e.target.value)}
              required
            />
          </div>
          <div className="row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                className="date"
                variant="outlined"
                label="Date of Birth"
                format="DD/MM/YYYY"
                value={dob}
                onChange={setDob}
                required
              />
            </LocalizationProvider>
            <TextField
              variant="outlined"
              label="City"
              type="text"
              value={city}
              onChange={(e) => handleChange(setCity, e.target.value)}
              required
            />
          </div>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => handleChange(setEmail, e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => handleChange(setPassword, e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="Confirm password"
            type="password"
            value={confPassword}
            onChange={(e) => handleChange(setConfPassword, e.target.value)}
            required
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
      <div className="right-side">
        <div className="description">
          NGA Mentorship provides a platform for NGA students to collaborate and
          grow under the guidance of their mentors.
        </div>
        <div className="link" onClick={() => navigate("/")}>
          Login here
        </div>
      </div>
    </div>
  );
};

export default Register;
