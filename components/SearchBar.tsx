"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";

export function SearchBar({ initialValue = "", showButton = false }: { initialValue?: string; showButton?: boolean }) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();
  const { t } = useLanguage();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("输入你想吃的", "Type what you want to eat")}
        className="w-full h-12 px-5 rounded-full bg-[#F0F0F0] text-[#1A1A1A] placeholder-[#6B6B6B] text-base outline-none focus:bg-white focus:ring-2 focus:ring-[#1A1A1A] transition-all"
      />
      {showButton && (
        <button
          type="submit"
          className="w-full h-12 mt-3 rounded-full bg-[#1A1A1A] text-white text-base font-medium hover:bg-[#333333] transition-colors"
        >
          {t("找餐厅", "FIND RESTAURANTS")}
        </button>
      )}
    </form>
  );
}
