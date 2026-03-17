import { NextRequest, NextResponse } from "next/server";
import { searchDishes } from "@/lib/claude";
import { getDishesByIds, getRestaurantsForDish, getRandomDishes, getRestaurantsByCity, searchRestaurantsByKeyword, allDishes, weightedKeywordSearch, getRestaurantById, getDishById } from "@/lib/dishes";
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

    const center = getCityCenter(city);
    const lat = isFinite(userLat) ? userLat : center.lat;
    const lng = isFinite(userLng) ? userLng : center.lng;

    const cityRestaurantIds = new Set(getRestaurantsByCity(city).map((r) => r.id));

    // 1. Weighted keyword search (instant, no API call)
    const keywordResults = weightedKeywordSearch(query, city);

    // 2. Claude semantic dish search (async, may fail gracefully)
    let claudeDishIds: string[] = [];
    try {
      claudeDishIds = await searchDishes(query);
    } catch {
      // Claude search failure is non-fatal; keyword results still work
    }
    const claudeDishes = getDishesByIds(claudeDishIds);

    // If no keyword results AND no Claude results, show alternatives
    if (keywordResults.length === 0 && claudeDishes.length === 0) {
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
      price_per_person?: number;
      navigate_url_google: string;
      navigate_url_apple: string;
      top_pick: boolean;
      yelp_url?: string;
      dishes_served: string[];
    };

    const restaurantMap = new Map<string, RestaurantEntry>();

    function addRestaurantEntry(rId: string, dishName?: string) {
      const r = getRestaurantById(rId);
      if (!r || !cityRestaurantIds.has(r.id)) return;
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
          price_per_person: r.price_per_person,
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

    // Add restaurants from weighted keyword search (highest score first)
    for (const kr of keywordResults) {
      addRestaurantEntry(kr.restaurantId, kr.dishNameZh || undefined);
    }

    // Merge Claude results (adds any restaurants keyword search missed)
    for (const dish of claudeDishes) {
      const restaurants = getRestaurantsForDish(dish.id);
      for (const r of restaurants) {
        addRestaurantEntry(r.id, dish.name_zh);
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

    // Collect all unique matched dishes for the response
    const matchedDishIds = new Set<string>();
    for (const kr of keywordResults) {
      if (kr.dishId) matchedDishIds.add(kr.dishId);
    }
    for (const d of claudeDishes) {
      matchedDishIds.add(d.id);
    }
    const allMatchedDishes = Array.from(matchedDishIds)
      .map((id) => getDishById(id))
      .filter(Boolean)
      .map((d) => ({ id: d!.id, name_zh: d!.name_zh, name_en: d!.name_en }));

    return NextResponse.json({
      restaurants: top,
      matchedDishes: allMatchedDishes,
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
