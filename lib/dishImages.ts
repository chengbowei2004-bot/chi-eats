const dishImageMap: Record<string, string> = {
  // Noodles
  "炸酱面": "/dishes/zhajiangmian.jpg",
  "牛肉面": "/dishes/niuroumian.jpg",
  "红烧牛肉面": "/dishes/niuroumian.jpg",
  "拉面": "/dishes/niuroumian.jpg",
  "拽面": "/dishes/niuroumian.jpg",
  "凉皮": "/dishes/liangpi.jpg",
  "凉面": "/dishes/liangpi.jpg",
  "米线": "/dishes/liangpi.jpg",
  "担担面": "/dishes/zhajiangmian.jpg",

  // Dumplings & Dim Sum
  "小笼包": "/dishes/xiaolongbao.jpg",
  "水饺": "/dishes/jiaozi.jpg",
  "饺子": "/dishes/jiaozi.jpg",
  "锅贴": "/dishes/jiaozi.jpg",
  "馄饨": "/dishes/jiaozi.jpg",
  "点心": "/dishes/dimsum.jpg",
  "烧麦": "/dishes/dimsum.jpg",
  "虾饺": "/dishes/dimsum.jpg",

  // Hot pot & Spicy
  "火锅": "/dishes/hotpot.jpg",
  "麻辣火锅": "/dishes/hotpot.jpg",
  "鸳鸯锅": "/dishes/hotpot.jpg",
  "麻辣烫": "/dishes/malatang.jpg",
  "麻辣香锅": "/dishes/malatang.jpg",
  "麻辣": "/dishes/malatang.jpg",
  "麻婆豆腐": "/dishes/mapotofu.jpg",
  "豆腐": "/dishes/mapotofu.jpg",

  // BBQ & Skewers
  "烤串": "/dishes/kaochuan.jpg",
  "烧烤": "/dishes/kaochuan.jpg",
  "羊肉串": "/dishes/kaochuan.jpg",
  "烤肉": "/dishes/kaochuan.jpg",

  // Rice dishes
  "炒饭": "/dishes/chaofan.jpg",
  "蛋炒饭": "/dishes/chaofan.jpg",
  "卤肉饭": "/dishes/rice.jpg",
  "盖饭": "/dishes/rice.jpg",
  "米饭": "/dishes/rice.jpg",
  "咖喱饭": "/dishes/rice.jpg",
  "便当": "/dishes/rice.jpg",

  // Stir-fry & Meat
  "糖醋里脊": "/dishes/tangcu.jpg",
  "糖醋": "/dishes/tangcu.jpg",
  "锅包肉": "/dishes/tangcu.jpg",
  "宫保鸡丁": "/dishes/chicken.jpg",
  "鸡": "/dishes/chicken.jpg",
  "三杯鸡": "/dishes/chicken.jpg",
  "辣子鸡": "/dishes/chicken.jpg",
  "炒": "/dishes/stirfry.jpg",

  // Duck
  "烤鸭": "/dishes/roastduck.jpg",
  "鸭": "/dishes/roastduck.jpg",

  // Soup
  "汤": "/dishes/soup.jpg",
  "煲": "/dishes/soup.jpg",
  "炖": "/dishes/soup.jpg",

  // Seafood
  "虾": "/dishes/seafood.jpg",
  "鱼": "/dishes/seafood.jpg",
  "海鲜": "/dishes/seafood.jpg",
  "龙虾": "/dishes/seafood.jpg",
};

// Ordered keywords for fuzzy matching (longer keys first for specificity)
const sortedKeys = Object.keys(dishImageMap).sort((a, b) => b.length - a.length);

export function getDishImage(name: string): string {
  // Exact match
  if (dishImageMap[name]) return dishImageMap[name];
  // Fuzzy: dish name contains a keyword
  for (const key of sortedKeys) {
    if (name.includes(key)) return dishImageMap[key];
  }
  // Default
  return "/dishes/default.jpg";
}
