"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTypewriter } from "@/lib/useTypewriter";
import { useLanguage } from "@/lib/useLanguage";

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

export default function SplashPage() {
  const router = useRouter();
  const { setLang } = useLanguage();
  const [step, setStep] = useState<Step>("language");
  const [visible, setVisible] = useState(true);
  const [chosenLang, setChosenLang] = useState<Lang>("zh");
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    if (!s2Search) return;
    const timer = setTimeout(() => setPhase("typing"), 300);
    return () => clearTimeout(timer);
  }, [s2Search]);

  // Skip if language already chosen; wait until mounted to avoid flash
  useEffect(() => {
    const lang = localStorage.getItem("deedao_lang");
    if (lang) {
      router.replace("/");
      return;
    }
    // Only show the splash animation after mount (prevents SSR flash)
    setMounted(true);
  }, [router]);

  function goToStep(next: Step) {
    setVisible(false);
    setTimeout(() => {
      setStep(next);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }, 300);
  }

  function goToNext() {
    setVisible(false);
    setTimeout(() => {
      const onboarded = localStorage.getItem("deedao_onboarded");
      router.replace(onboarded ? "/" : "/onboarding");
    }, 400);
  }

  function handleLangSelect(lang: Lang) {
    // Update context (which also writes to localStorage)
    setLang(lang);
    localStorage.setItem("deedao_lang_chosen", "1");
    setChosenLang(lang);
    goToStep("typewriter");
  }

  useEffect(() => {
    if (step !== "typewriter" || !visible) return;
    setTimeout(() => setS2Logo(true), 0);
    setTimeout(() => setS2Title(true), 100);
    setTimeout(() => setS2Search(true), 200);
  }, [step, visible]);

  // Don't render anything until mounted (prevents flash/premature animation)
  if (!mounted) {
    return <main className="min-h-screen bg-white" />;
  }

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
        {/* ── Screen 1: Language selection ── */}
        {step === "language" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 48px", width: "100%" }}>
            {/* Logo block */}
            <div style={{ marginBottom: 16 }}>
              <div
                className="splash-up"
                style={{ fontSize: 36, fontWeight: 400, letterSpacing: 8, textIndent: 8, color: "#000", animationDelay: "0.3s" }}
              >
                DEEDAO
              </div>
              <div
                className="splash-up"
                style={{ fontSize: 16, fontWeight: 400, letterSpacing: 12, textIndent: 12, color: "#666", marginTop: 6, animationDelay: "0.5s" }}
              >
                地 道
              </div>
            </div>

            {/* Slogan */}
            <div
              className="splash-up"
              style={{ fontSize: 11, color: "#bbb", letterSpacing: 3, textIndent: 3, marginBottom: 80, animationDelay: "0.8s", animationDuration: "0.6s", animationTimingFunction: "ease" }}
            >
              以菜寻味 以味寻道
            </div>

            {/* Choose language */}
            <div
              className="splash-up"
              style={{ fontSize: 11, color: "#bbb", letterSpacing: 1.5, marginBottom: 20, animationDelay: "1.1s", animationDuration: "0.5s", animationTimingFunction: "ease" }}
            >
              Choose your language
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 240 }}>
              <button
                onClick={() => handleLangSelect("zh")}
                className="splash-up splash-lang-filled"
                style={{ animationDelay: "1.3s", animationDuration: "0.5s", animationTimingFunction: "ease" }}
              >
                中文
              </button>
              <button
                onClick={() => handleLangSelect("en")}
                className="splash-up splash-lang-outline"
                style={{ animationDelay: "1.5s", animationDuration: "0.5s", animationTimingFunction: "ease" }}
              >
                English
              </button>
            </div>

            {/* Hint */}
            <div
              className="splash-up"
              style={{ fontSize: 11, color: "#bbb", marginTop: 32, animationDelay: "1.8s", animationDuration: "0.5s", animationTimingFunction: "ease" }}
            >
              You can change this later in settings
            </div>
          </div>
        )}

        {/* ── Screen 2: Typewriter ── */}
        {step === "typewriter" && (
          <div className="flex flex-col items-center w-full" style={{ padding: "0 40px" }}>
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
