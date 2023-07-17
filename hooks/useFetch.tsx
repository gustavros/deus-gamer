import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";

import { IGameList } from "@/interfaces/IGameList";

const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";

export function useFetch(options?: AxiosRequestConfig) {
  const [data, setData] = useState<IGameList[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY_API,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_KEY_HOST,
        },
        ...options,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
