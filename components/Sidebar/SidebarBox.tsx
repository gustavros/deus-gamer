import React from "react";

import { twMerge } from "tailwind-merge";

interface SidebarBoxProps {
  children: React.ReactNode;
  className?: string;

}

export const SidebarBox = ({ children, className }: SidebarBoxProps) => {
  return (
    <div
      className={twMerge(`bg-neutral-900 h-fit w-full`, className)}
    >
      {children}
    </div>
  );
};
