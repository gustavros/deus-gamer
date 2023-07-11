import { IGameList } from "@/interfaces/IGameList";
import Link from "next/link";
import React from "react";

interface SwiperItemProps {
  game: IGameList;
}

export const SwiperSlideItem = ({ game }: SwiperItemProps) => {
  return (
    <Link href={`/game/${game.id}`}>
      <img src={game.thumbnail} alt={game.title} className="rounded" />

      <div className="flex flex-col pt-2">
        <h1 className="font-bold truncate">{game.title}</h1>
        <span className="p-1 bg-amber-800 rounded-lg w-fit text-sm">
          {game.genre}
        </span>
      </div>
    </Link>
  );
};
