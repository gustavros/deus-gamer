"use client";

import { Categories } from "@/utils/Categories";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { SwiperSlideHeading } from "@/components/Swiper/SwiperSlideHeading";
import axios from "axios";
import { IGameList } from "@/interfaces/IGameList";
import Loading from "@/components/Loading";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";

const NavigationPage = () => {
  const swiperRef = useRef<any>(null);
  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const [dataSelected, setDataSelected] = useState("release-date");
  const [data, setData] = useState<IGameList[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY_API,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_KEY_HOST,
        },
        params: {
          "sort-by": dataSelected,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dataSelected]);

  return (
    <div className="py-24 bg-neutral-900 px-8">
      {loading ? (
        <Loading />
      ) : (
        <>
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
                <Select
                  onValueChange={(e) => {
                    setDataSelected(e);
                  }}
                >
                  <h2>Mostrar:</h2>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 ">
                    <SelectItem
                      className="bg-neutral-900 hover:bg-neutral-800 transition-all cursor-pointer"
                      value="release-date"
                    >
                      Lançamentos
                    </SelectItem>
                    <SelectItem
                      className="bg-neutral-900 hover:bg-neutral-800 transition-all cursor-pointer"
                      value="alphabetical"
                    >
                      Alfabética
                    </SelectItem>
                    <SelectItem
                      className="bg-neutral-900 hover:bg-neutral-800 transition-all cursor-pointer"
                      value="popularity"
                    >
                      Popularidade
                    </SelectItem>
                    <SelectItem
                      className="bg-neutral-900 hover:bg-neutral-800 transition-all cursor-pointer"
                      value="relevance"
                    >
                      Relevância
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-8">
                <div className="flex flex-wrap gap-4 flex-1">
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
                          className="w-36 rounded sm:w-80"
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

                <div>
                  {/* filtros em breve */}

                  <h2>
                    <span className="text-white">Filtros</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavigationPage;
