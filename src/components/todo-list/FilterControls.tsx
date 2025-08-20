import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { colorMixin, flexMixin, fontMixin } from "../../styles/styledMixin";
import {
  color_extralightgrey,
  color_violet,
  color_white,
  spacing_sm,
  spacing_xs,
  spacing_xxs,
} from "../../styles/styledVariables";

const StyledFilterControls = styled.div`
  ${flexMixin({ direction: "column", gap: spacing_sm })}
  margin-bottom: ${spacing_sm};

  input {
    ${fontMixin()}
    width: 100%;
    padding: ${spacing_xs} ${spacing_sm};
    border: 1px solid ${color_extralightgrey};
    border-radius: ${spacing_xxs};
  }

  .filter-buttons {
    ${flexMixin({ gap: spacing_xs })}
  }

  .filter-buttons button.active {
    ${colorMixin({
      background: color_violet,
      text: color_white,
      border: color_violet,
    })}
  }
`;

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
    <StyledFilterControls>
      <input
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
    </StyledFilterControls>
  );
}
