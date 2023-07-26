"use client";

import { Categories } from "@/utils/Categories";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { SwiperSlideHeading } from "@/components/Swiper/SwiperSlideHeading";
import { useFetch } from "@/hooks/useFetch";
import { IGameList } from "@/interfaces/IGameList";

const NavigationPage = () => {
  const swiperRef = useRef<any>(null);
  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const [dataSelected, setDataSelected] = useState("release-date");

  const { data } = useFetch({
    params: {
      "sort-by": dataSelected,
    },
  });

  return (
    <div className="py-24 bg-neutral-900 px-8">
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

      <div className="flex py-16">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Mostrar:</h2>

            <select
              onChange={(e) => setDataSelected(e.target.value)}
              className="bg-neutral-800 text-white p-2 rounded"
            >
              <option value="release-date">Lançamentos</option>
              <option value="alphabetical">Alfabética</option>
              <option value="popularity">Popularidade</option>
              <option value="relevance">Relevância</option>
              <option value="pvp">
                Jogos pvp (player vs player) com mais jogadores
              </option>
            </select>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-wrap gap-4">
              {data?.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={`game/${item.id}`}
                    className="flex flex-col gap-4 h-auto text-md font-medium cursor-pointer hover:text-white hover:bg-[#2a2a2a] transition text-neutral-400 rounded-lg p-2 w-fit"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.short_description}
                      className=" w-36 rounded sm:w-80"
                    />
                    <div className="flex flex-col">
                      <h1 className=" truncate text-white text-sm sm:text-base lg:text-xl w-fit">
                        {item.title}
                      </h1>
                      <span className="text-amber-400 text-sm sm:text-sm">
                        {item.genre}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-wrap justify-center gap-4">Filtros..</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPage;
