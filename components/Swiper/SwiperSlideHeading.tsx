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
    <div className="flex justify-between my-8 mb-2 w-full">
      <span className="text-2xl font-bold text-neutral-100 block">{label}</span>
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
        onClick={handleNext}
      >
        <BsArrowRightShort size={24} />
      </button>
    </div>
  );
};
