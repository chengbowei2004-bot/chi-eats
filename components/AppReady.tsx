"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/useLanguage";

/**
 * Waits for the language provider to hydrate from localStorage,
 * then reveals the page with a smooth opacity transition.
 * Prevents FOUC by keeping html invisible until ready.
 */
export function AppReady({ children }: { children: React.ReactNode }) {
  const { ready } = useLanguage();
  const revealed = useRef(false);

  useEffect(() => {
    if (ready && !revealed.current) {
      revealed.current = true;
      // Wait one frame so the correct language renders before reveal
      requestAnimationFrame(() => {
        document.documentElement.style.transition = "opacity 0.25s ease";
        document.documentElement.style.opacity = "1";
      });
    }
  }, [ready]);

  if (!ready) return null;

  return <>{children}</>;
}
