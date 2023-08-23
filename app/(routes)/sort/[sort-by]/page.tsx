"use client";

import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";
import { SortBy } from "@/utils/SortBy";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const SortByPage = () => {
  const params = useParams();


  const { data, loading } = useFetch({
    params: {
      "sort-by": params["sort-by"],
    },
  });

  const sort = {
    sort: SortBy.find((sort) => sort.search === params["sort-by"])?.label,
  };

  return (
    <div className="flex flex-col py-24 bg-neutral-900">
      <h1 className="text-5xl font-regular text-left text-neutral-100 py-8 px-10">
        {sort.sort}
      </h1>

      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap items-center gap-8 px-12 ">
          {data?.map((game) => (
            <Link
              href={`/game/${game.id}`}
              key={game.id}
              className="hover:brightness-125 transition-all flex flex-col"
            >
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-96 rounded"
              />

              <span className="uppercase text-neutral-500 text-xs pt-2 font-semibold">
                Jogo base
              </span>
              <p className="font-bold">{game.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortByPage;
