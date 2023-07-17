import React from "react";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperSlideItem } from "./SwiperSlideItem";
import { SwiperSlideHeading } from "./SwiperSlideHeading";
import { IGameList } from "@/interfaces/IGameList";

interface SwiperSlideRootProps {
  data: IGameList[] | null;
  label: string;
}

const SwiperSlideRoot = ({ data, label }: SwiperSlideRootProps) => {
  return (
    <div className="flex flex-col gap-2 py-12">
      <SwiperSlideHeading>{label}</SwiperSlideHeading>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        className="swiper w-[1540px] mx-auto "
      >
        {data
          ?.map((game) => {
            return (
              <SwiperSlide key={game.id} className="mb-10">
                <SwiperSlideItem game={game} />
              </SwiperSlide>
            );
          })
          .slice(0, Math.random() * 200)}
      </Swiper>
    </div>
  );
};

export default SwiperSlideRoot;
