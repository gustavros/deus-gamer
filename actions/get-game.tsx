import { IGame } from "@/interfaces/IGame";
import axios from "axios";

export const getGame = async (id: number): Promise<IGame> => {
  const options = {
    method: "GET",
    url: "https://free-to-play-games-database.p.rapidapi.com/api/game",
    params: { id: id },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY_API,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_KEY_HOST,
    },
  };

  const res = await axios.request(options);

  return res.data;
};
