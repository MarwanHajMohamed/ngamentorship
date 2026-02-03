import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import Logo from "../../assets/NGAMentorship.png";
import { useAuth } from "../../hooks/useAuth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const Navbar = () => {
  const [show, setShow] = useState<boolean>(false);
  const accountModalRef = useRef<HTMLUListElement | null>(null);

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        accountModalRef.current &&
        !accountModalRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { user, logout } = useAuth();

  if (!user) {
    navigate("/login");
    return;
  }

  const group = user.group?.groupNumber;
  const initials =
    user.firstName[0].toUpperCase() + user.surname[0].toUpperCase();

  return (
    <>
      <div className="navbar-container">
        <div className="top-side">
          <div className="left-side">
            <img src={Logo} alt="" />
          </div>
          <div className="right-side">
            <div className="account-container">
              <div className="profile" onClick={() => setShow(!show)}>
                {initials}
              </div>
              <ul
                className={show ? "account-modal show" : "account-modal"}
                ref={accountModalRef}
              >
                <ul>
                  {/* <li onClick={() => navigate("/account")}>Your Account</li> */}
                  <li onClick={logout}>Logout</li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
        <div className="bottom-side">
          <Sidebar />
          <div className="bottom-nav">
            <div className="group">
              {group === null || group === undefined
                ? "No group"
                : "Group " + group}
            </div>
            <div className="">Good morning {user.firstName}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
