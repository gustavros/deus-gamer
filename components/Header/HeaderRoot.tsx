"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

import { BsArrowLeftShort } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import HeaderSearch from "./HeaderSearch";
import { useSidebar } from "@/hooks/useSidebar";

export const HeaderRoot = () => {
  const pathname = usePathname();
  const sidebar = useSidebar();
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

  return (
    <header
      className="bg-neutral-900 py-6 px-2 flex justify-between items-center w-full fixed z-10"
      style={
        sidebar.isOpen
          ? { width: "calc(100% - 280px)" }
          : { width: "calc(100% - 100px)" }
      }
    >
      <div className="flex justify-center items-center">
        <div className="flex items-center gap-4">
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

      <Avatar className="mr-8">
        <AvatarImage src="https://github.com/gustavros.png" />
        <AvatarFallback className="border">GN</AvatarFallback>
      </Avatar>
    </header>
  );
};
