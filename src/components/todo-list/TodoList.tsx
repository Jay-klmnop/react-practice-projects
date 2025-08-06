import type { TodoType } from '../types/todo';
import Todo from './Todo'

interface TodoListProps {
  todoList: TodoType[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

export default function TodoList({todoList, setTodoList}: TodoListProps) {
  const handleDelete = (idToDelete: string) => {
    const newTodoList = todoList.filter(todo => todo.id !== idToDelete)
    setTodoList(newTodoList)
  }

  return (
    <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <Todo content={todo.content} />
            <button onClick={() => handleDelete(todo.id)}>delete</button>
          </li>
        ))}
      </ul>
  )
}