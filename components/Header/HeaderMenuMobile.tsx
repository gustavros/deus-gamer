import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { Button } from "../ui/button";
import useAuthentication from "@/hooks/useAuthentication";

interface HeaderMenuMobileProps {
  menu: {
    isOpen: boolean;
    onClose: () => void;
  };

  routes: {
    label: string;
    href: string;
    active: boolean;
  }[];
}

export const HeaderMenuMobile = ({ menu, routes }: HeaderMenuMobileProps) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const { user, logout } = useAuthentication();
  const firstWordUser = user?.name.split(" ")[0].charAt(0).toUpperCase();

  return (
    <>
      {menu.isOpen && (
        <div className="fixed top-0 right-0 z-30 justify-center items-center w-3/6 h-screen bg-neutral-900/90 animate-fade-in sm:hidden">
          <button
            onClick={menu.onClose}
            type="button"
            className="absolute top-7 right-8"
          >
            <AiOutlineClose size={30} color="#fff" />
          </button>

          <div className=" flex flex-col items-center justify-center gap-4 w-full h-full ">
            {routes.map((item) => (
              <Link
                onClick={menu.onClose}
                href={item.href}
                key={item.label}
                className={twMerge(
                  `font-bold uppercase hover:text-neutral-400 transition-all`,
                  item.active && "text-amber-400"
                )}
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <div className="bg-neutral-800 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center border hover:bg-neutral-900 transition-all ">
                    {firstWordUser}
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-46 border-none rounded bg-neutral-800 border-red-500"
                  align="center"
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

                  <DropdownMenuItem>
                    <Link href="/favorites">Favoritos</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-red-400 cursor-pointer"
                    onClick={logout}
                  >
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex flex-col mt-8 gap-2 items-center sm:hidden">
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
          </div>
        </div>
      )}
    </>
  );
};
