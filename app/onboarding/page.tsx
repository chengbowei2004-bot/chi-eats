"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";

const CUISINE_OPTIONS = [
  { id: "川菜", en: "Sichuan" },
  { id: "粤菜", en: "Cantonese" },
  { id: "江浙菜", en: "Jiangzhe" },
  { id: "火锅", en: "Hotpot" },
  { id: "东北菜", en: "Dongbei" },
  { id: "湘菜", en: "Hunan" },
  { id: "烧烤", en: "BBQ" },
  { id: "新疆菜", en: "Northwestern" },
  { id: "面食", en: "Noodles" },
  { id: "饺子", en: "Dumplings" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string[]>([]);

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
    <main className="min-h-screen flex flex-col px-5 pt-16 pb-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-gray-400 text-xs tracking-widest uppercase mb-3">
          DEEDAO
        </p>
        <h1 className="text-3xl font-light text-gray-900 tracking-tight leading-tight">
          {t("你喜欢吃", "What cuisines")}<br />{t("什么菜系？", "do you like?")}
        </h1>
        <p className="text-gray-400 text-sm mt-3">
          {t("选择你喜欢的菜系", "Pick your favorite cuisines")}
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
                className={`h-10 px-5 rounded-full text-sm border transition-all active:scale-95 ${
                  active
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-900 border-gray-200"
                }`}
              >
                <span>{id}</span>
                <span className="text-[0.7em] ml-1.5 opacity-50">{en}</span>
              </button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <p className="text-gray-400 text-xs mt-5">
            {selected.length} {t("菜系已选择", "selected")}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-3 mt-10">
        <button
          onClick={() => finish(false)}
          className="w-full py-2.5 bg-gray-900 text-white text-sm tracking-wider uppercase rounded-full hover:bg-gray-800 transition-colors"
        >
          {selected.length > 0
            ? `${t("继续", "CONTINUE")} (${selected.length})`
            : t("继续", "CONTINUE")}
        </button>
        <button
          onClick={() => finish(true)}
          className="w-full py-3 text-gray-400 text-sm hover:text-gray-900 transition-colors"
        >
          {t("跳过", "Skip")}
        </button>
      </div>
    </main>
  );
}
