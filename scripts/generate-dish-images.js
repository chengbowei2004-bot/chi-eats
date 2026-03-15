const fs = require("fs");
const https = require("https");
const path = require("path");

/**
 * Downloads curated food photos from Unsplash CDN.
 * Each dish is mapped to a specific Unsplash photo ID for consistent results.
 * Run: node scripts/generate-dish-images.js
 * Retry one: node scripts/generate-dish-images.js shuizhuyu
 */

// Search Unsplash for a dish and return the best photo URL
function searchUnsplash(query, count) {
  return new Promise((resolve, reject) => {
    const url =
      "https://unsplash.com/napi/search/photos?query=" +
      encodeURIComponent(query) +
      "&per_page=" + (count || 5);
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          const j = JSON.parse(data);
          const results = (j.results || []).map((r) => ({
            id: r.id,
            url: r.urls?.regular || r.urls?.small,
            raw: r.urls?.raw,
          }));
          resolve(results);
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

const dishes = [
  { id: "shuizhuyu", name: "水煮鱼", q: "sichuan boiled fish red chili oil bowl" },
  { id: "xiaolongbao", name: "小笼包", q: "xiao long bao soup dumplings steamer" },
  { id: "malaxiangguo", name: "麻辣香锅", q: "mala xiang guo spicy chinese stir fry" },
  { id: "huiguorou", name: "回锅肉", q: "twice cooked pork belly sichuan chinese" },
  { id: "zhajiangmian", name: "炸酱面", q: "zhajiang noodles bean paste chinese" },
  { id: "liangbanhuanggua", name: "凉拌黄瓜", q: "chinese smashed cucumber salad chili oil" },
  { id: "kaorouchuan", name: "烤肉串", q: "chinese lamb skewers bbq cumin grilled" },
  { id: "tangcupaigu", name: "糖醋排骨", q: "chinese sweet sour ribs glazed" },
  { id: "jianbao", name: "煎包", q: "sheng jian bao pan fried buns chinese" },
  { id: "dandanmian", name: "担担面", q: "sichuan dan dan noodles spicy sesame" },
  { id: "mapodoufu", name: "麻婆豆腐", q: "mapo tofu sichuan spicy chinese dish" },
  { id: "laziji", name: "辣子鸡", q: "chongqing chicken fried dried chilies" },
  { id: "malatang", name: "麻辣烫", q: "mala tang chinese spicy hot pot soup" },
  { id: "suanlatudousi", name: "酸辣土豆丝", q: "chinese shredded potato stir fry vinegar" },
  { id: "shuizhuniurou", name: "水煮牛肉", q: "sichuan boiled beef chili oil spicy" },
  { id: "duojiaoyutou", name: "剁椒鱼头", q: "steamed fish head chopped chili chinese" },
  { id: "malakaoyu", name: "麻辣烤鱼", q: "chinese grilled fish spicy mala chili" },
  { id: "lajiaochaorou", name: "辣椒炒肉", q: "stir fried pork green pepper chinese" },
  { id: "hongshaoniuroumian", name: "红烧牛肉面", q: "braised beef noodle soup taiwanese" },
  { id: "zhuroupshuijiao", name: "猪肉水饺", q: "chinese boiled pork dumplings jiaozi" },
  { id: "liangpi", name: "凉皮", q: "cold skin noodles liang pi chinese" },
  { id: "reganmian", name: "热干面", q: "wuhan hot dry noodles sesame paste" },
  { id: "lanzhoulamian", name: "兰州拉面", q: "lanzhou hand pulled noodle soup beef" },
  { id: "congyoubanmian", name: "葱油拌面", q: "scallion oil noodles chinese shanghai" },
  { id: "niunanmian", name: "牛腩面", q: "chinese beef brisket noodle soup" },
  { id: "baiqieji", name: "白切鸡配姜葱", q: "cantonese white cut poached chicken ginger" },
  { id: "suanrongzhengxia", name: "蒜蓉蒸虾", q: "chinese garlic steamed prawns vermicelli" },
  { id: "xihuniurougeng", name: "西湖牛肉羹", q: "chinese beef soup thick egg white" },
  { id: "suchaofan", name: "素炒饭", q: "chinese vegetable fried rice egg" },
  { id: "liangbanji", name: "凉拌鸡", q: "chinese cold chicken chili oil sesame" },
  { id: "lianoupaigu", name: "莲藕排骨汤", q: "chinese lotus root pork rib soup" },
  { id: "jiachangdoufu", name: "家常豆腐", q: "chinese tofu stir fry home style" },
  { id: "huangjinchaofan", name: "黄金蛋炒饭", q: "chinese golden egg fried rice" },
  { id: "jiuniangyuanzi", name: "酒酿圆子", q: "chinese rice balls sweet dessert soup" },
  { id: "hongshaoniunan", name: "红烧牛腩", q: "chinese braised beef brisket stew" },
  { id: "yuxiangrousi", name: "鱼香肉丝", q: "chinese shredded pork garlic sauce stir fry" },
  { id: "guobaorou", name: "锅包肉", q: "chinese crispy sweet pork northeast" },
  { id: "maoshihongsharorou", name: "毛氏红烧肉", q: "chinese braised pork belly red cooked" },
  { id: "ziranyangrrou", name: "孜然羊肉", q: "chinese cumin lamb stir fry spicy" },
  { id: "yansuji", name: "盐酥鸡", q: "taiwanese popcorn chicken fried" },
  { id: "xiaochaohuangniurou", name: "小炒黄牛肉", q: "hunan stir fried beef chili pepper" },
  { id: "hongyouchaoshou", name: "红油抄手", q: "sichuan wontons chili oil red peanuts" },
  { id: "congyoubing", name: "葱油饼", q: "chinese scallion pancake crispy flaky" },
  { id: "shouzhuabing", name: "手抓饼", q: "chinese flaky flatbread pancake layers" },
  { id: "choudoufu", name: "臭豆腐", q: "stinky tofu fried chinese street food" },
  { id: "tesezhachuan", name: "特色炸串", q: "chinese fried skewers street food sticks" },
  { id: "huangjinxiaomantou", name: "黄金小馒头", q: "chinese fried golden mantou buns condensed milk" },
  { id: "danbing", name: "蛋饼", q: "taiwanese egg crepe dan bing breakfast" },
  { id: "jianniangsanbao", name: "煎酿三宝", q: "chinese stuffed tofu eggplant pepper fried" },
];

const outputDir = path.join(__dirname, "..", "public", "dishes");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadUrl(url, filepath) {
  return new Promise((resolve, reject) => {
    function follow(targetUrl) {
      const mod = targetUrl.startsWith("https") ? https : require("http");
      mod.get(targetUrl, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          follow(res.headers.location);
        } else if (res.statusCode === 200) {
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => {
            const buf = Buffer.concat(chunks);
            fs.writeFileSync(filepath, buf);
            resolve(buf.length);
          });
          res.on("error", reject);
        } else {
          reject(new Error("HTTP " + res.statusCode));
        }
      }).on("error", reject);
    }
    follow(url);
  });
}

async function generateAll() {
  const only = process.argv[2];
  const todo = only ? dishes.filter((d) => d.id === only) : dishes;
  console.log("Downloading " + todo.length + " dish images from Unsplash...\n");

  for (let i = 0; i < todo.length; i++) {
    const dish = todo[i];
    const filepath = path.join(outputDir, dish.id + ".jpg");

    // Skip existing
    if (!only && fs.existsSync(filepath) && fs.statSync(filepath).size > 50000) {
      console.log("[" + (i + 1) + "/" + todo.length + "] " + dish.name + " — exists, skip");
      continue;
    }

    console.log("[" + (i + 1) + "/" + todo.length + "] " + dish.name + " (" + dish.id + ")...");

    try {
      const results = await searchUnsplash(dish.q, 3);
      if (results.length === 0) {
        console.log("  No results found");
        continue;
      }

      // Use the raw URL with size params for best quality
      const photo = results[0];
      const imgUrl = photo.raw
        ? photo.raw + "&w=800&h=600&fit=crop&q=80"
        : photo.url;

      const size = await downloadUrl(imgUrl, filepath);
      console.log("  OK (" + Math.round(size / 1024) + "KB) — " + photo.id);
    } catch (e) {
      console.log("  FAILED: " + e.message);
    }

    // Rate limit: 1.5s between requests
    await new Promise((r) => setTimeout(r, 1500));
  }

  // Summary
  console.log("\n=== Summary ===");
  let ok = 0, missing = 0;
  for (const dish of dishes) {
    const fp = path.join(outputDir, dish.id + ".jpg");
    if (fs.existsSync(fp) && fs.statSync(fp).size > 10000) {
      ok++;
    } else {
      missing++;
      console.log("MISSING: " + dish.name + " (" + dish.id + ")");
    }
  }
  console.log(ok + "/" + dishes.length + " images ready" + (missing ? ", " + missing + " missing" : ""));
}

generateAll().catch(console.error);
