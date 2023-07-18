import React, { useEffect, useRef } from "react";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperSlideItem } from "./SwiperSlideItem";
import { SwiperSlideHeading } from "./SwiperSlideHeading";
import { IGameList } from "@/interfaces/IGameList";
import { BsArrowRightShort } from "react-icons/bs";

interface SwiperSlideRootProps {
  data: IGameList[] | null;
  label: string;
}

const SwiperSlideRoot = ({ data, label }: SwiperSlideRootProps) => {
  const swiperRef = useRef<any>(null);

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  return (
    <div className="flex flex-col gap-2 py-12">
      <div className="flex justify-between w-full">
        <SwiperSlideHeading>{label}</SwiperSlideHeading>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
          onClick={handleNext}
        >
          <BsArrowRightShort size={24} />
        </button>
      </div>
      <Swiper
        ref={swiperRef}
        slidesPerView={5}
        spaceBetween={20}
        loop={true}
        className="swiper w-[1590px] mx-auto "
        slideNextClass="swiper-button-next"
        slidePrevClass="swiper-button-prev"
        navigation={true}
        autoplay={{
          delay: 1000,
        }}
      >
        {data
          ?.map((game) => {
            return (
              <SwiperSlide key={game.id} className="mb-10">
                <SwiperSlideItem game={game} />
              </SwiperSlide>
            );
          })
          .slice(0, data.length)}
      </Swiper>
    </div>
  );
};

export default SwiperSlideRoot;
