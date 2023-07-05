"use client";

import React from "react";

import { AiOutlineSearch } from "react-icons/ai";

export const HeaderRoot = () => {
  return (
    <header className="bg-neutral-900 py-6 px-2 flex items-center w-full">
      <div className="relative flex items-center gap-4">
        <AiOutlineSearch
          size={18}
          className="text-neutral-400 absolute top-3 left-3"
        />
        <input
          type="text"
          className="rounded-3xl py-2 pl-10 placeholder:text-neutral-500 bg-neutral-800"
          placeholder="Busque por jogos"
        />
      </div>
    </header>
  );
};
