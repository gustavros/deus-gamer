import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

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
  return (
    <>
      {menu.isOpen && (
        <div className="absolute top-0 right-0 z-30 justify-center items-center w-3/6 h-screen bg-neutral-900/90 animate-fade-in sm:hidden">
          <button
            onClick={menu.onClose}
            type="button"
            className="absolute top-7 right-8"
          >
            <AiOutlineClose size={30} color="#fff" />
          </button>

          <div className=" flex flex-col items-center justify-center gap-20 w-full h-full ">
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
          </div>
        </div>
      )}
    </>
  );
};
