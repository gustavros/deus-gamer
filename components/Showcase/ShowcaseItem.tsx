import React from "react";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { IGameList } from "@/interfaces/IGameList";

interface ShowcaseItemProps {
  className?: string;
  data: IGameList[] | null;
}

export const ShowcaseItem = ({ className, data }: ShowcaseItemProps) => {
  return (
    <div className="w-full flex flex-col mt-8 ">
      {data
        ?.map((item) => {
          return (
            <Link
              key={item.id}
              href={`game/${item.id}`}
              className="flex flex-row gap-4 h-auto text-md font-medium cursor-pointer hover:text-white hover:bg-[#2a2a2a] transition text-neutral-400 rounded-lg p-4"
            >
              <img
                src={item.thumbnail}
                alt={item.short_description}
                className=" w-56 rounded"
              />

              <div className="flex flex-col w-96">
                <h1 className=" text-white text-xl">{item.title}</h1>
                <span className="text-amber-500">{item.genre}</span>
              </div>
            </Link>
          );
        })
        .slice(0, 6)}
    </div>
  );
};
