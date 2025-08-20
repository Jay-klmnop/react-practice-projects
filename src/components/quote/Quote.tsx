import { useState, useEffect } from "react";
import { quotes } from "../../constants/quotes";
import styled from "styled-components";
import { colorMixin, flexMixin, fontMixin } from "../../styles/styledMixin";
import {
  color_darkviolet,
  color_violet,
  font_bg,
  font_italic,
  font_md,
  font_medium,
  spacing_sm,
} from "../../styles/styledVariables";

const StyledFigure = styled.figure`
  ${flexMixin({ direction: "column" })}
  padding: ${spacing_sm};

  blockquote {
    ${fontMixin(font_bg, font_medium, font_italic)};
    ${colorMixin({ text: color_violet })};
  }

  figcaption {
    ${fontMixin(font_md, font_medium)};
    ${colorMixin({ text: color_darkviolet })}
    text-align: right;
  }
`;

export default function Quote() {
  const [randomQuote, setRandomQuote] = useState<{
    author: string | null;
    text: string;
  } | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);

  if (!randomQuote) {
    return <div>Loading quote...</div>;
  }

  return (
    <StyledFigure>
      <blockquote>"{randomQuote.text}"</blockquote>
      {randomQuote.author && <figcaption>- {randomQuote.author}</figcaption>}
    </StyledFigure>
  );
}
