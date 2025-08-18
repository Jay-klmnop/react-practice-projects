import type { TodoType } from "../components/types/todo";

export type Action =
  | { type: "SET_TODOS"; payload: TodoType[] }
  | { type: "ADD_TODO"; payload: TodoType }
  | { type: "UPDATE_TODO"; payload: TodoType }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: string };

export function todoReducer(state: TodoType[], action: Action): TodoType[] {
  switch (action.type) {
    case "SET_TODOS":
      return action.payload;
    case "ADD_TODO":
      return [...state, action.payload];
    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    default:
      return state;
  }
}
