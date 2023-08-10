"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

export const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={` relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
      ${outline ? "bg-transparent" : "bg-amber-500"} 
      ${outline ? "border-amber-500" : "border-amber-500"} 
      ${outline ? "text-white" : "text-white"} 
      ${small ? "text-sm" : "text-md"}
      ${small ? "py-1" : "py-3"} 
      ${small ? "font-light" : "font-semibold"} 
      ${small ? "border-[1px]" : "border-2"}`}
    >
      {Icon && (
        <Icon
          size={24}
          className={`
          absolute
          left-3
          ${small ? "top-2" : "top-3"}
          ${small ? "h-3" : undefined}
          `}
        />
      )}
      <span
        className={`
          ${Icon ? "pl-8" : ""}
          ${small ? "text-sm" : "text-md"}
        `}
      >
        {label}
      </span>
    </button>
  );
};
