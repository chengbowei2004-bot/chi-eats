/** Restaurants that have passed DeeDao calibration. */
export const CERTIFIED_RESTAURANTS = [
  "Chongqing House",
  "Chengdu Taste",
  "Rong Chic",
  "Chef Yao",
  "Mala Noodle",
  "Y Bento",
  "Y Noodle Bar",
  "Lamei Hotpot",
];

/** Per-restaurant endorsement badges. */
export const RESTAURANT_ENDORSEMENTS: Record<string, { source: string; source_zh: string; color: string }[]> = {
  "Chef Yao": [
    { source: "Reddit Favorite", source_zh: "Reddit 热门", color: "#FF4500" },
  ],
  "Rong Chic": [
    { source: "Local Press Pick", source_zh: "本地媒体推荐", color: "#1a1a2e" },
  ],
  "Chongqing House": [
    { source: "Best Sichuan in New England", source_zh: "新英格兰最佳川菜", color: "#1a1a2e" },
  ],
  "Jahunger": [
    { source: "Award-Winning Xinjiang", source_zh: "获奖新疆菜", color: "#D4AF37" },
  ],
  "Y Noodle Bar": [
    { source: "RI Monthly Pick", source_zh: "RI Monthly 推荐", color: "#2563eb" },
  ],
};
