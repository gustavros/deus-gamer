import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

interface SwiperSlideHeadingProps {
  label: string;

  handleNext: () => void;
}

export const SwiperSlideHeading = ({
  handleNext,
  label,
}: SwiperSlideHeadingProps) => {
  return (
    <div className="flex items-center justify-between my-8 mb-2 w-full">
      <span className="text-lg md:text-2xl font-bold text-neutral-100 block">{label}</span>
      <button
        className="flex items-center gap-2 px-2 rounded-lg h-fit bg-neutral-800 hover:bg-neutral-700 transition md:px-4 md:py-1"
        onClick={handleNext}
      >
        <BsArrowRightShort size={24} />
      </button>
    </div>
  );
};
