import React from "react";

import { IGameList } from "@/interfaces/IGameList";
import Link from "next/link";

interface ShowcaseBoxProps {
  title: string;
  buttonLabel: string;
  buttonAction?: () => void;
  data: IGameList[] | null;
  href: string;
}

export const ShowcaseBox = ({
  data,
  title,
  buttonLabel,
  buttonAction,
  href,
}: ShowcaseBoxProps) => {
  return (
    <div className="w-4/5">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">{title}</h1>

        <Link href={href} className="border p-2 rounded">
          {buttonLabel}
        </Link>
      </div>

      <div className="w-full flex flex-col mt-2">
        {data
          ?.map((item) => {
            return (
              <Link
                key={item.id}
                href={`game/${item.id}`}
                className="flex flex-row gap-4 h-auto text-md font-medium cursor-pointer hover:text-white hover:bg-[#2a2a2a] transition text-neutral-400 rounded-lg py-2 w-fit"
              >
                <img
                  src={item.thumbnail}
                  alt={item.short_description}
                  className=" w-56 rounded"
                />

                <div className="flex flex-col w-96">
                  <h1 className=" text-white text-md lg:text-xl  break-words">
                    {item.title}
                  </h1>
                  <span className="text-amber-400">{item.genre}</span>
                </div>
              </Link>
            );
          })
          .slice(0, 5)}
      </div>
    </div>
  );
};
