"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SkeletonRestaurantCard } from "@/components/SkeletonCard";
import { SignInModal } from "@/components/SignInModal";
import { useAuth } from "@/lib/useAuth";
import { useLanguage } from "@/lib/useLanguage";

type FavoriteRestaurant = {
  id: string;
  name: string;
  name_zh: string;
  address: string;
  distance_miles: number;
  review_summary: string;
  review_score: number;
  navigate_url_google: string;
  navigate_url_apple: string;
  yelp_url?: string;
  top_pick: boolean;
};

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();

  const [favorites, setFavorites] = useState<FavoriteRestaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    function fetchWithCoords(lat?: number, lng?: number) {
      const params = new URLSearchParams();
      if (lat !== undefined) params.set("lat", String(lat));
      if (lng !== undefined) params.set("lng", String(lng));

      fetch(`/api/favorites?${params}`)
        .then((r) => r.json())
        .then((data) => setFavorites(data.favorites ?? []))
        .catch(() => setFavorites([]))
        .finally(() => setLoading(false));
    }

    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => fetchWithCoords(coords.latitude, coords.longitude),
      () => fetchWithCoords()
    );
  }, [user]);

  function handleUnfavorite(restaurantId: string) {
    setFavorites((prev) => prev.filter((r) => r.id !== restaurantId));
  }

  return (
    <>
      <main className="px-5 pt-12 pb-28">
        <h1 className="text-2xl font-light text-gray-900 tracking-tight mb-8">
          {t("我的收藏", "FAVORITES")}
        </h1>

        {/* Not signed in */}
        {!authLoading && !user && (
          <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Heart size={28} strokeWidth={1.5} className="text-gray-400" />
            </div>
            <p className="text-gray-900 text-base font-light">
              {t("登录后保存喜欢的餐厅", "Sign in to save your favorites")}
            </p>
            <p className="text-gray-400 text-sm max-w-[220px]">
              {t(
                "收藏喜欢的餐厅，随时导航过去",
                "Save restaurants you love and navigate to them anytime"
              )}
            </p>
            <button
              onClick={() => setShowSignIn(true)}
              className="mt-2 py-2 px-6 bg-gray-900 text-white text-sm tracking-wider uppercase rounded-full hover:bg-gray-800 transition-colors"
            >
              {t("登录", "SIGN IN")}
            </button>
          </div>
        )}

        {/* Loading */}
        {(authLoading || (user && loading)) && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <SkeletonRestaurantCard key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {user && !loading && favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-20 space-y-3">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Heart size={28} strokeWidth={1.5} className="text-gray-400" />
            </div>
            <p className="text-gray-900 text-base font-light">
              {t("还没有收藏", "No favorites yet")}
            </p>
            <p className="text-gray-400 text-sm max-w-[220px]">
              {t(
                "在搜索结果中点击 ♡ 收藏喜欢的餐厅",
                "Tap ♡ on any restaurant to save it here"
              )}
            </p>
          </div>
        )}

        {/* Favorites list */}
        {user && !loading && favorites.length > 0 && (
          <div className="space-y-4">
            {favorites.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                favorited={true}
                onSignInRequired={() => setShowSignIn(true)}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </>
  );
}
