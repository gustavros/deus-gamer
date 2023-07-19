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
            <h1 className="text-5xl font-regular text-left text-neutral-100 py-8 px-10">
              {category.category} 
            </h1>

            <p className="text-neutral-400 font-bold text-center">{category.description}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 px-12 ">
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
