"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";

const TASTE_CATEGORIES = [
  { id: "spicy", zh: "想吃辣", en: "Spicy & Bold", emoji: "🌶️" },
  { id: "noodles", zh: "想吃面", en: "Noodles & Dumplings", emoji: "🍜" },
  { id: "light", zh: "吃点清淡的", en: "Light & Fresh", emoji: "🥬" },
  { id: "meaty", zh: "想吃肉", en: "Protein Packed", emoji: "🥩" },
  { id: "snacks", zh: "来点小吃", en: "Snacks & Bites", emoji: "🥟" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string[]>([]);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        mainRef.current?.classList.replace("page-enter", "page-ready");
      });
    });
  }, []);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function finish(skip = false) {
    localStorage.setItem("deedao_onboarded", "1");
    if (!skip && selected.length > 0) {
      localStorage.setItem("deedao_preferences", selected.join(","));
    }
    router.replace("/");
  }

  return (
    <main ref={mainRef} className="min-h-screen bg-white flex flex-col px-5 pt-16 pb-12 page-enter">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[#bbb] text-xs tracking-widest uppercase mb-3">
          DEEDAO
        </p>
        <h1 className="text-3xl font-light text-[#1A1A1A] tracking-tight leading-tight">
          {t("你喜欢什么口味？", "What flavors do you like?")}
        </h1>
        <p className="text-[#bbb] text-sm mt-3">
          {t("选择你感兴趣的（可多选）", "Pick what sounds good (select multiple)")}
        </p>
      </div>

      {/* Cuisine picker */}
      <div className="flex-1">
        <div className="flex flex-wrap gap-3">
          {TASTE_CATEGORIES.map((c) => {
            const active = selected.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                className={`h-10 px-5 rounded-full text-sm border transition-all active:scale-95 ${
                  active
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-white text-[#1A1A1A] border-[#D4D4D4]"
                }`}
              >
                {c.emoji} {t(c.zh, c.en)}
              </button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <p className="text-[#bbb] text-xs mt-5">
            {selected.length} {t("个已选择", "selected")}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-3 mt-10">
        <button
          onClick={() => finish(false)}
          className="w-full py-2.5 bg-[#1A1A1A] text-white text-sm tracking-wider uppercase rounded-full hover:bg-[#333] transition-colors"
        >
          {selected.length > 0
            ? `${t("继续", "CONTINUE")} (${selected.length})`
            : t("继续", "CONTINUE")}
        </button>
        <button
          onClick={() => finish(true)}
          className="w-full py-3 text-[#bbb] text-sm hover:text-[#1A1A1A] transition-colors"
        >
          {t("跳过", "Skip")}
        </button>
      </div>
    </main>
  );
}
