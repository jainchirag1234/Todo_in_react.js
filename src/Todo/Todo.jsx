import { useEffect, useState } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";
import "./Todo.css";

export const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState([]);
  const [dateTime, setDateTime] = useState("");

  // input change (CONTROLLED INPUT)
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // add task → INPUT CLEARS HERE
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // 🔑 ADD TASK
    if (inputValue.trim() !== "") {
      if (!task.includes(inputValue.trim())) {
        setTask((prev) => [...prev, inputValue.trim()]);
      }
    }

    // 🔥 THIS LINE MAKES INPUT BLANK
    setInputValue("");
  };

  // delete task
  const handleTodoDelete = (value) => {
    setTask(task.filter((t) => t !== value));
  };

  // date & time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(`${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="todo-container">
      <header>
        <h1>Todo List</h1>
        <h2 className="date-time">{dateTime}</h2>
      </header>

      <section className="form">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="todo-input"
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Enter task"
          />

          <button type="submit" className="todo-btn">
            Add Task
          </button>
        </form>
      </section>

      <section className="myUnOrdList">
        <ul>
          {task.map((curTask, index) => (
            <li key={index} className="todo-item">
              <span>{curTask}</span>

              <button className="check-btn">
                <MdCheck />
              </button>

              <button
                className="delete-btn"
                onClick={() => handleTodoDelete(curTask)}
              >
                <MdDeleteForever />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};
