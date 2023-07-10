"use client";

import React, { ReactNode, useCallback, useMemo, useState } from "react";

import { usePathname } from "next/navigation";

import { MdDiscount, MdOutlineNewReleases } from "react-icons/md";

import { AiOutlineHeart } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import { MdGamepad } from "react-icons/md";
import {
  BsArrowBarRight,
  BsRocketTakeoff,
  BsFire,
  BsArrowBarLeft,
} from "react-icons/bs";

import { SidebarBox } from "./SidebarBox";
import { SidebarItem } from "./SidebarItem";

interface SidebarRootProps {
  children: ReactNode;
}

export const SidebarRoot = ({ children }: SidebarRootProps) => {
  const pathname = usePathname();
  const clientName = "Gustavo Santana";

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleOpenBar = useCallback(() => {
    setIsSidebarOpen(true);
  }, [isSidebarOpen]);

  const collections = useMemo(
    () => [
      {
        label: "Favoritos",
        icon: AiOutlineHeart,
        href: "/favorites",
      },
      {
        label: "Jogando",
        icon: IoMdDoneAll,
        href: "/playing",
      },
      {
        label: "Jogados",
        icon: MdGamepad,
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
        active: pathname !== "/search",
        icon: MdDiscount,
        href: "/",
      },
      {
        label: "Últimos lançamentos",
        active: pathname === "/releases",
        icon: MdOutlineNewReleases,
        href: "/releases",
      },
      {
        label: "Relevantes",
        active: pathname === "/relevance",
        icon: BsFire,
        href: "/relevance",
      },
      {
        label: "Mais populares",
        active: pathname === "/popular",
        icon: BsRocketTakeoff,
        href: "/popular",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      {isSidebarOpen ? (
        <div className="flex flex-col bg-black w-[280px]">
          <SidebarBox className="flex-1">
            <div className="pl-6 pr-3 py-4 text-xl flex justify-between">
              <span>
                Seja bem-vindo,
                <span className="font-bold block text-amber-400">
                  {clientName}
                </span>
              </span>

              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-neutral-400 hover:text-white"
              >
                <BsArrowBarLeft size={23} />
              </button>
            </div>

            <div>
              {routes.map((item) => (
                <SidebarItem key={item.label} {...item} />
              ))}

              <hr className="border-neutral-800 mx-2" />
            </div>

            <div className="flex flex-col w-[280px] transition-all">
              <p className="text-xl font-bold pb-4 p-8">
                Minha <span className="text-amber-400">coleção</span>
              </p>

              {collections.map((item) => (
                <SidebarItem key={item.label} {...item} />
              ))}
            </div>
          </SidebarBox>
        </div>
      ) : (
        <div className="flex flex-col gap-4 bg-red-100 w-[100px] transition-all">
          <SidebarBox className="flex flex-col  flex-1">
            <BsArrowBarRight
              onClick={handleOpenBar}
              size={23}
              className="text-neutral-400 hover:text-white cursor-pointer transition-all w-full my-8"
            />

            {routes.map((item) => (
              <SidebarItem
                active={item.active}
                icon={item.icon}
                href={item.href}
                key={item.label}
                className="p-0 flex flex-col items-center justify-center h-12"
              />
            ))}

            <hr className="border-neutral-800 mx-2" />

            {collections.map((item) => (
              <SidebarItem
                key={item.label}
                href={item.href}
                icon={item.icon}
                className="mt-1 p-0 flex flex-col items-center justify-center h-12"
              />
            ))}
          </SidebarBox>
        </div>
      )}

      <main className="h-full flex-1 overflow-y-auto ">{children}</main>
    </div>
  );
};
