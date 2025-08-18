import { Link } from "react-router-dom";

export default function PracticeHome() {
  return (
    <nav>
      <h1>Practice Projects</h1>
      <ul>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
        <li>
          <Link to="/todo-list">Todo-List</Link>
        </li>
      </ul>
    </nav>
  );
}
