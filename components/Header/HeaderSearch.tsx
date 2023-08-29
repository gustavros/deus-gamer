import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "../ui/input";

export const HeaderSearch = () => {
  const [search, setSearch] = useState("");

  const { data: games } = useFetch();

  const filteredGames = games?.filter((item) => {
    return item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  const closeInputOnBlur = () => {
    if (search === "") return;
  };

  return (
    <>
      <div className="relative">
        <AiOutlineSearch
          size={18}
          className="text-neutral-400 absolute top-3 left-3 z-50"
        />
        <Input
          onBlur={closeInputOnBlur}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="rounded-3xl py-2 pl-10 placeholder:text-neutral-500 bg-neutral-800 w-full md:w-[200px]"
          placeholder="Busque por jogos"
        />

        {search && (
          <div className="absolute top-12 left-0 w-[260px] md:w-[400px] bg-neutral-800 rounded z-50">
            <ul className="text-neutral-500 flex flex-col py-8">
              {filteredGames
                ?.map((item) => (
                  <Link
                    href={`/game/${item.id}`}
                    key={item.id}
                    className="py-2 px-4 hover:bg-neutral-700 cursor-pointer flex items-center gap-4 group"
                    onClick={() => setSearch("")}
                  >
                    <img
                      className="w-24 rounded-lg"
                      src={item.thumbnail}
                      alt={item.title}
                    />

                    <p className="text-neutral-100 font-medium group-hover:underline">
                      {/* bold title when type */}

                      {item.title}
                    </p>
                  </Link>
                ))
                .slice(0, 5)}

              {filteredGames?.length === 0 && (
                <p className="text-neutral-100 text-center">
                  Nenhum jogo encontrado.
                  <p className="text-neutral-300">
                    Você pode tentar buscar por outro título ou{" "}
                    <Link className="text-amber-500" href="/navigation">
                      Navegar.
                    </Link>
                  </p>
                </p>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
