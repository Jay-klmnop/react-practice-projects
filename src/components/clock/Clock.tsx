import { useState, useEffect } from "react";
import styled from "styled-components";
import { flexMixin, fontMixin } from "../../styles/styledMixin";
import { font_bg, font_bold, spacing_xs } from "../../styles/styledVariables";

const StyledClock = styled.div`
  ${flexMixin({ gap: spacing_xs })}
  .time {
    ${fontMixin(font_bg, font_bold)}
  }
`;

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedDate = currentTime.toLocaleDateString("en-us", dateOptions);
  const formattedTime = currentTime.toLocaleTimeString("en-US", timeOptions);

  return (
    <StyledClock>
      <p className="date">{formattedDate}</p>
      <p className="time">{formattedTime}</p>
    </StyledClock>
  );
}
