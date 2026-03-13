# TECH_STACK.md — DeeDao

## Guiding Principles

- **Lowest cost**: Stay within $150 total budget.
- **Fastest to deploy**: Must be demo-ready by Friday March 14, 8pm EST.
- **Stable for presentation**: Needs to run smoothly for a professor demo.
- **No tech background**: Entire build via Claude Code — stack must be beginner-friendly and well-documented.

---

## Architecture Overview

```
┌─────────────────────────────────┐
│        Vercel (Hosting)         │
│  ┌───────────────────────────┐  │
│  │   Next.js App (Frontend)  │  │
│  │   + API Routes (Backend)  │  │
│  └───────────┬───────────────┘  │
│              │                  │
│  ┌───────────▼───────────────┐  │
│  │  Static JSON (Dish Data)  │  │
│  └───────────────────────────┘  │
└──────────────┬──────────────────┘
               │
    ┌──────────▼──────────┐
    │  Supabase (Free)    │
    │  - Auth             │
    │  - User DB          │
    │  - Favorites        │
    └──────────┬──────────┘
               │
    ┌──────────▼──────────┐
    │  Claude API         │
    │  - Semantic search  │
    │  - Dish recommend   │
    └─────────────────────┘
```

---

## Frontend

| Choice | Reason |
|---|---|
| **Next.js 14 (App Router)** | Full-stack in one project. API routes eliminate need for separate backend. Deploys to Vercel with zero config. |
| **Tailwind CSS** | Fast styling, mobile-first utilities, no design system overhead. |
| **TypeScript** | Type safety reduces bugs, Claude Code generates cleaner TS. |

### Mobile-Friendly Web App

- Not a native app. Runs in mobile browser.
- Responsive design targeting mobile-first (375px–430px width).
- Add PWA manifest so users can "Add to Home Screen" for app-like experience.
- No app store submission required.

---

## Backend

| Choice | Reason |
|---|---|
| **Next.js API Routes** | No separate server needed. Runs on Vercel serverless functions. Free tier covers our traffic. |

API routes handle:
- AI search requests (proxy to Claude API).
- User favorites CRUD.
- Dish data queries (read from static JSON).

---

## Database & Auth

| Choice | Reason |
|---|---|
| **Supabase (Free Tier)** | PostgreSQL database + built-in auth. Free tier: 50k monthly active users, 500MB database, 1GB storage. More than enough for V1. |

### Auth Configuration

Supabase Auth handles all sign-in methods:
- **Email**: Magic link (passwordless, no email service cost).
- **Google OAuth**: Free, via Supabase built-in provider.
- **Apple Sign-In**: Free, via Supabase built-in provider.

No phone/SMS auth in V1 (saves Twilio costs).

### Database Tables

| Table | Purpose |
|---|---|
| `users` | Managed by Supabase Auth automatically |
| `user_preferences` | Cuisine preferences from onboarding |
| `user_favorites` | Favorited dish IDs per user |

---

## Dish Data Storage

| Choice | Reason |
|---|---|
| **Static JSON file** | ~14 restaurants, ~hundreds of dishes. Tiny dataset. JSON file in the repo is the fastest, simplest, zero-cost solution. |

### Structure

```json
{
  "restaurants": [
    {
      "id": "chongqing-house",
      "name": "Chongqing House",
      "name_zh": "重庆楼",
      "address": "...",
      "lat": 41.XXXX,
      "lng": -71.XXXX,
      "cuisine_tags": ["川菜", "重庆菜"]
    }
  ],
  "dishes": [
    {
      "id": "hongshaorou-001",
      "name_en": "Braised Pork Belly",
      "name_zh": "红烧肉",
      "description_en": "Slow-braised pork belly in soy sauce and sugar",
      "description_zh": "酱油和糖慢炖的五花肉",
      "cuisine_tag": "家常菜",
      "flavor_tags": ["savory", "sweet", "rich"],
      "image_url": "/images/dishes/hongshaorou.webp",
      "available_at": ["chongqing-house", "chengdu-taste"]
    }
  ]
}
```

Updated manually or via scripts. Committed to the repo. No database query needed — loaded at build time or on request.

---

## AI Integration

| Choice | Reason |
|---|---|
| **Anthropic Claude API (claude-sonnet-4-20250514)** | Excellent at Chinese language understanding. Sonnet is cheaper than Opus. Budget: $80. |

### AI is used for:

1. **Semantic search**: User types "想吃辣的" → AI interprets intent → returns matching dish IDs from the JSON dataset.
2. **Dish recommendations**: AI picks 5 relevant dishes based on user input + preference tags.

### AI is NOT used for (V1):

- Similar taste recommendations (use `flavor_tags` matching instead).
- Personalization (use simple history-based frequency sorting).

### Cost Estimation

- Claude Sonnet input: ~$3/M tokens, output: ~$15/M tokens.
- Average request: ~500 input tokens, ~200 output tokens.
- Cost per request: ~$0.0045.
- $80 budget ≈ ~17,000 requests. More than enough for V1 + demo.

### Implementation

- All AI calls go through a Next.js API route (never expose API key to client).
- System prompt includes the full dish list so the AI can match against it.
- Response format: JSON array of dish IDs.

---

## Dish Images

| Choice | Reason |
|---|---|
| **AI-generated images** | Avoids Yelp copyright/hotlinking issues. Consistent visual style. Generated once, stored as static assets. |

- Generate one image per dish using an image generation API or manually via free tools.
- Store as `.webp` files in `/public/images/dishes/`.
- Fallback: generic cuisine-category placeholder images if generation isn't done in time.

---

## Maps / Navigation

| Choice | Reason |
|---|---|
| **Direct link to Google Maps / Apple Maps** | Zero API cost. No map rendering needed in-app. Just open a URL. |

Implementation:
```
// Google Maps
https://www.google.com/maps/dir/?api=1&destination={lat},{lng}

// Apple Maps (works on iOS)
https://maps.apple.com/?daddr={lat},{lng}
```

Detect platform (iOS vs other) and open the appropriate link.

---

## Deployment

| Choice | Reason |
|---|---|
| **Vercel (Free Tier)** | Native Next.js hosting. Free tier: 100GB bandwidth, serverless functions, automatic HTTPS. Domain: `deedao.vercel.app`. |

- Push to GitHub → auto-deploys to Vercel.
- No Docker, no server management.
- Environment variables (API keys) stored in Vercel dashboard.

---

## Internationalization (i18n)

| Choice | Reason |
|---|---|
| **next-intl** | Lightweight i18n library for Next.js. Supports Chinese/English toggle. |

- UI text stored in `/messages/zh.json` and `/messages/en.json`.
- Dish names follow UI language setting (not always bilingual).
- Default language: Chinese (target users are Chinese speakers).

---

## Budget Breakdown

| Item | Cost | Notes |
|---|---|---|
| Vercel hosting | $0 | Free tier |
| Supabase | $0 | Free tier |
| Domain | $0 | Using `deedao.vercel.app` |
| Claude API | ~$80 | Semantic search + recommendations |
| Dish image generation | ~$10–20 | One-time generation for ~100+ dishes |
| **Contingency** | ~$50–60 | Buffer for overages or extra tools |
| **Total** | ≤ $150 | |

---

## Third-Party Accounts Needed

Before development, you need to create:

1. **GitHub account** (free) — for code repository.
2. **Vercel account** (free) — connect to GitHub for deployment.
3. **Supabase account** (free) — for database + auth.
4. **Anthropic API account** — for Claude API access. Load $80 credits.
5. **Google Cloud Console** (free) — to set up Google OAuth credentials for sign-in.
6. **Apple Developer Account** — needed for Apple Sign-In. Costs $99/year. **Optional for V1** — can skip Apple Sign-In and just use Email + Google.

---

## Recommendation: Skip Apple Sign-In for V1

Apple Sign-In requires a $99/year Apple Developer Account. Given your $150 budget, I recommend:
- V1 auth: **Email (magic link) + Google OAuth only**.
- Add Apple Sign-In later when you have a developer account.
- This saves $99 and simplifies setup.

---

## Summary: V1 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 + Tailwind CSS + TypeScript |
| Backend | Next.js API Routes (serverless) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Email + Google) |
| Dish Data | Static JSON file in repo |
| AI | Claude Sonnet API |
| Images | AI-generated static assets |
| Maps | Direct Google/Apple Maps links |
| i18n | next-intl |
| Hosting | Vercel (free tier) |
| Domain | deedao.vercel.app |
