"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CUISINE_OPTIONS = [
  { id: "川菜", en: "Sichuan", emoji: "🌶️" },
  { id: "粤菜", en: "Cantonese", emoji: "🥡" },
  { id: "江浙菜", en: "Jiangzhe", emoji: "🐟" },
  { id: "火锅", en: "Hotpot", emoji: "🍲" },
  { id: "东北菜", en: "Dongbei", emoji: "🥟" },
  { id: "湘菜", en: "Hunan", emoji: "🫑" },
  { id: "烧烤", en: "BBQ", emoji: "🔥" },
  { id: "新疆菜", en: "Northwestern", emoji: "🍖" },
  { id: "面食", en: "Noodles", emoji: "🍜" },
  { id: "饺子", en: "Dumplings", emoji: "🥟" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function finish(skip = false) {
    localStorage.setItem("chieats_onboarded", "1");
    if (!skip && selected.length > 0) {
      localStorage.setItem("chieats_preferences", selected.join(","));
    }
    router.replace("/");
  }

  return (
    <main className="min-h-screen flex flex-col px-5 pt-16 pb-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[#1A1A1A] text-xs font-semibold tracking-widest uppercase mb-3">
          CHIEATS
        </p>
        <h1 className="text-3xl font-bold text-[#1A1A1A] leading-tight">
          你喜欢吃<br />什么菜系？
        </h1>
        <p className="text-[#6B6B6B] text-base mt-3">
          What cuisines do you like?
        </p>
      </div>

      {/* Cuisine picker */}
      <div className="flex-1">
        <div className="flex flex-wrap gap-3">
          {CUISINE_OPTIONS.map(({ id, en }) => {
            const active = selected.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className={`h-11 px-5 rounded-full text-sm border transition-all active:scale-95 ${
                  active
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-white text-[#1A1A1A] border-[#E5E5E5]"
                }`}
              >
                <span>{id}</span>
                <span className="text-[0.7em] ml-1.5 opacity-70">{en}</span>
              </button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <p className="text-[#6B6B6B] text-xs mt-5">
            {selected.length} {selected.length === 1 ? "菜系" : "菜系"} 已选择
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-3 mt-10">
        <button
          onClick={() => finish(false)}
          className="w-full h-13 py-3.5 bg-[#1A1A1A] text-white text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-[#333333] active:bg-[#000000] transition-colors"
        >
          {selected.length > 0
            ? `继续 CONTINUE (${selected.length})`
            : "继续 CONTINUE"}
        </button>
        <button
          onClick={() => finish(true)}
          className="w-full py-3 text-[#6B6B6B] text-sm"
        >
          跳过 Skip
        </button>
      </div>
    </main>
  );
}
