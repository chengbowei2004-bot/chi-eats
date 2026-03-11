import { NextRequest, NextResponse } from "next/server";
import { getDishById, getRestaurantsForDish, getSimilarDishes } from "@/lib/dishes";
import { distanceMiles, generateBothMapsUrls, PROVIDENCE_CENTER } from "@/lib/geo";

type RestaurantWithDistance = {
  id: string;
  name: string;
  name_zh: string;
  address: string;
  lat: number;
  lng: number;
  cuisine_tags: string[];
  review_summary: string;
  review_score: number;
  distance_miles: number;
  navigate_url_google: string;
  navigate_url_apple: string;
  top_pick: boolean;
  yelp_url?: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ dishId: string }> }
) {
  try {
    const { dishId } = await params;
    const { searchParams } = new URL(req.url);

    const userLat = parseFloat(searchParams.get("lat") ?? "");
    const userLng = parseFloat(searchParams.get("lng") ?? "");
    const sort = searchParams.get("sort") ?? "nearest"; // "nearest" | "best_reviewed"

    // Use GPS if valid, otherwise fall back to Providence center
    const lat = isFinite(userLat) ? userLat : PROVIDENCE_CENTER.lat;
    const lng = isFinite(userLng) ? userLng : PROVIDENCE_CENTER.lng;

    const dish = getDishById(dishId);
    if (!dish) {
      return NextResponse.json(
        { error: "Dish not found", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    const restaurants = getRestaurantsForDish(dishId);

    const withDistance: RestaurantWithDistance[] = restaurants.map((r) => {
      const miles = distanceMiles(lat, lng, r.lat, r.lng);
      const maps = generateBothMapsUrls(r.lat, r.lng);
      return {
        ...r,
        distance_miles: parseFloat(miles.toFixed(1)),
        navigate_url_google: maps.google,
        navigate_url_apple: maps.apple,
        top_pick: false,
      };
    });

    // Sort
    if (sort === "best_reviewed") {
      withDistance.sort((a, b) => b.review_score - a.review_score);
    } else {
      withDistance.sort((a, b) => a.distance_miles - b.distance_miles);
    }

    // Cap at 5 and mark the top pick
    const top5 = withDistance.slice(0, 5);
    if (top5.length > 0) top5[0].top_pick = true;

    // If no restaurants, surface alternative dishes by flavor_tag overlap
    const alternatives = top5.length === 0 ? getSimilarDishes(dish, 3) : [];

    return NextResponse.json({
      dish: { id: dish.id, name_en: dish.name_en, name_zh: dish.name_zh, image_url: dish.image_url },
      restaurants: top5,
      alternatives,
    });
  } catch (err) {
    console.error("[/api/restaurants/[dishId]]", err);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
