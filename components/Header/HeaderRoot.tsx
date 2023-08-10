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
import useAuthStore from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const HeaderRoot = () => {
  const avatar = "https://ionicframework.com/docs/img/demos/avatar.svg";

  const pathname = usePathname();
  const router = useRouter();

  const sidebar = useSidebar();
  const menu = useMenu();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const { user, signOut } = useAuth();

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
      className={`bg-neutral-900 py-6 px-8 flex justify-between items-center w-full  z-10 border-b border-neutral-800
       
      `}
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.photoURL ? user.photoURL : avatar} />
                  <AvatarFallback>
                    {user.displayName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-56 bg-neutral-900"
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
                <DropdownMenuGroup>
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Coleção</DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={signOut}>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="gap-4 hidden sm:flex">
            <button
              onClick={loginModal.onOpen}
              className="text-neutral-500 font-medium hover:text-white transition"
            >
              Entrar
            </button>

            <button
              onClick={registerModal.onOpen}
              className="bg-primary-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-600 transition border-2"
            >
              Registrar
            </button>
          </div>
        )}

        <HeaderMenuMobile menu={menu} routes={routes} />
      </div>
    </header>
  );
};
