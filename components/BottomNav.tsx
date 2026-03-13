"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Settings } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", icon: Home, labelZh: "首页" },
  { href: "/favorites", icon: Heart, labelZh: "收藏" },
  { href: "/settings", icon: Settings, labelZh: "设置" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 z-50">
      <div className="flex items-center justify-around h-18 px-8">
        {NAV_ITEMS.map(({ href, icon: Icon, labelZh }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={labelZh}
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
