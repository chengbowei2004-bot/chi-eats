"use client";

import { useLanguage } from "@/lib/useLanguage";

type Sort = "nearest" | "best_reviewed";

type Props = {
  value: Sort;
  onChange: (sort: Sort) => void;
};

export function SortToggle({ value, onChange }: Props) {
  const { t } = useLanguage();

  return (
    <div className="inline-flex bg-[#F0F0F0] rounded-full p-1">
      <button
        onClick={() => onChange("nearest")}
        className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase transition-all ${
          value === "nearest"
            ? "bg-[#1A1A1A] text-white"
            : "text-[#6B6B6B]"
        }`}
      >
        {t("最近", "NEAREST")}
      </button>
      <button
        onClick={() => onChange("best_reviewed")}
        className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase transition-all ${
          value === "best_reviewed"
            ? "bg-[#1A1A1A] text-white"
            : "text-[#6B6B6B]"
        }`}
      >
        {t("好评", "BEST REVIEWED")}
      </button>
    </div>
  );
}
