/**
 * Category-based dish image mapping.
 * Matches keywords in the dish name to a photo category.
 * Longer keywords checked first for specificity.
 */

const categoryImageMap: Record<string, string> = {
  "火锅": "/dishes/hotpot.jpg",
  "麻辣烫": "/dishes/hotpot.jpg",
  "麻辣香锅": "/dishes/hotpot.jpg",
  "鸳鸯": "/dishes/hotpot.jpg",
  "锅底": "/dishes/hotpot.jpg",
  "面": "/dishes/noodle-soup.jpg",
  "粉": "/dishes/noodle-soup.jpg",
  "米线": "/dishes/noodle-soup.jpg",
  "饺": "/dishes/jiaozi.jpg",
  "包": "/dishes/jiaozi.jpg",
  "馄饨": "/dishes/jiaozi.jpg",
  "烧麦": "/dishes/jiaozi.jpg",
  "烤": "/dishes/kaochuan.jpg",
  "串": "/dishes/kaochuan.jpg",
  "烧烤": "/dishes/kaochuan.jpg",
  "饭": "/dishes/chaofan.jpg",
  "饭团": "/dishes/chaofan.jpg",
  "便当": "/dishes/chaofan.jpg",
};

// Sort by key length descending so longer (more specific) keywords match first
const sortedEntries = Object.entries(categoryImageMap).sort(
  ([a], [b]) => b.length - a.length
);

export function getDishImage(name: string): string {
  for (const [keyword, image] of sortedEntries) {
    if (name.includes(keyword)) return image;
  }
  return "/dishes/default.jpg";
}
