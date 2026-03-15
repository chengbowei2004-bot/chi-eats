/**
 * Dish image mapping.
 * 1. Exact name_zh match → dedicated AI-generated photo
 * 2. Keyword match → category photo (longer keywords checked first)
 * 3. Fallback → default photo
 */

const dishImageMap: Record<string, string> = {
  "水煮鱼": "/dishes/shuizhuyu.jpg",
  "小笼包": "/dishes/xiaolongbao.jpg",
  "四川火锅": "/dishes/malahuoguo.jpg",
  "麻辣火锅": "/dishes/malahuoguo.jpg",
  "麻辣香锅": "/dishes/malaxiangguo.jpg",
  "回锅肉": "/dishes/huiguorou.jpg",
  "炸酱面": "/dishes/zhajiangmian.jpg",
  "凉拌黄瓜": "/dishes/liangbanhuanggua.jpg",
  "烤肉串": "/dishes/kaorouchuan.jpg",
  "烤串": "/dishes/kaochuan.jpg",
  "糖醋排骨": "/dishes/tangcupaigu.jpg",
  "糖醋里脊": "/dishes/tangculiji.jpg",
  "煎包": "/dishes/jianbao.jpg",
  "煎饺": "/dishes/jianjiao.jpg",
  "担担面": "/dishes/dandanmian.jpg",
  "麻婆豆腐": "/dishes/mapodoufu.jpg",
  "辣子鸡": "/dishes/laziji.jpg",
  "重庆辣子鸡": "/dishes/laziji.jpg",
  "重庆小面": "/dishes/chongqingxiaomian.jpg",
  "麻辣烫": "/dishes/malatang.jpg",
  "酸辣土豆丝": "/dishes/suanlatudousi.jpg",
  "水煮牛肉": "/dishes/shuizhuniurou.jpg",
  "剁椒鱼头": "/dishes/duojiaoyutou.jpg",
  "麻辣烤鱼": "/dishes/malakaoyu.jpg",
  "辣椒炒肉": "/dishes/lajiaochaorou.jpg",
  "红烧牛肉面": "/dishes/hongshaoniuroumian.jpg",
  "猪肉水饺": "/dishes/zhuroupshuijiao.jpg",
  "凉皮": "/dishes/liangpi.jpg",
  "热干面": "/dishes/reganmian.jpg",
  "兰州拉面": "/dishes/lanzhoulamian.jpg",
  "葱油拌面": "/dishes/congyoubanmian.jpg",
  "牛腩面": "/dishes/niunanmian.jpg",
  "白切鸡配姜葱": "/dishes/baiqieji.jpg",
  "蒜蓉蒸虾": "/dishes/suanrongzhengxia.jpg",
  "西湖牛肉羹": "/dishes/xihuniurougeng.jpg",
  "素炒饭": "/dishes/suchaofan.jpg",
  "凉拌鸡": "/dishes/liangbanji.jpg",
  "莲藕排骨汤": "/dishes/lianoupaigu.jpg",
  "家常豆腐": "/dishes/jiachangdoufu.jpg",
  "黄金蛋炒饭": "/dishes/huangjinchaofan.jpg",
  "酒酿圆子": "/dishes/jiuniangyuanzi.jpg",
  "红烧牛腩": "/dishes/hongshaoniunan.jpg",
  "鱼香肉丝": "/dishes/yuxiangrousi.jpg",
  "锅包肉": "/dishes/guobaorou.jpg",
  "毛氏红烧肉": "/dishes/maoshihongsharorou.jpg",
  "孜然羊肉": "/dishes/ziranyangrrou.jpg",
  "盐酥鸡": "/dishes/yansuji.jpg",
  "小炒黄牛肉": "/dishes/xiaochaohuangniurou.jpg",
  "红油抄手": "/dishes/hongyouchaoshou.jpg",
  "葱油饼": "/dishes/congyoubing.jpg",
  "手抓饼": "/dishes/shouzhuabing.jpg",
  "臭豆腐": "/dishes/choudoufu.jpg",
  "特色炸串": "/dishes/tesezhachuan.jpg",
  "黄金小馒头": "/dishes/huangjinxiaomantou.jpg",
  "蛋饼": "/dishes/danbing.jpg",
  "煎酿三宝": "/dishes/jianniangsanbao.jpg",
};

const categoryImageMap: Record<string, string> = {
  "火锅": "/dishes/hotpot.jpg",
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
const sortedCategoryEntries = Object.entries(categoryImageMap).sort(
  ([a], [b]) => b.length - a.length
);

export function getDishImage(name: string): string {
  // 1. Exact match
  if (dishImageMap[name]) return dishImageMap[name];
  // 2. Category keyword match
  for (const [keyword, image] of sortedCategoryEntries) {
    if (name.includes(keyword)) return image;
  }
  // 3. Fallback
  return "/dishes/default.jpg";
}
