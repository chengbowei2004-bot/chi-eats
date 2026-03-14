"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import type { Lang } from "@/components/LanguageProvider";

/* ── Two orbit rings ─────────────────────────────────────────── */

const INNER_RING = {
  radius: 100,
  duration: 20,       // 20s per revolution, clockwise
  direction: "cw" as const,
  icons: ["🥟", "🍜", "🌶️", "🥘"],        // 4 icons, 90° apart
};

const OUTER_RING = {
  radius: 155,
  duration: 30,       // 30s per revolution, counter-clockwise
  direction: "ccw" as const,
  icons: ["🔥", "🥢", "🍚", "🫕", "🍲", "🧄"],  // 6 icons, 60° apart
};

/* Each icon gets a different bob delay for organic feel */
const BOB_DURATION = 3; // seconds per bob cycle

export default function LanguagePage() {
  const router = useRouter();
  const { setLang } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setSplashFading(true), 3000);
    const hideTimer = setTimeout(() => setShowSplash(false), 3500);
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

  function renderRing(ring: { radius: number; duration: number; direction: "cw" | "ccw"; icons: string[] }, ringIndex: number) {
    const count = ring.icons.length;
    const angleStep = 360 / count;

    return (
      <div
        className="absolute"
        style={{
          width: ring.radius * 2,
          height: ring.radius * 2,
          animation: `orbit-${ring.direction} ${ring.duration}s ease-in-out infinite`,
        }}
      >
        {ring.icons.map((emoji, i) => {
          const angleDeg = angleStep * i;
          const angleRad = (angleDeg * Math.PI) / 180;
          const x = ring.radius + Math.cos(angleRad) * ring.radius;
          const y = ring.radius + Math.sin(angleRad) * ring.radius;
          const bobDelay = -(ringIndex * count + i) * 0.4; // stagger

          return (
            <span
              key={i}
              className="absolute"
              style={{
                fontSize: 44,
                left: x,
                top: y,
                transform: "translateX(-50%) translateY(0)",
                animation: `bob ${BOB_DURATION}s ease-in-out ${bobDelay}s infinite`,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))",
              }}
            >
              {emoji}
            </span>
          );
        })}
      </div>
    );
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
              width: 380,
              height: 380,
              background:
                "radial-gradient(circle, rgba(255,140,50,0.12) 0%, rgba(220,80,40,0.06) 40%, transparent 70%)",
            }}
          />

          {/* Inner ring – clockwise */}
          {renderRing(INNER_RING, 0)}

          {/* Outer ring – counter-clockwise */}
          {renderRing(OUTER_RING, 1)}

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
