import { useEffect, useState } from "react";
import type { WeatherApiResponse } from "../components/types/weather";

interface WeatherHookResult {
  weatherData: WeatherApiResponse | null;
  loading: boolean;
  error: Error | null;
}

export function useWeather(
  lat: number | null,
  lon: number | null
): WeatherHookResult {
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [weatherError, setError] = useState<Error | null>(null);
  const API_KEY = "ecc68e10dd9d563989234e3c21cdf0c6";

  useEffect(() => {
    const getWeatherData = async () => {
      if (!lat || !lon) return;
      try {
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const weatherData = await weatherRes.json();
        setWeatherData(weatherData);
      } catch (err) {
        if (err instanceof Error) setError(err);
        else setError(new Error("An unknown error occurred"));
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [lat, lon, API_KEY]);

  return { weatherData, loading, error: weatherError };
}
