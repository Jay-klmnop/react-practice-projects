import { useState, useMemo } from "react";
import type { TodoType } from "../components/types/todo";

type FilterType = "all" | "checked" | "unchecked";

export function useTodoFilter(
  todos: TodoType[],
  initialFilter: FilterType = "all"
) {
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        if (filter === "checked") return todo.isDone;
        if (filter === "unchecked") return !todo.isDone;
        return true;
      })
      .filter((todo) =>
        todo.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [todos, filter, searchTerm]);

  return {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    filteredTodoList: filteredTodos,
  };
}
