import type { TodoType } from "../types/todo";
import type { Action } from "../../reducers/todoReducer";
import Todo from "./Todo";

interface TodoListProps {
  todoList: TodoType[];
  dispatch: React.Dispatch<Action>;
  onOpenEditModal: (todo: TodoType) => void;
}

export default function TodoList({
  todoList,
  dispatch,
  onOpenEditModal,
}: TodoListProps) {
  const handleDelete = async (idToDelete: string) => {
    dispatch({ type: "DELETE_TODO", payload: idToDelete });
    try {
      const response = await fetch(
        `http://localhost:3001/todos/${idToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Delete failed");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleCheck = async (todoToToggle: TodoType) => {
    dispatch({ type: "TOGGLE_TODO", payload: todoToToggle.id });
    try {
      await fetch(`http://localhost:3001/todos/${todoToToggle.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDone: !todoToToggle.isDone }),
      });
    } catch (error) {
      console.error("Error toggling todo:", error);
      dispatch({ type: "TOGGLE_TODO", payload: todoToToggle.id });
    }
  };

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>
          <>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => handleToggleCheck(todo)}
              />
              <span className="checkmark"></span>
            </label>
            <Todo content={todo.content} isDone={todo.isDone} />
            <div className="button-group">
              <button onClick={() => onOpenEditModal(todo)}>edit</button>
              <button onClick={() => handleDelete(todo.id)}>delete</button>
            </div>
          </>
        </li>
      ))}
    </ul>
  );
}
