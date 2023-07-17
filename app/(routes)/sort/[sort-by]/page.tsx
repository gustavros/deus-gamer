"use client";

import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";
import { SortBy } from "@/utils/SortBy";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const SortByPage = () => {
  const params = useParams();

  console.log(params);

  const { data, loading } = useFetch({
    params: {
      "sort-by": params["sort-by"],
    },
  });

  const sort = {
    sort: SortBy.find((sort) => sort.search === params["sort-by"])?.label,
  };

  return (
    <div className="flex flex-col items-center justify-center py-24 bg-neutral-900">
      <h1 className="text-4xl font-bold text-center text-neutral-100 py-8">
        {sort.sort}
      </h1>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-4 place-items-center gap-4">
          {data?.map((game) => (
            <Link href={`/game/${game.id}`} key={game.id}>
              <img src={game.thumbnail} alt={game.title} className="w-96" />
              <p>{game.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortByPage;
