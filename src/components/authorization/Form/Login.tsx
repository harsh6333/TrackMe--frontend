import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../css/login.css";
import axios from "axios";
import GoogleLoginComponent from "../Google/GoogleLogin";

interface UserCredentials {
  Username: string;
  password: string;
}

const Login: React.FC = () => {
  const [ErrorMessage, setErrorMessage] = useState<string>("");
  const [UserCredentials, setUserCredentials] = useState<UserCredentials>({
    Username: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    // Set the default "Authorization" header for Axios
    axios.defaults.headers.common["Authorization"] = `${authToken}`;
  }, []);

  const handleSubmit = async (e: FormEvent) => {
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
    } catch (error:any) {
    
     if (error.response.data.error.name=="ZodError"){
      setErrorMessage("Password should contain atleast 5 characters")
     }
       if (axios.isAxiosError(error) && error.response?.status === 400) {
         // If the error is a 400 Bad Request, set error message to show
         setErrorMessage(error.response.data.error);
       } else {
        //  console.log("Error logging in:", error.response.data.error.name);
       }
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...UserCredentials,
      [e.target.name]: e.target.value,
    });
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
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password" className="Pass-word">
              <p>Password</p>
              <input
                name="password"
                value={UserCredentials.password}
                id=""
                onChange={handleChange}
              />
            </label>
            <p className="Error">{ErrorMessage}</p>
            <button type="submit" className="Log-In-Button">
              Log In
            </button>
            <Link to="/signup" className="m-3 btn btn-danger">
              Create New Account
            </Link>
          {/* google login */}
            <GoogleLoginComponent />
            <p className="google">
              SignIn might <br /> take Time due to slow <br />
              Database
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
