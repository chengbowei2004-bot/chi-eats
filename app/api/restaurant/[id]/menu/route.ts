import { NextRequest, NextResponse } from "next/server";
import { getRestaurantById } from "@/lib/dishes";
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

  // Try to load menu JSON from data/menus/<id>.json
  const menuPath = join(process.cwd(), "data", "menus", `${id}.json`);
  let items: unknown[] = [];
  if (existsSync(menuPath)) {
    items = JSON.parse(readFileSync(menuPath, "utf8"));
  }

  return NextResponse.json({
    restaurant: { name: restaurant.name, name_zh: restaurant.name_zh },
    items,
  });
}
