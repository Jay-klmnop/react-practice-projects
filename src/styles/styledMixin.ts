import { css } from "styled-components";
import { color_black, color_white } from "./styledVariables";

export const colorMixin = ({
  background = color_white,
  text = color_black,
  border = "transparent",
}) => css`
  background-color: ${background};
  color: ${text};
  border-color: ${border};
`;

export const flexMixin = ({
  justify = "flex-start",
  align = "stretch",
  direction = "row",
  wrap = "nowrap",
  gap = "0",
}) => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
  flex-wrap: ${wrap};
  gap: ${gap};
`;

export const fontMixin = (size = "16px", weight = 400, style = "normal") => css`
  font-size: ${size};
  font-weight: ${weight};
  font-style: ${style};
  font-family: sans-serif;
`;
