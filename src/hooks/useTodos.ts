import { useReducer, useEffect } from "react";
import { todoReducer } from "../reducers/todoReducer";
import { useFetch } from "./useFetch";
import type { TodoType } from "../components/types/todo";

export function useTodos() {
  const [todoList, dispatch] = useReducer(todoReducer, []);
  const {
    data: initialTodos,
    loading,
    error,
  } = useFetch<TodoType[]>("./api/todos", "todos");

  useEffect(() => {
    if (initialTodos) {
      dispatch({ type: "SET_TODOS", payload: initialTodos });
    }
  }, [initialTodos]);

  return { todoList, dispatch, loading, error };
}
