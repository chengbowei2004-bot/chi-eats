"use client";

import { useRouter } from "next/navigation";
import { FOOD_ICONS, type FoodIconKey } from "@/components/FoodIcons";

/* ── Waterfall drop config ──────────────────────────────────── */

type Drop = { icon: FoodIconKey; left: number; delay: number; duration: number };

// 22 drops spread across ~4 seconds — gentle rain of food
const DROPS: Drop[] = [
  { icon: "dumpling",  left: 6,  delay: 0.0,  duration: 4.2 },
  { icon: "noodle",    left: 24, delay: 0.2,  duration: 4.6 },
  { icon: "hotpot",    left: 48, delay: 0.4,  duration: 4.0 },
  { icon: "skewers",   left: 74, delay: 0.6,  duration: 4.8 },
  { icon: "rice",      left: 90, delay: 0.8,  duration: 4.3 },
  { icon: "malatang",  left: 36, delay: 1.0,  duration: 4.5 },
  { icon: "dimsum",    left: 60, delay: 1.2,  duration: 4.1 },
  { icon: "duck",      left: 14, delay: 1.4,  duration: 4.7 },
  { icon: "beer",      left: 82, delay: 1.6,  duration: 4.2 },
  { icon: "bubbletea", left: 44, delay: 1.8,  duration: 4.6 },
  { icon: "eggtart",   left: 28, delay: 2.0,  duration: 4.4 },
  { icon: "dumpling",  left: 68, delay: 2.2,  duration: 4.0 },
  { icon: "noodle",    left: 92, delay: 2.4,  duration: 4.5 },
  { icon: "hotpot",    left: 10, delay: 2.6,  duration: 4.8 },
  { icon: "skewers",   left: 54, delay: 2.8,  duration: 4.2 },
  { icon: "malatang",  left: 78, delay: 3.0,  duration: 4.3 },
  { icon: "dimsum",    left: 20, delay: 3.2,  duration: 4.6 },
  { icon: "duck",      left: 40, delay: 3.4,  duration: 4.1 },
  { icon: "eggtart",   left: 86, delay: 3.6,  duration: 4.7 },
  { icon: "bubbletea", left: 4,  delay: 3.8,  duration: 4.4 },
  { icon: "beer",      left: 64, delay: 4.0,  duration: 4.5 },
  { icon: "rice",      left: 34, delay: 4.2,  duration: 4.0 },
];

export default function SplashPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center relative overflow-hidden">
      {/* ── Food icon waterfall ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ animation: "waterfall-fade 1s ease-out 5s forwards" }}
      >
        {DROPS.map((drop, i) => {
          const Icon = FOOD_ICONS[drop.icon].component;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${drop.left}%`,
                top: -60,
                animation: `emoji-fall ${drop.duration}s ease-in-out ${drop.delay}s forwards`,
                opacity: 0,
              }}
            >
              <Icon />
            </div>
          );
        })}
      </div>

      {/* ── Logo ── */}
      <h1
        className="text-5xl font-light text-[#1A1A1A] tracking-tight"
        style={{ opacity: 0, animation: "fade-in 0.8s ease-out 4s forwards" }}
      >
        DeeDao
      </h1>

      {/* ── Slogan ── */}
      <div
        className="mt-4 text-center"
        style={{ opacity: 0, animation: "fade-in 0.6s ease-out 4.8s forwards" }}
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
        style={{ opacity: 0, animation: "fade-in 0.5s ease-out 5.5s forwards" }}
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
