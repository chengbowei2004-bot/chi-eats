import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

// Handles the OAuth redirect from Supabase (Google sign-in and magic link).
// Supabase redirects here with a `code` param which we exchange for a session.
export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    console.error("[/api/auth/callback] exchangeCodeForSession error:", error);
  }

  // Something went wrong — redirect to home with an error flag
  return NextResponse.redirect(`${origin}/?auth_error=1`);
}
