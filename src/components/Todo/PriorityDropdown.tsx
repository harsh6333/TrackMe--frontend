import React from "react";
import { Link } from "react-router-dom";
import '../../css/form.css'

interface PriorityDropdownProps {
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
}

const PriorityDropdown: React.FC<PriorityDropdownProps> = ({
  selectedPriority,
  onPriorityChange,
}) => {
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
            to={`#${priority}`} // Use a valid path or link to='#' for an anchor
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
