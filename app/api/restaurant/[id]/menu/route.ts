import { NextRequest, NextResponse } from "next/server";
import { getRestaurantById, allDishes } from "@/lib/dishes";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const restaurant = getRestaurantById(id);
  if (!restaurant) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Try dedicated menu JSON first (has prices, categories, etc.)
  const menuPath = join(process.cwd(), "data", "menus", `${id}.json`);
  if (existsSync(menuPath)) {
    const items = JSON.parse(readFileSync(menuPath, "utf8"));
    return NextResponse.json({
      restaurant: { name: restaurant.name, name_zh: restaurant.name_zh },
      items,
      source: "menu",
    });
  }

  // Fall back to dishes.json — filter by available_at, exclude raw/adventurous
  const dishes = allDishes.filter(
    (d) =>
      d.available_at.includes(id) &&
      d.dish_type !== "ingredient" &&
      d.dish_type !== "adventurous"
  );

  const items = dishes.map((d) => ({
    name_zh: d.name_zh,
    name_en: d.name_en,
    price: 0,
    category_zh: d.cuisine_tag,
    category_en: d.cuisine_tag,
    description_zh: d.description_zh,
    description_en: d.description_en,
    is_popular: false,
    spicy_level: d.flavor_tags?.includes("spicy") || d.flavor_tags?.includes("numbing") ? 1 : 0,
  }));

  return NextResponse.json({
    restaurant: { name: restaurant.name, name_zh: restaurant.name_zh },
    items,
    source: "dishes",
  });
}
