import Anthropic from "@anthropic-ai/sdk";
import { getDishSummaries, type DishSummary } from "./dishes";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Uses Claude to perform semantic dish search.
 * Accepts a query in Chinese or English.
 * Returns up to 5 dish IDs ranked by relevance.
 *
 * COST NOTE: This is the ONLY function that calls the Claude API.
 * All other features (recommendations, similar dishes) use tag-matching — no AI.
 */
export async function searchDishes(query: string): Promise<string[]> {
  const dishes: DishSummary[] = getDishSummaries();

  const systemPrompt = `You are a Chinese food expert helping users find dishes that match their cravings.

Given a user's food craving described in Chinese or English, return the IDs of up to 5 most relevant dishes from the list below.

Rules:
- Understand the query semantically (e.g., "辣的" means spicy dishes, "something light" means mild dishes, "noodles" means any noodle dish)
- Handle typos and mixed Chinese/English input gracefully
- Return ONLY a valid JSON array of dish IDs, nothing else. Example: ["mapo-tofu","dan-dan-noodles"]
- If nothing matches, return an empty array: []
- Never return more than 5 IDs
- Rank by relevance (best match first)

Available dishes:
${JSON.stringify(dishes, null, 0)}`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 200,
    system: systemPrompt,
    messages: [{ role: "user", content: query }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text.trim() : "";

  try {
    const ids = JSON.parse(text);
    if (!Array.isArray(ids)) return [];
    // Validate that returned IDs are strings and exist in our dataset
    const validIds = new Set(dishes.map((d) => d.id));
    return ids.filter((id): id is string => typeof id === "string" && validIds.has(id)).slice(0, 5);
  } catch {
    return [];
  }
}
