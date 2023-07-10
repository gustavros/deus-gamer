"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

export const HeaderRoot = () => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Descobrir",
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Navegar",
      href: "/",
      active: pathname === "/navigation",
    },
  ];

  return (
    <header className="bg-neutral-900 py-6 px-2 flex justify-between items-center w-full">
      <div className="flex justify-center items-center">
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
        <div className="px-4 flex gap-4 text-neutral-500 font-medium">
          {routes.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className={twMerge(``, item.active && "text-white")}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-zinc-800 p-2 rounded-full w-10 flex items-center justify-center"> 
        G
      </div>
    </header>
  );
};