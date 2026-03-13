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
      router.replace("/onboarding");
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
      <main className="flex flex-col items-center justify-center min-h-screen px-5 pb-24">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight mb-10">
          ChiEats
        </h1>

        {/* Search bar */}
        <div className="w-full max-w-sm">
          <SearchBar showButton />
        </div>

        {/* Suggestion chips */}
        {suggestions.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-[#6B6B6B] text-xs mb-3">
              {t("试试这些：", "Try these:")}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((dish) => (
                <button
                  key={dish.id}
                  onClick={() =>
                    router.push(
                      `/search?q=${encodeURIComponent(dish.name_zh)}`
                    )
                  }
                  className="h-8 px-4 rounded-full border border-[#E5E5E5] bg-white text-[#1A1A1A] text-sm hover:bg-[#F0F0F0] transition-colors"
                >
                  {dish.name_zh}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </>
  );
}
