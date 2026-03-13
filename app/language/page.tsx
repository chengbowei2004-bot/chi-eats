"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import type { Lang } from "@/components/LanguageProvider";

export default function LanguagePage() {
  const router = useRouter();
  const { setLang } = useLanguage();

  function pick(lang: Lang) {
    setLang(lang);
    localStorage.setItem("chieats_lang_chosen", "1");
    router.replace("/onboarding");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5">
      <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight mb-16">
        ChiEats
      </h1>

      <div className="w-full max-w-xs space-y-4">
        <button
          onClick={() => pick("zh")}
          className="w-full py-4 rounded-full bg-[#1A1A1A] text-white text-lg font-medium hover:bg-[#333333] transition-colors"
        >
          中文
        </button>
        <button
          onClick={() => pick("en")}
          className="w-full py-4 rounded-full bg-[#1A1A1A] text-white text-lg font-medium hover:bg-[#333333] transition-colors"
        >
          English
        </button>
      </div>
    </main>
  );
}
