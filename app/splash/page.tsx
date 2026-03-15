"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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

type Screen = "lang" | "typer";
type Lang = "zh" | "en";

export default function SplashPage() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("lang");
  const [langExiting, setLangExiting] = useState(false);
  const [typerEntering, setTyperEntering] = useState(false);
  const [chosenLang, setChosenLang] = useState<Lang>("zh");

  // Screen 2 stagger visibility
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
      sessionStorage.setItem("deedao_splash_seen", "1");
      router.replace("/");
    }
  }, [router]);

  const handleLangSelect = useCallback(
    (lang: Lang) => {
      localStorage.setItem("deedao_lang", lang);
      localStorage.setItem("deedao_lang_chosen", "1");
      setChosenLang(lang);

      // Exit screen 1
      setLangExiting(true);

      // After 400ms, switch to screen 2
      setTimeout(() => {
        setScreen("typer");
        setTimeout(() => setTyperEntering(true), 50);

        // Fast stagger (slogan + button deferred to onFirstComplete)
        setTimeout(() => setS2Logo(true), 0);
        setTimeout(() => setS2Title(true), 100);
        setTimeout(() => setS2Search(true), 200);
      }, 400);
    },
    []
  );

  const handleEnter = useCallback(() => {
    sessionStorage.setItem("deedao_splash_seen", "1");
    router.replace("/");
  }, [router]);

  // Screen 1 classes
  const s1Class = langExiting ? "splash-screen splash-out" : "splash-screen splash-show";
  // Screen 2 classes
  const s2Class =
    screen === "lang"
      ? "splash-screen splash-hide"
      : typerEntering
      ? "splash-screen splash-show"
      : "splash-screen splash-hide";

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* ── Screen 1: Language selection ── */}
      <div className={s1Class}>
        <div className="flex flex-col items-center gap-0">
          <span
            className="splash-rise"
            style={{ fontSize: 14, fontWeight: 400, letterSpacing: 4, color: "#bbb", animationDelay: "0.2s" }}
          >
            DEEDAO 地道
          </span>
          <span
            className="splash-rise"
            style={{ fontSize: 12, color: "#bbb", marginTop: 40, animationDelay: "0.4s" }}
          >
            Choose your language
          </span>
          <button
            onClick={() => handleLangSelect("zh")}
            className="splash-rise splash-btn"
            style={{ animationDelay: "0.6s", marginTop: 20 }}
          >
            中文
          </button>
          <button
            onClick={() => handleLangSelect("en")}
            className="splash-rise splash-btn"
            style={{ animationDelay: "0.8s", marginTop: 12 }}
          >
            English
          </button>
          <span
            className="splash-rise"
            style={{ fontSize: 11, color: "#bbb", marginTop: 24, animationDelay: "1.0s" }}
          >
            You can change this later in settings
          </span>
        </div>
      </div>

      {/* ── Screen 2: Search box typewriter ── */}
      <div className={s2Class}>
        <div className="flex flex-col items-center w-full" style={{ padding: "0 40px" }}>
          {/* Top logo */}
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

          {/* Search box (simulated) */}
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

          {/* Slogan — only in Chinese mode, after first word typed */}
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
            onClick={handleEnter}
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
      </div>
    </main>
  );
}
