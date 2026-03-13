"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { SearchBar } from "@/components/SearchBar";
import { useAuth } from "@/lib/useAuth";
import { useLanguage } from "@/lib/useLanguage";

type SuggestionDish = { id: string; name_zh: string };

export default function HomePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [suggestions, setSuggestions] = useState<SuggestionDish[]>([]);

  // Check if first-time user
  useEffect(() => {
    const onboarded = localStorage.getItem("chieats_onboarded");
    if (!onboarded) {
      const langChosen = localStorage.getItem("chieats_lang_chosen");
      router.replace(langChosen ? "/onboarding" : "/language");
    }
  }, [router]);

  // Fetch 3 suggestion chips
  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const params = new URLSearchParams();
        if (user) params.set("userId", user.id);
        else {
          const prefs = localStorage.getItem("chieats_preferences");
          if (prefs) params.set("preferences", prefs);
        }
        const res = await fetch(`/api/dishes/recommend?${params}`);
        const data = await res.json();
        setSuggestions(
          (data.dishes ?? []).map((d: { id: string; name_zh: string }) => ({
            id: d.id,
            name_zh: d.name_zh,
          }))
        );
      } catch {
        setSuggestions([]);
      }
    }
    fetchSuggestions();
  }, [user]);

  return (
    <>
      <main className="flex flex-col items-center min-h-screen px-6 pb-28 pt-[30vh]">
        {/* Logo + tagline */}
        <h1 className="text-6xl font-light text-[#1A1A1A] tracking-tight mb-2">
          ChiEats
        </h1>
        <p className="text-sm text-[#AAAAAA] mb-10">
          {t("发现你身边的中国味道", "Discover Chinese flavors near you")}
        </p>

        {/* Search bar */}
        <div className="w-full max-w-sm">
          <SearchBar showButton />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-3">
              {suggestions.map((dish, i) => (
                <span key={dish.id} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-[#D0D0D0] text-xs select-none">
                      ·
                    </span>
                  )}
                  <button
                    onClick={() =>
                      router.push(
                        `/search?q=${encodeURIComponent(dish.name_zh)}`
                      )
                    }
                    className="text-sm text-[#AAAAAA] underline underline-offset-4 decoration-[#D0D0D0] hover:text-[#1A1A1A] hover:decoration-[#1A1A1A] transition-colors"
                  >
                    {dish.name_zh}
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </>
  );
}
