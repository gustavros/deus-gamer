"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { HeaderSearch } from "./HeaderSearch";

import { BsArrowLeftShort } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import useMenu from "@/hooks/useMenu";
import { HeaderMenuMobile } from "./HeaderMenuMobile";

export const HeaderRoot = () => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      label: "Descobrir",
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Navegar",
      href: "/navigation",
      active: pathname === "/navigation",
    },
  ];

  const menu = useMenu();

  return (
    <header className="bg-neutral-900 py-6 px-8 flex justify-between items-center w-full fixed z-10">
      <div className="justify-center items-center flex w-full sm:w-auto">
        <div className="flex items-center gap-4 w-full justify-between sm:w-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BsArrowLeftShort
                  size={30}
                  className="text-neutral-400 bg-neutral-800 rounded-full p-1 cursor-pointer"
                  onClick={() => router.back()}
                />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="border-neutral-800 bg-neutral-900 rounded"
              >
                <span className="text-sm">Voltar</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <HeaderSearch />

          <AiOutlineMenu
            size={30}
            className={`text-neutral-400 rounded-full cursor-pointer flex sm:hidden ${
              menu.isOpen && "invisible"
            }`}
            onClick={menu.onOpen}
          />
        </div>

        <div className="px-4 hidden gap-4 text-neutral-500 font-medium sm:flex">
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

        <HeaderMenuMobile menu={menu} routes={routes} />
      </div>
    </header>
  );
};
