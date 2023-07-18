import React from "react";
import { ShowcaseItem } from "./ShowcaseItem";
import { IGameList } from "@/interfaces/IGameList";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface ShowcaseBoxProps {
  title: string;
  buttonLabel: string;
  buttonAction?: () => void;
  data: IGameList[] | null;
  href: string;
  classNames?: string;
}

export const ShowcaseBox = ({
  data,
  title,
  buttonLabel,
  buttonAction,
  href,
  classNames,
}: ShowcaseBoxProps) => {
  return (
    <div
      className={
        (twMerge(`flex flex-col w-full px-8`), classNames)
      }
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>

        <Link href={href} className="border p-2 rounded">
          {buttonLabel}
        </Link>
      </div>

      <ShowcaseItem data={data} />
    </div>
  );
};
