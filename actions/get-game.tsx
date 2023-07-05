import { IGame } from "@/interfaces/IGame";
import axios from "axios";

export const getGame = async (id: string): Promise<IGame> => {
  const options = {
    method: "GET",
    url: "https://free-to-play-games-database.p.rapidapi.com/api/game",
    params: { id: id },
    headers: {
      "X-RapidAPI-Key": process.env.KEY_API,
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const res = await axios.request(options);

  return res.data;
};
