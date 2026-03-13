"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SortToggle } from "@/components/SortToggle";
import { SkeletonRestaurantCard } from "@/components/SkeletonCard";
import { SignInModal } from "@/components/SignInModal";
import { useLanguage } from "@/lib/useLanguage";
import { useAuth } from "@/lib/useAuth";
import { useCity } from "@/lib/useCity";

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

function DishHeaderImage({ src, alt, cuisineTag }: { src: string; alt: string; cuisineTag?: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
      <span className="text-gray-400 text-sm">{cuisineTag}</span>
    </div>;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} onError={() => setErrored(true)} className="w-full aspect-video object-cover" />;
}

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
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());

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

  // Fetch favorited restaurant IDs
  useEffect(() => {
    if (!user) return;
    fetch("/api/favorites")
      .then((r) => r.json())
      .then((data) => {
        setFavoritedIds(new Set(data.restaurantIds ?? []));
      })
      .catch(() => {});
  }, [user]);

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

  return (
    <>
      <main className="pb-28">
        {/* Dish header image */}
        <div className="relative">
          {dish && (
            <DishHeaderImage src={dish.image_url} alt={dish.name_en} />
          )}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-sm"
            aria-label="Go back"
          >
            <ArrowLeft size={18} strokeWidth={1.5} className="text-gray-900" />
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
                  favorited={favoritedIds.has(r.id)}
                  onSignInRequired={() => setShowSignIn(true)}
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

      <BottomNav />
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </>
  );
}
