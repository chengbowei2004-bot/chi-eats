"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";

export function SearchBar({ initialValue = "" }: { initialValue?: string }) {
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
        placeholder={t("今天想吃什么？", "What are you craving?")}
        className="w-full h-12 px-5 rounded-full bg-[#F0F0F0] text-[#1A1A1A] placeholder-[#6B6B6B] text-base outline-none focus:bg-white focus:ring-2 focus:ring-[#1A1A1A] transition-all"
      />
    </form>
  );
}
