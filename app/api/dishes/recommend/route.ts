import { NextRequest, NextResponse } from "next/server";
import { getRandomDishes } from "@/lib/dishes";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const preferencesParam = searchParams.get("preferences"); // e.g. "川菜,火锅"
    const city = searchParams.get("city") ?? "providence";

    let cuisineTags: string[] | undefined;

    // If userId is provided, fetch preferences from Supabase
    if (userId) {
      try {
        const supabase = createSupabaseAdminClient();
        const { data } = await supabase
          .from("user_preferences")
          .select("cuisines")
          .eq("user_id", userId)
          .single();

        if (data?.cuisines?.length > 0) {
          cuisineTags = data.cuisines;
        }
      } catch {
        // Non-fatal — fall through to unfiltered recommendations
      }
    }

    // Fall back to query-param preferences (for unauthenticated users post-onboarding)
    if (!cuisineTags && preferencesParam) {
      cuisineTags = preferencesParam.split(",").map((t) => t.trim()).filter(Boolean);
    }

    const dishes = getRandomDishes(3, { cuisineTags, city });
    return NextResponse.json({ dishes });
  } catch (err) {
    console.error("[/api/dishes/recommend]", err);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
