"use client";

import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";
import { Categories } from "@/utils/Categories";

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const CategoryPage = () => {
  const params = useParams();

  const { data, loading } = useFetch({
    params: {
      category: params.categories,
    },
  });

  const category = {
    description: Categories.find(
      (category) => category.search === params.categories
    )?.description,
    category: Categories.find(
      (category) => category.search === params.categories
    )?.label,
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-neutral-900 py-24 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl text-amber-400  font-bold shadow">
              {category.category}
            </h1>

            <p className="text-neutral-400 font-bold">{category.description}</p>
          </div>
          <div className="grid grid-cols-4 place-items-center gap-4">
            {data?.map((game) => (
              <Link
                href={`/game/${game.id}`}
                key={game.id}
                className="hover:brightness-125 transition-all flex flex-col"
              >
                <img
                  className="rounded-lg cursor-pointer"
                  src={game.thumbnail}
                  alt={game.title}
                />
                <span className=" text-neutral-400 pt-2 text-sm rounded w-fit">
                  Jogo gratuito
                </span>
                <p className="font-bold">{game.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryPage;
