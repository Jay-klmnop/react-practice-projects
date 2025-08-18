import { useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import { useTodoFilter } from "../../hooks/useTodoFilter";
import type { TodoType } from "../types/todo";
import Clock from "../clock/Clock";
import Quote from "../quote/Quote";
import FilterControls from "./FilterControls";
import TodoList from "./TodoList";
import EditModal from "./EditModal";
import AddTodo from "./AddTodo";

export default function TodoListApp() {
  const { todoList, dispatch, loading, error } = useTodos();
  const { filter, setFilter, searchTerm, setSearchTerm, filteredTodoList } =
    useTodoFilter(todoList);
  const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);

  const handleOpenEditModal = (todo: TodoType) => {
    setEditingTodo(todo);
  };

  const handleSaveEdit = async (id: string, newContent: string) => {
    const updatedTodo = { ...editingTodo!, content: newContent };
    dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
    setEditingTodo(null);
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent }),
      });
    } catch (error) {
      console.error("Failed to save edit:", error);
      dispatch({ type: "UPDATE_TODO", payload: editingTodo! });
    }
  };

  if (loading && todoList.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Clock />
      <Quote />
      <FilterControls
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <TodoList
        todoList={filteredTodoList}
        dispatch={dispatch}
        onOpenEditModal={handleOpenEditModal}
      />
      {editingTodo && (
        <EditModal
          todo={editingTodo}
          onSave={handleSaveEdit}
          onClose={() => setEditingTodo(null)}
        />
      )}
      <AddTodo dispatch={dispatch} />
    </>
  );
}
