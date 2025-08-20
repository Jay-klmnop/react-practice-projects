import type { TodoType } from "../types/todo";
import type { Action } from "../../reducers/todoReducer";
import styled from "styled-components";
import { flexMixin } from "../../styles/styledMixin";
import { spacing_sm } from "../../styles/styledVariables";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todoList: TodoType[];
  dispatch: React.Dispatch<Action>;
  onOpenEditModal: (todo: TodoType) => void;
}

const StyledList = styled.ul`
  ${flexMixin({ direction: "column", gap: spacing_sm })}
  list-style: none;
  padding: 0;
`;

export default function TodoList({
  todoList,
  dispatch,
  onOpenEditModal,
}: TodoListProps) {
  return (
    <StyledList>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          dispatch={dispatch}
          onOpenEditModal={onOpenEditModal}
        />
      ))}
    </StyledList>
  );
}
