import { useState, useEffect, useCallback } from "react";

export function useFetch<T>(url: string, cacheKey?: string) {
  const getInitialData = (): T | null => {
    if (cacheKey) {
      const savedData = localStorage.getItem(cacheKey);
      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (e) {
          console.error("Failed to parse cached data:", e);
          return null;
        }
      }
    }
    return null;
  };
  const [data, setData] = useState<T | null>(getInitialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      if (cacheKey) {
        localStorage.setItem(cacheKey, JSON.stringify(jsonData));
      }
      setData(jsonData);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  }, [url, cacheKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
