import React from "react";
import { ShowcaseItem } from "./ShowcaseItem";
import { IGameList } from "@/interfaces/IGameList";

interface ShowcaseBoxProps {
  title: string;
  buttonLabel: string;
  buttonAction?: () => void;

  data: IGameList[];
}

export default function ShowcaseBox({
  data,
  title,
  buttonLabel,
  buttonAction,
}: ShowcaseBoxProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>

        <button className="border p-2 rounded">{buttonLabel}</button>
      </div>

      <ShowcaseItem data={data} />
    </div>
  );
}
