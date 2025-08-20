import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";
import PracticeHome from "./pages/PracticeHome";
import CounterApp from "./components/counter/CounterApp";
import TodoListApp from "./components/todo-list/TodoListApp";
import WeatherApp from "./components/weather/WeatherApp";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<PracticeHome />} />
        <Route path="/counter" element={<CounterApp />} />
        <Route path="/todo-list" element={<TodoListApp />} />
        <Route path="/weather" element={<WeatherApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
