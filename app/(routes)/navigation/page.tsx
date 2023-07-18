"use client";

import { Categories } from "@/utils/Categories";

import Link from "next/link";
import React, { useRef } from "react";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { SwiperSlideHeading } from "@/components/Swiper/SwiperSlideHeading";
import { BsArrowRightShort } from "react-icons/bs";

const NavigationPage = () => {
  const swiperRef = useRef<any>(null);

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  return (
    <div className="py-24 bg-neutral-900 h-full">
      <div className="flex flex-col w-[1590px] mx-auto">
        <div className="flex justify-between py-8">
          <SwiperSlideHeading>Categorias populares</SwiperSlideHeading>
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
          className="swiper w-[1590px] mx-auto"
          slideNextClass="swiper-button-next"
          slidePrevClass="swiper-button-prev"
          navigation={true}
        >
          {Categories.map((category) => {
            return (
              <SwiperSlide key={category.search}>
                <Link
                  href={`/category/${category.search}`}
                  key={category.search}
                  className="border w-full p-6 flex items-center justify-center hover:bg-neutral-800 transition-all rounded text-center font-bold"
                >
                  <span>{category.label}</span>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="">
        <h1>Conteúdo...</h1>
      </div>
    </div>
  );
};

export default NavigationPage;
