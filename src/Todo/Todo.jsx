import { useEffect, useState } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";
import "./Todo.css";

export const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState([]);
  const [dateTime, setDateTime] = useState("");

  // input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // add task
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const trimmedValue = inputValue.trim();

    if (trimmedValue !== "") {
      const isDuplicate = task.some((t) => t.text === trimmedValue);

      if (!isDuplicate) {
        setTask((prev) => [...prev, { text: trimmedValue, completed: false }]);
      }
    }

    setInputValue("");
  };

  // delete task
  const handleTodoDelete = (text) => {
    setTask(task.filter((t) => t.text !== text));
  };

  // toggle complete (LINE ON TEXT)
  const handleToggleComplete = (text) => {
    setTask(
      task.map((t) => (t.text === text ? { ...t, completed: !t.completed } : t))
    );
  };

  // clear all
  const handleClearAll = () => {
    setTask([]);
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
              <span className={curTask.completed ? "completed" : ""}>
                {curTask.text}
              </span>

              <button
                className="check-btn"
                onClick={() => handleToggleComplete(curTask.text)}
              >
                <MdCheck />
              </button>

              <button
                className="delete-btn"
                onClick={() => handleTodoDelete(curTask.text)}
              >
                <MdDeleteForever />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {task.length > 0 && (
        <section className="clear-all">
          <button className="clear-btn" onClick={handleClearAll}>
            Clear All
          </button>
        </section>
      )}
    </section>
  );
};
