import { useState } from "react";
import type { TodoType } from "../types/todo";
import Todo from "./Todo";

interface TodoListProps {
  todoList: TodoType[];
  onDataChange: () => void;
}

export default function TodoList({ todoList, onDataChange }: TodoListProps) {
  const [editingId, setEditingId] = useState("");
  const [editText, setEditText] = useState("");
  const handleDelete = async (idToDelete: string) => {
    await fetch(`http://localhost:3001/todos/${idToDelete}`, {
      method: "DELETE",
    });
    onDataChange();
  };
  const handleEditStart = (todo: TodoType) => {
    setEditingId(todo.id);
    setEditText(todo.content);
  };

  const handleEditSave = async (idToSave: string) => {
    await fetch(`http://localhost:3001/todos/${idToSave}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editText }),
    });
    onDataChange();
    setEditingId("");
    setEditText("");
  };

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>
          {editingId === todo.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleEditSave(todo.id)}>save</button>
            </>
          ) : (
            <>
              <Todo content={todo.content} />
              <div className="button-group">
                <button onClick={() => handleEditStart(todo)}>edit</button>
                <button onClick={() => handleDelete(todo.id)}>delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
