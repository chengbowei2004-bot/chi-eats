"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTypewriter } from "@/lib/useTypewriter";

const DISHES_ZH = [
  "红烧牛肉面", "麻辣火锅", "小笼包", "酸菜鱼", "炸酱面", "烤串",
  "麻辣烫", "水煮鱼", "宫保鸡丁", "糖醋里脊", "凉皮", "蛋炒饭",
];
const DISHES_EN = [
  "Beef Noodle Soup", "Mala Hot Pot", "Soup Dumplings", "Sour Fish Stew",
  "Zha Jiang Noodles", "BBQ Skewers", "Spicy Broth Pot", "Boiled Fish",
  "Kung Pao Chicken", "Sweet Sour Pork", "Cold Noodles", "Fried Rice",
];

type Step = "language" | "typewriter";
type Lang = "zh" | "en";

const LOGO_LETTERS = [
  { char: "D", left: 0,   sx: -60, sy: -40, sr: -15, delay: 0.2 },
  { char: "E", left: 22,  sx: 40,  sy: 50,  sr: 20,  delay: 0.35 },
  { char: "E", left: 42,  sx: -30, sy: 60,  sr: -10, delay: 0.5 },
  { char: "D", left: 62,  sx: 70,  sy: -50, sr: 25,  delay: 0.3 },
  { char: "A", left: 84,  sx: -50, sy: -60, sr: -20, delay: 0.45 },
  { char: "O", left: 106, sx: 60,  sy: 40,  sr: 15,  delay: 0.55 },
  { char: " ", left: 126, sx: 0,   sy: 0,   sr: 0,   delay: 0 },
  { char: "地", left: 140, sx: -40, sy: -30, sr: 10,  delay: 0.7 },
  { char: "道", left: 170, sx: 50,  sy: 50,  sr: -25, delay: 0.85 },
];

export default function SplashPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("language");
  const [visible, setVisible] = useState(true);
  const [chosenLang, setChosenLang] = useState<Lang>("zh");

  // Screen 2 stagger
  const [s2Logo, setS2Logo] = useState(false);
  const [s2Title, setS2Title] = useState(false);
  const [s2Search, setS2Search] = useState(false);
  const [s2Slogan, setS2Slogan] = useState(false);
  const [s2Button, setS2Button] = useState(false);
  const [phase, setPhase] = useState<"placeholder" | "typing">("placeholder");

  const dishes = chosenLang === "zh" ? DISHES_ZH : DISHES_EN;

  const onFirstComplete = useCallback(() => {
    setTimeout(() => setS2Slogan(true), 0);
    setTimeout(() => setS2Button(true), 200);
  }, []);

  const typedText = useTypewriter(dishes, phase === "typing", onFirstComplete);

  // Start typing 300ms after search box appears
  useEffect(() => {
    if (!s2Search) return;
    const timer = setTimeout(() => setPhase("typing"), 300);
    return () => clearTimeout(timer);
  }, [s2Search]);

  // Skip if language already chosen
  useEffect(() => {
    const lang = localStorage.getItem("deedao_lang");
    if (lang) {
      router.replace("/");
    }
  }, [router]);

  // Unified step transition: fade out → swap → fade in
  function goToStep(next: Step) {
    setVisible(false);
    setTimeout(() => {
      setStep(next);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }, 300);
  }

  // Final exit: fade out → navigate to onboarding or home
  function goToNext() {
    setVisible(false);
    setTimeout(() => {
      const onboarded = localStorage.getItem("deedao_onboarded");
      router.replace(onboarded ? "/" : "/onboarding");
    }, 400);
  }

  function handleLangSelect(lang: Lang) {
    localStorage.setItem("deedao_lang", lang);
    localStorage.setItem("deedao_lang_chosen", "1");
    setChosenLang(lang);
    goToStep("typewriter");
  }

  // When typewriter step becomes visible, stagger its elements
  useEffect(() => {
    if (step !== "typewriter" || !visible) return;
    setTimeout(() => setS2Logo(true), 0);
    setTimeout(() => setS2Title(true), 100);
    setTimeout(() => setS2Search(true), 200);
  }, [step, visible]);

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {step === "language" && (
          <div className="flex flex-col items-center">
            {/* Scatter logo */}
            <div style={{ position: "relative", height: 50, width: 228, marginBottom: 8 }}>
              {LOGO_LETTERS.map((l, i) => (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    left: l.left,
                    top: 16,
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#bbb",
                    opacity: 0,
                    transform: `translate(${l.sx}px, ${l.sy}px) rotate(${l.sr}deg)`,
                    animation: `land 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${l.delay}s forwards`,
                  }}
                >
                  {l.char}
                </span>
              ))}
              {/* Underline */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  width: 0,
                  height: 1,
                  background: "#ddd",
                  transform: "translateX(-50%)",
                  animation: "draw 0.4s ease 1.6s forwards",
                }}
              />
            </div>

            <span
              style={{
                fontSize: 12,
                color: "#bbb",
                marginTop: 32,
                opacity: 0,
                animation: "fadeUp 0.5s ease 1.8s forwards",
              }}
            >
              Choose your language
            </span>
            <button
              onClick={() => handleLangSelect("zh")}
              className="splash-btn"
              style={{
                marginTop: 20,
                opacity: 0,
                animation: "fadeUp 0.5s ease 2.1s forwards",
              }}
            >
              中文
            </button>
            <button
              onClick={() => handleLangSelect("en")}
              className="splash-btn"
              style={{
                marginTop: 12,
                opacity: 0,
                animation: "fadeUp 0.5s ease 2.3s forwards",
              }}
            >
              English
            </button>
            <span
              style={{
                fontSize: 11,
                color: "#bbb",
                marginTop: 24,
                opacity: 0,
                animation: "fadeUp 0.5s ease 2.6s forwards",
              }}
            >
              You can change this later in settings
            </span>
          </div>
        )}

        {step === "typewriter" && (
          <div className="flex flex-col items-center w-full" style={{ padding: "0 40px" }}>
            {/* Logo */}
            <span
              className="splash-el-fast"
              style={{
                fontSize: 14,
                color: "#bbb",
                letterSpacing: 4,
                marginBottom: 60,
                opacity: s2Logo ? 1 : 0,
                transform: s2Logo ? "translateY(0)" : "translateY(24px)",
              }}
            >
              DEEDAO 地道
            </span>

            {/* Title */}
            <h2
              className="splash-el-fast"
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: "#1A1A1A",
                textAlign: "center",
                opacity: s2Title ? 1 : 0,
                transform: s2Title ? "translateY(0)" : "translateY(24px)",
              }}
            >
              {chosenLang === "zh"
                ? "今天想吃什么？"
                : "Search the dish. Find the authentic."}
            </h2>

            {/* Search box */}
            <div
              className="splash-el-fast"
              style={{
                marginTop: 32,
                maxWidth: 300,
                width: "100%",
                opacity: s2Search ? 1 : 0,
                transform: s2Search ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 16px",
                  border: "1px solid #e0e0e0",
                  borderRadius: 12,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#bbb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>

                {phase === "placeholder" ? (
                  <span style={{ color: "#bbb", fontSize: 14 }}>
                    {chosenLang === "zh" ? "搜索你想吃的" : "Search a dish..."}
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: 14,
                      color: "#1A1A1A",
                      display: "flex",
                      alignItems: "center",
                      minHeight: 20,
                    }}
                  >
                    {typedText}
                    <span
                      style={{
                        borderRight: "2px solid #000",
                        height: 18,
                        marginLeft: 2,
                        animation: "cursor-blink 0.8s step-end infinite",
                      }}
                    />
                  </span>
                )}
              </div>
            </div>

            {/* Slogan — Chinese mode only */}
            {chosenLang === "zh" && (
              <div
                className="splash-el-fast"
                style={{
                  marginTop: 32,
                  textAlign: "center",
                  opacity: s2Slogan ? 1 : 0,
                  transform: s2Slogan ? "translateY(0)" : "translateY(12px)",
                }}
              >
                <p style={{ fontSize: 12, color: "#bbb", letterSpacing: 2 }}>
                  以菜寻味，以味寻道。
                </p>
              </div>
            )}

            {/* Enter button */}
            <button
              onClick={goToNext}
              className="splash-el-fast splash-enter-btn"
              style={{
                marginTop: chosenLang === "zh" ? 40 : 32,
                opacity: s2Button ? 1 : 0,
                transform: s2Button ? "translateY(0)" : "translateY(12px)",
                pointerEvents: s2Button ? "auto" : "none",
              }}
            >
              {chosenLang === "zh" ? "开始探索" : "Start exploring"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
