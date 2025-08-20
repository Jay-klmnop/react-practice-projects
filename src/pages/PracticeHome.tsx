import { Link } from "react-router-dom";
import styled from "styled-components";
import { colorMixin, flexMixin, fontMixin } from "../styles/styledMixin";
import {
  color_darkgrey,
  color_white,
  font_bold,
  font_xbg,
  font_xxbg,
  spacing_sm,
} from "../styles/styledVariables";

const StyledNavigation = styled.nav`
  ${colorMixin({})}
  ${flexMixin({
    direction: "column",
  })}

  h1 {
    ${colorMixin({ background: color_darkgrey, text: color_white })}
    ${fontMixin(font_xxbg, font_bold)}
    width: 100%;
    text-align: center;
  }

  ul {
    ${flexMixin({ direction: "column" })}
    list-style: none;
    padding: 0;

    li {
      ${flexMixin({ align: "center" })}
      ${fontMixin(font_xbg, font_bold)}
      padding: ${spacing_sm};
      border: 1px solid ${color_darkgrey};
    }
  }
`;

export default function PracticeHome() {
  return (
    <StyledNavigation>
      <h1>Practice Projects</h1>
      <ul>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
        <li>
          <Link to="/todo-list">Todo-List</Link>
        </li>
        <li>
          <Link to="/weather">Weather</Link>
        </li>
      </ul>
    </StyledNavigation>
  );
}
