"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";

type MenuItem = {
  name_zh: string;
  name_en: string;
  price: number;
  category_zh: string;
  category_en: string;
  description_zh: string;
  description_en: string;
  is_popular: boolean;
  spicy_level: number;
};

type RestaurantInfo = {
  name: string;
  name_zh: string;
};

export default function MenuPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { t } = useLanguage();
  const mainRef = useRef<HTMLElement>(null);

  const [items, setItems] = useState<MenuItem[]>([]);
  const [restaurant, setRestaurant] = useState<RestaurantInfo | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState<{ zh: string; en: string }[]>([]);

  // Fade in
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        mainRef.current?.classList.replace("page-enter", "page-ready");
      });
    });
  }, []);

  // Load menu data
  useEffect(() => {
    async function load() {
      try {
        const menuRes = await fetch(`/api/restaurant/${id}/menu`);
        const data = await menuRes.json();
        setItems(data.items ?? []);
        setRestaurant(data.restaurant ?? null);

        // Extract unique categories
        const cats: { zh: string; en: string }[] = [];
        const seen = new Set<string>();
        for (const item of data.items ?? []) {
          if (!seen.has(item.category_zh)) {
            seen.add(item.category_zh);
            cats.push({ zh: item.category_zh, en: item.category_en });
          }
        }
        setCategories(cats);
      } catch {
        setItems([]);
      }
    }
    load();
  }, [id]);

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((i) => i.category_zh === activeCategory);

  return (
    <main ref={mainRef} className="min-h-screen bg-white page-enter">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <button
          onClick={() => router.back()}
          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <div>
          <h1 className="text-lg font-medium text-[#1A1A1A]">
            {restaurant ? t(restaurant.name_zh || restaurant.name, restaurant.name) : ""}
          </h1>
          <p className="text-xs text-[#999]">
            {t("菜单", "Menu")}
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 px-5 pb-4 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveCategory("all")}
          className="shrink-0 px-4 py-1.5 rounded-full text-[12px] transition-colors"
          style={
            activeCategory === "all"
              ? { background: "#1A1A1A", color: "#fff", border: "1px solid #1A1A1A" }
              : { background: "transparent", color: "#888", border: "1px solid #D4D4D4" }
          }
        >
          {t("全部", "All")}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.zh}
            onClick={() => setActiveCategory(cat.zh)}
            className="shrink-0 px-4 py-1.5 rounded-full text-[12px] transition-colors"
            style={
              activeCategory === cat.zh
                ? { background: "#1A1A1A", color: "#fff", border: "1px solid #1A1A1A" }
                : { background: "transparent", color: "#888", border: "1px solid #D4D4D4" }
            }
          >
            {t(cat.zh, cat.en)}
          </button>
        ))}
      </div>

      {/* Menu items */}
      <div className="px-5">
        {filtered.map((item, i) => (
          <div
            key={`${item.name_zh}-${i}`}
            className="py-4"
            style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f0f0f0" : "none" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium text-[#1A1A1A]">
                    {t(item.name_zh, item.name_en)}
                  </span>
                  {item.spicy_level > 0 && (
                    <span className="text-[11px] text-red-500">
                      {"●".repeat(item.spicy_level)}
                    </span>
                  )}
                  {item.is_popular && (
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: "#1A1A1A", color: "#fff" }}
                    >
                      {t("推荐", "Popular")}
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-[#999] mt-0.5">
                  {t(item.name_en, item.name_zh)}
                </p>
                {(t(item.description_zh, item.description_en)) && (
                  <p className="text-[12px] text-[#bbb] mt-1">
                    {t(item.description_zh, item.description_en)}
                  </p>
                )}
              </div>
              {item.price > 0 && (
                <span className="text-[16px] text-[#1A1A1A] shrink-0">
                  ${item.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-[#bbb] py-10 text-sm">
            {t("暂无菜品", "No items")}
          </p>
        )}
      </div>

      <div className="h-8" />
    </main>
  );
}
