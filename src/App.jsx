import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Weather from "./components/Weather";
import Notes from "./components/Notes";
import Signup from "./login/signup";
import Login from "./login/login";
import NavbarM from "./components/Navbar";
import Profile from "./components/Profile";
import Todo from "./components/Todo/Todo";
import NotFound from "./components/NotFound";

function App() {
  const authToken = localStorage.getItem("authToken");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes accessible to all users */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes accessible only to authenticated users */}
        {authToken ? (
          <>
            <Route path="/todo" element={<Todo />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/nav" element={<NavbarM />} />
          </>
        ) : (
          // Redirect unauthorized users to the login page
          <Route path="/*" element={<Navigate replace to="/signup" />} />
        )}
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
