"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SortToggle } from "@/components/SortToggle";
import { SkeletonRestaurantCard } from "@/components/SkeletonCard";
import { SignInModal } from "@/components/SignInModal";
import { useLanguage } from "@/lib/useLanguage";
import { useAuth } from "@/lib/useAuth";
import { useCity } from "@/lib/useCity";
import { getDishImage } from "@/lib/dishImages";

type Sort = "nearest" | "best_reviewed";

type RestaurantResult = {
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

type DishHeader = {
  id: string;
  name_en: string;
  name_zh: string;
  image_url: string;
};

type AlternativeDish = {
  id: string;
  name_zh: string;
  name_en: string;
};

export default function RestaurantResultsPage() {
  const { dishId } = useParams<{ dishId: string }>();
  const router = useRouter();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { city } = useCity();

  const [dish, setDish] = useState<DishHeader | null>(null);
  const [restaurants, setRestaurants] = useState<RestaurantResult[]>([]);
  const [alternatives, setAlternatives] = useState<AlternativeDish[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<Sort>("nearest");
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);

  // Get GPS once on mount
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        setUserLat(coords.latitude);
        setUserLng(coords.longitude);
      },
      () => {}
    );
  }, []);

  // Fetch restaurants whenever dish, sort, or coords change
  useEffect(() => {
    if (!dishId) return;
    setLoading(true);

    const params = new URLSearchParams({ sort, city });
    if (userLat !== null) params.set("lat", String(userLat));
    if (userLng !== null) params.set("lng", String(userLng));

    fetch(`/api/restaurants/${dishId}?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setDish(data.dish ?? null);
        setRestaurants(data.restaurants ?? []);
        setAlternatives(
          (data.alternatives ?? []).map((d: AlternativeDish) => ({
            id: d.id,
            name_zh: d.name_zh,
            name_en: d.name_en,
          }))
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [dishId, sort, city, userLat, userLng]);

  // Resolve dish image: getDishImage (curated) first, then image_url from API, then fallback
  const dishImage = dish
    ? getDishImage(dish.name_zh) !== "/dishes/default.jpg"
      ? getDishImage(dish.name_zh)
      : dish.image_url || "/dishes/default.jpg"
    : "/dishes/default.jpg";

  const [imgErrored, setImgErrored] = useState(false);

  return (
    <>
      <main className="pb-12">
        {/* Dish header image */}
        <div className="relative">
          <div style={{ width: "100%", height: 280, overflow: "hidden", background: "#f5f5f5" }}>
            {!imgErrored ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={dishImage}
                alt={dish?.name_zh ?? ""}
                onError={() => setImgErrored(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-2xl font-light">
                  {dish ? t(dish.name_zh, dish.name_en) : ""}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => router.back()}
            aria-label="Go back"
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="px-5 pt-5">
          {dish && (
            <div className="mb-6">
              <h1 className="text-2xl font-light text-gray-900 tracking-tight leading-tight">
                {t(dish.name_zh, dish.name_en)}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {t(dish.name_en, dish.name_zh)}
              </p>
            </div>
          )}

          {!loading && restaurants.length > 0 && (
            <div className="mb-5">
              <SortToggle value={sort} onChange={setSort} />
            </div>
          )}

          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <SkeletonRestaurantCard key={i} />)}
            </div>
          )}

          {!loading && restaurants.length > 0 && (
            <div className="space-y-4">
              {restaurants.map((r) => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                />
              ))}
            </div>
          )}

          {/* No results state */}
          {!loading && restaurants.length === 0 && dish && (
            <div>
              <div className="text-center py-8">
                <p className="text-gray-900 text-base font-light">
                  {t("附近暂时没有这道菜", "No restaurants nearby serve this dish")}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {t("试试类似口味的菜？", "Try something with a similar taste?")}
                </p>
              </div>

              {alternatives.length > 0 && (
                <>
                  <p className="text-gray-400 text-xs tracking-widest uppercase mb-4">
                    {t("口味相似", "SIMILAR DISHES")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {alternatives.map((alt) => (
                      <button
                        key={alt.id}
                        onClick={() => router.push(`/dish/${alt.id}`)}
                        className="h-9 px-5 rounded-full border border-gray-200 bg-white text-gray-900 text-sm hover:bg-gray-50 transition-colors"
                      >
                        {t(alt.name_zh, alt.name_en)}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </>
  );
}
