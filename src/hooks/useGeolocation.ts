import { useState, useEffect } from "react";

interface Coords {
  lat: number | null;
  lon: number | null;
}

export function useGeolocation() {
  const [coords, setCoords] = useState<Coords>({ lat: null, lon: null });
  const [geoError, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { coords, error: geoError };
}
