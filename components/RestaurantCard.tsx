"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, X } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import { CERTIFIED_RESTAURANTS, REDNOTE_VERIFIED_RESTAURANTS } from "@/lib/constants";

type Restaurant = {
  id: string;
  name: string;
  name_zh: string;
  address: string;
  distance_miles: number;
  review_summary: string;
  review_score: number;
  navigate_url_google: string;
  navigate_url_apple: string;
  top_pick: boolean;
  yelp_url?: string;
};

type Props = {
  restaurant: Restaurant;
  favorited?: boolean;
  onSignInRequired?: () => void;
};

export function RestaurantCard({ restaurant }: Props) {
  const { t } = useLanguage();
  const router = useRouter();
  const [showSheet, setShowSheet] = useState(false);
  const {
    id,
    name,
    name_zh,
    distance_miles,
    navigate_url_google,
    navigate_url_apple,
    top_pick,
    yelp_url,
  } = restaurant;

  const isCertified = CERTIFIED_RESTAURANTS.some(
    (n) => name.includes(n) || name_zh.includes(n)
  );
  const isRedNoteVerified = REDNOTE_VERIFIED_RESTAURANTS.some(
    (n) => name.includes(n) || name_zh.includes(n)
  );

  return (
    <>
      <div
        style={{
          border: top_pick ? "1px solid #1A1A1A" : "1px solid #e0e0e0",
          borderRadius: 14,
          padding: 20,
          background: "#fff",
        }}
      >
        {/* TOP PICK label */}
        {top_pick && (
          <p style={{ fontSize: 10, color: "#999", letterSpacing: "1.5px", textTransform: "uppercase" as const, margin: "0 0 8px" }}>
            {t("推荐", "TOP PICK")}
          </p>
        )}

        {/* Badges row */}
        {(isCertified || isRedNoteVerified) && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, marginBottom: 12 }}>
            {isCertified && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "4px 10px",
                  borderRadius: 20,
                  background: "#000",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span style={{ fontSize: 10, color: "#fff", fontWeight: 500, letterSpacing: "0.5px" }}>
                  {t("DeeDao 认证", "DeeDao Certified")}
                </span>
              </div>
            )}
            {isRedNoteVerified && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "4px 10px",
                  borderRadius: 20,
                  background: "#FF2442",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff" stroke="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
                </svg>
                <span style={{ fontSize: 10, color: "#fff", fontWeight: 500, letterSpacing: "0.5px" }}>
                  {t("RedNote 热门", "Popular on RedNote")}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Restaurant name */}
        <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 2px", color: "#000" }}>
          {t(name_zh || name, name)}
        </h3>
        <p style={{ fontSize: 12, color: "#999", margin: "0 0 8px" }}>
          {t(name, name_zh || "")}
        </p>

        {/* Distance */}
        <div className="flex items-center gap-1" style={{ marginBottom: 16 }}>
          <MapPin size={12} strokeWidth={1.5} className="text-gray-400 shrink-0" />
          <span style={{ fontSize: 12, color: "#999" }}>
            {distance_miles} {t("英里", "mi")}
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => router.push(`/restaurant/${id}/menu`)}
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 10,
              border: "1px solid #000",
              background: "none",
              color: "#000",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "1px",
              cursor: "pointer",
              textTransform: "uppercase" as const,
            }}
          >
            {t("看菜单", "MENU")}
          </button>
          <button
            onClick={() => setShowSheet(true)}
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 10,
              background: "#000",
              color: "#fff",
              border: "none",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "1px",
              cursor: "pointer",
              textTransform: "uppercase" as const,
            }}
          >
            {t("导航", "NAVIGATE")}
          </button>
        </div>
      </div>

      {/* Navigation bottom sheet */}
      {showSheet && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={() => setShowSheet(false)}
          />
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white rounded-t-2xl z-[60] px-6 pt-6 pb-24">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-200 rounded-full" />

            <button
              onClick={() => setShowSheet(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900"
              aria-label="Close"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <h3 className="text-gray-900 text-lg font-light tracking-tight mt-2">
              {t("选择导航方式", "Navigate with")}
            </h3>
            <p className="text-gray-400 text-sm mt-1 truncate">
              {name}{name_zh ? ` · ${name_zh}` : ""}
            </p>

            <div className="mt-5 space-y-3">
              <a
                href={navigate_url_google}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowSheet(false)}
                className="flex items-center justify-center w-full py-3 rounded-full border border-gray-200 text-gray-900 text-sm hover:bg-gray-50 transition-colors"
              >
                Google Maps
              </a>
              <a
                href={navigate_url_apple}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowSheet(false)}
                className="flex items-center justify-center w-full py-3 rounded-full border border-gray-200 text-gray-900 text-sm hover:bg-gray-50 transition-colors"
              >
                Apple Maps
              </a>
              {yelp_url && (
                <a
                  href={yelp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowSheet(false)}
                  className="flex items-center justify-center w-full py-3 rounded-full border border-gray-200 text-gray-900 text-sm hover:bg-gray-50 transition-colors"
                >
                  Yelp
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
