"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import type { Lang } from "@/components/LanguageProvider";

const ORBIT_ICONS = [
  { emoji: "🥟", size: 28, radius: 100, duration: 18, delay: 0 },
  { emoji: "🍜", size: 26, radius: 120, duration: 22, delay: -3 },
  { emoji: "🔥", size: 22, radius: 90, duration: 16, delay: -7 },
  { emoji: "🥢", size: 24, radius: 130, duration: 25, delay: -2 },
  { emoji: "🍚", size: 20, radius: 80, duration: 20, delay: -10 },
  { emoji: "🌶️", size: 26, radius: 110, duration: 19, delay: -5 },
  { emoji: "🫕", size: 24, radius: 140, duration: 28, delay: -8 },
  { emoji: "🥘", size: 22, radius: 95, duration: 17, delay: -12 },
  { emoji: "🍲", size: 28, radius: 125, duration: 23, delay: -1 },
  { emoji: "🧄", size: 20, radius: 85, duration: 21, delay: -6 },
];

export default function LanguagePage() {
  const router = useRouter();
  const { setLang } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setSplashFading(true), 2000);
    const hideTimer = setTimeout(() => setShowSplash(false), 2500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  function pick(lang: Lang) {
    setLang(lang);
    localStorage.setItem("deedao_lang_chosen", "1");
    router.replace("/onboarding");
  }

  return (
    <>
      {/* Splash screen */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FAFAFA] transition-opacity duration-500 ${
            splashFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Warm glow */}
          <div
            className="absolute rounded-full"
            style={{
              width: 320,
              height: 320,
              background:
                "radial-gradient(circle, rgba(255,140,50,0.12) 0%, rgba(220,80,40,0.06) 40%, transparent 70%)",
            }}
          />

          {/* Orbiting icons */}
          {ORBIT_ICONS.map((icon, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: icon.radius * 2,
                height: icon.radius * 2,
                animation: `orbit ${icon.duration}s linear ${icon.delay}s infinite`,
              }}
            >
              <span
                className="absolute"
                style={{
                  fontSize: icon.size,
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.06))",
                }}
              >
                {icon.emoji}
              </span>
            </div>
          ))}

          {/* Logo */}
          <h1 className="relative text-5xl font-light text-[#1A1A1A] tracking-tight z-10">
            DeeDao
          </h1>
        </div>
      )}

      {/* Language selection */}
      <main
        className={`min-h-screen flex flex-col items-center justify-center px-5 transition-opacity duration-500 ${
          showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="text-4xl font-light text-[#1A1A1A] tracking-tight mb-4">
          DeeDao
        </h1>

        {/* Brand tagline */}
        <p className="text-sm text-gray-400 tracking-wider mb-1">
          以菜寻味，以味寻道。
        </p>
        <p className="text-xs text-gray-300 italic mb-16">
          Search the dish. Find the authentic.
        </p>

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

    </>
  );
}
