import { NextRequest, NextResponse } from "next/server";
import { getDishesForCity, allDishes, getRestaurantsForDish } from "@/lib/dishes";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const city = searchParams.get("city") || "providence";
  const tag = searchParams.get("tag") || "";

  let dishes = city ? getDishesForCity(city) : allDishes;

  // Filter by cuisine tag category
  if (tag) {
    // Map UI category labels to cuisine_tags
    const tagMap: Record<string, string[]> = {
      "面食": ["面食"],
      "火锅": ["火锅"],
      "点心": ["点心", "饺子"],
      "烧烤": ["新疆菜"],
      "米饭": ["家常菜", "粤菜", "台湾菜"],
    };
    const allowedTags = tagMap[tag];
    if (allowedTags) {
      dishes = dishes.filter((d) => allowedTags.includes(d.cuisine_tag));
    }
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
