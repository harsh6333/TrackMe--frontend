import React from "react";
import { Link } from "react-router-dom";
import HomeSlider from "./slider";
import "../assets/css/home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="navv">
        <h5>TrackMe!</h5>
        <div className="login-signup">
          <li>
            <Link className="nav-link login-btnn" to="/login">
              Log In
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </li>
        </div>
      </div>
      <div className="home-content">
        <div className="snapshots">
          <HomeSlider />
        </div>
        <div className="home-header">
          <div className="header-one">
            <span>Welcome to Your Personal Organized Hub with TrackMe!</span>
            <p>
              Stay on top of your tasks, notes, and even the weather, all in one
              place.
            </p>
            <p>
              Are you tired of juggling multiple apps and websites to manage
              your life's essentials? Look no further! We've created a
              comprehensive platform to simplify your daily routine and keep
              everything in one convenient place.
            </p>
          </div>
          <div className="header-two">
            <div className="tasks-manage ht">
              <h6>Task Management Made Easy</h6>
              <li>
                Create multiple to-do lists for various aspects of your life.
              </li>
              <li>Prioritize tasks and set due dates to keep you on track.</li>
              <li>Add, edit, and delete tasks with ease.</li>
              <li>
                Stay organized and never miss an important deadline again.
              </li>
            </div>
            <div className="notes-manage ht">
              <h6>Effortless Note-Taking</h6>
              <li>
                Jot down your thoughts, ideas, and reminders in the Notes
                section.
              </li>
              <li>Access, edit, or remove notes whenever you want.</li>
              <li>
                Your digital notebook is always within reach, whether you're at
                home or on the go.
              </li>
            </div>
            <div className="weather-managee">
              <div className="weather-manage ht">
                <h6>Stay Informed with the Weather</h6>
                <li>
                  Stay updated with the latest weather conditions for your
                  location.
                </li>
                <li>Plan your day accordingly with our weather feature.</li>
                <li>
                  Never leave home unprepared, whether it's rain or shine.
                </li>
                <li>
                  Receive weather alerts and warnings to keep you safe and
                  informed.
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
