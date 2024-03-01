import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import nav from "../../public/images/nav.png";
import "../css/nav.css";
const NavbarM = () => {
  let navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const clickedd = () => {
    setClicked((prev) => !prev);
  };
  const [authToken] = useState(localStorage.getItem("authToken"));
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="nav-container">
      <img
        src={nav}
        alt=""
        onClick={clickedd}
        className={clicked ? "dont-show" : "show"}
      />
      <button className={clicked ? "show" : "dont-show"} onClick={clickedd}>
        X
      </button>
      {clicked ? (
        <div className="nav-items">
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/todo">
              TODO
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/notes">
              Notes
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/budget-tracker">
             Budget Tracker
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/weather">
              Weather
            </Link>
          </li>
          {authToken ? (
            <>
              <li>
                <Link className="nav-link" to="/profile">
                  YOUR PROFILE
                </Link>
              </li>
              <li>
                <Link to={"/"} className="nav-link" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/login">
                  Log In
                </Link>
              </li>
            </>
          )}
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default NavbarM;
