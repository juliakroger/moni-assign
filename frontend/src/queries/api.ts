import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

export const useFetch = (endpoint: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<any>(null);

  const fetch = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [endpoint]);

  return {
    data,
    isLoading,
    error,
    refetch: fetch,
  };
};
