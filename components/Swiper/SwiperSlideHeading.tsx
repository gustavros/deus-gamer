import React, { ReactNode } from "react";

interface SwiperSlideHeadingProps {
  children: ReactNode;
}

export const SwiperSlideHeading = ({ children }: SwiperSlideHeadingProps) => {
  return <h1 className="font-bold text-xl ">{children}</h1>;
};
