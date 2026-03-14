"use client";

import { useRouter } from "next/navigation";
import { FOOD_ICONS, type FoodIconKey } from "@/components/FoodIcons";

/* ── Waterfall drop config ──────────────────────────────────── */

type Drop = { icon: FoodIconKey; left: number; delay: number; duration: number };

// 22 drops spread across 2 seconds, deterministic positions
const DROPS: Drop[] = [
  { icon: "dumpling",  left: 6,  delay: 0.0,  duration: 1.6 },
  { icon: "noodle",    left: 24, delay: 0.1,  duration: 1.8 },
  { icon: "hotpot",    left: 48, delay: 0.15, duration: 1.5 },
  { icon: "skewers",   left: 74, delay: 0.2,  duration: 1.7 },
  { icon: "rice",      left: 90, delay: 0.25, duration: 1.9 },
  { icon: "malatang",  left: 36, delay: 0.35, duration: 1.6 },
  { icon: "dimsum",    left: 60, delay: 0.4,  duration: 1.8 },
  { icon: "duck",      left: 14, delay: 0.5,  duration: 1.5 },
  { icon: "beer",      left: 82, delay: 0.55, duration: 1.7 },
  { icon: "bubbletea", left: 44, delay: 0.6,  duration: 1.9 },
  { icon: "eggtart",   left: 28, delay: 0.7,  duration: 1.6 },
  { icon: "dumpling",  left: 68, delay: 0.75, duration: 1.8 },
  { icon: "noodle",    left: 92, delay: 0.85, duration: 1.7 },
  { icon: "hotpot",    left: 10, delay: 0.9,  duration: 1.9 },
  { icon: "skewers",   left: 54, delay: 1.0,  duration: 1.6 },
  { icon: "malatang",  left: 78, delay: 1.05, duration: 1.8 },
  { icon: "dimsum",    left: 20, delay: 1.15, duration: 1.5 },
  { icon: "duck",      left: 40, delay: 1.25, duration: 1.7 },
  { icon: "eggtart",   left: 86, delay: 1.35, duration: 1.9 },
  { icon: "bubbletea", left: 4,  delay: 1.5,  duration: 1.6 },
  { icon: "beer",      left: 64, delay: 1.65, duration: 1.8 },
  { icon: "rice",      left: 34, delay: 1.8,  duration: 1.5 },
];

export default function SplashPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center relative overflow-hidden">
      {/* ── Food icon waterfall ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ animation: "waterfall-fade 0.6s ease-out 2s forwards" }}
      >
        {DROPS.map((drop, i) => {
          const entry = FOOD_ICONS[drop.icon];
          const Icon = entry.component;
          return (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{
                left: `${drop.left}%`,
                top: -80,
                animation: `emoji-fall ${drop.duration}s ease-in ${drop.delay}s forwards`,
                opacity: 0,
              }}
            >
              <Icon />
              <span className="text-[10px] text-gray-400 mt-0.5 whitespace-nowrap">
                {entry.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Logo ── */}
      <h1
        className="text-5xl font-light text-[#1A1A1A] tracking-tight"
        style={{ opacity: 0, animation: "fade-in 0.8s ease-out 2s forwards" }}
      >
        DeeDao
      </h1>

      {/* ── Slogan ── */}
      <div
        className="mt-4 text-center"
        style={{ opacity: 0, animation: "fade-in 0.6s ease-out 2.8s forwards" }}
      >
        <p className="text-sm text-gray-400 tracking-wider">
          以菜寻味，以味寻道。
        </p>
        <p className="text-xs text-gray-300 italic mt-1">
          Search the dish. Find the authentic.
        </p>
      </div>

      {/* ── Continue button ── */}
      <div
        className="mt-12"
        style={{ opacity: 0, animation: "fade-in 0.5s ease-out 3.5s forwards" }}
      >
        <button
          onClick={() => {
            sessionStorage.setItem("deedao_splash_seen", "1");
            const langChosen = localStorage.getItem("deedao_lang_chosen");
            router.replace(langChosen ? "/" : "/language");
          }}
          className="py-2.5 px-8 bg-[#1A1A1A] text-white text-sm tracking-wider rounded-full hover:bg-[#333] transition-colors"
        >
          继续 / Continue
        </button>
      </div>
    </main>
  );
}
