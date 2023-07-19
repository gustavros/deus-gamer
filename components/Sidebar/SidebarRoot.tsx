"use client";

import React, { ReactNode, useEffect, useMemo } from "react";

import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { AiOutlineHeart } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import { MdGamepad, MdDiscount } from "react-icons/md";
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";

import { SidebarBox } from "./SidebarBox";
import { SidebarItem } from "./SidebarItem";
import useSidebar from "../../hooks/useSidebar";

import { Separator } from "../ui/separator";

interface SidebarRootProps {
  children: ReactNode;
}

export const SidebarRoot = ({ children }: SidebarRootProps) => {
  const sidebar = useSidebar();

  const pathname = usePathname();
  const user = "Gustavo Santana";

  const collections = useMemo(
    () => [
      {
        label: "Favoritos",
        icon: AiOutlineHeart,
        href: "/favorites",
      },
      {
        label: "Jogando",
        icon: MdGamepad,
        href: "/playing",
      },
      {
        label: "Jogados",
        icon: IoMdDoneAll,
        href: "/played",
      },
      {
        label: "A jogar",
        icon: BsArrowBarRight,
        href: "/to-play",
      },
    ],
    []
  );

  const routes = useMemo(
    () => [
      {
        label: "Início",
        active: pathname === "/",
        icon: MdDiscount,
        href: "/",
      },
    ],
    [pathname]
  );

  function closeSidebarOnMobile() {
    if (window.innerWidth < 768) {
      sidebar.onClose();
    }
  }

  useEffect(() => {
    window.addEventListener("resize", closeSidebarOnMobile);

    return () => {
      window.removeEventListener("resize", closeSidebarOnMobile);
    };
  }, []);

  return (
    <div className="flex">
      {sidebar.isOpen ? (
        <div
          className={`flex flex-col w-[220px] sm:w-[200px] md:w-[280px] 2xl:w-[260px] sm:hidden`}
        >
          <SidebarBox className="flex-1">
            <div className="pl-6 pr-3 py-4 text-xl flex justify-between">
              <span>
                Seja bem-vindo,
                <span className="font-bold block text-amber-400">{user}</span>
              </span>

              <button
                onClick={sidebar.onClose}
                className="text-neutral-400 hover:text-white"
              >
                <BsArrowBarLeft size={23} />
              </button>
            </div>

            <div>
              {routes.map((item) => (
                <SidebarItem key={item.label} {...item} />
              ))}

              <Separator
                orientation="horizontal"
                className="bg-neutral-700 h-[1px] mx-4 my-8 w-[calc(100%-32px)]"
              />
            </div>

            <div className="flex flex-col w-[280px] ">
              <p className="text-xl font-bold pb-4 pl-8">
                Minha <span className="text-amber-400">coleção</span>
              </p>

              {collections.map((item) => (
                <SidebarItem key={item.label} {...item} />
              ))}
            </div>
          </SidebarBox>
        </div>
      ) : (
        <div className="flex-col gap-4 bg-neutral-900 w-[100px]  md:w-[80px] 2xl:w-[100px] transition-all pb-4 hidden sm:flex">
          <SidebarBox className="flex flex-col flex-1 bg-neutral-800 pt-6 md:pt-0">
            <BsArrowBarRight
              onClick={sidebar.onOpen}
              size={23}
              className="text-neutral-400 hover:text-white cursor-pointer transition-all w-full my-8 hidden md:flex"
            />

            {routes.map((item) => (
              <TooltipProvider key={item.label}>
                <Tooltip>
                  <TooltipTrigger>
                    <SidebarItem
                      active={item.active}
                      icon={item.icon}
                      href={item.href}
                      className="p-0 flex flex-col items-center justify-center h-12 sm:h-10"
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="border-neutral-800 bg-neutral-900 rounded"
                  >
                    <span className="text-sm">{item.label}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}

            <Separator
              orientation="horizontal"
              className="bg-neutral-700 h-[1px] mx-4 my-8 w-[calc(100%-32px)]"
            />

            {collections.map((item) => (
              <TooltipProvider key={item.label}>
                <Tooltip>
                  <TooltipTrigger>
                    <SidebarItem
                      href={item.href}
                      icon={item.icon}
                      className="mt-1 p-0 flex flex-col items-center justify-center h-12"
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="border-neutral-800 bg-neutral-900 rounded"
                  >
                    <span className="text-sm">{item.label}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}

            <Separator
              orientation="horizontal"
              className="bg-neutral-700 h-[1px] mx-4 my-8 w-[calc(100%-32px)]"
            />
          </SidebarBox>
        </div>
      )}

      <main className="h-full flex-1 overflow-y-auto ">{children}</main>
    </div>
  );
};
