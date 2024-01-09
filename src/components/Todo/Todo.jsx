import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import Select from "react-select";
import TaskList from "./TaskList";
import axios from "axios";
import NavbarM from "../Navbar";
import { icons, options } from "./icons";
import hamburger from "../../../public/images/hamb.png";
import "../../assets/css/form.css";
import deletebutton from "../../../public/images/delete.png";
const Todo = () => {
  const [icon, setIcon] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [taskname, setTaskName] = useState("");
  const [taskdesc, setTaskDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("Select Priority");
  const [tasks, setTasks] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [listName, setListName] = useState("");
  const [lists, setLists] = useState([]);
  const [nextListId, setNextListId] = useState(1);
  const [tasklistbyId, setTaskListbyId] = useState({});
  const [selectedlist, setSelectedList] = useState(null);
  const [ListNamebbyId, setListNamebyId] = useState({ name: "", icon: "" });
  const [taskicon, settaskIcon] = useState("");
  const [userLists, setUserLists] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const [selectedUserList, setSelectedUserList] = useState("");
  const [isTaskListUpdated, setIsTaskListUpdated] = useState(false);
  const [listbutton, setListButton] = useState(false);
  const [isClicked1, setIsClicked1] = useState(false);
  const [selecteduserlistdata, setSelectedUserListData] = useState({
    listName: "",
    tasks: {},
    icon: "",
  });
  const name = (e) => {
    setTaskName(e.target.value);
  };

  const description = (e) => {
    setTaskDesc(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    if (isTaskListUpdated) {
      // Make the Axios POST request when tasklistbyId is updated
      const headers = {
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${import.meta.env.VITE_SERVER_URL}/api/add-to-list`,
          { tasklistbyId },
          { headers }
        )
        .then(() => {
          console.log("Task added successfully");
        })
        .catch((error) => {
          // console.error("Error adding task:", error);
        });

      // Reset the flag to false
      setIsTaskListUpdated(false);
    }
  }, [isTaskListUpdated, tasklistbyId, authToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = {
      name: taskname,
      description: taskdesc,
      dueDate: formatDate(dueDate),
      priority: selectedPriority,
      taskicon: taskicon,
    };

    if (ListNamebbyId.name in tasklistbyId) {
      // If the list exists in tasklistbyId, add the task to it.
      setTaskListbyId((prevTaskList) => ({
        ...prevTaskList,
        [ListNamebbyId.name]: {
          ...prevTaskList[ListNamebbyId.name], // Preserve the existing properties
          tasks: [...prevTaskList[ListNamebbyId.name].tasks, task],
        },
      }));
    } else if (tasklistbyId[selectedUserList]) {
      setTaskListbyId((prevTaskList) => ({
        ...prevTaskList,
        [selectedUserList]: {
          ...prevTaskList[selectedUserList], // Preserve the existing properties
          tasks: [...prevTaskList[selectedUserList].tasks, task],
        },
      }));
    } else {
      // Create a new list and add the task to it.
      setTaskListbyId((prevTaskList) => ({
        ...prevTaskList,
        [ListNamebbyId.name]: {
          tasks: [task],
          icon: ListNamebbyId.icon,
        },
      }));
    }
    setIsTaskListUpdated(true);
    setTaskName("");
    setTaskDesc("");
    setDueDate("");
    setSelectedPriority("Select Priority");
  };

  const handleclick = () => {
    setIsClicked1(true);
    setIsFormVisible(true);
  };
  const handleCancelClick = () => {
    setIsFormVisible(false);
    setIsClicked1(false);
  };

  const handleOptionChange = (selected) => {
    if (selected && selected.value) {
      setSelectedOption(selected);
    }
  };
  const handleOptionChange2 = (selected) => {
    if (selected && selected.value) {
      settaskIcon(selected);
    }
  };

  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority);
  };

  const handleChangeListName = (e) => {
    setListName(e.target.value);
    setIcon(selectedOption.value);
  };
  const handleLists = () => {
    const listId = nextListId;
    const newList = { listname: listName, icon: icon, id: listId };

    // Update the local state to add the new list
    setLists((prevlists) => [...prevlists, newList]);

    // Add the new list to tasklistbyId
    setTaskListbyId((prevTaskList) => ({
      ...prevTaskList,
      [listName]: {
        tasks: [], // Initialize with an empty tasks array
        icon: icon,
      },
    }));

    setIsTaskListUpdated(true);
    setListName("");
    setNextListId(listId + 1);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: "inline-block",
      width: "50%",
      padding: "5px",
    }),
  };
  const customStyles2 = {
    option: (provided, state) => ({
      ...provided,
      display: "inline-block",
      width: "20%",
      padding: "5px",
    }),
  };
  const customComponents = {
    menuList: (provided) => ({
      ...provided,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridGap: "10px",
    }),
  };

  useEffect(() => {
    const headers = {
      Authorization: `${authToken}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/get-user-list`, { headers })
      .then((response) => {
        setUserLists(response.data.userlists);
        const userlistss = response.data.userlists;
        userlistss.map((userlist) => {
          setTaskListbyId((prevTaskList) => ({
            ...prevTaskList,
            [userlist.listname]: {
              tasks: userlist.tasks,
              icon: userlist.icon,
            },
          }));
        }); // Set the user lists in state if needed
      })
      .catch((error) => {
        // console.error("Error fetching user's lists:", error);
      });
  }, [authToken]);
  const deleteTask = async (index) => {
    if (selectedUserList) {
      const updatedTasks =
        (tasklistbyId[selectedUserList] &&
          tasklistbyId[selectedUserList].tasks) ||
        [];

      if (index < 0 || index >= updatedTasks.length) {
        // console.error("Invalid index:", index);
        return;
      }

      // Send an API request to delete the task from the database
      try {
        await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/api/tasks/${index}`,
          {
            headers: {
              Authorization: `${authToken}`,
              "Content-Type": "application/json",
            },
            data: { index: index, listname: selectedUserList },
          }
        ); // Replace with your API endpoint
      } catch (error) {
        // console.error("Error deleting task from the database:", error);
        return; // Exit early if there's an error
      }

      // Update the state with the modified list of tasks
      updatedTasks.splice(index, 1);
      setTaskListbyId((prevTaskList) => ({
        ...prevTaskList,
        [selectedUserList]: {
          ...prevTaskList[selectedUserList],
          tasks: updatedTasks,
        },
      }));
    }
  };

  const onDeleteTask = async (index) => {
    if (ListNamebbyId.name in tasklistbyId) {
      const updatedList = [...tasklistbyId[ListNamebbyId.name].tasks];
      if (index >= 0 && index < updatedList.length) {
        updatedList.splice(index, 1);
        try {
          await axios.delete(
            `${import.meta.env.VITE_SERVER_URL}/api/tasks/${index}`,
            {
              headers: {
                Authorization: `${authToken}`,
                "Content-Type": "application/json",
              },
              data: { index: index, listname: ListNamebbyId.name },
            }
          );
        } catch (error) {
          // console.error("Error deleting task from the database:", error);
        }
        // Update the tasklistbyId object with the modified list of tasks
        setTaskListbyId((prevTaskList) => ({
          ...prevTaskList,
          [ListNamebbyId.name]: {
            ...prevTaskList[ListNamebbyId.name],
            tasks: updatedList,
          },
        }));
      }
    }

    // Remove the task from the tasks state (assuming tasks is an array)
    if (index >= 0 && index < tasks.length) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    }
    // Send an API request to delete the task from the backend
  };

  const handleDeleteList = async (listName) => {
    if (listName === selectedUserList) {
      setSelectedUserList(""); // Clear the selectedUserList if it's the list being deleted
    }

    // Send an API request to delete the list from the database
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/delete-list/${listName}`,
        {
          headers: {
            Authorization: `${authToken}`,
            "Content-Type": "application/json",
          },
          data: { listname: listName },
        }
      );

      // Update the local state to remove the deleted list
      const updatedLists = lists.filter((list) => list.listname !== listName);
      setLists(updatedLists);

      const updatedUserLists = userLists.filter(
        (list) => list.listname !== listName
      );
      setUserLists(updatedUserLists);
    } catch (error) {
      // console.error("Error deleting list from the database:", error);
    }
  };

  const handleDeleteSelectedList = async (listName) => {
    if (ListNamebbyId.name) {
      // Send an API request to delete the list from the database
      try {
        await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/api/delete-list/${
            ListNamebbyId.name
          }`,
          {
            headers: {
              Authorization: `${authToken}`,
              "Content-Type": "application/json",
            },
            data: { listname: ListNamebbyId.name },
          }
        );

        // Update the local state to remove the deleted list
        const updatedLists = lists.filter(
          (list) => list.listname !== ListNamebbyId.name
        );
        setLists(updatedLists);

        setListNamebyId({ name: "", icon: "" });
      } catch (error) {
        // console.error("Error deleting list from the database:", error);
      }
    }
  };
  const listbuttons = () => {
    setIsClicked(true);
    setListButton((prevlistbutton) => !prevlistbutton);
  };
  const listselected = () => {
    // setListButton((prevlistbutton) => !prevlistbutton);
    setListButton(false);
  };
  const listbuttons2 = () => {
    setListButton((prevlistbutton) => !prevlistbutton);
    setIsClicked(false);
  };
  return (
    <>
      <NavbarM className="nav-home" />
      <div className="Todo-container">
        <button
          onClick={listbuttons}
          className={isClicked && listbutton ? "hide" : "visible"}
        >
          <img src={hamburger} alt="" />
        </button>

        <div className={isClicked && listbutton ? "lists" : "hide"}>
          <button
            onClick={listbuttons2}
            className={isClicked && listbutton ? "visible2" : "hide"}
          >
            X
          </button>
          <div className="list-title">
            <Select
              className="Select"
              value={selectedOption}
              onChange={handleOptionChange}
              options={options}
              components={customComponents}
              styles={customStyles}
              menuPlacement="auto"
            />
            <div className="list-inputss">
              <input
                type="text"
                required
                value={listName}
                onChange={handleChangeListName}
                placeholder="New List"
                className="list-name-input"
              />
              <button onClick={handleLists} className="list-add-btn">
                +
              </button>
            </div>
          </div>
          <div className="list-names">
            {lists.map((list) => {
              const showlistId = () => {
                setSelectedList(list.id);
                setListNamebyId({ name: list.listname, icon: list.icon });
                setListButton(false);
              };
              return (
                <div key={list.id} className="list-name-container">
                  <button className="list-name" onClick={() => showlistId()}>
                    {list.icon ? (
                      <img
                        src={list.icon}
                        alt="Selected Image"
                        className="selected-image"
                        onClick={listselected}
                      />
                    ) : (
                      <li></li>
                    )}
                    <h5 id="list-name" onClick={listselected}>
                      {list.listname}
                    </h5>
                  </button>
                  <button
                    onClick={() => handleDeleteSelectedList(list.listname)}
                    className="delete-list-button"
                  >
                    <img src={deletebutton} alt="Delete" />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="list-names">
            {userLists.map((list) => {
              const setselectedlist = () => {
                setSelectedUserList(list.listname);
                setSelectedUserListData({
                  listName: list.listname,
                  tasks: list.tasks,
                  icon: list.icon,
                });
                setListButton(false);
              };
              return (
                <div key={list._id} className="list-name-container">
                  <button
                    className="list-name"
                    onClick={() => {
                      setselectedlist();
                    }}
                  >
                    {list.icon ? (
                      <img
                        src={list.icon}
                        alt="Selected Image"
                        className="selected-image"
                        onClick={listselected}
                      />
                    ) : (
                      <li></li>
                    )}
                    <h5 id="list-name" onClick={listselected}>
                      {list.listname}
                    </h5>
                  </button>
                  <button
                    onClick={() => handleDeleteList(list.listname)}
                    className="delete-list-button"
                  >
                    <img src={deletebutton} alt="Delete" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={isClicked && listbutton ? "hideit" : "body-container"}
          key={selectedlist}
        >
          {selectedlist ? (
            <>
              <div className="current-list-heading">
                <img
                  className="current-list-icon"
                  src={ListNamebbyId.icon}
                  alt=""
                />
                <h5 className="current-list-name">{ListNamebbyId.name}</h5>
              </div>
              <h6
                className={isClicked1 ? "hidden" : "add-button"}
                onClick={handleclick}
              >
                Add Task
              </h6>
              <TaskForm
                handleOptionChange={handleOptionChange2}
                options={icons}
                customComponents={customComponents}
                customStyles={customStyles2}
                taskname={taskname}
                taskdesc={taskdesc}
                taskicon={taskicon}
                dueDate={dueDate}
                isFormVisible={isFormVisible}
                isClicked={isClicked1}
                selectedPriority={selectedPriority}
                onNameChange={name}
                onDescriptionChange={description}
                onDueDateChange={handleDueDateChange}
                onPriorityChange={handlePriorityClick}
                onSubmit={handleSubmit}
                onCancelClick={handleCancelClick}
              />
              <TaskList
                key={selectedlist}
                tasks={
                  (tasklistbyId[ListNamebbyId.name] &&
                    tasklistbyId[ListNamebbyId.name].tasks) ||
                  []
                }
                onDeleteTask={onDeleteTask}
              />
            </>
          ) : selectedUserList ? (
            <>
              <div className="current-list-heading">
                <img
                  className="current-list-icon"
                  src={selecteduserlistdata.icon}
                  alt=""
                />
                <h5 className="current-list-name">
                  {selecteduserlistdata.listName}
                </h5>
              </div>
              <h6
                className={isClicked1 ? "hidden" : "add-button"}
                onClick={handleclick}
              >
                Add Task
              </h6>
              <TaskForm
                handleOptionChange={handleOptionChange2}
                options={icons}
                customComponents={customComponents}
                customStyles={customStyles2}
                taskname={taskname}
                taskdesc={taskdesc}
                taskicon={taskicon}
                dueDate={dueDate}
                isFormVisible={isFormVisible}
                isClicked={isClicked1}
                selectedPriority={selectedPriority}
                onNameChange={name}
                onDescriptionChange={description}
                onDueDateChange={handleDueDateChange}
                onPriorityChange={handlePriorityClick}
                onSubmit={handleSubmit}
                onCancelClick={handleCancelClick}
              />

              <TaskList
                key={selectedUserList}
                tasks={
                  (tasklistbyId[selectedUserList] &&
                    tasklistbyId[selectedUserList].tasks) ||
                  []
                }
                onDeleteTask={deleteTask}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default Todo;
