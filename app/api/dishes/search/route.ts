import { NextRequest, NextResponse } from "next/server";
import { searchDishes } from "@/lib/claude";
import { getDishesByIds } from "@/lib/dishes";

// Simple in-memory rate limiter: max 20 requests per user (by IP) per hour.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 20;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

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

    const dishIds = await searchDishes(query);

    if (dishIds.length === 0) {
      return NextResponse.json({ dishes: [], message: "No matching dishes found" });
    }

    const dishes = getDishesByIds(dishIds);
    return NextResponse.json({ dishes });
  } catch (err) {
    console.error("[/api/dishes/search]", err);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
