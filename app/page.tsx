"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import { getDishImage } from "@/lib/dishImages";
import { useAuth } from "@/lib/useAuth";
import { useLanguage } from "@/lib/useLanguage";
import { useCity, type City } from "@/lib/useCity";

type BrowseDish = {
  id: string;
  name_zh: string;
  name_en: string;
  image_url: string;
  cuisine_tag: string;
  restaurant_count: number;
};

const ALL_CATEGORIES = [
  { zh: "全部", en: "All", key: "all" },
  { zh: "想吃辣", en: "Spicy", key: "spicy" },
  { zh: "想吃面", en: "Noodles", key: "noodles" },
  { zh: "吃点清淡的", en: "Light", key: "light" },
  { zh: "想吃肉", en: "Meaty", key: "meaty" },
  { zh: "来点小吃", en: "Snacks", key: "snacks" },
  { zh: "甜食奶茶", en: "Sweets & Boba", key: "sweets" },
];

const HIDDEN_BY_CITY: Record<string, string[]> = {
  providence: ["sweets"],
};

export default function HomePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { city, setCity, cityLabel, allCities } = useCity();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [dishes, setDishes] = useState<BrowseDish[]>([]);
  const [showCityPicker, setShowCityPicker] = useState(false);

  // Redirect to splash if no language set (first-time user)
  useEffect(() => {
    const lang = localStorage.getItem("deedao_lang");
    if (!lang) {
      router.replace("/splash");
      return;
    }
    const onboarded = localStorage.getItem("deedao_onboarded");
    if (!onboarded) {
      router.replace("/onboarding");
    }
  }, [router]);

  // Fetch browse dishes
  useEffect(() => {
    const params = new URLSearchParams({ city });
    if (activeTag && activeTag !== "all") params.set("tag", activeTag);
    fetch(`/api/dishes/browse?${params}`)
      .then((r) => r.json())
      .then((data) => setDishes(data.dishes ?? []))
      .catch(() => setDishes([]));
  }, [city, activeTag]);

  // Close city picker on outside click
  useEffect(() => {
    if (!showCityPicker) return;
    const close = () => setShowCityPicker(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [showCityPicker]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  function handleCitySelect(c: City) {
    setCity(c);
    setShowCityPicker(false);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ── Top nav ── */}
      <nav
        className="flex items-center justify-end"
        style={{ padding: "20px 24px" }}
      >
        <button
          onClick={() => router.push("/settings")}
          aria-label="Settings"
          className="transition-opacity hover:opacity-70"
        >
          <Settings size={16} strokeWidth={1.5} color="#999" />
        </button>
      </nav>

      {/* ── Hero ── */}
      <div className="text-center" style={{ padding: "56px 28px 0" }}>
        <h1
          className="text-[34px] font-medium text-[#1A1A1A]"
          style={{ letterSpacing: "-1px", margin: "0 0 12px" }}
        >
          {t("今天想吃什么？", "What are you craving?")}
        </h1>

        {/* City picker */}
        <div className="relative inline-block" style={{ marginBottom: 40 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCityPicker(!showCityPicker);
            }}
            className="inline-flex items-center gap-1 transition-opacity hover:opacity-70"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span style={{ fontSize: 12, color: "#bbb", letterSpacing: "0.3px" }}>
              {cityLabel.en}
            </span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {showCityPicker && (
            <div
              className="absolute top-full left-1/2 mt-2 -translate-x-1/2 bg-white rounded-lg shadow-lg border border-[#E5E5E5] py-1 z-50"
              style={{ minWidth: 140 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(Object.entries(allCities) as [City, { en: string }][]).map(
                ([key, label]) => (
                  <button
                    key={key}
                    onClick={() => handleCitySelect(key)}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#F5F5F5] transition-colors"
                    style={{
                      color: key === city ? "#1A1A1A" : "#666",
                      fontWeight: key === city ? 500 : 400,
                    }}
                  >
                    {label.en}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* ── Search box ── */}
        <div>
          <form onSubmit={handleSearch}>
            <div
              className="flex items-center rounded-[12px]"
              style={{
                border: "1px solid #E0E0E0",
                padding: "12px 16px",
                gap: 12,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#AAAAAA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("搜索你想吃的", "Search a dish...")}
                className="home-search-light"
                style={{
                  border: "none",
                  background: "none",
                  outline: "none",
                  color: "#1A1A1A",
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
        {ALL_CATEGORIES.filter((c) => !HIDDEN_BY_CITY[city]?.includes(c.key)).map((cat) => {
          const active = activeTag === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveTag(cat.key)}
              className="rounded-full text-[12px] transition-colors"
              style={
                active
                  ? {
                      background: "#1A1A1A",
                      color: "#ffffff",
                      padding: "6px 16px",
                      border: "1px solid #1A1A1A",
                    }
                  : {
                      background: "transparent",
                      color: "#888",
                      padding: "6px 16px",
                      border: "1px solid #D4D4D4",
                    }
              }
            >
              {t(cat.zh, cat.en)}
            </button>
          );
        })}
      </div>

      {/* ── Section title ── */}
      {activeTag === "all" && (
        <div style={{ padding: "40px 24px 0" }}>
          <p
            className="text-[10px] uppercase"
            style={{ color: "#999", letterSpacing: "2.5px" }}
          >
            {t("附近热门食物", "POPULAR NEARBY")}
          </p>
        </div>
      )}

      {/* ── Dish card grid ── */}
      {dishes.length > 0 ? (
        <div
          className="grid grid-cols-2"
          style={{ gap: 16, padding: `${activeTag === "all" ? 16 : 40}px 24px 0` }}
        >
          {dishes.map((dish) => (
            <button
              key={dish.id}
              onClick={() => router.push(`/dish/${dish.id}`)}
              className="text-left rounded-[14px] overflow-hidden transition-shadow hover:shadow-md"
              style={{
                border: "0.5px solid #E5E5E5",
                background: "#ffffff",
              }}
            >
              <div style={{ height: 160, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getDishImage(dish.name_zh)}
                  alt={dish.name_zh}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div style={{ padding: 16 }}>
                <p className="text-[18px] font-medium text-[#1A1A1A] leading-tight">
                  {t(dish.name_zh, dish.name_en)}
                </p>
                <p className="text-[11px] text-[#999] mt-1">
                  {t(dish.name_en, dish.name_zh)}
                </p>
                <p className="text-[11px] text-[#1A1A1A] mt-1.5">
                  ● {dish.restaurant_count} {t("家餐厅", "restaurants")}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#bbb", padding: "40px 0", fontSize: 14 }}>
          {t("暂无相关菜品", "No dishes found")}
        </p>
      )}

      {/* ── Footer slogan ── */}
      <div className="text-center" style={{ padding: "36px 24px 32px" }}>
        <p
          className="text-[11px] text-[#999]"
          style={{ letterSpacing: "2px" }}
        >
          {t("以菜寻味，以味寻道。", "Search the dish. Find the authentic.")}
        </p>
      </div>
    </main>
  );
}
