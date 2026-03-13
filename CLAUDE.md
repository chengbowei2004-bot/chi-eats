# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DeeDao is a dish-first Chinese food discovery web app for Chinese international students in Providence, RI. Users search for what they want to eat (not which restaurant) and get nearby options. Target launch: March 14, 2026.

## Development Commands

```bash
npm run dev        # Start dev server on localhost:3000
npm run build      # Production build
npm run lint       # ESLint
```

The app is deployed via Vercel (auto-deploys from GitHub push to main).

## Architecture

**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase + Claude API, hosted on Vercel.

**Data layers:**
1. **Static JSON** (`/data/dishes.json`, `/data/restaurants.json`) — loaded once at startup, cached in memory. Do not query Supabase for dish/restaurant data.
2. **Supabase PostgreSQL** — only for user data: `user_favorites` and `user_preferences` tables.
3. **Claude API** — only called in `POST /api/dishes/search`. No other endpoint uses AI.

**Key lib files:**
- `/lib/claude.ts` — Claude API helper. System prompt passes full dish list; response is JSON array of dish IDs only. Model: `claude-sonnet-4-20250514`, max_tokens: 500.
- `/lib/dishes.ts` — Loads and caches JSON data; filter helpers.
- `/lib/geo.ts` — Haversine distance calculation; Google/Apple Maps URL generator.
- `/lib/supabase-server.ts` / `/lib/supabase-browser.ts` — Supabase clients for server vs. browser contexts.

**API routes** (all under `/app/api/`):
- `POST /api/dishes/search` — AI search (calls Claude). Rate-limited: 20 req/user/hour.
- `GET /api/dishes/recommend` — Tag-filtered random recommendations. No AI.
- `GET /api/restaurants/[dishId]` — Fetch restaurants by dish, sorted by distance or reviews.
- `GET|POST|DELETE /api/favorites` — Auth-required CRUD against Supabase.
- `GET|PUT /api/preferences` — Auth-required CRUD against Supabase.
- `GET /api/auth/callback` — Supabase OAuth redirect handler.

**Auth:** Supabase Auth (email magic link + Google OAuth). Protected routes (`/api/favorites`, `/api/preferences`) require `Authorization: Bearer <supabase_token>` header. All other routes are public.

**i18n:** `next-intl` with `/messages/zh.json` and `/messages/en.json`. Language toggled in Settings and stored in user preferences.

## Key Design Decisions

- **No maps API** — Use direct deep links to Google Maps / Apple Maps (`https://www.google.com/maps/dir/?api=1&destination=lat,lng`). No in-app map rendering.
- **Recommendations use no AI** — Tag intersection only (`flavor_tags`). Claude is only for semantic search.
- **Static JSON for dishes** — Not a database table. Pre-built dataset of ~100 dishes and 14 restaurants. Cache in memory on first load.
- **Alternative dishes** — When a dish has no nearby restaurants, suggest alternatives by `flavor_tags` overlap (pure intersection, no AI).
- **GPS fallback** — Default to Providence city center coordinates (`41.8240, -71.4128`) if GPS permission denied.
- **Mobile-first, max-width 430px** — On desktop, the app renders as a centered phone-sized card with gray background outside. This is intentional.

## UI Conventions (from FRONTEND_GUIDELINES.md)

- **Primary color:** `#004D40` (deep green). Used only on primary buttons and active states — never as background fill.
- **Background:** `#FAFAFA`. Cards: `#FFFFFF`.
- **Typography:** Helvetica Neue for English, PingFang SC / Microsoft YaHei for Chinese.
- **English UI labels are ALL CAPS** (e.g., "NAVIGATE", "FAVORITES", "NEAREST").
- **No gradients, no heavy shadows** (`shadow-sm` max), no rounded corners larger than `rounded-xl`.
- **Icons:** Lucide, stroke weight 1.5px, 24px for nav / 20px inline.
- Dish card image: 16:9 ratio, `rounded-lg`. Cards: `rounded-xl`, subtle border `border-gray-200`.
- Bottom nav: 3 items (Home, Favorites, Settings), icons only, fixed position.

## Data Schema

**`dishes.json` entry:**
```json
{
  "id": "mapo-tofu-001",
  "name_en": "Mapo Tofu",
  "name_zh": "麻婆豆腐",
  "description_en": "one sentence",
  "description_zh": "one sentence",
  "cuisine_tag": "川菜",
  "flavor_tags": ["spicy", "numbing", "savory"],
  "image_url": "/images/dishes/mapo-tofu.webp",
  "available_at": ["chongqing-house", "chengdu-taste"]
}
```

**`restaurants.json` entry:**
```json
{
  "id": "chongqing-house",
  "name": "Chongqing House",
  "name_zh": "重庆楼",
  "address": "...",
  "lat": 41.8240,
  "lng": -71.4128,
  "cuisine_tags": ["川菜"],
  "review_summary": "...",
  "review_score": 4.5
}
```

**Supabase tables:** `user_preferences` (user_id, cuisines text[]) and `user_favorites` (user_id, dish_id). Both use Row Level Security — users can only access their own rows. Unique constraint on `(user_id, dish_id)` in favorites.

## Environment Variables

Required in `.env.local` (never committed):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
- `ANTHROPIC_API_KEY`

## Detailed Documentation

All product and design documentation lives in `/docs/`:
- `PRD.md` — Product requirements, user flows, target users
- `TECH_STACK.md` — Full tech choices and budget breakdown
- `BACKEND_STRUCTURE.md` — API routes, data models, auth flow, Claude integration pseudocode
- `FRONTEND_GUIDELINES.md` — Design system, component specs, typography, color palette
- `APP_FLOW.md` — Screen map and navigation flows
- `IMPLEMENTATION_PLAN.md` — 5-phase build plan with deliverables and risk mitigation
