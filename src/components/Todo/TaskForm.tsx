import React from "react";
import "../../css/form.css";
import Select from "react-select";
import PriorityDropdown from "./PriorityDropdown";

interface TaskFormProps {
  taskname: string;
  taskdesc: string;
  taskicon: string;
  dueDate: string;
  isFormVisible: boolean;
  isClicked: boolean;
  selectedPriority: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDueDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriorityChange: (priority: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancelClick: () => void;
  selectedOption: any; 
  handleOptionChange: (selected: any) => void; 
  customComponents: any; 
  options: any[]; 
  customStyles: any; 
}
const TaskForm: React.FC<TaskFormProps> = ({
  taskname,
  taskdesc,
  dueDate,
  isFormVisible,
  isClicked,
  selectedPriority,
  onNameChange,
  onDescriptionChange,
  onDueDateChange,
  onPriorityChange,
  onSubmit,
  onCancelClick,
  selectedOption,
  handleOptionChange,
  customComponents,
  options,
  customStyles,
}) => {
  return (
    <form
      action=""
      method="POST"
      onSubmit={onSubmit}
      className={isClicked && isFormVisible ? "display" : "hidden"}
    >
      <div className="task-form">
        <Select
          className="Select-task"
          value={selectedOption}
          onChange={handleOptionChange}
          options={options}
          components={customComponents}
          styles={customStyles}
          menuPlacement="auto"
        />
        <div className="tasks-inputs">
          <input
            type="text"
            name="newitem"
            className="input-task"
            placeholder="New Task"
            id=""
            required
            value={taskname}
            onChange={onNameChange}
          />
          <input
            type="text"
            name="description"
            className="input-date"
            placeholder="Description"
            id=""
            value={taskdesc}
            onChange={onDescriptionChange}
          />
        </div>
        <div className="tasks-others">
          <div className="due-dates">
            <input
              type="date"
              name="dueDate"
              placeholder="Due Date"
              id="dueDate"
              value={dueDate}
              required
              onChange={onDueDateChange}
            />
          </div>

          <div className="priorities">
            <PriorityDropdown
              selectedPriority={selectedPriority}
              onPriorityChange={onPriorityChange}
            />
          </div>
        </div>
        <div className="tasks-buttons">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancelClick}
          >
            Cancel
          </button>
          <button type="submit" className="add-button2">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
