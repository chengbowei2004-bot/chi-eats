/**
 * Dish image mapping.
 * 1. Exact name_zh match → dedicated AI-generated photo
 * 2. Keyword match → category photo (longer keywords checked first)
 * 3. Dish's own image_url from data
 * 4. Fallback → default photo
 */

const dishImageMap: Record<string, string> = {
  // ── All tab ──
  "水煮鱼": "/dishes/shuizhuyu.jpg",
  "小笼包": "/dishes/xiaolongbao.jpg",
  "麻辣火锅": "/dishes/malahuoguo.jpg",
  "四川火锅": "/dishes/malahuoguo.jpg",
  "回锅肉": "/dishes/huiguorou.jpg",
  "炸酱面": "/dishes/zhajiangmian.jpg",
  "凉拌黄瓜": "/dishes/liangbanhuanggua.jpg",
  "烤串": "/dishes/kaochuan.jpg",
  "烤肉串": "/dishes/kaochuan.jpg",
  "糖醋里脊": "/dishes/tangculiji.jpg",
  "煎饺": "/dishes/jianjiao.jpg",
  "重庆小面": "/dishes/chongqingxiaomian.jpg",

  // ── Spicy tab ──
  "辣子鸡": "/dishes/laziji.jpg",
  "重庆辣子鸡": "/dishes/laziji.jpg",
  "麻婆豆腐": "/dishes/mapodoufu.jpg",
  "酸辣粉": "/dishes/suanlafen.jpg",
  "香辣虾": "/dishes/xianglaxia.jpg",
  "藤椒鱼片": "/dishes/tengjiaoyupian.jpg",
  "麻辣烫": "/dishes/malatang.jpg",

  // ── Noodles tab ──
  "担担面": "/dishes/dandanmian.jpg",
  "牛肉拉面": "/dishes/niuroulamian.jpg",
  "猪肉水饺": "/dishes/zhuroushuijiao.jpg",
  "红烧牛肉面": "/dishes/hongshaoniuroumian.jpg",
  "凉皮": "/dishes/liangpi.jpg",
  "肉夹馍": "/dishes/roujiamo.jpg",
  "刀削面": "/dishes/daoxiaomian.jpg",

  // ── Light tab ──
  "蒸饺": "/dishes/zhengjiao.jpg",
  "白灼菜心": "/dishes/baizhuocaixin.jpg",
  "清炒时蔬": "/dishes/qingchaoshishu.jpg",
  "白切鸡": "/dishes/baiqieji.jpg",
  "白切鸡配姜葱": "/dishes/baiqieji.jpg",
  "蛋花汤": "/dishes/danhuatang.jpg",
  "鸡蛋炒饭": "/dishes/jidanchaofan.jpg",
  "虾仁豆腐": "/dishes/xiarendoufu.jpg",
  "紫菜蛋花汤": "/dishes/zicaidanhuatang.jpg",
  "西红柿炒鸡蛋": "/dishes/xihongshichaojidan.jpg",

  // ── Meaty tab ──
  "红烧排骨": "/dishes/hongshaopaigu.jpg",
  "水煮牛肉": "/dishes/shuizhuniurou.jpg",
  "烤羊肉串": "/dishes/kaoyangroupchuan.jpg",
  "宫保鸡丁": "/dishes/gongbaojiding.jpg",
  "红烧牛腩": "/dishes/hongshaoniu.jpg",
  "鱼香肉丝": "/dishes/yuxiangrousi.jpg",
  "葱爆羊肉": "/dishes/congbaoyangrou.jpg",
  "盐酥鸡": "/dishes/yansuji.jpg",

  // ── Snacks tab ──
  "红油抄手": "/dishes/hongyouchaoshou.jpg",
  "春卷": "/dishes/chunjuan.jpg",
  "葱油饼": "/dishes/congyoubing.jpg",
  "蛋挞": "/dishes/danta.jpg",
  "锅贴": "/dishes/guotie.jpg",
  "炸鸡翅": "/dishes/zhajichi.jpg",
  "虾饺": "/dishes/xiajiao.jpg",
  "炸酱拌面": "/dishes/zhajiangbanmian.jpg",
  "糯米鸡": "/dishes/nuomiji.jpg",
};

// Category keyword fallbacks (for dishes not in the exact map)
const categoryImageMap: Record<string, string> = {
  "火锅": "/dishes/malahuoguo.jpg",
  "鸳鸯": "/dishes/malahuoguo.jpg",
  "锅底": "/dishes/malahuoguo.jpg",
  "面": "/dishes/dandanmian.jpg",
  "粉": "/dishes/suanlafen.jpg",
  "米线": "/dishes/dandanmian.jpg",
  "饺": "/dishes/zhuroushuijiao.jpg",
  "包": "/dishes/zhuroushuijiao.jpg",
  "馄饨": "/dishes/zhuroushuijiao.jpg",
  "烧麦": "/dishes/zhuroushuijiao.jpg",
  "烤": "/dishes/kaochuan.jpg",
  "串": "/dishes/kaochuan.jpg",
  "烧烤": "/dishes/kaochuan.jpg",
  "饭": "/dishes/jidanchaofan.jpg",
  "饭团": "/dishes/jidanchaofan.jpg",
  "便当": "/dishes/jidanchaofan.jpg",
};

// Sort by key length descending so longer (more specific) keywords match first
const sortedCategoryEntries = Object.entries(categoryImageMap).sort(
  ([a], [b]) => b.length - a.length
);

export function getDishImage(name: string, fallbackUrl?: string): string {
  // 1. Exact match from curated map
  if (dishImageMap[name]) return dishImageMap[name];
  // 2. Category keyword match
  for (const [keyword, image] of sortedCategoryEntries) {
    if (name.includes(keyword)) return image;
  }
  // 3. Dish's own image_url from data
  if (fallbackUrl && fallbackUrl !== "") return fallbackUrl;
  // 4. Fallback
  return "/dishes/default.jpg";
}
