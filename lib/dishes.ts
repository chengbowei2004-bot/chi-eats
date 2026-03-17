import dishesData from "@/data/dishes.json";
import restaurantsData from "@/data/restaurants.json";

export type Dish = {
  id: string;
  name_en: string;
  name_zh: string;
  description_en: string;
  description_zh: string;
  cuisine_tag: string;
  flavor_tags: string[];
  tags: string[];
  dish_type: string;
  image_url: string;
  available_at: string[];
};

export type Restaurant = {
  id: string;
  name: string;
  name_zh: string;
  address: string;
  lat: number;
  lng: number;
  city: string;
  cuisine_tags: string[];
  review_summary: string;
  review_score: number;
  price_per_person?: number;
  yelp_url?: string;
};

// Cast the static JSON — loaded once at module init, cached by Node's module system.
export const allDishes: Dish[] = dishesData as Dish[];
export const allRestaurants: Restaurant[] = restaurantsData as Restaurant[];

export function getDishById(id: string): Dish | undefined {
  return allDishes.find((d) => d.id === id);
}

export function getDishesByIds(ids: string[]): Dish[] {
  const idSet = new Set(ids);
  return allDishes.filter((d) => idSet.has(d.id));
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return allRestaurants.find((r) => r.id === id);
}

export function getRestaurantsByIds(ids: string[]): Restaurant[] {
  const idSet = new Set(ids);
  return allRestaurants.filter((r) => idSet.has(r.id));
}

export function getRestaurantsForDish(dishId: string, city?: string): Restaurant[] {
  const dish = getDishById(dishId);
  if (!dish) return [];
  let restaurants = getRestaurantsByIds(dish.available_at);
  if (city) restaurants = restaurants.filter((r) => r.city === city);
  return restaurants;
}

export function getRestaurantsByCity(city: string): Restaurant[] {
  return allRestaurants.filter((r) => r.city === city);
}

export function getDishesForCity(city: string): Dish[] {
  const cityRestaurantIds = new Set(getRestaurantsByCity(city).map((r) => r.id));
  return allDishes.filter((d) => d.available_at.some((id) => cityRestaurantIds.has(id)));
}

/**
 * Returns up to `count` random dishes, optionally filtered by cuisine tags.
 * Excludes dishes in `excludeIds`.
 */
export function getRandomDishes(
  count: number,
  options: { cuisineTags?: string[]; excludeIds?: string[]; city?: string } = {}
): Dish[] {
  const { cuisineTags, excludeIds = [], city } = options;
  const excludeSet = new Set(excludeIds);

  let pool = allDishes.filter((d) => !excludeSet.has(d.id));

  if (city) {
    const cityRestaurantIds = new Set(getRestaurantsByCity(city).map((r) => r.id));
    const cityFiltered = pool.filter((d) => d.available_at.some((id) => cityRestaurantIds.has(id)));
    if (cityFiltered.length > 0) pool = cityFiltered;
  }

  if (cuisineTags && cuisineTags.length > 0) {
    const tagSet = new Set(cuisineTags);
    const filtered = pool.filter((d) => tagSet.has(d.cuisine_tag));
    // Fall back to full pool if filters leave nothing
    if (filtered.length > 0) pool = filtered;
  }

  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Returns up to `count` dishes that share the most flavor_tags with the given dish.
 * Used for "no restaurants found" fallback — no AI needed.
 */
export function getSimilarDishes(dish: Dish, count: number): Dish[] {
  const targetTags = new Set(dish.flavor_tags);

  return allDishes
    .filter((d) => d.id !== dish.id)
    .map((d) => ({
      dish: d,
      overlap: d.flavor_tags.filter((t) => targetTags.has(t)).length,
    }))
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, count)
    .map(({ dish }) => dish);
}

/** Compact dish summary for Claude's system prompt (keeps token count low). */
export type DishSummary = {
  id: string;
  name_en: string;
  name_zh: string;
  cuisine_tag: string;
  flavor_tags: string[];
};

export function getDishSummaries(): DishSummary[] {
  return allDishes.map(({ id, name_en, name_zh, cuisine_tag, flavor_tags }) => ({
    id,
    name_en,
    name_zh,
    cuisine_tag,
    flavor_tags,
  }));
}

/**
 * Keyword-based search that matches dishes AND restaurant names.
 * Returns restaurant IDs that match the query via their name,
 * so the search API can include them alongside Claude's dish results.
 */
export function searchRestaurantsByKeyword(query: string, city?: string): Restaurant[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  let pool = city ? getRestaurantsByCity(city) : allRestaurants;
  return pool.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.name_zh.includes(q) ||
      r.cuisine_tags.some((t) => t.includes(q))
  );
}

/**
 * Weighted keyword search across dishes and restaurants.
 * Returns a list of { restaurant, dish, score } entries,
 * deduplicated per restaurant (keeps highest-scoring dish).
 *
 * Weights:
 *   dish name_zh / name_en match → 10
 *   restaurant name / name_zh match → 8
 *   dish cuisine_tag match → 5
 *   dish tags match → 3
 */
export type ScoredResult = {
  restaurantId: string;
  dishId: string;
  dishNameZh: string;
  score: number;
};

export function weightedKeywordSearch(query: string, city?: string): ScoredResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const cityPool = city ? getRestaurantsByCity(city) : allRestaurants;
  const cityRestaurantIds = new Set(cityPool.map((r) => r.id));
  const restaurantById = new Map(cityPool.map((r) => [r.id, r]));

  // Score each (restaurant, dish) pair
  const pairScores = new Map<string, ScoredResult>(); // key: restaurantId

  // 1. Score dishes → find their restaurants
  for (const dish of allDishes) {
    if (dish.dish_type !== "dish") continue;

    let dishScore = 0;
    const qLower = q;

    // dish name match → weight 10
    if (dish.name_zh.includes(q) || dish.name_en.toLowerCase().includes(qLower)) {
      dishScore += 10;
    }
    // cuisine_tag match → weight 5
    if (dish.cuisine_tag.includes(q) || dish.cuisine_tag.toLowerCase().includes(qLower)) {
      dishScore += 5;
    }
    // tags match → weight 3
    if (dish.tags.some((t) => t.toLowerCase().includes(qLower) || t.includes(q))) {
      dishScore += 3;
    }

    if (dishScore === 0) continue;

    // Apply to each restaurant that serves this dish
    for (const rid of dish.available_at) {
      if (!cityRestaurantIds.has(rid)) continue;
      const r = restaurantById.get(rid);
      if (!r) continue;

      // Also add restaurant name bonus
      let rBonus = 0;
      if (r.name.toLowerCase().includes(qLower) || r.name_zh.includes(q)) {
        rBonus = 8;
      }

      const totalScore = dishScore + rBonus;
      const existing = pairScores.get(rid);
      if (!existing || totalScore > existing.score) {
        pairScores.set(rid, {
          restaurantId: rid,
          dishId: dish.id,
          dishNameZh: dish.name_zh,
          score: totalScore,
        });
      }
    }
  }

  // 2. Also score restaurants matched by name that have no dish match yet
  for (const r of cityPool) {
    if (pairScores.has(r.id)) continue;
    if (r.name.toLowerCase().includes(q) || r.name_zh.includes(q)) {
      // Find a representative dish
      const repDish = allDishes.find(
        (d) => d.dish_type === "dish" && d.available_at.includes(r.id)
      );
      pairScores.set(r.id, {
        restaurantId: r.id,
        dishId: repDish?.id ?? "",
        dishNameZh: repDish?.name_zh ?? "",
        score: 8,
      });
    }
  }

  return Array.from(pairScores.values()).sort((a, b) => b.score - a.score);
}
