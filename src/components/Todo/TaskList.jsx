import React from "react";
import "../../assets/css/form.css";
import Task from "./Task";
const TaskList = ({ tasks, onDeleteTask }) => {
  return (
    <div className="tasks">
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDeleteTask={() => onDeleteTask(index)} 
        />
      ))}
    </div>
  );
};


export default TaskList;
