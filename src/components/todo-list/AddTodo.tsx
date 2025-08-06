import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import type { TodoType } from '../types/todo';

interface AddTodoProps {
  todoList: TodoType[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

export default function AddTodo({todoList, setTodoList}: AddTodoProps) {
  const [inputValue, setInputValue] = useState("")
  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo = {id: uuidv4(), content: inputValue}
    const newTodoList = [...todoList, newTodo]
    setTodoList(newTodoList);
    setInputValue('');
  }

  return (
    <>
      <input 
      value={inputValue} 
      onChange={(event) => setInputValue(event.target.value)} />
      <button onClick={() => handleAddTodo()}>
        enter
      </button>
    </>
  )
}