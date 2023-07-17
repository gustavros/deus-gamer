import React from "react";
import { ShowcaseItem } from "./ShowcaseItem";
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
    <div className="flex flex-col w-full">
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
