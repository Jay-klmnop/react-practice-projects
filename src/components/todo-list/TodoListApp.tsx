import { useState } from "react"
import TodoList from "./TodoList"
import AddTodo from "./AddTodo"

export default function TodoListApp() {
  const [todoList, setTodoList] = useState([
    {id: '0', content: 'Eat Breakfast'},
    {id: '1', content: 'Take Medication'},
  ])
  
  return (
    <>
      <TodoList 
      todoList={todoList} 
      setTodoList={setTodoList}
      />
      <AddTodo
        todoList={todoList}
        setTodoList={setTodoList}
      />
    </>
  )
}