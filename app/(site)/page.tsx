"use client";

import Image from "next/image";
import Link from "next/link";

import { ShowcaseBox } from "@/components/Showcase/ShowcaseBox";

import { useFetch } from "@/hooks/useFetch";

import { SwiperSlideRoot } from "@/components/Swiper/SwiperSlideRoot";
import Loading from "@/components/Loading";
import { useEffect } from "react";

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
        <main className="flex flex-col items-center gap-20 bg-neutral-900 py-4 2xl:py-8">
          <div className="flex flex-col justify-center items-center pt-20 w-full">
            {/* hero */}
            <div className="flex flex-col 2xl:flex-row gap-8 px-8">
              <Link href={`/game/${games?.map((game) => game.id).at(0)}`}>
                <Image
                  src="https://i.ytimg.com/vi/PWe0pC2akpo/maxresdefault.jpg"
                  alt="Banner"
                  className="rounded-lg cursor-pointer "
                  width={880}
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
                  .slice(1, 6)}
              </div>
            </div>

            <SwiperSlideRoot
              label="Jogos com interações sociais"
              data={social}
            />

            <div className="grid md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8 place-items-center m-10 sm:px-0 w-full">
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

            <SwiperSlideRoot label="Jogos de FPS mais jogado" data={fps} />
          </div>
        </main>
      )}
    </>
  );
}
