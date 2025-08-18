import { useFetch } from "../../hooks/useFetch";
import type { TodoType } from "../types/todo";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Clock from "../clock/Clock";
import Quote from "../quote/Quote";

export default function TodoListApp() {
  const {
    data: todoList,
    loading,
    error,
    refetch,
  } = useFetch<TodoType[]>("http://localhost:3001/todos");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleDataChange = () => {
    refetch();
  };

  return (
    <>
      <Clock />
      <Quote />
      <TodoList todoList={todoList || []} onDataChange={handleDataChange} />
      <AddTodo onDataChange={handleDataChange} />
    </>
  );
}
