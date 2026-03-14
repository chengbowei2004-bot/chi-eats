"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import { DishPlaceholder } from "@/components/DishPlaceholder";
import { useAuth } from "@/lib/useAuth";
import { useCity } from "@/lib/useCity";

type BrowseDish = {
  id: string;
  name_zh: string;
  name_en: string;
  image_url: string;
  cuisine_tag: string;
  restaurant_count: number;
};

const CATEGORIES = [
  { label: "全部", tag: "" },
  { label: "面食", tag: "面食" },
  { label: "火锅", tag: "火锅" },
  { label: "点心", tag: "点心" },
  { label: "烧烤", tag: "烧烤" },
  { label: "米饭", tag: "米饭" },
];

export default function HomePage() {
  const { user } = useAuth();
  const { city, cityLabel } = useCity();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [dishes, setDishes] = useState<BrowseDish[]>([]);

  // Splash / onboarding redirect
  useEffect(() => {
    const splashSeen = sessionStorage.getItem("deedao_splash_seen");
    if (!splashSeen) {
      router.replace("/splash");
      return;
    }
    const onboarded = localStorage.getItem("deedao_onboarded");
    if (!onboarded) {
      const langChosen = localStorage.getItem("deedao_lang_chosen");
      router.replace(langChosen ? "/onboarding" : "/language");
    }
  }, [router]);

  // Fetch browse dishes
  useEffect(() => {
    const params = new URLSearchParams({ city });
    if (activeTag) params.set("tag", activeTag);
    fetch(`/api/dishes/browse?${params}`)
      .then((r) => r.json())
      .then((data) => setDishes(data.dishes ?? []))
      .catch(() => setDishes([]));
  }, [city, activeTag]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <main className="min-h-screen bg-black">
      {/* ── Top nav ── */}
      <div className="flex items-center justify-between" style={{ padding: "20px 24px" }}>
        <span
          className="text-[18px] font-medium text-white"
          style={{ letterSpacing: "-0.5px" }}
        >
          DeeDao
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
            {cityLabel.en}
          </span>
          <button
            onClick={() => router.push("/settings")}
            aria-label="Settings"
            className="transition-opacity hover:opacity-80"
          >
            <Settings size={14} strokeWidth={1.5} color="rgba(255,255,255,0.5)" />
          </button>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="text-center" style={{ padding: "56px 24px 0" }}>
        <h1
          className="text-[34px] font-medium text-white"
          style={{ letterSpacing: "-1px" }}
        >
          今天想吃什么？
        </h1>

        {/* ── Search box ── */}
        <div style={{ marginTop: 40, padding: "0 0" }}>
          <form onSubmit={handleSearch}>
            <div
              className="flex items-center rounded-[12px]"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "12px 16px",
                gap: 12,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                style={{ stroke: "rgba(255,255,255,0.4)" }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索你想吃的"
                className="home-search"
                style={{
                  border: "none",
                  background: "none",
                  outline: "none",
                  color: "#ffffff",
                  width: "100%",
                  fontSize: 14,
                  padding: 0,
                  margin: 0,
                }}
              />
            </div>
          </form>
        </div>
      </div>

      {/* ── Category tags ── */}
      <div className="flex flex-wrap justify-center" style={{ gap: 10, padding: "32px 24px 0" }}>
        {CATEGORIES.map((cat) => {
          const active = activeTag === cat.tag;
          return (
            <button
              key={cat.tag}
              onClick={() => setActiveTag(cat.tag)}
              className="rounded-full text-[12px] transition-colors"
              style={
                active
                  ? {
                      background: "#ffffff",
                      color: "#000000",
                      padding: "6px 16px",
                      border: "1px solid #ffffff",
                    }
                  : {
                      background: "transparent",
                      color: "rgba(255,255,255,0.6)",
                      padding: "6px 16px",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }
              }
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ── Section title ── */}
      <div style={{ padding: "40px 24px 0" }}>
        <p
          className="text-[10px] uppercase"
          style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "2.5px" }}
        >
          附近热门
        </p>
      </div>

      {/* ── Dish card grid ── */}
      <div
        className="grid grid-cols-2"
        style={{ gap: 16, padding: "16px 24px 0" }}
      >
        {dishes.map((dish) => (
          <button
            key={dish.id}
            onClick={() => router.push(`/dish/${dish.id}`)}
            className="text-left rounded-[14px] overflow-hidden transition-opacity hover:opacity-90"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <DishPlaceholder nameZh={dish.name_zh} cuisineTag={dish.cuisine_tag} />
            <div style={{ padding: 16 }}>
              <p className="text-[18px] font-medium text-white leading-tight">
                {dish.name_zh}
              </p>
              <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                {dish.name_en}
              </p>
              <p className="text-[11px] text-white mt-1.5">
                ● {dish.restaurant_count} 家餐厅
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* ── Footer slogan ── */}
      <div className="text-center" style={{ padding: "36px 24px 32px" }}>
        <p
          className="text-[11px]"
          style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "2px" }}
        >
          以菜寻味，以味寻道。
        </p>
      </div>
    </main>
  );
}
