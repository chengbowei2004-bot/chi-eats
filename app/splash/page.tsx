"use client";

import { useRouter } from "next/navigation";
import { FOOD_ICONS_3D, type FoodIcon3DKey } from "@/components/FoodIcons3D";

/* ── Orbit ring config ──────────────────────────────────────── */

type OrbitIcon = {
  icon: FoodIcon3DKey;
  ring: "inner" | "middle" | "outer";
  /** Negative delay offsets the start position on the orbit */
  delay: number;
};

const ORBIT_ICONS: OrbitIcon[] = [
  // Inner ring: 3 icons, 12s period CW
  { icon: "dumpling",  ring: "inner",  delay: 0 },
  { icon: "noodle",    ring: "inner",  delay: -4 },
  { icon: "rice",      ring: "inner",  delay: -8 },
  // Middle ring: 4 icons, 18s period CCW
  { icon: "malatang",  ring: "middle", delay: 0 },
  { icon: "hotpot",    ring: "middle", delay: -4.5 },
  { icon: "skewers",   ring: "middle", delay: -9 },
  { icon: "dimsum",    ring: "middle", delay: -13.5 },
  // Outer ring: 4 icons, 25s period CW
  { icon: "duck",      ring: "outer",  delay: 0 },
  { icon: "beer",      ring: "outer",  delay: -6.25 },
  { icon: "bubbletea", ring: "outer",  delay: -12.5 },
  { icon: "eggtart",   ring: "outer",  delay: -18.75 },
];

const RING_CONFIG = {
  inner:  { animation: "orbit-inner-cw",  duration: 12, size: 52 },
  middle: { animation: "orbit-middle-ccw", duration: 18, size: 58 },
  outer:  { animation: "orbit-outer-cw",   duration: 25, size: 64 },
};

export default function SplashPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center relative overflow-hidden">
      {/* ── Subtle warm radial glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,220,160,0.12) 0%, rgba(255,220,160,0) 70%)",
        }}
      />

      {/* ── Orbit rings (faint visual guides) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 1,
          animation: "orbit-fade 0.6s ease-out 2.5s forwards",
        }}
      >
        {/* Inner ellipse */}
        <div
          className="absolute border rounded-full"
          style={{
            width: 200, height: 90,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            borderColor: "rgba(0,0,0,0.04)",
          }}
        />
        {/* Middle ellipse */}
        <div
          className="absolute border rounded-full"
          style={{
            width: 320, height: 140,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            borderColor: "rgba(0,0,0,0.03)",
          }}
        />
        {/* Outer ellipse */}
        <div
          className="absolute border rounded-full"
          style={{
            width: 440, height: 190,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            borderColor: "rgba(0,0,0,0.02)",
          }}
        />
      </div>

      {/* ── Orbiting food icons ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          width: 0,
          height: 0,
          opacity: 1,
          animation: "orbit-fade 0.6s ease-out 2.5s forwards",
        }}
      >
        {ORBIT_ICONS.map((item, i) => {
          const cfg = RING_CONFIG[item.ring];
          const Icon = FOOD_ICONS_3D[item.icon].component;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: cfg.size,
                height: cfg.size,
                marginLeft: -cfg.size / 2,
                marginTop: -cfg.size / 2,
                animation: `${cfg.animation} ${cfg.duration}s linear infinite`,
                animationDelay: `${item.delay}s`,
              }}
            >
              <Icon />
            </div>
          );
        })}
      </div>

      {/* ── Center content (always visible) ── */}
      <div className="relative z-10 text-center">
        <h1
          className="text-4xl font-light text-[#1A1A1A] tracking-tight"
        >
          DeeDao
        </h1>

        {/* ── Slogan (fades in after orbit) ── */}
        <div
          className="mt-4"
          style={{ opacity: 0, animation: "fade-in 0.5s ease-out 2.5s forwards" }}
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
          className="mt-10"
          style={{ opacity: 0, animation: "fade-in 0.5s ease-out 3s forwards" }}
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
      </div>
    </main>
  );
}
