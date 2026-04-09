import React, { useState, useRef } from "react";
import "./styles.css";

// Sample initial data
const initialData = {
  "todo": [
    { id: "task-1", label: "Task 1" },
    { id: "task-2", label: "Task 2" }
  ],
  "in progress": [
    { id: "task-3", label: "Task 3" }
  ],
  "done": [
    { id: "task-4", label: "Task 4" }
  ]
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData);
  const [draggedTask, setDraggedTask] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskLabel, setEditingTaskLabel] = useState("");
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const [newTaskLabel, setNewTaskLabel] = useState("");
  const enterPressedRef = useRef(false);


  const handleDragStart = (task) => {
    setDraggedTask(task);

  };

  const handleDrop = (columnId) => {
    if (!draggedTask) return;
    setColumns((prev) => {
      const newCols = { ...prev };
      for (const col in newCols) {
        newCols[col] = newCols[col].filter((t) => t.id !== draggedTask.id);
      }
      newCols[columnId].push(draggedTask);
      return newCols;
    });

    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleLabelClick = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskLabel(task.label);
  };

  const saveEditedTask = (taskId) => {
    setColumns((prev) => {
      const updated = { ...prev };
      for (const key in updated) {
        updated[key] = updated[key].map((t) => t.id === taskId ? { ...t, label: editingTaskLabel } : t);
      }
      return updated;
    })
    setEditingTaskId(null);
    setEditingTaskLabel("");

  };

  const handleEditKeyPress = (e, taskId) => {
    if (e.key === "Enter") {
      saveEditedTask(taskId);
    }
  };

  const deleteTask = (taskId) => {
    setColumns((prev) => {
      const updated = { ...prev };
      for (const key in updated) {
        updated[key] = updated[key].filter((t) => t.id !== taskId)
      }
      return updated;
    });

  };

  const addNewTaskInline = (columnId) => {
    if (enterPressedRef.current) {
      enterPressedRef.current = false;
      return;
    }
    if (newTaskLabel.trim() === "") {
      setIsAddingNewTask(false);
      setNewTaskLabel("");
      return;
    }
    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, label: newTaskLabel };

    setColumns((prev) => ({
      ...prev, [columnId]: [...prev[columnId], newTask],
    }));
    setIsAddingNewTask(false);
    setNewTaskLabel("");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Drag & Drop</h2>
      <div className="board">
        {["todo", "in progress", "done"].map((col) => (
          <div
            key={col}
            className="column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(col)}
          >
            <h4>
              {col === "todo"
                ? "To Do"
                : col === "in progress"
                  ? "In Progress"
                  : "Done"}
            </h4>
            {columns[col].map((task) => (
              <div
                key={task.id}
                className="task"
                draggable
                onDragStart={() => handleDragStart(task)}>
                {editingTaskId === task.id ? (
                  <input type="text"
                    value={editingTaskLabel}
                    onChange={(e) => setEditingTaskLabel(e.target.value)}
                    onBlur={() => saveEditedTask(task.id)}
                    onKeyDown={(e) => handleEditKeyPress(e, task.id)}
                    autoFocus
                    clasName="task-edit-input" />
                ) : (
                  <>
                    <span className="task-label"
                      onClick={() => handleLabelClick(task)}>{task.label}
                    </span>
                    <button className="icon-button delete-btn" onClick={() => deleteTask(task.id)}
                      title="Delete task">-</button>
                  </>
                )}
              </div>
            ))}

            {col === "todo" && (
              <div className="add-task-inline">
                {isAddingNewTask ?
                  <input classname="add-task-input-inline" placeholder="Enter new task.."
                    type="text"
                    value={newTaskLabel}
                    onChange={(e) => setNewTaskLabel(e.target.value)}
                    onBlur={() => addNewTaskInline(col)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        enterPressedRef.current = true;
                        addNewTaskInline(col);
                        e.target.blur();        
                      }
                    }}
                    autoFocus /> :
                  <button className="add-task-placeholder"
                    onClick={() => setIsAddingNewTask(true)}>+ Add a task</button>}
              </div>
            )}


          </div>
        ))}
      </div>
    </div >
  );
}
