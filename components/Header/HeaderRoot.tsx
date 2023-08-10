"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { HeaderSearch } from "./HeaderSearch";

import { twMerge } from "tailwind-merge";

import { AiOutlineMenu } from "react-icons/ai";

import useMenu from "@/hooks/useMenu";
import { HeaderMenuMobile } from "./HeaderMenuMobile";
import useSidebar from "@/hooks/useSidebar";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useAuth from "@/hooks/useAuth";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const HeaderRoot = () => {
  const avatar = "https://ionicframework.com/docs/img/demos/avatar.svg";

  const pathname = usePathname();
  const router = useRouter();

  const sidebar = useSidebar();
  const menu = useMenu();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const { user, signOut, loading } = useAuth();

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
          <div className="hidden sm:flex">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.photoURL ? user.photoURL : avatar} />
                  <AvatarFallback>
                    {user.displayName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-46 bg-neutral-900"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.displayName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/collection">Coleção</Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-400 cursor-pointer"
                  onClick={signOut}
                >
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="gap-4 hidden sm:flex items-center">
            <Button variant="outline" onClick={loginModal.onOpen}>
              Entrar
            </Button>

            <Button
              className="text-neutral-900 bg-amber-400 hover:bg-amber-500 transition-all"
              onClick={registerModal.onOpen}
            >
              Registre-se
            </Button>
          </div>
        )}

        <HeaderMenuMobile menu={menu} routes={routes} />
      </div>
    </header>
  );
};
