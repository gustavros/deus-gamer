"use client";

import axios from "axios";
import { HeaderRoot } from "@/components/Header/HeaderRoot";
import { IGameList } from "@/interfaces/IGameList";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [gameList, setGameList] = useState<IGameList[]>([]);

  console.log('ping')

  useEffect(() => {
    axios
      .get("https://free-to-play-games-database.p.rapidapi.com/api/games", {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY_API,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_KEY_HOST,
        },
      })
      .then((response) => {
        setGameList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <HeaderRoot />

      <main className="bg-neutral-900 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-white">
            Bem vindo ao <span className="text-amber-400">Game</span> List
          </h1>

          <p className="text-xl text-white">
            Aqui você pode encontrar os melhores jogos gratuitos da internet
          </p>
        </div>

        <div className="flex flex-wrap  items-center justify-center gap-4 pt-10">
          {gameList.map((game) => (
            <Link
              href={`/game/${game.id}`}
              key={game.id}
              className="w-80 h-auto border rounded-lg p-2"
            >
              <img src={game.thumbnail} alt={game.title} />
              <h1>{game.title}</h1>
              <p className="font-bold text-amber-400">{game.publisher}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
