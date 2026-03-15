import { NextRequest, NextResponse } from "next/server";
import { getDishesForCity, allDishes, getRestaurantsForDish } from "@/lib/dishes";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const city = searchParams.get("city") || "providence";
  const tag = searchParams.get("tag") || "";

  let dishes = (city ? getDishesForCity(city) : allDishes)
    .filter((d) => d.dish_type !== "ingredient");

  // Filter by dish tag
  if (tag) {
    dishes = dishes.filter((d) => d.tags?.includes(tag));
  }

  // Shuffle and pick up to 12
  const shuffled = [...dishes].sort(() => Math.random() - 0.5).slice(0, 12);

  const result = shuffled.map((d) => ({
    id: d.id,
    name_zh: d.name_zh,
    name_en: d.name_en,
    image_url: d.image_url,
    cuisine_tag: d.cuisine_tag,
    restaurant_count: getRestaurantsForDish(d.id, city).length,
  }));

  return NextResponse.json({ dishes: result });
}
