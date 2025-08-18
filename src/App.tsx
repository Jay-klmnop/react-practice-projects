import { BrowserRouter, Routes, Route } from "react-router-dom";
import PracticeHome from "./pages/PracticeHome";
import CounterApp from "./components/counter/CounterApp";
import TodoListApp from "./components/todo-list/TodoListApp";

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

export default App;
