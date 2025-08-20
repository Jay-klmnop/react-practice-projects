import { useGeolocation } from "../../hooks/useGeolocation";
import { useWeather } from "../../hooks/useWeather";
import styled from "styled-components";
import { colorMixin, flexMixin, fontMixin } from "../../styles/styledMixin";
import {
  color_darkgrey,
  color_extradarkgrey,
  color_extralightgrey,
  font_bold,
  font_xbg,
  font_xxbg,
  spacing_lg,
  spacing_md,
  spacing_sm,
  spacing_xs,
} from "../../styles/styledVariables";
import WeatherCard from "./WeatherCard";
import Clock from "../clock/Clock";

const StyledWeatherApp = styled.main`
  ${colorMixin({ background: color_extralightgrey })};
  width: 100%;
  max-width: 800px;
  min-height: 100vh;
  margin: 0 auto;
  padding: ${spacing_lg} ${spacing_sm};

  header {
    ${flexMixin({ align: "center", direction: "column", gap: spacing_xs })};
    width: 100%;
    color: ${color_extradarkgrey};
    padding-bottom: ${spacing_md};

    h1 {
      ${fontMixin(font_xxbg, font_bold)};
    }
  }

  h2 {
    ${colorMixin({ background: color_extralightgrey, text: color_darkgrey })};
    ${fontMixin(font_xbg, font_bold)};
  }
`;

const CurrentWeatherSection = styled.section`
  ${flexMixin({ direction: "column", gap: spacing_sm })};
  width: 100%;
  padding: ${spacing_md};
`;

const WeeklyForecastSection = styled.section`
  ${flexMixin({ direction: "column", gap: spacing_sm })};
  width: 100%;
  padding: ${spacing_md};

  .weekly-list {
    ${flexMixin({ wrap: "wrap", gap: spacing_sm })};
  }
`;

const HourlyForecastSection = styled.section`
  ${flexMixin({ direction: "column", gap: spacing_sm })};
  padding: ${spacing_md};

  .hourly-list {
    ${flexMixin({ gap: spacing_sm })};
    overflow-x: auto;
    padding-bottom: ${spacing_sm};
  }
`;

export default function WeatherApp() {
  const { coords, error: geoError } = useGeolocation();
  const {
    weatherData,
    loading,
    error: weatherError,
  } = useWeather(coords.lat, coords.lon);

  if (loading) return <div>Loading weather for current location...</div>;
  if (geoError) return <div>Location Error: {geoError}</div>;
  if (weatherError) return <div>Weather Error: {weatherError.message}</div>;
  if (!weatherData) return <div>No data available.</div>;

  const currentData = weatherData.list[0];
  const hourlyForecasts = weatherData.list.slice(0, 8);
  const dailyForecasts = weatherData.list.filter((forecast) =>
    forecast.dt_txt.includes("12:00:00")
  );

  return (
    <StyledWeatherApp>
      <header>
        <h1>Weather in {weatherData.city.name}</h1>
        <Clock />
      </header>
      <CurrentWeatherSection>
        <h2>Current Weather</h2>
        <WeatherCard data={currentData} type="current" />
      </CurrentWeatherSection>
      <WeeklyForecastSection>
        <h2>5-Day Forecast</h2>
        <div className="weekly-list">
          {dailyForecasts.map((forecast) => (
            <WeatherCard key={forecast.dt} data={forecast} type="daily" />
          ))}
        </div>
      </WeeklyForecastSection>
      <HourlyForecastSection>
        <h2>Hourly Forecast</h2>
        <div className="hourly-list">
          {hourlyForecasts.map((forecast) => (
            <WeatherCard key={forecast.dt} data={forecast} type="hourly" />
          ))}
        </div>
      </HourlyForecastSection>
    </StyledWeatherApp>
  );
}
