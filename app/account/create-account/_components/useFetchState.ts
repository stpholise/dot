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

export const useFetchLGA = (state: string) => {
  const [lga, setLga] = useState<string>();
  const [loadingLga, setLoadingLga] = useState<boolean>(false);
  const [errorFetchinLga, setErrorFetchingLga] = useState<string | null>(null);

  useEffect(() => {
    if (!state || state.trim() === "") return;
    console.log("fetching lga for state:", state);
    setErrorFetchingLga(null);
    const fetchLga = async () => {
      setLoadingLga(true);
      try {
        const response = await fetch(
          `https://nga-states-lga.onrender.com/?state=${state}`
        );

        if (!response.ok) {
          throw new Error("error fetching LGA check link");
        }
        const data = await response.json();
        setLga(data);
        setLoadingLga(false);
      } catch (err) {
        if (err instanceof Error) {
          setErrorFetchingLga(err.message);
        } else {
          setErrorFetchingLga("something went wrong with fetching LGA's");
        }
        setLoadingLga(false);
      }
    };
    fetchLga();
  }, [state]);
  return { lga, loadingLga, errorFetchinLga };
};
