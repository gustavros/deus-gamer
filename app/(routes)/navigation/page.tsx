import { useFetch } from "@/hooks/useFetch";
import { Categories } from "@/utils/Categories";

import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <div className="py-24 bg-neutral-900 h-full">
      <h1 className="text-4xl">Categorias populares</h1>
      <div className="flex gap-2 py-2 overflow-auto">
        {Categories.map((category) => {
          return (
            <Link
              href={`/category/${category.search}`}
              key={category.search}
              className="border rounded-lg p-4 hover:bg-[#2a2a2a] transition text-neutral-400 hover:text-white flex items-center px-10 text-center"
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
