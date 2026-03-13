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
    <div className="inline-flex bg-gray-100 rounded-full p-1">
      <button
        onClick={() => onChange("nearest")}
        className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all ${
          value === "nearest"
            ? "bg-gray-900 text-white"
            : "text-gray-400"
        }`}
      >
        {t("最近", "NEAREST")}
      </button>
      <button
        onClick={() => onChange("best_reviewed")}
        className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all ${
          value === "best_reviewed"
            ? "bg-gray-900 text-white"
            : "text-gray-400"
        }`}
      >
        {t("好评", "BEST REVIEWED")}
      </button>
    </div>
  );
}
