"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

/**
 * White overlay that covers the screen during route transitions.
 * Shows instantly (no transition) when route changes, then fades out
 * after the new page has painted.
 */
export function RouteOverlay() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      // Route changed — instantly show white overlay
      setVisible(true);
      // After new page paints, fade out the overlay
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(false);
        });
      });
      prevPath.current = pathname;
    }
  }, [pathname]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: visible ? "none" : "opacity 0.3s ease",
      }}
    />
  );
}
