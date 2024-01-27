import React from "react";
import "../../css/form.css";
import Task from "./Task";

interface TaskListProps {
  tasks: any[]; // Adjust the type based on the actual type of tasks
  onDeleteTask: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
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
