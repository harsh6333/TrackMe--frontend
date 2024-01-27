import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarM from "./Navbar";
import "../css/home.css";

const Profile: React.FC = () => {
  const authToken = localStorage.getItem("authToken");
  const [user, setUser] = useState<{ Username: string; email: string }>({
    Username: "",
    email: "",
  });

  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_SERVER_URL}/api/user-detail`, {
          headers: {
            Authorization: `${authToken}`,
            "Content-Type": "Application/json",
          },
        })
        .then((resp) => {
          setUser({ Username: resp.data.Username, email: resp.data.email });
        });
    } catch (error) {
      // console.log(error);
    }
  }, [authToken]);

  return (
    <>
      <NavbarM />
      <div className="user-container">
        <div className="user-details">
          <h5>Username: {user.Username}</h5>
          <h5>Email: {user.email}</h5>
        </div>
      </div>
    </>
  );
};

export default Profile;
