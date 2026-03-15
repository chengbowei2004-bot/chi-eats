import { NextRequest, NextResponse } from "next/server";
import { getDishesForCity, allDishes, getRestaurantsForDish } from "@/lib/dishes";
import { featuredDishes } from "@/lib/featuredDishes";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const city = searchParams.get("city") || "providence";
  const tag = searchParams.get("tag") || "";

  const pool = (city ? getDishesForCity(city) : allDishes)
    .filter((d) => d.dish_type === "dish");

  const key = tag || "all";
  const featured = featuredDishes[key] || featuredDishes.all;

  // Match featured names against the dish pool, preserving curated order
  const matched = featured
    .map((name) =>
      pool.find((d) => d.name_zh === name) ||
      pool.find((d) => d.name_zh.includes(name)) ||
      pool.find((d) => name.includes(d.name_zh))
    )
    .filter(Boolean);

  const result = matched.map((d) => ({
    id: d!.id,
    name_zh: d!.name_zh,
    name_en: d!.name_en,
    image_url: d!.image_url,
    cuisine_tag: d!.cuisine_tag,
    restaurant_count: getRestaurantsForDish(d!.id, city).length,
  }));

  return NextResponse.json({ dishes: result });
}
