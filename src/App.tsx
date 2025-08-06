import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CounterApp from './components/counter/CounterApp';
import TodoListApp from './components/todo-list/TodoListApp';

function PracticeHome() {
  return (
    <nav>
      <h1>Practice Projects</h1>
      <ul>
        <li><Link to="/counter">Counter</Link></li>
        <li><Link to="/todo-list">Todo-List</Link></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PracticeHome />} />
        <Route path="/counter" element={<CounterApp />} />
        <Route path="/todo-list" element={<TodoListApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
