"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { IGameList } from "@/interfaces/IGameList";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

import { HeaderRoot } from "@/components/Header/HeaderRoot";
import ShowcaseBox from "@/components/Showcase/ShowcaseBox";

export default function Home() {
  const [gameList, setGameList] = useState<IGameList[]>([]);

  useEffect(() => {
    axios
      .get("https://free-to-play-games-database.p.rapidapi.com/api/games", {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY_API,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_KEY_HOST,
        },
      })
      .then((response) => {
        setGameList(response.data);

        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <HeaderRoot />

      <main className="flex flex-col items-center gap-20 bg-neutral-900 ">
        <div className="flex flex-col justify-center items-center pt-20 w-full">
          <div>
            <div className="flex gap-10">
              <Link href="/game/1">
                <Image
                  src="https://i.ytimg.com/vi/PWe0pC2akpo/maxresdefault.jpg"
                  alt="Banner"
                  className="rounded-lg cursor-pointer"
                  width={1280}
                  height={720}
                />
              </Link>

              <div className="flex flex-col justify-between">
                {gameList
                  .map((game) => (
                    <div
                      key={game.id}
                      className="flex flex-row h-auto items-center text-md font-medium cursor-pointer hover:text-white hover:bg-[#2a2a2a] transition text-neutral-400 rounded-lg"
                    >
                      <Link
                        className="flex items-center gap-2"
                        href={`/game/${game.id}`}
                      >
                        <img
                          src={game.thumbnail}
                          alt={game.short_description}
                          className="h-20 rounded-lg p-2"
                        />

                        <h1 className="px-2">{game.title}</h1>
                      </Link>
                    </div>
                  ))
                  .slice(1, 8)}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 py-12">
            <h1 className="text-xl">Outros jogos</h1>
            <Swiper
              slidesPerView={5}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="swiper w-[1368px] mx-auto "
            >
              {gameList
                .map((game) => {
                  return (
                    <SwiperSlide key={game.id} className="mb-10">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="rounded"
                      />

                      <div className="flex flex-col pt-2">
                        <h1 className="font-bold truncate">{game.title}</h1>
                        <span className="p-1 bg-amber-800 rounded-lg w-fit text-sm">
                          {game.genre}
                        </span>
                      </div>
                    </SwiperSlide>
                  );
                })
                .slice(6, 24)}
            </Swiper>
          </div>

          <div className="grid grid-cols-3 gap-x-10 justify-around m-10">
            <ShowcaseBox
              title="Mais vendidos"
              buttonLabel="Ver mais"
              data={gameList}
            />
            <ShowcaseBox
              title="Mais jogados"
              buttonLabel="Ver mais"
              data={gameList}
            />
            <ShowcaseBox
              title="Mais aguardados"
              buttonLabel="Ver mais"
              data={gameList}
            />
          </div>
        </div>
      </main>
    </>
  );
}
