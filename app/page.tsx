"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/lib/useAuth";
import { useCity } from "@/lib/useCity";

type BrowseDish = {
  id: string;
  name_zh: string;
  name_en: string;
  image_url: string;
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
    <>
      <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] pb-28">
        {/* ── Top nav ── */}
        <div className="flex items-center justify-between px-6 py-5">
          <span
            className="text-[18px] font-medium text-[#1A1A1A] dark:text-[#F0F0F0]"
            style={{ letterSpacing: "-0.5px" }}
          >
            DeeDao
          </span>
          <span className="text-[11px] text-[#999] dark:text-[#666]">
            {cityLabel.en}
          </span>
        </div>

        {/* ── Hero ── */}
        <div className="px-7 pt-14 pb-13 text-center" style={{ paddingBottom: 52 }}>
          <h1
            className="text-[34px] font-medium text-[#1A1A1A] dark:text-[#F0F0F0]"
            style={{ letterSpacing: "-1px" }}
          >
            今天想吃什么？
          </h1>

          <div className="mt-10 flex justify-center">
            <form onSubmit={handleSearch}>
              <div
                className="flex items-center gap-2.5 border rounded-[10px] px-4 py-2.5"
                style={{
                  maxWidth: 280,
                  borderColor: "var(--search-border, #D4D4D4)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#999] dark:text-[#666] shrink-0"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索你想吃的"
                  className="text-[13px] text-[#1A1A1A] dark:text-[#F0F0F0] placeholder-[#AAAAAA] dark:placeholder-[#555] bg-transparent outline-none border-none p-0 m-0 w-full"
                  style={{ all: "unset", width: "100%", fontSize: 13 }}
                />
              </div>
            </form>
          </div>
        </div>

        {/* ── Category tags ── */}
        <div className="flex flex-wrap justify-center gap-2.5 px-6">
          {CATEGORIES.map((cat) => {
            const active = activeTag === cat.tag;
            return (
              <button
                key={cat.tag}
                onClick={() => setActiveTag(cat.tag)}
                className={`px-4 py-1.5 rounded-full text-[12px] transition-colors ${
                  active
                    ? "bg-[#1A1A1A] text-white dark:bg-[#F0F0F0] dark:text-[#0A0A0A]"
                    : "bg-transparent border text-[#888] dark:text-[#777] border-[#D4D4D4] dark:border-[#333] hover:border-[#999] dark:hover:border-[#555]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── Section title ── */}
        <div className="px-6 pt-10">
          <p
            className="text-[10px] text-[#999] dark:text-[#666] uppercase"
            style={{ letterSpacing: "2.5px" }}
          >
            附近热门
          </p>
        </div>

        {/* ── Dish card grid ── */}
        <div className="grid grid-cols-2 gap-4 px-6 mt-4">
          {dishes.map((dish) => (
            <button
              key={dish.id}
              onClick={() => router.push(`/dish/${dish.id}`)}
              className="text-left rounded-[14px] border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] overflow-hidden transition-shadow hover:shadow-sm"
              style={{ borderWidth: "0.5px" }}
            >
              <div className="relative w-full" style={{ height: 150 }}>
                <Image
                  src={dish.image_url}
                  alt={dish.name_zh}
                  fill
                  className="object-cover"
                  sizes="(max-width: 430px) 50vw, 200px"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <p className="text-[18px] font-medium text-[#1A1A1A] dark:text-[#F0F0F0] leading-tight">
                  {dish.name_zh}
                </p>
                <p className="text-[11px] text-[#999] dark:text-[#666] mt-1">
                  {dish.name_en}
                </p>
                <p className="text-[11px] text-[#1A1A1A] dark:text-[#CCC] mt-1.5">
                  ● {dish.restaurant_count} 家餐厅
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="px-6 pt-9 pb-8 text-center">
          <p
            className="text-[11px] text-[#999] dark:text-[#555]"
            style={{ letterSpacing: "2px" }}
          >
            以菜寻味，以味寻道。
          </p>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
