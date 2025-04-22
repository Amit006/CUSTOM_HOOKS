import { useCallback, useState, useRef } from 'react';

export const useFetchApiManual = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const isFetching = useRef(false); // Track ongoing requests

  const fetchApiData = useCallback(
    async (url: string, params: RequestInit = {}) => {
      if (isFetching.current) return; // Prevent concurrent calls
      isFetching.current = true;

      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await fetch(url, params);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        isFetching.current = false;
        setLoading(false);
      }
    },
    []
  );

  return [fetchApiData, data, loading, error] as const;
};
