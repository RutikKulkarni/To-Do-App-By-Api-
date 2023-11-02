import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setTasks(json);
      });
  }, []);

  const handleTaskComplete = (taskId) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    setCompletedTasks([...completedTasks, taskToComplete]);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleTaskUncomplete = (taskId) => {
    const taskToUncomplete = completedTasks.find((task) => task.id === taskId);
    setTasks([
      { id: taskToUncomplete.id, title: taskToUncomplete.title },
      ...tasks
    ]);
    setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([{ id: tasks.length + 1, title: newTask }, ...tasks]);
      setNewTask("");
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">To-Do App</h1>
      <div className="add-task-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="add-task-button" onClick={handleAddTask}>
          + Add Task
        </button>
      </div>
      <div className="task-container">
        <div className="task-list">
          <h2>Tasks</h2>
          <table className="task-table">
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <label className="checkbox-container small">
                      <input
                        type="checkbox"
                        onChange={() => handleTaskComplete(task.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                  <td>{task.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="completed-task-list">
          <h2>Completed Tasks</h2>
          <table className="completed-task-table">
            <tbody>
              {completedTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <label className="checkbox-container small">
                      <input
                        type="checkbox"
                        checked={true} // Checkbox is checked when in Completed Tasks
                        onChange={() => handleTaskUncomplete(task.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                  <td className="completed-task">{task.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
