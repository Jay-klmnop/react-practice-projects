import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface AddTodoProps {
  onDataChange: () => void;
}

export default function AddTodo({ onDataChange }: AddTodoProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddTodo = async () => {
    if (!inputValue.trim()) return;
    const newTodo = { id: uuidv4(), content: inputValue, isDone: false };
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

      onDataChange();

      setInputValue("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="input-group">
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task"
      />
      <button onClick={() => handleAddTodo()}>Add</button>
    </div>
  );
}
