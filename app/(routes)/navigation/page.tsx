import { useFetch } from "@/hooks/useFetch";
import { Categories } from "@/interfaces/Categories";

import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <div>
      <h1>Categorias populares</h1>

      <div className="flex flex-wrap gap-8 p-4 py-20 bg-neutral-900">
        {Categories.map((category) => {
          return (
            <Link
              href={`/category/${category.search}`}
              key={category.search}
              className="bg-amber-700 p-4 rounded border-2 border-amber-800 w-44 h-24 flex items-center justify-center text-center"
            >
              <span>{category.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
