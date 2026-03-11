import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getRestaurantsByIds } from "@/lib/dishes";
import { distanceMiles, generateBothMapsUrls, PROVIDENCE_CENTER } from "@/lib/geo";

async function getAuthenticatedUser(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return { user: null, supabase };
  return { user, supabase };
}

// GET /api/favorites — list all favorited restaurants for the signed-in user
export async function GET(req: NextRequest) {
  const { user, supabase } = await getAuthenticatedUser(req);
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const userLat = parseFloat(searchParams.get("lat") ?? "");
  const userLng = parseFloat(searchParams.get("lng") ?? "");
  const lat = isFinite(userLat) ? userLat : PROVIDENCE_CENTER.lat;
  const lng = isFinite(userLng) ? userLng : PROVIDENCE_CENTER.lng;

  const { data, error } = await supabase
    .from("user_favorites")
    .select("restaurant_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[GET /api/favorites]", error);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }

  const restaurantIds = data.map((row) => row.restaurant_id);
  const restaurants = getRestaurantsByIds(restaurantIds);

  const withDistance = restaurants.map((r) => {
    const miles = distanceMiles(lat, lng, r.lat, r.lng);
    const maps = generateBothMapsUrls(r.lat, r.lng);
    return {
      id: r.id,
      name: r.name,
      name_zh: r.name_zh,
      address: r.address,
      distance_miles: parseFloat(miles.toFixed(1)),
      review_summary: r.review_summary,
      review_score: r.review_score,
      navigate_url_google: maps.google,
      navigate_url_apple: maps.apple,
      yelp_url: r.yelp_url,
      top_pick: false,
    };
  });

  // Sort by distance
  withDistance.sort((a, b) => a.distance_miles - b.distance_miles);

  return NextResponse.json({
    favorites: withDistance,
    restaurantIds,
  });
}

// POST /api/favorites — add a restaurant to favorites
export async function POST(req: NextRequest) {
  const { user, supabase } = await getAuthenticatedUser(req);
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const restaurantId: string = body?.restaurantId?.trim();

  if (!restaurantId) {
    return NextResponse.json(
      { error: "Missing restaurantId", code: "BAD_REQUEST" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("user_favorites")
    .insert({ user_id: user.id, restaurant_id: restaurantId });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ success: true });
    }
    console.error("[POST /api/favorites]", error);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/favorites — remove a restaurant from favorites
export async function DELETE(req: NextRequest) {
  const { user, supabase } = await getAuthenticatedUser(req);
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const restaurantId: string = body?.restaurantId?.trim();

  if (!restaurantId) {
    return NextResponse.json(
      { error: "Missing restaurantId", code: "BAD_REQUEST" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("user_favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("restaurant_id", restaurantId);

  if (error) {
    console.error("[DELETE /api/favorites]", error);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
