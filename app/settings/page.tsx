"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, LogOut, MapPin } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { SignInModal } from "@/components/SignInModal";
import { useAuth } from "@/lib/useAuth";
import { useLanguage } from "@/lib/useLanguage";
import type { Lang } from "@/components/LanguageProvider";

const CUISINE_OPTIONS = [
  { id: "川菜", en: "Sichuan" },
  { id: "粤菜", en: "Cantonese" },
  { id: "江浙菜", en: "Jiangzhe" },
  { id: "火锅", en: "Hotpot" },
  { id: "东北菜", en: "Dongbei" },
  { id: "湘菜", en: "Hunan" },
  { id: "烧烤", en: "BBQ" },
  { id: "新疆菜", en: "Northwestern" },
  { id: "面食", en: "Noodles" },
  { id: "饺子", en: "Dumplings" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#6B6B6B] text-xs font-semibold tracking-widest uppercase mb-3 mt-8 first:mt-0">
      {children}
    </p>
  );
}

function SettingsRow({
  label,
  value,
  onClick,
}: {
  label: string;
  value?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full py-4 border-b border-[#E5E5E5] last:border-0"
    >
      <span className="text-[#1A1A1A] text-sm">{label}</span>
      <div className="flex items-center gap-2">
        {value && <span className="text-[#6B6B6B] text-sm">{value}</span>}
        <ChevronRight size={16} strokeWidth={1.5} className="text-[#6B6B6B]" />
      </div>
    </button>
  );
}

export default function SettingsPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const router = useRouter();

  const [showSignIn, setShowSignIn] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [prefsSaved, setPrefsSaved] = useState(false);

  // Load preferences
  useEffect(() => {
    if (user) {
      fetch("/api/preferences")
        .then((r) => r.json())
        .then((data) => setSelectedCuisines(data.preferences ?? []))
        .catch(() => {});
    } else {
      const local = localStorage.getItem("chieats_preferences");
      if (local) setSelectedCuisines(local.split(",").filter(Boolean));
    }
  }, [user]);

  function toggleCuisine(id: string) {
    setSelectedCuisines((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setPrefsSaved(false);
  }

  async function savePreferences() {
    setSavingPrefs(true);
    try {
      if (user) {
        await fetch("/api/preferences", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ preferences: selectedCuisines }),
        });
      } else {
        localStorage.setItem("chieats_preferences", selectedCuisines.join(","));
      }
      setPrefsSaved(true);
    } finally {
      setSavingPrefs(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <>
      <main className="px-5 pt-12 pb-28">
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-8">
          {t("设置", "SETTINGS")}
        </h1>

        {/* Account */}
        <SectionLabel>{t("账户", "ACCOUNT")}</SectionLabel>
        <div className="bg-white rounded-xl border border-[#E5E5E5] divide-y divide-[#E5E5E5] overflow-hidden">
          {authLoading ? (
            <div className="py-4 px-4">
              <div className="h-4 bg-[#E5E5E5] rounded w-1/2 animate-pulse" />
            </div>
          ) : user ? (
            <>
              <div className="px-4 py-4">
                <p className="text-[#6B6B6B] text-xs mb-0.5">{t("登录邮箱", "Signed in as")}</p>
                <p className="text-[#1A1A1A] text-sm font-medium truncate">{user.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 w-full px-4 py-4 text-[#D32F2F] text-sm"
              >
                <LogOut size={16} strokeWidth={1.5} />
                {t("退出登录", "Sign out")}
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowSignIn(true)}
              className="flex items-center justify-between w-full px-4 py-4"
            >
              <span className="text-[#1A1A1A] text-sm">{t("登录 / 注册", "Sign in")}</span>
              <ChevronRight size={16} strokeWidth={1.5} className="text-[#6B6B6B]" />
            </button>
          )}
        </div>

        {/* Language */}
        <SectionLabel>{t("语言", "LANGUAGE")}</SectionLabel>
        <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
          <div className="px-4 py-4 flex items-center justify-between">
            <span className="text-[#1A1A1A] text-sm">{t("显示语言", "Display language")}</span>
            <div className="flex bg-[#F0F0F0] rounded-full p-1">
              {(["zh", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    lang === l ? "bg-[#1A1A1A] text-white" : "text-[#6B6B6B]"
                  }`}
                >
                  {l === "zh" ? "中文" : "EN"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Location */}
        <SectionLabel>{t("位置", "LOCATION")}</SectionLabel>
        <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
          <div className="px-4 py-4 flex items-center gap-3">
            <MapPin size={16} strokeWidth={1.5} className="text-[#6B6B6B] shrink-0" />
            <div>
              <p className="text-[#1A1A1A] text-sm">{t("使用 GPS 定位", "Use GPS location")}</p>
              <p className="text-[#6B6B6B] text-xs mt-0.5">
                {t("未授权时默认显示 Providence 市中心", "Defaults to Providence center if denied")}
              </p>
            </div>
          </div>
        </div>

        {/* Cuisine Preferences */}
        <SectionLabel>{t("口味偏好", "CUISINE PREFERENCES")}</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {CUISINE_OPTIONS.map(({ id, en }) => {
            const active = selectedCuisines.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggleCuisine(id)}
                className={`h-9 px-4 rounded-full text-sm border transition-all ${
                  active
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-white text-[#1A1A1A] border-[#E5E5E5]"
                }`}
              >
                {t(id, en)}
              </button>
            );
          })}
        </div>

        {selectedCuisines.length > 0 && (
          <button
            onClick={savePreferences}
            disabled={savingPrefs}
            className={`mt-5 w-full h-11 rounded-full text-xs font-semibold tracking-widest uppercase transition-colors ${
              prefsSaved
                ? "bg-[#2E7D32] text-white"
                : "bg-[#1A1A1A] text-white hover:bg-[#333333]"
            } disabled:opacity-60`}
          >
            {savingPrefs
              ? t("保存中...", "SAVING...")
              : prefsSaved
              ? t("已保存 ✓", "SAVED ✓")
              : t("保存偏好", "SAVE PREFERENCES")}
          </button>
        )}
      </main>

      <BottomNav />
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </>
  );
}
