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
    <div className="py-24 bg-neutral-900 h-screen px-8">
      <SwiperSlideHeading label="Categorias" handleNext={handleNext} />

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

      <div className="py-4">
        <h1>Conteúdo...</h1>
      </div>
    </div>
  );
};

export default NavigationPage;
