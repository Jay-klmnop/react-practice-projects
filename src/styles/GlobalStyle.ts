import { createGlobalStyle } from "styled-components";
import { colorMixin, flexMixin, fontMixin } from "./styledMixin";
import {
  color_extralightgrey,
  color_lightviolet,
  spacing_sm,
  spacing_xs,
} from "./styledVariables";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    ${colorMixin({})}
    ${flexMixin({ justify: "center", align: "center" })}
    ${fontMixin()}
    min-height: 100vh;
    background-image: url('../../public/cloud.svg');
    background-repeat: repeat;
    background-size: 250px;
  }

  #root {
    ${flexMixin({ direction: "column", gap: spacing_xs })}
    width: 100%;
    max-width: 500px;
    padding: 0 ${spacing_sm};
  }

  button {
    border: 1px solid ${color_extralightgrey};
    padding: ${spacing_xs} ${spacing_sm};
    border-radius: ${spacing_xs};
    cursor: pointer;

    &:hover {
      ${colorMixin({ background: color_lightviolet })};
    }
  }
`;
