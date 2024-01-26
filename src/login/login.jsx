import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "../assets/css/login.css";
import axios from "axios";

const Login = () => {
  const [ErrorMessage, setErrorMessage] = useState("");
  const [UserCredentials, setUserCredentials] = useState({
    Username: "",
    password: "",
  });
  let navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    // Set the default "Authorization" header for Axios
    axios.defaults.headers.common["Authorization"] = `${authToken}`;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/loginuser`,
        {
          Username: UserCredentials.Username,
          password: UserCredentials.password,
        }
      );
      const { success, authToken } = response.data;

      if (!success) {
        alert("Enter valid Credentials");
      } else {
        // Store the token in localStorage
        localStorage.setItem("authToken", authToken);

        // Set the default "Authorization" header for Axios
        axios.defaults.headers.common["Authorization"] = `${authToken}`;

        // Redirect to the homepage
        navigate("/todo");
        window.location.reload();
      }
    } catch (error) {
      // Handle other errors
      if (error.response && error.response.status === 400) {
        // If the error is a 400 Bad Request, set error message to show 
        setErrorMessage(error.response.data.error);
      } else {
        console.log("Error logging in:", error);
      }
    }
  };

  const Changed = (e) => {
    setUserCredentials({
      ...UserCredentials,
      [e.target.name]: e.target.value,
    });
  };
  const senddata = async (credential) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/google-login`,
        {
          data: credential,
        }
      );
      const { success, authToken } = response.data;

      if (!success) {
        alert("Enter valid Credentials");
      } else {
        // Store the token in localStorage
        localStorage.setItem("authToken", authToken);

        // Set the default "Authorization" header for Axios
        axios.defaults.headers.common["Authorization"] = `${authToken}`;
        // Redirect to the homepage
        navigate("/todo");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error logging in");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="title-login">
          <h1 className="title-login-text">TrackMe!</h1>
        </div>
        <div className="login">
          <form className="login-form" onSubmit={handleSubmit}>
            <h6>LogIn</h6>
            <label htmlFor="Username" className="User-name">
              <p>Username</p>
              <input
                name="Username"
                value={UserCredentials.Username}
                onChange={Changed}
              />
            </label>
            <label htmlFor="password" className="Pass-word">
              <p>Password</p>
              <input
                name="password"
                value={UserCredentials.password}
                id=""
                onChange={Changed}
              />
            </label>
            <p className="Error">{ErrorMessage}</p>
            <button type="submit" className="Log-In-Button">
              Log In
            </button>
            <Link to="/signup" className="m-3 btn btn-danger">
              Create New Account
            </Link>
            <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  // Extract the Google ID token from the credential response
                  const credential = jwt_decode(credentialResponse.credential);
                  senddata(credential);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
