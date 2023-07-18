"use client";

import Image from "next/image";
import Link from "next/link";

import { ShowcaseBox } from "@/components/Showcase/ShowcaseBox";
import SwiperSlideRoot from "@/components/Swiper/SwiperSlideRoot";
import Loading from "@/components/Loading";

import { useFetch } from "@/hooks/useFetch";

export default function Home() {
  const { data: games, loading } = useFetch();

  const { data: social } = useFetch({
    params: {
      category: "social",
      "sort-by": "popularity",
    },
  });

  const { data: fps } = useFetch({
    params: {
      category: "shooter",
      "sort-by": "popularity",
    },
  });

  const { data: popular } = useFetch({
    params: {
      "sort-by": "popularity",
    },
  });

  const { data: relevance } = useFetch({
    params: {
      "sort-by": "release",
    },
  });

  const { data: releases } = useFetch({
    params: {
      "sort-by": "release-date",
    },
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="flex flex-col items-center gap-20 bg-neutral-900 py-8">
          <div className="flex flex-col justify-center items-center pt-20 w-full">
            {/* hero */}
            <div>
              <div className="flex gap-10">
                <Link href={`/game/${games?.map((game) => game.id).at(0)}`}>
                  <Image
                    src="https://i.ytimg.com/vi/PWe0pC2akpo/maxresdefault.jpg"
                    alt="Banner"
                    className="rounded-lg cursor-pointer"
                    width={1200}
                    height={720}
                  />
                </Link>

                <div className="flex flex-col justify-between">
                  {games
                    ?.map((game) => (
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
              <SwiperSlideRoot data={games} label="Outros jogos" />
            </div>

            <div className="grid grid-cols-3 gap-x-10 justify-around m-10">
              <ShowcaseBox
                href="/sort/relevance"
                title="Mais relevantes"
                buttonLabel="Ver mais"
                data={relevance}
              />
              <ShowcaseBox
                href="/sort/release-date"
                title="Jogos lançamentos"
                buttonLabel="Ver mais"
                data={releases}
              />
              <ShowcaseBox
                href="/sort/popularity"
                title="Mais jogados"
                buttonLabel="Ver mais"
                data={popular}
              />
            </div>

            <SwiperSlideRoot data={fps} label="Jogos de FPS" />

            <SwiperSlideRoot data={social} label="Jogos com interação social" />
          </div>
        </main>
      )}
    </>
  );
}
