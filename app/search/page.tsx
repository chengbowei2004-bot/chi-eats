"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SortToggle } from "@/components/SortToggle";
import { SkeletonRestaurantCard } from "@/components/SkeletonCard";
import { SearchBar } from "@/components/SearchBar";
import { SignInModal } from "@/components/SignInModal";
import { useLanguage } from "@/lib/useLanguage";
import { useAuth } from "@/lib/useAuth";

type Sort = "nearest" | "best_reviewed";

type MatchedDish = { id: string; name_zh: string; name_en: string };

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
  dishes_served: string[];
};

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();
  const { user } = useAuth();
  const query = searchParams.get("q") ?? "";

  const [restaurants, setRestaurants] = useState<RestaurantResult[]>([]);
  const [matchedDishes, setMatchedDishes] = useState<MatchedDish[]>([]);
  const [alternatives, setAlternatives] = useState<MatchedDish[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [sort, setSort] = useState<Sort>("nearest");
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());
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

  // Search when query or sort changes
  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setSearched(false);

    fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        sort,
        ...(userLat !== null && { lat: userLat }),
        ...(userLng !== null && { lng: userLng }),
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setRestaurants(data.restaurants ?? []);
        setMatchedDishes(data.matchedDishes ?? []);
        setAlternatives(data.alternatives ?? []);
        setSearched(true);
      })
      .catch(() => {
        setRestaurants([]);
        setMatchedDishes([]);
        setAlternatives([]);
        setSearched(true);
      })
      .finally(() => setLoading(false));
  }, [query, sort, userLat, userLng]);

  return (
    <>
      <main className="px-5 pt-10 pb-28">
        {/* Back + search */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.push("/")}
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F0F0F0] transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} strokeWidth={1.5} className="text-[#1A1A1A]" />
          </button>
          <div className="flex-1">
            <SearchBar initialValue={query} />
          </div>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <SkeletonRestaurantCard key={i} />
            ))}
          </div>
        )}

        {/* Results: restaurants found */}
        {!loading && searched && restaurants.length > 0 && (
          <>
            <p className="text-[#6B6B6B] text-xs font-semibold tracking-widest uppercase mb-4">
              {matchedDishes.length === 1
                ? t(
                    `为你找到「${matchedDishes[0].name_zh}」的餐厅`,
                    `RESTAURANTS SERVING ${matchedDishes[0].name_en.toUpperCase()}`
                  )
                : t(
                    `找到 ${restaurants.length} 家餐厅`,
                    `${restaurants.length} RESTAURANTS FOUND`
                  )}
            </p>

            <div className="mb-5">
              <SortToggle value={sort} onChange={setSort} />
            </div>

            <div className="space-y-4">
              {restaurants.map((r) => (
                <div key={r.id}>
                  {r.dishes_served.length > 0 && (
                    <p className="text-[#6B6B6B] text-xs mb-2">
                      {r.dishes_served.join("、")}
                    </p>
                  )}
                  <RestaurantCard
                    restaurant={r}
                    favorited={favoritedIds.has(r.id)}
                    onSignInRequired={() => setShowSignIn(true)}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* No results: show alternatives */}
        {!loading && searched && restaurants.length === 0 && query && (
          <div className="text-center py-16 space-y-4">
            <p className="text-[#1A1A1A] text-base font-medium">
              {t(
                "没有完美匹配的菜品，但这些类似的值得一试：",
                "No exact matches, but these are worth a try:"
              )}
            </p>

            {alternatives.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {alternatives.map((dish) => (
                  <button
                    key={dish.id}
                    onClick={() =>
                      router.push(
                        `/search?q=${encodeURIComponent(dish.name_zh)}`
                      )
                    }
                    className="h-9 px-5 rounded-full border border-[#E5E5E5] bg-white text-[#1A1A1A] text-sm hover:bg-[#F0F0F0] transition-colors"
                  >
                    {dish.name_zh}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <BottomNav />
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
