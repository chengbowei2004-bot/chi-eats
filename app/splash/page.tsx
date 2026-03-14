"use client";

import { useRouter } from "next/navigation";

/* ── Waterfall emoji config ──────────────────────────────────── */

const EMOJIS = ["🥟", "🍜", "🌶️", "🥢", "🍚", "🫕", "🥘", "🍲", "🧄", "🍛", "🥡", "🔥"];

// 30 drops spread across 2 seconds, deterministic positions
const DROPS: { emoji: string; left: number; delay: number; duration: number; size: number }[] = [
  { emoji: "🥟", left: 8,  delay: 0.0, duration: 1.6, size: 36 },
  { emoji: "🍜", left: 22, delay: 0.1, duration: 1.8, size: 32 },
  { emoji: "🔥", left: 45, delay: 0.15, duration: 1.5, size: 28 },
  { emoji: "🥢", left: 72, delay: 0.2, duration: 1.7, size: 34 },
  { emoji: "🍚", left: 88, delay: 0.25, duration: 1.9, size: 30 },
  { emoji: "🫕", left: 35, delay: 0.35, duration: 1.6, size: 36 },
  { emoji: "🥘", left: 58, delay: 0.4, duration: 1.8, size: 32 },
  { emoji: "🍲", left: 15, delay: 0.5, duration: 1.5, size: 28 },
  { emoji: "🧄", left: 80, delay: 0.55, duration: 1.7, size: 26 },
  { emoji: "🍛", left: 50, delay: 0.6, duration: 1.9, size: 34 },
  { emoji: "🥡", left: 30, delay: 0.7, duration: 1.6, size: 30 },
  { emoji: "🌶️", left: 65, delay: 0.75, duration: 1.8, size: 36 },
  { emoji: "🥟", left: 92, delay: 0.8, duration: 1.5, size: 32 },
  { emoji: "🍜", left: 12, delay: 0.85, duration: 1.7, size: 28 },
  { emoji: "🫕", left: 42, delay: 0.9, duration: 1.9, size: 34 },
  { emoji: "🔥", left: 78, delay: 1.0, duration: 1.6, size: 30 },
  { emoji: "🥘", left: 5,  delay: 1.05, duration: 1.8, size: 36 },
  { emoji: "🍲", left: 55, delay: 1.1, duration: 1.5, size: 26 },
  { emoji: "🥢", left: 25, delay: 1.2, duration: 1.7, size: 32 },
  { emoji: "🍚", left: 68, delay: 1.25, duration: 1.9, size: 28 },
  { emoji: "🧄", left: 38, delay: 1.3, duration: 1.6, size: 34 },
  { emoji: "🍛", left: 85, delay: 1.4, duration: 1.8, size: 30 },
  { emoji: "🥡", left: 18, delay: 1.45, duration: 1.5, size: 36 },
  { emoji: "🌶️", left: 48, delay: 1.5, duration: 1.7, size: 32 },
  { emoji: "🥟", left: 75, delay: 1.55, duration: 1.9, size: 28 },
  { emoji: "🍜", left: 60, delay: 1.6, duration: 1.6, size: 34 },
  { emoji: "🫕", left: 10, delay: 1.7, duration: 1.8, size: 30 },
  { emoji: "🔥", left: 32, delay: 1.75, duration: 1.5, size: 36 },
  { emoji: "🥘", left: 82, delay: 1.8, duration: 1.7, size: 26 },
  { emoji: "🍲", left: 52, delay: 1.9, duration: 1.9, size: 32 },
];

export default function SplashPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center relative overflow-hidden">
      {/* ── Food waterfall ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ animation: "waterfall-fade 0.6s ease-out 2s forwards" }}
      >
        {DROPS.map((drop, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${drop.left}%`,
              top: -60,
              fontSize: drop.size,
              animation: `emoji-fall ${drop.duration}s ease-in ${drop.delay}s forwards`,
              opacity: 0,
            }}
          >
            {drop.emoji}
          </span>
        ))}
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
          onClick={() => router.push("/language")}
          className="py-2.5 px-8 bg-[#1A1A1A] text-white text-sm tracking-wider rounded-full hover:bg-[#333] transition-colors"
        >
          继续 / Continue
        </button>
      </div>
    </main>
  );
}
