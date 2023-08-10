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
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

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

  const { user, signOut } = useAuth();

  const avatar = "https://ionicframework.com/docs/img/demos/avatar.svg";

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.photoURL ? user.photoURL : avatar} />
                    <AvatarFallback>
                      {user.displayName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-46" align="center" forceMount>
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

                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-neutral-800 transition"
                    onClick={signOut}
                  >
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex flex-col gap-4 pt-8">
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
          </div>
        </div>
      )}
    </>
  );
};
