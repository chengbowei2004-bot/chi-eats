"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";

type Step = "language" | "slogan";
type Lang = "zh" | "en";

export default function SplashPage() {
  const router = useRouter();
  const { setLang } = useLanguage();
  const [step, setStep] = useState<Step>("language");
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Screen 2 stagger
  const [s2Logo, setS2Logo] = useState(false);
  const [s2Slogan, setS2Slogan] = useState(false);
  const [s2Button, setS2Button] = useState(false);

  // Skip if language already chosen; wait until mounted to avoid flash
  useEffect(() => {
    const lang = localStorage.getItem("deedao_lang");
    if (lang) {
      router.replace("/");
      return;
    }
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
    setLang(lang);
    localStorage.setItem("deedao_lang_chosen", "1");
    goToStep("slogan");
  }

  useEffect(() => {
    if (step !== "slogan" || !visible) return;
    setTimeout(() => setS2Logo(true), 0);
    setTimeout(() => setS2Slogan(true), 200);
    setTimeout(() => setS2Button(true), 500);
  }, [step, visible]);

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

        {/* ── Screen 2: Static slogan ── */}
        {step === "slogan" && (
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
                fontSize: 22,
                fontWeight: 400,
                color: "#1A1A1A",
                textAlign: "center",
                letterSpacing: 0.5,
                opacity: s2Slogan ? 1 : 0,
                transform: s2Slogan ? "translateY(0)" : "translateY(24px)",
              }}
            >
              Find authentic Chinese food nearby.
            </h2>

            <button
              onClick={goToNext}
              className="splash-el-fast splash-enter-btn"
              style={{
                marginTop: 40,
                opacity: s2Button ? 1 : 0,
                transform: s2Button ? "translateY(0)" : "translateY(12px)",
                pointerEvents: s2Button ? "auto" : "none",
              }}
            >
              Start exploring
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
