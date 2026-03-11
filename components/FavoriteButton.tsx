"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/lib/useAuth";

type Props = {
  restaurantId: string;
  initialFavorited?: boolean;
  onSignInRequired: () => void;
};

export function FavoriteButton({ restaurantId, initialFavorited = false, onSignInRequired }: Props) {
  const { user } = useAuth();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFavorited(initialFavorited);
  }, [initialFavorited]);

  async function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      onSignInRequired();
      return;
    }

    setLoading(true);
    const method = favorited ? "DELETE" : "POST";
    try {
      await fetch("/api/favorites", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurantId }),
      });
      setFavorited(!favorited);
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className="flex items-center justify-center w-9 h-9 rounded-full transition-transform active:scale-90"
    >
      <Heart
        size={20}
        strokeWidth={1.5}
        className={favorited ? "fill-[#1A1A1A] text-[#1A1A1A]" : "text-[#6B6B6B]"}
      />
    </button>
  );
}
