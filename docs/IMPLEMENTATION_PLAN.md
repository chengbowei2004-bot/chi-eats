# IMPLEMENTATION_PLAN.md — DeeDao

## Timeline

**Start:** Tuesday March 10, 2026 (today)
**Deadline:** Friday March 14, 2026, 8:00 PM EST
**Total available:** ~4 days
**Builder:** Claude Code (user has no technical background)

---

## Pre-Development Setup (Day 0 — Tuesday Evening)

These must be done by the user manually before any code is written.

### Accounts to Create

| Account | URL | Cost | Time |
|---|---|---|---|
| GitHub | github.com | Free | 5 min |
| Vercel | vercel.com | Free | 5 min (sign up with GitHub) |
| Supabase | supabase.com | Free | 5 min |
| Anthropic API | console.anthropic.com | Load $80 | 10 min |

### Supabase Project Setup

1. Create a new Supabase project (name: `deedao`, region: US East).
2. Go to Authentication → Providers → enable **Email** (magic link) and **Google**.
3. For Google OAuth: create credentials in Google Cloud Console (free), paste Client ID + Secret into Supabase.
4. Copy and save these values:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Anthropic API Setup

1. Create API key at console.anthropic.com.
2. Add $80 in credits.
3. Copy and save `ANTHROPIC_API_KEY`.

### Local Environment

1. Install Node.js (LTS version) if not already installed.
2. Install Claude Code CLI.
3. Create project folder: `mkdir deedao && cd deedao`
4. Initialize Git: `git init`
5. Create `/docs` folder, place all 6 doc files inside.

---

## Phase 1 — Skeleton + Data (Wednesday Morning)

**Goal:** Project scaffold, static data files, basic routing.

### Step 1.1 — Initialize Next.js Project

- `npx create-next-app@latest` with TypeScript, Tailwind, App Router.
- Remove boilerplate.
- Set up folder structure per BACKEND_STRUCTURE.md.

### Step 1.2 — Create Static Data Files

- Create `/data/restaurants.json` with all 14 restaurants:
  - Chongqing House
  - Chengdu Taste
  - Rong Chic
  - Jahunger
  - Chef Yao
  - Mala Noodle
  - 12 Dumplings
  - Y Bento
  - Y Noodle Bar
  - Lamei Hotpot
  - Pho Horn
  - Champa
  - Lobanton
  - Wong's Kitchen
- Each restaurant needs: id, name, name_zh, address, lat, lng, cuisine_tags, review_summary, review_score.
- **Data source:** Use Claude Code to look up each restaurant's address on Yelp/Google, get coordinates.

- Create `/data/dishes.json` with initial dish data:
  - **Approach:** Claude Code generates a comprehensive list of common Chinese dishes served at these types of restaurants (Sichuan, Cantonese, hotpot, noodle shops, dumpling houses, etc.).
  - Each dish: id, name_en, name_zh, description_en, description_zh, cuisine_tag, flavor_tags, image_url (placeholder for now), available_at (mapped to restaurant IDs).
  - Target: 100+ dishes minimum.
  - `available_at` mapping: Based on restaurant cuisine type. E.g., all Sichuan dishes → Chongqing House, Chengdu Taste. Hotpot dishes → Lamei Hotpot. Dumplings → 12 Dumplings. This is an approximation — user can manually refine later.

### Step 1.3 — Set Up Supabase Client

- Install `@supabase/supabase-js`.
- Create `/lib/supabase-server.ts` and `/lib/supabase-browser.ts`.
- Add environment variables to `.env.local`.

### Step 1.4 — Create Database Tables

- Run SQL in Supabase dashboard (or via Claude Code migration):
  - `user_preferences` table.
  - `user_favorites` table.
  - Row Level Security policies: users can only read/write their own data.

**Phase 1 deliverable:** Project runs locally with `npm run dev`. Static data loads. Supabase connects.

---

## Phase 2 — Core Backend (Wednesday Afternoon)

**Goal:** All API routes working.

### Step 2.1 — Dish Data Utilities

- `/lib/dishes.ts`: Load and cache JSON data. Helper functions for filtering by ID, cuisine tag, flavor tags.
- `/lib/geo.ts`: Haversine distance function. Maps URL generator.

### Step 2.2 — AI Search Endpoint

- `/lib/claude.ts`: Claude API helper with system prompt.
- `POST /api/dishes/search`: Accept query, call Claude, return matched dishes.
- Test with queries: "想吃辣的", "noodles", "红烧肉", "something light".
- Add rate limiting (simple in-memory counter).

### Step 2.3 — Recommendation Endpoint

- `GET /api/dishes/recommend`: Random + preference-filtered dish selection. No AI.
- Returns 3 dishes. Different on each call.

### Step 2.4 — Restaurant Endpoint

- `GET /api/restaurants/[dishId]`: Look up dish → get restaurant IDs → calculate distances → sort → return.
- Include `alternatives` array when no restaurants found (flavor_tags intersection).

### Step 2.5 — Favorites + Preferences Endpoints

- `GET/POST/DELETE /api/favorites`: CRUD against Supabase `user_favorites`.
- `GET/PUT /api/preferences`: CRUD against Supabase `user_preferences`.
- Auth middleware: verify Supabase token on protected routes.

### Step 2.6 — Auth Callback

- `GET /api/auth/callback`: Handle Supabase OAuth redirect.

**Phase 2 deliverable:** All API routes tested and working via browser/curl. Backend is complete.

---

## Phase 3 — Frontend Screens (Thursday)

**Goal:** All screens built, styled per FRONTEND_GUIDELINES.md, connected to backend.

### Step 3.1 — Global Layout + Nav

- Root layout with Helvetica font stack.
- Tailwind config: custom colors (green palette), spacing.
- Bottom navigation bar (Home, Favorites, Settings) — icons only, fixed position.
- Mobile-first container: max-width 430px, centered.
- i18n setup with `next-intl` (zh + en message files).

### Step 3.2 — Home Screen

- Search bar with placeholder "今天想吃什么？".
- 3 pre-loaded dish cards (fetched from `/api/dishes/recommend` on page load).
- Tapping a dish card → navigates to restaurant results.
- Submitting search → navigates to dish results.

### Step 3.3 — Dish Results Screen

- Receives search query from Home.
- Calls `/api/dishes/search` with query.
- Displays up to 5 dish cards.
- Loading spinner while AI processes.
- Tapping a dish → navigates to restaurant results.
- Favorite heart icon on each card (toggles if signed in, prompts sign-in if not).

### Step 3.4 — Restaurant Results Screen

- Header: selected dish name + image.
- Sort toggle: NEAREST / BEST REVIEWED.
- Up to 5 restaurant cards.
- Top pick highlighted.
- "NAVIGATE" button → opens Google Maps / Apple Maps (detect platform).
- No results state: message + 3 alternative dish suggestions.

### Step 3.5 — Favorites Screen

- If not signed in → show sign-in prompt.
- If signed in → list of favorited dish cards.
- Tap to go to restaurant results.
- Swipe or tap to remove.

### Step 3.6 — Settings Screen

- Account section: Sign In / Sign Out / display email.
- Location Mode: GPS (default) / Travel Mode toggle.
- Language: 中文 / English toggle.
- Cuisine Preferences: tag picker (same as onboarding).

### Step 3.7 — Onboarding Flow

- First-time detection (check localStorage or Supabase).
- Cuisine preference picker screen.
- Skip option.
- After completion → Home.

### Step 3.8 — Sign-In Modal

- Triggered from Favorites (if not signed in) or Settings.
- Two buttons: "Continue with Email" / "Continue with Google".
- Supabase handles the auth flow.
- After sign-in → return to previous screen.

**Phase 3 deliverable:** All screens functional, styled, and connected to backend. App is usable end-to-end.

---

## Phase 4 — Dish Images + Polish (Thursday Evening → Friday Morning)

**Goal:** Generate dish images, fix bugs, polish for demo.

### Step 4.1 — Dish Images

- Use an AI image generation tool to create dish photos.
- Style: overhead shot, clean plating, neutral background.
- Generate for top 30-50 most important dishes first.
- Remaining dishes: use generic cuisine-category placeholder images (e.g., one placeholder for 川菜, one for 粤菜, etc.).
- Save as `.webp` in `/public/images/dishes/`.

### Step 4.2 — Bug Fixes + Edge Cases

- Test full user flow end-to-end.
- Test: no results state, empty favorites, language switching.
- Test on mobile (iPhone Safari, Android Chrome).
- Fix any broken layouts, API errors, or navigation bugs.

### Step 4.3 — UI Polish

- Check all spacing, alignment, typography against FRONTEND_GUIDELINES.md.
- Ensure loading states are smooth.
- Verify desktop view looks like a phone preview (for professor demo).
- Test skeleton loaders on dish cards.

### Step 4.4 — Performance Check

- Verify AI search responds within 3 seconds.
- Verify non-AI pages load instantly.
- Check that static JSON caching works (no repeated file reads).

**Phase 4 deliverable:** App looks and feels polished. Ready for demo.

---

## Phase 5 — Deploy + Test (Friday)

**Goal:** Live on Vercel, tested with real users.

### Step 5.1 — Deploy to Vercel

- Connect GitHub repo to Vercel.
- Add all environment variables in Vercel dashboard:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ANTHROPIC_API_KEY`
- Deploy. Verify at `deedao.vercel.app` (or chosen subdomain).

### Step 5.2 — Production Testing

- Test full flow on deployed URL (not localhost).
- Test on multiple phones (borrow friends' phones).
- Test Google sign-in on production domain.
- Test magic link email delivery.
- Verify GPS location works on mobile browsers (requires HTTPS — Vercel provides this).

### Step 5.3 — Seed Initial Users

- Share link with a few friends for initial testing.
- Collect quick feedback: anything broken? confusing?
- Fix critical issues only (no feature additions).

### Step 5.4 — Demo Preparation

- Prepare a demo flow: open app → search "想吃火锅" → browse results → tap navigate → show map.
- Have a backup plan: screenshots/screen recording in case of live demo issues.
- Test on the exact device you'll use for the presentation.

**Phase 5 deliverable:** App is live, tested, and demo-ready.

---

## Risk Mitigation

| Risk | Mitigation |
|---|---|
| Dish data takes too long to compile | Start with 50 dishes from the most popular restaurants. Add more post-launch. |
| AI search is slow or unreliable | Add fallback: if Claude API fails, fall back to keyword matching against dish names/tags. |
| Supabase or Vercel has issues | Both have 99.9% uptime. Keep a local demo build as backup. |
| Google OAuth setup is complicated | If stuck, launch with Email magic link only. Add Google later. |
| Dish images take too long to generate | Use cuisine-category placeholders for all dishes. Generate individual images post-launch. |
| User can't grant GPS permission | Default to Providence city center coordinates. Show note: "Enable location for better results." |

---

## Definition of Done (Friday 8PM)

The app is done when:

- [ ] User can open `deedao.vercel.app` on their phone.
- [ ] First-time user sees onboarding cuisine picker.
- [ ] Home screen shows search bar + 3 dish recommendations.
- [ ] Search works with Chinese and English input (AI-powered).
- [ ] Dish results show up to 5 relevant dishes.
- [ ] Restaurant results show nearby restaurants sorted by distance or reviews.
- [ ] "NAVIGATE" button opens Google/Apple Maps.
- [ ] No-results state shows alternative dishes.
- [ ] User can sign in with Email or Google.
- [ ] Signed-in user can favorite/unfavorite dishes.
- [ ] Favorites screen shows saved dishes.
- [ ] Settings: language toggle, cuisine preferences, and location mode work.
- [ ] UI matches FRONTEND_GUIDELINES.md (green, minimal, SSENSE-like).
- [ ] Works on iPhone Safari and Android Chrome.
- [ ] Loads fast, no crashes, no broken screens.
