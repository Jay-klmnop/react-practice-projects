import type { TodoType } from "../types/todo";
import type { Action } from "../../reducers/todoReducer";
import Todo from "./Todo";
import styled from "styled-components";
import { colorMixin, flexMixin } from "../../styles/styledMixin";
import {
  color_extralightgrey,
  color_lightgrey,
  color_lightviolet,
  color_violet,
  color_white,
  spacing_sm,
  spacing_xs,
  spacing_xxs,
} from "../../styles/styledVariables";

interface TodoItemProps {
  todo: TodoType;
  dispatch: React.Dispatch<Action>;
  onOpenEditModal: (todo: TodoType) => void;
}

const StyledListItem = styled.li`
  ${flexMixin({ align: "center", gap: spacing_xs })}
  padding: ${spacing_sm};
  border-radius: ${spacing_xs};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  label {
    ${flexMixin({ justify: "center", align: "center" })}
    width: ${spacing_sm};
    height: ${spacing_sm};
    cursor: pointer;

    .checkbox-input {
      position: absolute;
      opacity: 0;
      height: 0;
      width: 0;
      cursor: pointer;
    }

    .checkmark {
      ${colorMixin({ background: color_extralightgrey })}
      width: 100%;
      height: 100%;
      border: 1px solid ${color_lightgrey};
      border-radius: ${spacing_xxs};
      transition: background-color 0.2s;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        display: none;
        left: 4px;
        top: 0;
        width: 5px;
        height: 10px;
        border: solid ${color_white};
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    .checkbox-input:checked + .checkmark {
      ${colorMixin({ background: color_violet })}
    }

    .checkbox-input:checked + .checkmark::after {
      display: block;
    }

    &:hover .checkmark {
      ${colorMixin({ background: color_lightviolet })}
    }
  }

  .button-group {
    ${flexMixin({ gap: spacing_xs })}
    margin-left: auto;
  }
`;

export default function TodoItem({
  todo,
  dispatch,
  onOpenEditModal,
}: TodoItemProps) {
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
    <StyledListItem>
      <label>
        <input
          className="checkbox-input"
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
    </StyledListItem>
  );
}
