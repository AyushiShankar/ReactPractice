import React, { useCallback, useEffect, useState } from 'react';
import "./styles.css";

function TodoWithTimeout() {
  const [todList, setTodoList] = useState([]);
  const [todoName, setTodoName] = useState("");



  const handleAddTodo = (data) => {
    if (!data) return;
    const id = Date.now();
    setTodoList((prev) => [...prev, {
      id: id, name: data, time: 0, isRunning: false,
    }]);

    setTodoName("");

  }

  const startTimer = (id) => {
    setTodoList((prev) => prev.map((todo) => todo.id === id ? { ...todo, isRunning: !todo.isRunning } : todo));

  }

  const resetTimer = (id) => {
    setTodoList((prev) => prev.map((todo) => todo.id === id ? { ...todo, isRunning: false, time: 0 } : todo));

  }

  const deleteTodoList = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.isRunning ? { ...todo, time: todo.time + 1 } : todo))
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="todo-container">
      <h2>Todo with Timer</h2>
      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          data-testid="todo-input"
          placeholder="Enter todo"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <button
          className="add-button"
          data-testid="add-button"
          onClick={() => handleAddTodo(todoName)}
        >
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todList.map((todo) => (
          <li data-testid="todo-item" className="todo-item" key={todo.id}>
            <span className="todo-text">{todo.name}</span>
            <div className="timer"
              data-testid="todo-timer">{formatTime(todo.time)}</div>
            <div className="todo-actions">
              <button className={`timer-button ${todo.isRunning ? "pause" : "start"}`} onClick={() => startTimer(todo.id)}
                data-testid="toggle-button">{todo.isRunning ? "Pause" : "Start"}</button>
              <button className="timer-button reset" onClick={() => resetTimer(todo.id)}
                data-testid="reset-button">Reset</button>
              <button className="delete-button" onClick={() => deleteTodoList(todo.id)}
                data-testid="delete-button">Delete</button>
            </div>
          </li>
        ))}

      </ul>
    </div>
  );
}

export default TodoWithTimeout;
