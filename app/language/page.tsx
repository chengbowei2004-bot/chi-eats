"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import type { Lang } from "@/components/LanguageProvider";

export default function LanguagePage() {
  const router = useRouter();
  const { setLang } = useLanguage();

  function pick(lang: Lang) {
    setLang(lang);
    localStorage.setItem("deedao_lang_chosen", "1");
    router.replace("/onboarding");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5">
      <h1 className="text-4xl font-light text-[#1A1A1A] tracking-tight mb-20">
        DeeDao
      </h1>

      <div className="flex items-center gap-6">
        <button
          onClick={() => pick("zh")}
          className="text-xl text-[#999999] hover:text-[#1A1A1A] transition-colors"
        >
          中文
        </button>
        <span className="text-[#D0D0D0] text-sm select-none">|</span>
        <button
          onClick={() => pick("en")}
          className="text-xl text-[#999999] hover:text-[#1A1A1A] transition-colors"
        >
          English
        </button>
      </div>
    </main>
  );
}
