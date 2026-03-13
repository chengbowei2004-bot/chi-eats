"use client";

import { useState } from "react";
import { MapPin, X } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import { FavoriteButton } from "./FavoriteButton";

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

export function RestaurantCard({ restaurant, favorited = false, onSignInRequired }: Props) {
  const { t } = useLanguage();
  const [showSheet, setShowSheet] = useState(false);
  const {
    id,
    name,
    name_zh,
    distance_miles,
    review_summary,
    review_score,
    navigate_url_google,
    navigate_url_apple,
    top_pick,
    yelp_url,
  } = restaurant;

  return (
    <>
      <div
        className={`bg-white rounded-xl border overflow-hidden ${
          top_pick ? "border-gray-900" : "border-gray-200"
        }`}
      >
        <div className="p-5">
          {top_pick && (
            <p className="text-gray-400 text-xs tracking-widest uppercase mb-2">
              {t("推荐", "TOP PICK")}
            </p>
          )}

          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-gray-900 text-lg font-light tracking-tight leading-tight">{name}</h3>
              {name_zh && <p className="text-gray-400 text-sm mt-0.5">{name_zh}</p>}
            </div>
            <div className="flex items-start gap-1 shrink-0">
              <div className="text-right">
                <p className="text-gray-900 text-sm">{review_score.toFixed(1)}</p>
                <p className="text-gray-400 text-xs">{t("评分", "score")}</p>
              </div>
              {onSignInRequired && (
                <FavoriteButton
                  restaurantId={id}
                  initialFavorited={favorited}
                  onSignInRequired={onSignInRequired}
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 mt-2">
            <MapPin size={12} strokeWidth={1.5} className="text-gray-400 shrink-0" />
            <p className="text-gray-400 text-xs">
              {distance_miles} {t("英里", "mi")}
            </p>
          </div>

          <p className="text-gray-500 text-sm mt-3 leading-relaxed line-clamp-2 italic">
            &ldquo;{review_summary}&rdquo;
          </p>
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={() => setShowSheet(true)}
            className="flex items-center justify-center gap-2 w-full py-2 bg-gray-900 text-white text-sm tracking-wider uppercase rounded-full hover:bg-gray-800 transition-colors"
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
