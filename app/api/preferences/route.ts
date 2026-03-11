import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

async function getAuthenticatedUser(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return { user: null, supabase };
  return { user, supabase };
}

// GET /api/preferences — get the signed-in user's cuisine preferences
export async function GET(req: NextRequest) {
  const { user, supabase } = await getAuthenticatedUser(req);
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from("user_preferences")
    .select("cuisines")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows found — that's fine for new users
    console.error("[GET /api/preferences]", error);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }

  return NextResponse.json({ preferences: data?.cuisines ?? [] });
}

// PUT /api/preferences — upsert cuisine preferences for the signed-in user
export async function PUT(req: NextRequest) {
  const { user, supabase } = await getAuthenticatedUser(req);
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const preferences = body?.preferences;

  if (!Array.isArray(preferences)) {
    return NextResponse.json(
      { error: "preferences must be an array of strings", code: "BAD_REQUEST" },
      { status: 400 }
    );
  }

  const cuisines = preferences.filter((p): p is string => typeof p === "string");

  const { error } = await supabase
    .from("user_preferences")
    .upsert(
      { user_id: user.id, cuisines },
      { onConflict: "user_id" }
    );

  if (error) {
    console.error("[PUT /api/preferences]", error);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
