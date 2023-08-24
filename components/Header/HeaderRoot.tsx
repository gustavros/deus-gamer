"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { HeaderSearch } from "./HeaderSearch";

import { twMerge } from "tailwind-merge";

import { AiOutlineMenu } from "react-icons/ai";

import useMenu from "@/hooks/useMenu";
import { HeaderMenuMobile } from "./HeaderMenuMobile";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthentication from "@/hooks/useAuthentication";

export const HeaderRoot = () => {
  const pathname = usePathname();
  const menu = useMenu();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const { user, logout } = useAuthentication();

  const firstWordUser = user?.name.split(" ")[0].charAt(0).toUpperCase();

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
      className={`bg-neutral-900 py-6 px-8  justify-between items-center w-full z-10 border-b border-neutral-800`}
    >
      <div className="justify-between items-center flex w-full">
        <div className="flex items-center gap-4 w-full justify-between sm:w-auto">
          <HeaderSearch />

          <AiOutlineMenu
            size={30}
            className={`text-neutral-400 rounded-full cursor-pointer flex sm:hidden ${
              menu.isOpen && "invisible"
            }`}
            onClick={menu.onOpen}
          />

          <div className="px-4 hidden gap-4 text-neutral-500 font-medium sm:flex ">
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

        {user ? (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className="hidden sm:flex">
              <div className="bg-neutral-800 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center border hover:bg-neutral-900 transition-all">
                {firstWordUser}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-46 border-none rounded bg-neutral-800 border-red-500"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-neutral-500" />

              <DropdownMenuItem className="cursor-pointer hover:bg-neutral-900 hover:text-neutral-300">
                <Link href="/favorites">Favoritos</Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-400 cursor-pointer hover:bg-neutral-900 hover:text-red-500"
                onClick={logout}
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden gap-2 items-center sm:flex">
            <Button
              onClick={loginModal.onOpen}
              variant="outline"
              className="text-neutral-100 hover:bg-white hover:text-neutral-900"
            >
              Entrar
            </Button>
            <Button
              onClick={registerModal.onOpen}
              variant="default"
              className="text-neutral-900 bg-amber-400 rounded border border-amber-400 hover:bg-neutral-900 hover:text-white"
            >
              Cadastrar
            </Button>
          </div>
        )}

        <HeaderMenuMobile menu={menu} routes={routes} />
      </div>
    </header>
  );
};
