import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Action } from "../../reducers/todoReducer";
import styled from "styled-components";
import { colorMixin, flexMixin, fontMixin } from "../../styles/styledMixin";
import {
  color_extralightgrey,
  color_lightviolet,
  font_bg,
  spacing_xs,
  spacing_xxs,
} from "../../styles/styledVariables";

interface AddTodoProps {
  dispatch: React.Dispatch<Action>;
}

const StyledInputGroup = styled.div`
  ${flexMixin({ align: "center", direction: "column", gap: spacing_xs })}
  width: 100%;
  margin: 1rem 0;

  input {
    ${fontMixin(font_bg)}
    flex: 1;
    width: 100%;
    padding: ${spacing_xs};
    border: 1px solid ${color_extralightgrey};
    border-radius: ${spacing_xxs};
  }

  button {
    width: 100%;
    padding: ${spacing_xs};
    border-radius: ${spacing_xxs};
  }

  button:hover {
    ${colorMixin({ background: color_lightviolet })}
  }
`;

export default function AddTodo({ dispatch }: AddTodoProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddTodo = async () => {
    if (!inputValue.trim()) return;
    const newTodo = { id: uuidv4(), content: inputValue, isDone: false };

    dispatch({ type: "ADD_TODO", payload: newTodo });
    setInputValue("");

    try {
      const response = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      setInputValue("");
    } catch (error) {
      console.error("Error adding todo:", error);
      dispatch({ type: "DELETE_TODO", payload: newTodo.id });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <StyledInputGroup>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task"
      />
      <button onClick={() => handleAddTodo()}>Add</button>
    </StyledInputGroup>
  );
}
