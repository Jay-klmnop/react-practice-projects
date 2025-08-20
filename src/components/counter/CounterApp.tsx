import { useState } from "react";
import CounterButton from "./CounterButton";
import Count from "./Count";
import CounterInput from "./CounterInput";
import styled from "styled-components";
import { colorMixin, flexMixin, fontMixin } from "../../styles/styledMixin";
import {
  color_extralightgrey,
  font_bold,
  font_xbg,
  spacing_md,
  spacing_xs,
} from "../../styles/styledVariables";

const StyledCounterApp = styled.main`
  ${colorMixin({ background: color_extralightgrey })}
  ${flexMixin({
    justify: "center",
    align: "center",
    direction: "column",
    gap: spacing_xs,
  })}
  width: 100%;
  padding: ${spacing_md};

  .upper-group {
    ${flexMixin({ justify: "space-between", align: "center" })}
    width:100%;

    span {
      ${fontMixin(font_xbg, font_bold)}
    }

    .button-group {
      ${flexMixin({ justify: "space-between" })}
      width: 110px;

      button {
        ${colorMixin({})}
        width: 50px;
        line-height: none;
        text-align: center;
      }
    }
  }

  .input-group {
    ${flexMixin({ gap: spacing_xs })}
    width: 100%;

    input {
      flex-grow: 1;
    }

    button {
      width: 110px;
    }
  }
`;

function CounterPractice() {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  const handleCalculate = (operator: "+" | "-") => {
    if (operator === "+") {
      setCounter((prev) => prev + 1);
    } else if (operator === "-") {
      setCounter((prev) => prev - 1);
    }
  };

  const setCounterNumber = () => {
    setCounter(inputValue);
  };

  return (
    <StyledCounterApp>
      <div className="upper-group">
        <Count counter={counter} />
        <div className="button-group">
          <CounterButton
            onClick={() => {
              handleCalculate("+");
            }}
          >
            +
          </CounterButton>
          <CounterButton
            onClick={() => {
              handleCalculate("-");
            }}
          >
            -
          </CounterButton>
        </div>
      </div>
      <CounterInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        setCounterNumber={setCounterNumber}
      />
    </StyledCounterApp>
  );
}

export default CounterPractice;
