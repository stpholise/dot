import { useState, useEffect } from "react";

export const useFetchState = () => {
  const [states, setStates] = useState<string[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await fetch(
          "https://nga-states-lga.onrender.com/fetch"
        );
        if (!response.ok) {
          throw new Error("error fetchin state check link ");
        }

        const data = await response.json();
        setStates(data);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
        setIsLoading(false);
      }
    };
    fetchState();
  });
  return { states, isLoading, error };
};
