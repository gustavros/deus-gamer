import Link from "next/link";
import React, { ReactElement } from "react";
import { IconType } from "react-icons";

import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon?: IconType;
  label?: string;
  active?: boolean;
  href: string;
  className?: string;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  active,
  href,
  className,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto items-center gap-x-7 text-md font-medium cursor-pointer hover:text-white hover:bg-[#2a2a2a] transition text-neutral-400 p-3 px-4 mx-4 mb-1 rounded-lg`,
        active && "text-white bg-[#373737]",
        className
      )}
    >
      {Icon && <Icon size={23} />}

      <p className="truncate">{label}</p>
    </Link>
  );
};
