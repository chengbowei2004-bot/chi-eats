"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { SearchBar } from "@/components/SearchBar";
import { useAuth } from "@/lib/useAuth";
import { useLanguage } from "@/lib/useLanguage";
import { useCity, type City } from "@/lib/useCity";

type SuggestionDish = { id: string; name_zh: string };

export default function HomePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { city, setCity, cityLabel } = useCity();
  const router = useRouter();

  const [suggestions, setSuggestions] = useState<SuggestionDish[]>([]);

  // Check if first-time user
  useEffect(() => {
    const onboarded = localStorage.getItem("deedao_onboarded");
    if (!onboarded) {
      const langChosen = localStorage.getItem("deedao_lang_chosen");
      router.replace(langChosen ? "/onboarding" : "/language");
    }
  }, [router]);

  // Fetch 3 suggestion chips
  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const params = new URLSearchParams();
        params.set("city", city);
        if (user) params.set("userId", user.id);
        else {
          const prefs = localStorage.getItem("deedao_preferences");
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
  }, [user, city]);

  function toggleCity() {
    setCity(city === "providence" ? "boston" : "providence");
  }

  return (
    <>
      <main className="flex flex-col items-center min-h-screen px-6 pb-28 pt-[30vh]">
        {/* Logo + tagline */}
        <h1 className="text-6xl font-light text-gray-900 tracking-tight mb-2">
          DeeDao
        </h1>
        <p className="text-sm text-gray-400 tracking-wider mb-1">
          {t("以菜寻味，以味寻道。", "以菜寻味，以味寻道。")}
        </p>
        <p className="text-xs text-gray-300 italic mb-6">
          Search the dish. Find the authentic.
        </p>

        {/* City picker */}
        <button
          onClick={toggleCity}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors mb-8"
        >
          <MapPin size={14} strokeWidth={1.5} />
          <span>{t(cityLabel.zh, cityLabel.en)}</span>
          <span className="text-gray-300">|</span>
          <span className="underline underline-offset-2">
            {t("切换城市", "Switch")}
          </span>
        </button>

        {/* Search bar */}
        <div className="w-full max-w-sm">
          <SearchBar showButton />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-300 tracking-wide mb-2">
              {t("不知道吃什么？试试这些", "Not sure what to eat? Try these")}
            </p>
            <div className="flex items-center justify-center gap-3">
              {suggestions.map((dish, i) => (
                <span key={dish.id} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-gray-300 text-xs select-none">
                      ·
                    </span>
                  )}
                  <button
                    onClick={() =>
                      router.push(
                        `/search?q=${encodeURIComponent(dish.name_zh)}`
                      )
                    }
                    className="text-sm text-gray-400 underline underline-offset-4 decoration-gray-300 hover:text-gray-900 hover:decoration-gray-900 transition-colors"
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
