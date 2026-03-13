"use client";

import { useRouter } from "next/navigation";

export function DishChip({ name }: { name: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/search?q=${encodeURIComponent(name)}`)}
      className="shrink-0 h-8 px-4 rounded-full border border-[#E5E5E5] bg-white text-[#1A1A1A] text-xs hover:bg-[#F0F0F0] transition-colors"
    >
      {name}
    </button>
  );
}

export function DishThumbnailRow({ dishes }: { dishes: string[] }) {
  if (dishes.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-hide">
      {dishes.map((name) => (
        <DishChip key={name} name={name} />
      ))}
    </div>
  );
}
