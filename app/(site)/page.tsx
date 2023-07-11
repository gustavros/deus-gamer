"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { IGameList } from "@/interfaces/IGameList";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";

import { HeaderRoot } from "@/components/Header/HeaderRoot";
import ShowcaseBox from "@/components/Showcase/ShowcaseBox";
import { SwiperSlideItem } from "@/components/Swiper/SwiperSlideItem";

export default function Home() {
  const [gameList, setGameList] = useState<IGameList[]>([]);
  const [releaseGameList, setReleaseGameList] = useState<IGameList[]>([]);
  const [popularGameList, setPopularGameList] = useState<IGameList[]>([]);
  const [fpsGameList, setFpsGameList] = useState<IGameList[]>([]);
  const [pvpGameList, setPvpGameList] = useState<IGameList[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";

  const fetchData = async (params: { [key: string]: any }) => {
    try {
      const response = await axios.get(url, {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_KEY_API,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_KEY_HOST,
        },
        params: {
          ...params,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      const games = await fetchData({});
      if (games) {
        setGameList(games);
      }
    };

    const fetchReleaseGames = async () => {
      const releaseGames = await fetchData({ "sort-by": "release-date" });
      if (releaseGames) {
        setReleaseGameList(releaseGames);
      }
    };

    const fetchPopularGames = async () => {
      const popularGames = await fetchData({ "sort-by": "popularity" });
      if (popularGames) {
        setPopularGameList(popularGames);
      }
    };

    const fetchFpsGames = async () => {
      const fpsGames = await fetchData({ category: "shooter" });

      if (fpsGames) {
        setFpsGameList(fpsGames);
      }
    };

    const fetchPvpGameList = async () => {
      const pvpGames = await fetchData({
        category: "racing",
        "sort-by": "alphabetical",
      });

      if (pvpGames) {
        setPvpGameList(pvpGames);
      }
    };

    fetchGames();
    fetchReleaseGames();
    fetchPopularGames();
    fetchFpsGames();
    fetchPvpGameList();
  }, []);

  return (
    <>
      <HeaderRoot />

      {loading ? (
        <div
          role="status"
          className=" bg-neutral-900 flex items-center justify-center w-full h-screen"
        >
          <svg
            aria-hidden="true"
            className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-amber-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <main className="flex flex-col items-center gap-20 bg-neutral-900 ">
          <div className="flex flex-col justify-center items-center pt-20 w-full">
            <div>
              <div className="flex gap-10">
                <Link href={`/game/${gameList[0]?.id}`}>
                  <Image
                    src="https://i.ytimg.com/vi/PWe0pC2akpo/maxresdefault.jpg"
                    alt={gameList[0]?.title}
                    className="rounded-lg cursor-pointer"
                    width={1200}
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
                className="swiper w-[1540px] mx-auto "
              >
                {gameList
                  .map((game) => {
                    return (
                      <SwiperSlide key={game.id} className="mb-10">
                        <SwiperSlideItem game={game} />
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
                data={popularGameList}
              />
              <ShowcaseBox
                title="Jogos lançamentos"
                buttonLabel="Ver mais"
                data={releaseGameList}
              />
            </div>

            <div className="flex flex-col gap-2 py-12">
              <h1 className="text-xl">Jogos de FPS</h1>
              <Swiper
                slidesPerView={5}
                spaceBetween={20}
                className="swiper w-[1540px] mx-auto "
              >
                {fpsGameList
                  .map((game) => {
                    return (
                      <SwiperSlide key={game.id} className="mb-10">
                        <SwiperSlideItem game={game} />
                      </SwiperSlide>
                    );
                  })
                  .slice(0, Math.random() * 200)}
              </Swiper>
            </div>

            <div className="flex flex-col gap-2 py-12">
              <h1 className="text-xl">Jogos de corrida</h1>
              <Swiper
                slidesPerView={5}
                spaceBetween={20}
                className="swiper w-[1540px] mx-auto "
              >
                {pvpGameList
                  .map((game) => {
                    return (
                      <SwiperSlide key={game.id} className="mb-10">
                        <SwiperSlideItem game={game} />
                      </SwiperSlide>
                    );
                  })
                  .slice(0, Math.random() * 200)}
              </Swiper>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
