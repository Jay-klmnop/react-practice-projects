import type { WeatherForecast } from "../types/weather";
import styled from "styled-components";
import { colorMixin, flexMixin, fontMixin } from "../../styles/styledMixin";
import {
  color_black,
  color_darkgrey,
  color_white,
  font_bold,
  font_xbg,
  spacing_sm,
  spacing_xs,
} from "../../styles/styledVariables";

interface WeatherCardProps {
  data: WeatherForecast;
  type?: "current" | "daily" | "hourly";
}

const StyledWeatherCard = styled.div`
  ${flexMixin({
    justify: "space-evenly",
    align: "center",
    direction: "column",
    gap: spacing_xs,
  })}
  ${fontMixin(font_xbg, font_bold)}
  ${colorMixin({ background: color_white, border: color_black })}
  min-width: 165px;
  min-height: 230px;
  padding: ${spacing_sm};
  border-radius: ${spacing_xs};
  border-width: 1px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 0.2);

  h3 {
    ${fontMixin(font_xbg, font_bold)}
  }

  .details {
    ${colorMixin({ background: color_white, text: color_darkgrey })}
    padding-bottom: ${spacing_sm};
  }
`;

export default function WeatherCard({
  data,
  type = "current",
}: WeatherCardProps) {
  const { temp, feels_like, humidity, temp_max, temp_min } = data.main;
  const { main, description, icon } = data.weather[0];
  const date = new Date(data.dt * 1000);

  return (
    <StyledWeatherCard>
      {type === "daily" && (
        <h3>{date.toLocaleDateString("en-US", { weekday: "short" })}</h3>
      )}
      {type === "hourly" && (
        <h4>{date.toLocaleTimeString("en-US", { hour: "2-digit" })}</h4>
      )}

      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />

      {type === "daily" ? (
        <p className="temperature">
          {temp_max}° / {temp_min}°
        </p>
      ) : (
        <p className="temperature">{temp}°C</p>
      )}

      <p className="description">{main}</p>

      {type === "current" && (
        <div className="details">
          <p>Feels like: {feels_like}°C</p>
          <p>Humidity: {humidity}%</p>
        </div>
      )}
    </StyledWeatherCard>
  );
}
