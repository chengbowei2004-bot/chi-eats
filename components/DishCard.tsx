"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/useLanguage";
import type { Dish } from "@/lib/dishes";

type Props = {
  dish: Dish;
};

function DishImage({ src, alt, cuisineTag }: { src: string; alt: string; cuisineTag: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="w-full aspect-video bg-[#F0F0F0] flex items-center justify-center">
        <span className="text-[#6B6B6B] text-sm tracking-wide">{cuisineTag}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="w-full aspect-video object-cover"
    />
  );
}

export function DishCard({ dish }: Props) {
  const { t } = useLanguage();

  return (
    <Link
      href={`/dish/${dish.id}`}
      className="block bg-white rounded-xl border border-[#E5E5E5] overflow-hidden active:scale-[0.98] transition-transform duration-100"
    >
      <DishImage src={dish.image_url} alt={dish.name_en} cuisineTag={dish.cuisine_tag} />
      <div className="p-4">
        <p className="text-[#1A1A1A] text-lg font-semibold leading-tight truncate">
          {t(dish.name_zh, dish.name_en)}
        </p>
        <p className="text-[#6B6B6B] text-sm leading-tight truncate mt-0.5">
          {t(dish.name_en, dish.name_zh)}
        </p>
        <p className="text-[#6B6B6B] text-xs mt-2 line-clamp-2 leading-relaxed">
          {t(dish.description_zh, dish.description_en)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="inline-block bg-[#F0F0F0] text-[#6B6B6B] text-xs px-2 py-0.5 rounded-full">
            {dish.cuisine_tag}
          </span>
          {dish.flavor_tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-block bg-[#F0F0F0] text-[#6B6B6B] text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
