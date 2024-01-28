import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import Select from "react-select";
import TaskList from "./TaskList";
import axios from "axios";
import NavbarM from "../Navbar";
import { icons, options } from "./icons";
import hamburger from "../../../public/images/hamb.png";
import '../../css/form.css'
import deletebutton from "../../../public/images/delete.png";

interface Task {
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  taskicon: string;
}

interface List {
  listname: string;
  icon: string;
  id: number;
}

interface UserList {
  _id: string;
  listname: string;
  tasks: Task[];
  icon: string;
}

interface TodoProps {}

const Todo: React.FC<TodoProps> = () => {
  const [icon, setIcon] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [taskname, setTaskName] = useState<string>("");
  const [taskdesc, setTaskDesc] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [selectedPriority, setSelectedPriority] =
    useState<string>("Select Priority");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const [listName, setListName] = useState<string>("");
  const [lists, setLists] = useState<List[]>([]);
  const [nextListId, setNextListId] = useState<number>(1);
  const [tasklistbyId, setTaskListbyId] = useState<{ [key: string]: any }>({});
  const [selectedlist, setSelectedList] = useState<number | null>(null);
  const [ListNamebbyId, setListNamebyId] = useState<{
    name: string;
    icon: string;
  }>({ name: "", icon: "" });
  const [taskicon, settaskIcon] = useState<string>("");
  const [userLists, setUserLists] = useState<UserList[]>([]);
  const authToken = localStorage.getItem("authToken");
  const [selectedUserList, setSelectedUserList] = useState<string>("");
  const [isTaskListUpdated, setIsTaskListUpdated] = useState<boolean>(false);
  const [listbutton, setListButton] = useState<boolean>(false);
  const [isClicked1, setIsClicked1] = useState<boolean>(false);
  const [selecteduserlistdata, setSelectedUserListData] = useState<{
    listName: string;
    tasks: Task[];
    icon: string;
  }>({
    listName: "",
    tasks: [],
    icon: "",
  });

  const name = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const description = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDesc(e.target.value);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (isTaskListUpdated) {
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
          console.log("List added successfully");
        })
        .catch(() => {
          // console.error("Error adding task:", error);
        });

      setIsTaskListUpdated(false);
    }
  }, [isTaskListUpdated, tasklistbyId, authToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const task: Task = {
      name: taskname,
      description: taskdesc,
      dueDate: formatDate(dueDate),
      priority: selectedPriority,
      taskicon: taskicon,
    };

    if (ListNamebbyId.name in tasklistbyId) {
      setTaskListbyId((prevTaskList) => ({
        ...prevTaskList,
        [ListNamebbyId.name]: {
          ...prevTaskList[ListNamebbyId.name],
          tasks: [...prevTaskList[ListNamebbyId.name].tasks, task],
        },
      }));
    } else if (tasklistbyId[selectedUserList]) {
      setTaskListbyId((prevTaskList) => ({
        ...prevTaskList,
        [selectedUserList]: {
          ...prevTaskList[selectedUserList],
          tasks: [...prevTaskList[selectedUserList].tasks, task],
        },
      }));
    } else {
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

  const handleOptionChange = (selected: any) => {
    if (selected && selected.value) {
      setSelectedOption(selected);
    }
  };

  const handleOptionChange2 = (selected: any) => {
    if (selected && selected.value) {
      settaskIcon(selected);
    }
  };

  const handlePriorityClick = (priority: string) => {
    setSelectedPriority(priority);
  };

  const handleChangeListName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
    setIcon(selectedOption.value);
  };

  const handleLists = (e:React.FormEvent) => {
    e.preventDefault();
    const listId = nextListId;
    const newList: List = { listname: listName, icon: icon, id: listId };

    setLists((prevlists) => [...prevlists, newList]);

    setTaskListbyId((prevTaskList) => ({
      ...prevTaskList,
      [listName]: {
        tasks: [],
        icon: icon,
      },
    }));

    setIsTaskListUpdated(true);
    setListName("");
    setNextListId(listId + 1);
  };

  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      display: "inline-block",
      width: "50%",
      padding: "5px",
    }),
  };

  const customStyles2 = {
    option: (provided: any) => ({
      ...provided,
      display: "inline-block",
      width: "20%",
      padding: "5px",
    }),
  };
  const customComponents = {
    menuList: (provided: any) => ({
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
        userlistss.map((userlist: any) => {
          setTaskListbyId((prevTaskList) => ({
            ...prevTaskList,
            [userlist.listname]: {
              tasks: userlist.tasks,
              icon: userlist.icon,
            },
          }));
        });
      })
      .catch(() => {
        // console.error("Error fetching user's lists:", error);
      });
  }, [authToken]);

  const deleteTask = async (index: number) => {
    if (selectedUserList) {
      const updatedTasks =
        (tasklistbyId[selectedUserList] &&
          tasklistbyId[selectedUserList].tasks) ||
        [];

      if (index < 0 || index >= updatedTasks.length) {
        return;
      }

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
        );
      } catch (error) {
        return;
      }

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

  const onDeleteTask = async (index: number) => {
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
        setTaskListbyId((prevTaskList) => ({
          ...prevTaskList,
          [ListNamebbyId.name]: {
            ...prevTaskList[ListNamebbyId.name],
            tasks: updatedList,
          },
        }));
      }
    }

    if (index >= 0 && index < tasks.length) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    }
  };

  const handleDeleteList = async (listName: string) => {
    if (listName === selectedUserList) {
      setSelectedUserList("");
    }

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

  const handleDeleteSelectedList = async () => {
    if (ListNamebbyId.name) {
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
    setListButton(false);
  };

  const listbuttons2 = () => {
    setListButton((prevlistbutton) => !prevlistbutton);
    setIsClicked(false);
  };
  return (
    <>
      <div className="nav-home">
        <NavbarM />
      </div>
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
          <form onSubmit={handleLists}>
            <div className="list-title">
              <Select
                className="Select"
                value={selectedOption}
                onChange={handleOptionChange}
                options={options}
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
                <button type="submit" className="list-add-btn">
                  +
                </button>
              </div>
            </div>
          </form>
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
                    onClick={() => handleDeleteSelectedList()} //list.listname
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
                selectedOption={undefined}
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
                selectedOption={undefined}
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
