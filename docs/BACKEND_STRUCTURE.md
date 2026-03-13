# BACKEND_STRUCTURE.md — DeeDao

## Architecture

Serverless backend using **Next.js API Routes** deployed on **Vercel**. No separate server. All backend logic lives in `/app/api/`.

```
Client (Browser)
    │
    ├── GET/POST → /api/*  (Next.js API Routes on Vercel)
    │                │
    │                ├── Static JSON (dish + restaurant data)
    │                ├── Supabase (auth, user data, favorites)
    │                └── Claude API (semantic search, recommendations)
    │
    └── Direct link → Google Maps / Apple Maps
```

---

## Directory Structure

```
/app
  /api
    /auth
      /callback/route.ts       # Supabase OAuth callback handler
    /dishes
      /search/route.ts         # AI-powered semantic dish search
      /recommend/route.ts      # Homepage dish recommendations
    /restaurants
      /[dishId]/route.ts       # Get restaurants serving a specific dish
    /favorites
      /route.ts                # GET (list) + POST (add) + DELETE (remove)
    /preferences
      /route.ts                # GET + PUT user cuisine preferences

/data
  dishes.json                  # Static dish database
  restaurants.json             # Static restaurant database

/lib
  supabase-server.ts           # Supabase server client helper
  supabase-browser.ts          # Supabase browser client helper
  claude.ts                    # Claude API helper
  dishes.ts                    # Dish data loader + query helpers
  geo.ts                       # Distance calculation utility
```

---

## API Routes

### 1. `POST /api/dishes/search`

AI-powered semantic search. User types a query, Claude interprets intent and returns matching dishes.

**Request:**
```json
{
  "query": "想吃辣的",
  "language": "zh"
}
```

**Logic:**
1. Load full dish list from `dishes.json`.
2. Send to Claude API with system prompt containing all dish names + tags.
3. Claude returns up to 5 matching dish IDs ranked by relevance.
4. Fetch full dish objects by ID.
5. Return to client.

**Response:**
```json
{
  "dishes": [
    {
      "id": "mapo-tofu-001",
      "name_en": "Mapo Tofu",
      "name_zh": "麻婆豆腐",
      "description_en": "Silken tofu in spicy chili and Sichuan pepper sauce",
      "description_zh": "嫩豆腐配辣椒和花椒酱",
      "cuisine_tag": "川菜",
      "flavor_tags": ["spicy", "numbing", "savory"],
      "image_url": "/images/dishes/mapo-tofu.webp",
      "available_at": ["chongqing-house", "chengdu-taste"]
    }
    // ... up to 5 dishes
  ]
}
```

**Error (no match):**
```json
{
  "dishes": [],
  "message": "No matching dishes found"
}
```

---

### 2. `GET /api/dishes/recommend`

Returns 3 dish recommendations for the homepage. Refreshes every time the app opens.

**Query params:**
```
?userId=xxx        (optional — for personalization)
&preferences=川菜,火锅  (optional — from onboarding, if not signed in)
```

**Logic:**
1. If `userId` exists → fetch user's cuisine preferences + favorite history from Supabase.
2. Filter dishes by preferred cuisines, exclude recently recommended.
3. Pick 3 random dishes from filtered set.
4. If no `userId` and no `preferences` → pick 3 fully random dishes.
5. Return dish objects.

**Response:**
```json
{
  "dishes": [
    { /* dish object */ },
    { /* dish object */ },
    { /* dish object */ }
  ]
}
```

**Note:** This endpoint does NOT call Claude API. Randomization + tag filtering is sufficient for recommendations. Saves API cost.

---

### 3. `GET /api/restaurants/[dishId]`

Fetch restaurants that serve a specific dish, sorted by distance or reviews.

**Query params:**
```
?lat=41.8240&lng=-71.4128    (user GPS coordinates)
&sort=nearest                 (nearest | best_reviewed)
```

**Logic:**
1. Load `dishes.json`, find dish by ID, get `available_at` restaurant IDs.
2. Load `restaurants.json`, fetch matching restaurant objects.
3. Calculate distance from user coordinates to each restaurant using Haversine formula.
4. Sort by distance or review score based on `sort` param.
5. Return up to 5 restaurants.

**Response:**
```json
{
  "dish": {
    "id": "mapo-tofu-001",
    "name_zh": "麻婆豆腐",
    "name_en": "Mapo Tofu"
  },
  "restaurants": [
    {
      "id": "chongqing-house",
      "name": "Chongqing House",
      "name_zh": "重庆楼",
      "address": "123 Main St, Providence, RI",
      "lat": 41.8240,
      "lng": -71.4128,
      "distance_miles": 0.8,
      "review_summary": "正宗重庆味道，强烈推荐",
      "review_score": 4.5,
      "navigate_url_google": "https://www.google.com/maps/dir/?api=1&destination=41.8240,-71.4128",
      "navigate_url_apple": "https://maps.apple.com/?daddr=41.8240,-71.4128",
      "top_pick": true
    }
    // ... up to 5
  ],
  "alternatives": []
}
```

**No results (dish not available nearby):**
```json
{
  "dish": { /* ... */ },
  "restaurants": [],
  "alternatives": [
    { /* similar dish object based on flavor_tags */ },
    { /* similar dish object */ },
    { /* similar dish object */ }
  ]
}
```

**Alternative dish logic:** Match by `flavor_tags` overlap. No AI needed — pure tag intersection, ranked by number of shared tags.

---

### 4. `GET /api/favorites`

List user's favorited dishes. Requires auth.

**Headers:** `Authorization: Bearer <supabase_token>`

**Response:**
```json
{
  "favorites": [
    { /* full dish object */ },
    { /* full dish object */ }
  ]
}
```

### 5. `POST /api/favorites`

Add a dish to favorites. Requires auth.

**Request:**
```json
{
  "dishId": "mapo-tofu-001"
}
```

**Response:**
```json
{
  "success": true
}
```

### 6. `DELETE /api/favorites`

Remove a dish from favorites. Requires auth.

**Request:**
```json
{
  "dishId": "mapo-tofu-001"
}
```

**Response:**
```json
{
  "success": true
}
```

---

### 7. `GET /api/preferences`

Get user's cuisine preferences. Requires auth.

**Response:**
```json
{
  "preferences": ["川菜", "火锅", "粤菜"]
}
```

### 8. `PUT /api/preferences`

Update cuisine preferences. Requires auth.

**Request:**
```json
{
  "preferences": ["川菜", "火锅", "江浙菜"]
}
```

**Response:**
```json
{
  "success": true
}
```

---

### 9. `GET /api/auth/callback`

Handles OAuth redirect from Google sign-in. Supabase manages the session.

---

## Data Models

### Static Data (JSON files — no database)

#### `dishes.json`

```json
[
  {
    "id": "string (kebab-case, unique)",
    "name_en": "string",
    "name_zh": "string",
    "description_en": "string (one sentence)",
    "description_zh": "string (one sentence)",
    "cuisine_tag": "string (e.g., 川菜, 粤菜, 东北菜)",
    "flavor_tags": ["string array (e.g., spicy, sweet, sour, savory, numbing, rich, light, smoky)"],
    "image_url": "string (path to /public/images/dishes/)",
    "available_at": ["string array (restaurant IDs)"]
  }
]
```

#### `restaurants.json`

```json
[
  {
    "id": "string (kebab-case, unique)",
    "name": "string (English name)",
    "name_zh": "string (Chinese name, if applicable)",
    "address": "string",
    "lat": "number",
    "lng": "number",
    "cuisine_tags": ["string array"],
    "review_summary": "string (1-2 line aggregate from Yelp/manual entry)",
    "review_score": "number (1-5 scale)",
    "yelp_url": "string (optional, for reference)"
  }
]
```

### Database Tables (Supabase PostgreSQL)

#### `user_preferences`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key, auto-generated |
| user_id | uuid | Foreign key → Supabase auth.users.id |
| cuisines | text[] | Array of cuisine tags, e.g., `{川菜, 火锅}` |
| created_at | timestamptz | Auto-set |
| updated_at | timestamptz | Auto-updated |

#### `user_favorites`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key, auto-generated |
| user_id | uuid | Foreign key → Supabase auth.users.id |
| dish_id | text | References dish ID from dishes.json |
| created_at | timestamptz | Auto-set |

**Unique constraint:** `(user_id, dish_id)` — no duplicate favorites.

---

## Auth Flow

### Provider: Supabase Auth

**Supported methods (V1):**
- Email (magic link — passwordless)
- Google OAuth

### Flow

```
1. User taps "Sign In"
2. User picks method (Email or Google)
3a. Email → Supabase sends magic link → user clicks link → redirected to /api/auth/callback → session created
3b. Google → Redirect to Google OAuth → redirected to /api/auth/callback → session created
4. Supabase sets session cookie/token
5. Client stores session, user is now authenticated
6. All subsequent API calls include Authorization header with Supabase token
```

### Auth Middleware

- Protected routes (`/api/favorites`, `/api/preferences`) check for valid Supabase session.
- Unprotected routes (`/api/dishes/search`, `/api/dishes/recommend`, `/api/restaurants/*`) work without auth.
- If auth is missing on a protected route → return `401 Unauthorized`.

---

## Claude API Integration

### Helper: `/lib/claude.ts`

```typescript
// Pseudocode structure
export async function searchDishes(query: string, allDishes: DishSummary[]): Promise<string[]> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    system: `You are a Chinese food expert. Given a user's food craving described in Chinese or English, return the IDs of up to 5 most relevant dishes from the following list. Return ONLY a JSON array of dish IDs, nothing else.

Dish list:
${JSON.stringify(allDishes)}`,
    messages: [
      { role: "user", content: query }
    ]
  });

  // Parse response → return dish ID array
}
```

### Cost Controls

- Claude is ONLY called in `/api/dishes/search`. No other endpoint uses AI.
- Dish recommendations (`/api/dishes/recommend`) use random + tag filtering. No AI.
- Similar dish suggestions use `flavor_tags` intersection. No AI.
- System prompt includes the dish list (small — a few KB). Keeps context minimal.
- Response is constrained to JSON array only. Short output tokens.

---

## Geo Utilities

### `/lib/geo.ts`

Haversine formula to calculate distance between two lat/lng coordinates.

```typescript
export function distanceMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  // Standard Haversine formula
  // Returns distance in miles
}

export function generateMapsUrl(lat: number, lng: number, platform: 'google' | 'apple'): string {
  if (platform === 'apple') {
    return `https://maps.apple.com/?daddr=${lat},${lng}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
```

---

## Environment Variables

Stored in Vercel dashboard. Never committed to repo.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key (server-side only) |
| `ANTHROPIC_API_KEY` | Claude API key |

---

## Error Handling

All API routes follow a consistent error response format:

```json
{
  "error": "Human-readable error message",
  "code": "ERROR_CODE"
}
```

| HTTP Status | When |
|---|---|
| 200 | Success |
| 400 | Bad request (missing params, invalid input) |
| 401 | Unauthorized (missing or invalid auth token) |
| 404 | Resource not found (invalid dish ID, etc.) |
| 429 | Rate limited (too many AI search requests) |
| 500 | Internal server error |

### Rate Limiting

- `/api/dishes/search` (AI endpoint): Max 20 requests per user per hour.
- Implemented via simple in-memory counter or Supabase row count.
- Prevents runaway API costs from a single user.

---

## Performance

- Static JSON is loaded once at build time or cached in memory on first request. No repeated file reads.
- Supabase queries are simple single-table lookups. No joins needed.
- Claude API is the slowest call (~1-3 seconds). Show loading spinner on client during search.
- Restaurant distance calculations are in-memory math. Instant.
- Vercel serverless cold starts are ~200ms. Acceptable for V1.
