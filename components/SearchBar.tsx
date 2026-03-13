"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
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
      <div className="relative">
        <Search
          size={18}
          strokeWidth={1.5}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-[#AAAAAA] pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("输入你想吃的", "Type what you want to eat")}
          className="w-full py-4 pl-12 pr-6 rounded-full bg-white border border-[#E5E5E5] text-[#1A1A1A] placeholder-[#AAAAAA] text-base outline-none focus:shadow-sm focus:border-[#CCCCCC] transition-all"
        />
      </div>
      {showButton && (
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            className="py-2 px-6 rounded-full bg-[#1A1A1A] text-white text-sm tracking-wider uppercase hover:bg-[#333333] transition-colors"
          >
            {t("找餐厅", "FIND")}
          </button>
        </div>
      )}
    </form>
  );
}
