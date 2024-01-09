import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Weather from "./components/Weather";
import Notes from "./components/Notes";
import Signup from "./login/signup";
import Login from "./login/login";
import Navb from "./components/navb";
import Profile from "./components/Profile";
import Todo from "./components/Todo/Todo";
function App() {
  const authToken = localStorage.getItem("authToken");
  return (
    <>
      <BrowserRouter>
        {authToken ? (
          <Routes>
            <Route path="/todo" element={<Todo />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/nav" element={<Navb />} />
            <Route path="/" element={<Todo />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
