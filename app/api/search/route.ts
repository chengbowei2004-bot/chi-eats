import { NextRequest, NextResponse } from "next/server";
import { searchDishes } from "@/lib/claude";
import { getDishesByIds, getRestaurantsForDish, getRandomDishes, getRestaurantsByCity, searchRestaurantsByKeyword, allDishes } from "@/lib/dishes";
import { distanceMiles, generateBothMapsUrls, getCityCenter } from "@/lib/geo";

// Simple in-memory rate limiter: max 20 requests per user (by IP) per hour.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 20;
const WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query: string = body?.query?.trim();
    const userLat = parseFloat(body?.lat ?? "");
    const userLng = parseFloat(body?.lng ?? "");
    const sort: string = body?.sort ?? "nearest";
    const city: string = body?.city ?? "providence";

    if (!query) {
      return NextResponse.json(
        { error: "Missing query", code: "BAD_REQUEST" },
        { status: 400 }
      );
    }

    // Rate limit by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later.", code: "RATE_LIMITED" },
        { status: 429 }
      );
    }

    // 1. Claude semantic dish search
    const dishIds = await searchDishes(query);
    const dishes = getDishesByIds(dishIds);

    const center = getCityCenter(city);
    const lat = isFinite(userLat) ? userLat : center.lat;
    const lng = isFinite(userLng) ? userLng : center.lng;

    const cityRestaurantIds = new Set(getRestaurantsByCity(city).map((r) => r.id));

    // 2. Also search restaurant names by keyword
    const nameMatchedRestaurants = searchRestaurantsByKeyword(query, city);

    // If no dishes AND no restaurants match, show alternatives
    if (dishes.length === 0 && nameMatchedRestaurants.length === 0) {
      const alternatives = getRandomDishes(3, { city });
      return NextResponse.json({
        restaurants: [],
        matchedDishes: [],
        alternatives: alternatives.map((d) => ({
          id: d.id,
          name_zh: d.name_zh,
          name_en: d.name_en,
        })),
      });
    }

    type RestaurantEntry = {
      id: string;
      name: string;
      name_zh: string;
      address: string;
      distance_miles: number;
      review_summary: string;
      review_score: number;
      navigate_url_google: string;
      navigate_url_apple: string;
      top_pick: boolean;
      yelp_url?: string;
      dishes_served: string[];
    };

    const restaurantMap = new Map<string, RestaurantEntry>();

    function addRestaurant(r: typeof nameMatchedRestaurants[0], dishName?: string) {
      if (!cityRestaurantIds.has(r.id)) return;
      if (!restaurantMap.has(r.id)) {
        const miles = distanceMiles(lat, lng, r.lat, r.lng);
        const maps = generateBothMapsUrls(r.lat, r.lng);
        restaurantMap.set(r.id, {
          id: r.id,
          name: r.name,
          name_zh: r.name_zh,
          address: r.address,
          distance_miles: parseFloat(miles.toFixed(1)),
          review_summary: r.review_summary,
          review_score: r.review_score,
          navigate_url_google: maps.google,
          navigate_url_apple: maps.apple,
          top_pick: false,
          yelp_url: r.yelp_url,
          dishes_served: dishName ? [dishName] : [],
        });
      } else if (dishName) {
        const existing = restaurantMap.get(r.id)!;
        if (!existing.dishes_served.includes(dishName)) {
          existing.dishes_served.push(dishName);
        }
      }
    }

    // Add restaurants from matched dishes
    for (const dish of dishes) {
      const restaurants = getRestaurantsForDish(dish.id);
      for (const r of restaurants) {
        addRestaurant(r, dish.name_zh);
      }
    }

    // Add restaurants matched by name (find their best dish as context)
    for (const r of nameMatchedRestaurants) {
      if (!restaurantMap.has(r.id)) {
        // Find a representative dish this restaurant serves
        const repDish = allDishes.find(
          (d) => d.dish_type === "dish" && d.available_at.includes(r.id)
        );
        addRestaurant(r, repDish?.name_zh);
      }
    }

    const results = Array.from(restaurantMap.values());

    if (sort === "best_reviewed") {
      results.sort((a, b) => b.review_score - a.review_score);
    } else {
      results.sort((a, b) => a.distance_miles - b.distance_miles);
    }

    const top = results.slice(0, 8);
    if (top.length > 0) top[0].top_pick = true;

    return NextResponse.json({
      restaurants: top,
      matchedDishes: dishes.map((d) => ({
        id: d.id,
        name_zh: d.name_zh,
        name_en: d.name_en,
      })),
      alternatives: [],
    });
  } catch (err) {
    console.error("[/api/search]", err);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
