import React, { useState, ChangeEvent, FormEvent } from "react";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/signup.css";

interface UserCredentials {
  Username: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [ErrorMessages, setErrorMessages] = useState<string[]>([]);
  const [UserCredentials, setUserCredentials] = useState<UserCredentials>({
    Username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/createuser`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            Username: UserCredentials.Username,
            email: UserCredentials.email,
            password: UserCredentials.password,
          }),
        }
      );

      const json = await response.json();

      if (!json.success) {
        // Check if the response includes validation errors
        if (json.errors) {
          // Handle validation errors, set them in the state variable
          setErrorMessages(json.errors.map((error: any) => error.msg));
        } else {
          // Handle other types of errors
          setErrorMessages([json.error]);
        }
      }

      if (json.success) {
        localStorage.setItem("SignedIn", "true");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      // Handle other types of errors, for example, set an error message in state
      setErrorMessages(["An error occurred while submitting the form."]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...UserCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const senddata = async (credential: any) => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/google-signup`,
        { data: credential },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { success, authToken } = resp.data;
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
      // Handle errors
      console.log(error);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="title-Signup">
          <h1 className="title-signup-text">TrackMe!</h1>
        </div>
        <div className="signup">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h6>SignUp</h6>
            <label htmlFor="Username">
              <p>Username</p>
              <input
                name="Username"
                value={UserCredentials.Username}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email">
              <p>Email Id</p>
              <input
                type="text"
                name="email"
                value={UserCredentials.email}
                id=""
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              <p>Password</p>
              <input
                name="password"
                value={UserCredentials.password}
                id=""
                onChange={handleChange}
              />
            </label>
            <p className="error">
              {ErrorMessages.map((errorMessage, index) => (
                <span key={index}>{errorMessage}</span>
              ))}
            </p>
            <div className="buttons-signup">
              <button type="submit" className="btn--signin">
                Sign In
              </button>
              <div className="already-user">
                <p>Already a User?</p>
                <Link to="/login" className="already-user-btn">
                  Log In
                </Link>
              </div>
            </div>
            <div className="or-login-text">
              <span></span>
              <p>Or SignUp With</p>
              <span></span>
            </div>
            <GoogleOAuthProvider
              clientId={`${import.meta.env.VITE_CLIENT_ID}`}
              //   className="google-signup-btn"
            >
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  // Extract the Google ID token from the credential response
                  const credential = jwtDecode(
                    credentialResponse.credential as any
                  ) as any;
                  // Send the ID token to the backend
                  senddata(credential);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
            <p className="google">
              SignIn might <br /> take Time due to slow <br /> Database
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
