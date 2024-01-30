import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Weather from "./components/Weather/Weather";
import Notes from "./components/Notes/Notes";
import Signup from "./components/authorization/Form/signup";
import Login from "./components/authorization/Form/Login";
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
        ) : null}
        {/* Redirecting unauthorized users to the login page for any unmatched routes */}
        <Route path="/todo" element={<Navigate replace to="/login" />} />
        {/* Catch-all route for handling any unmatched routes */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
