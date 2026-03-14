"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import { getDishImage } from "@/lib/dishImages";
import { useAuth } from "@/lib/useAuth";
import { useCity, type City } from "@/lib/useCity";

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
  const { city, setCity, cityLabel, allCities } = useCity();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [dishes, setDishes] = useState<BrowseDish[]>([]);
  const [showCityPicker, setShowCityPicker] = useState(false);

  // Redirect to splash if no language set (first-time user)
  useEffect(() => {
    const lang = localStorage.getItem("deedao_lang");
    if (!lang) {
      router.replace("/splash");
      return;
    }
    // Check onboarding for existing users
    const onboarded = localStorage.getItem("deedao_onboarded");
    if (!onboarded) {
      router.replace("/onboarding");
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
      {/* ── Top nav (2-column) ── */}
      <nav
        className="flex items-center justify-between"
        style={{ padding: "20px 24px" }}
      >
        <span
          className="text-[18px] font-medium text-[#1A1A1A]"
          style={{ letterSpacing: "-0.5px" }}
        >
          DeeDao 地道
        </span>
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
          今天想吃什么？
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
                placeholder="搜索你想吃的"
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
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ── Section title ── */}
      <div style={{ padding: "40px 24px 0" }}>
        <p
          className="text-[10px] uppercase"
          style={{ color: "#999", letterSpacing: "2.5px" }}
        >
          附近热门食物
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
                {dish.name_zh}
              </p>
              <p className="text-[11px] text-[#999] mt-1">
                {dish.name_en}
              </p>
              <p className="text-[11px] text-[#1A1A1A] mt-1.5">
                ● {dish.restaurant_count} 家餐厅
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* ── Footer slogan ── */}
      <div className="text-center" style={{ padding: "36px 24px 32px" }}>
        <p
          className="text-[11px] text-[#999]"
          style={{ letterSpacing: "2px" }}
        >
          以菜寻味，以味寻道。
        </p>
      </div>
    </main>
  );
}
