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
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import useAuthentication from "@/hooks/useAuthentication";

export const HeaderRoot = () => {
  const avatar = "https://ionicframework.com/docs/img/demos/avatar.svg";

  const pathname = usePathname();
  const router = useRouter();

  const sidebar = useSidebar();
  const menu = useMenu();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const { user, logout } = useAuthentication();

  if (!user) {
  }

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
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <p className="text-neutral-600">({user.email})</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-neutral-800">
              <DropdownMenuLabel>{user.name || user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-neutral-400" />
              <DropdownMenuItem>
                <Link href="/favorites">Favoritos</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-400 cursor-pointer"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2 items-center">
            <Button
              onClick={loginModal.onOpen}
              variant="outline"
              className="text-neutral-100 hover:text-white"
            >
              entrar
            </Button>
            <Button
              onClick={registerModal.onOpen}
              variant="default"
              className="text-neutral-900 hover:text-white bg-amber-400"
            >
              cadastrar
            </Button>
          </div>
        )}

        <HeaderMenuMobile menu={menu} routes={routes} />
      </div>
    </header>
  );
};
