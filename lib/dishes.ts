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
