import React, { useRef } from "react";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { IGameList } from "@/interfaces/IGameList";
import { SwiperSlideItem } from "./SwiperSlideItem";
import { SwiperSlideHeading } from "./SwiperSlideHeading";

interface SwiperSlideProps {
  data: IGameList[] | null;
  label: string;
}

export const SwiperSlideRoot = ({ data, label }: SwiperSlideProps) => {
  const swiperRef = useRef<any>(null);

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  return (
    <div className="w-[calc(100%-4rem)] 2xl:w-[calc(100%-10rem)] md:w-[calc(100%-8rem)]  sm:w-[calc(100%-4rem)] py-8">
      <SwiperSlideHeading handleNext={handleNext} label={label} />

      <Swiper
        ref={swiperRef}
        slidesPerView={5}
        spaceBetween={20}
        loop={true}
        className="swiper"
        slideNextClass="swiper-button-next"
        slidePrevClass="swiper-button-prev"
        navigation={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
      >
        {data?.map((game) => {
          return (
            <SwiperSlide key={game.id}>
              <SwiperSlideItem game={game} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
