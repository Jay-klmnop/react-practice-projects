import type { Dispatch, SetStateAction } from "react";

interface FilterControlsProps {
  filter: "all" | "checked" | "unchecked";
  setFilter: Dispatch<SetStateAction<"all" | "checked" | "unchecked">>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export default function FilterControls({
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
}: FilterControlsProps) {
  return (
    <div className="filter-controls">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "checked" ? "active" : ""}
          onClick={() => setFilter("checked")}
        >
          Completed
        </button>
        <button
          className={filter === "unchecked" ? "active" : ""}
          onClick={() => setFilter("unchecked")}
        >
          Uncompleted
        </button>
      </div>
    </div>
  );
}
