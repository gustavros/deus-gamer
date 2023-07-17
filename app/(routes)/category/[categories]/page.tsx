"use client";

import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";
import { Categories } from "@/interfaces/Categories";
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

  const category = Categories.find(
    (category) => category.search === params.categories
  )?.label;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-neutral-900 py-20">
          <h1 className="text-4xl text-amber-500 py-4 font-bold">
            Categoria: {category}
          </h1>

          <div className="flex flex-wrap gap-2">
            {data?.map((game) => (
              <Link
                href={`/game/${game.id}`}
                key={game.id}
                className="flex flex-col"
              >
                <img src={game.thumbnail} alt={game.title} />
                <p>{game.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryPage;
