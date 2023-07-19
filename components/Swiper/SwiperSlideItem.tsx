import { IGameList } from "@/interfaces/IGameList";
import Link from "next/link";
import React from "react";

interface SwiperItemProps {
  game: IGameList;
}

export const SwiperSlideItem = ({ game }: SwiperItemProps) => {
  return (
    <Link
      className=" text-md font-medium cursor-pointer hover:text-white hover:bg-[#2a2a2a] transition text-neutral-400 rounded-lg py-2"
      href={`/game/${game.id}`}
    >
      <img src={game.thumbnail} alt={game.title} className="rounded" />

      <div className="flex flex-col pt-2">
        <h1 className="font-bold truncate text-neutral-200">{game.title}</h1>
        {/* <span className="p-1 bg-amber-400 rounded-lg w-fit text-sm text-neutral-800 font-regular">
          {new Date(game.release_date).toLocaleDateString().split("/")[2]}
        </span> */}
      </div>
    </Link>
  );
};
