"use client";

import { useRouter } from "next/navigation";

// Warm, appetizing gradient pairs
const GRADIENTS: [string, string][] = [
  ["#FF6B35", "#F7931E"], // orange
  ["#E84855", "#FF6F61"], // red-coral
  ["#F4A261", "#E76F51"], // warm orange-rust
  ["#D4463B", "#F28C38"], // red to orange
  ["#E07A5F", "#F2CC8F"], // terracotta to warm yellow
  ["#C44536", "#F0A500"], // deep red to golden
  ["#FF8C42", "#FFD166"], // tangerine to yellow
  ["#E85D04", "#FAA307"], // burnt orange to amber
];

// Food emojis mapped by common Chinese dish keywords
const FOOD_EMOJI_MAP: [string, string][] = [
  ["鸡", "🍗"],
  ["鸭", "🦆"],
  ["鱼", "🐟"],
  ["虾", "🦐"],
  ["蟹", "🦀"],
  ["肉", "🥩"],
  ["牛", "🥩"],
  ["猪", "🥩"],
  ["羊", "🐑"],
  ["豆腐", "🧈"],
  ["面", "🍜"],
  ["粉", "🍜"],
  ["饭", "🍚"],
  ["汤", "🍲"],
  ["饺", "🥟"],
  ["包", "🥟"],
  ["蛋", "🥚"],
  ["菜", "🥬"],
  ["茶", "🍵"],
];

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getGradient(name: string): [string, string] {
  return GRADIENTS[hashCode(name) % GRADIENTS.length];
}

function getEmoji(name: string): string {
  for (const [keyword, emoji] of FOOD_EMOJI_MAP) {
    if (name.includes(keyword)) return emoji;
  }
  return name[0] ?? "🍽";
}

export function DishThumbnail({ name }: { name: string }) {
  const router = useRouter();
  const [from, to] = getGradient(name);
  const emoji = getEmoji(name);

  return (
    <button
      onClick={() => router.push(`/search?q=${encodeURIComponent(name)}`)}
      className="flex flex-col items-center gap-1.5 shrink-0 w-[68px]"
    >
      <div
        className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-2xl shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${from}, ${to})`,
        }}
      >
        {emoji}
      </div>
      <span className="text-[11px] text-[#1A1A1A] leading-tight text-center line-clamp-2 w-full">
        {name}
      </span>
    </button>
  );
}

export function DishThumbnailRow({ dishes }: { dishes: string[] }) {
  if (dishes.length === 0) return null;

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 mb-2 scrollbar-hide">
      {dishes.map((name) => (
        <DishThumbnail key={name} name={name} />
      ))}
    </div>
  );
}
