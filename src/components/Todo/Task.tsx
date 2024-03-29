import React from "react";
import "../../css/form.css";
import deletebutton from "../../../public/images/delete.png";

interface TaskProps {
  task: {
    name: string;
    description: string;
    taskno: number;
    taskicon: { value: string };
    priority: string;
    dueDate: string;
  };
  onDeleteTask: (taskno: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, onDeleteTask }) => {
  return (
    <div className="task">
      <div className="added-task-details">
        <img className="task-added-icon" src={task.taskicon.value} alt="" />
        <div className="task-details">
          <h5 className="added-task-name">{task.name}</h5>
          <h6 className="added-task-desc">{task.description}</h6>
        </div>
      </div>
      <div className="added-task-others">
        <span className="task-priority">{task.priority}</span>
        <span className="task-duedate">{task.dueDate}</span>
      </div>
      <div className="task-buttons">
        <button className="delete" onClick={() => onDeleteTask(task.taskno)}>
          <img src={deletebutton} alt="Delete" />
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Task;
