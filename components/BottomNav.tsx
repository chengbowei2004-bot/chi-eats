"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Settings } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";

const NAV_ITEMS = [
  { href: "/", icon: Home, labelZh: "首页", labelEn: "Home" },
  { href: "/favorites", icon: Heart, labelZh: "收藏", labelEn: "Favorites" },
  { href: "/settings", icon: Settings, labelZh: "设置", labelEn: "Settings" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 z-50">
      <div className="flex items-center justify-around h-18 px-8">
        {NAV_ITEMS.map(({ href, icon: Icon, labelZh, labelEn }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={t(labelZh, labelEn)}
              className="flex items-center justify-center w-11 h-11 rounded-full"
            >
              <Icon
                size={24}
                strokeWidth={1.5}
                className={isActive ? "text-gray-900" : "text-gray-400"}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
