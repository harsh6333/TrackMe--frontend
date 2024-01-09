import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/form.css";
const PriorityDropdown = ({ selectedPriority, onPriorityChange }) => {
  const priorityOptions = ["Top Priority", "Important", "Less Important"];

  return (
    <div className="dropdown">
      <button className="dropbtn" type="button">
        {selectedPriority}
      </button>
      <div className="dropdown-content">
        {priorityOptions.map((priority, index) => (
          <Link
            key={index}
            value={`Priority${index}`}
            onClick={() => onPriorityChange(priority)}
          >
            {priority}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PriorityDropdown;
