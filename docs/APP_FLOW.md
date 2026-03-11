# APP_FLOW.md — ChiEats

## Screen Map

```
Splash → Onboarding (first-time only) → Home → Dish Results → Restaurant Results → External Maps
                                          ↕
                                       Settings
                                       Favorites
```

---

## 1. Splash Screen

- App logo + brand name displayed briefly.
- Auto-redirect:
  - First-time user → Onboarding
  - Returning user → Home

---

## 2. Onboarding (First-Time Only)

### Screen 2a — Cuisine Preference Picker

- Prompt: "你喜欢吃什么菜系？" / "What cuisines do you like?"
- Display selectable tags (multi-select):
  - 川菜 (Sichuan)
  - 粤菜 (Cantonese)
  - 江浙菜 (Jiangzhe)
  - 火锅 (Hotpot)
  - 东北菜 (Dongbei)
  - 湘菜 (Hunan)
  - 烧烤 (BBQ)
  - 西北菜 (Northwestern)
  - Other common categories as needed
- User selects one or more.
- "Continue" button → Home Screen.
- "Skip" option available — user can set preferences later in Settings.

**Note:** Sign-in is NOT required here. Users can browse freely without an account. Sign-in is prompted later when they attempt to save favorites or when personalization requires history.

---

## 3. Home Screen

### Layout

- **Top**: Search bar with placeholder text "今天想吃什么？" / "What are you craving?"
- **Below search bar**: 3 pre-loaded dish suggestion cards.
- **Bottom nav bar**: Home | Favorites | Settings

### Search Bar Behavior

- Accepts free-text input in Chinese or English.
- Accepts specific dishes ("兰州拉面"), categories ("面条"), cuisine styles ("川菜"), or vague cravings ("something spicy", "想吃辣的").
- On submit → Dish Results Screen.

### Pre-loaded Dish Suggestions

- 3 dish cards shown on the home screen.
- Personalized based on:
  - Cuisine preferences selected during onboarding.
  - Past dish selections (if signed in with history).
  - Falls back to popular/trending dishes if no data available.
- Each card shows:
  - Dish photo
  - Dish name (中文 + English)
  - Brief one-line description
- Tapping a card → skips Dish Results, goes directly to Restaurant Results for that dish.

---

## 4. Dish Results Screen

- Triggered when user submits a search query.
- Displays **5 dish recommendations** based on the user's input.
- Each dish card shows:
  - Dish photo
  - Dish name (中文 + English)
  - Brief description (one-liner about the dish)
  - Cuisine tag (e.g., 川菜, 粤菜)
- Personalized ranking based on user preference history.
- User taps a dish → Restaurant Results Screen.

---

## 5. Restaurant Results Screen

- Shows up to **5 restaurants** that serve the selected dish.
- **Top of screen**: Selected dish name + photo as a header.
- **Sort toggle** (two options):
  - 📍 最近 / Nearest (default)
  - ⭐ 好评最多 / Best Reviewed
- **Each restaurant card shows**:
  - Restaurant name
  - Distance from user
  - Aggregated review summary (1–2 lines from RedNote data)
  - Rating indicator
  - "导航 / Navigate" button
- **Top pick** is visually highlighted (e.g., bordered, labeled "Top Pick" / "推荐").
- Tapping "Navigate" → opens Google Maps or Apple Maps with the restaurant's address for directions.

### No Results State

- If no restaurants nearby serve the selected dish:
  - Message: "附近暂时没有这道菜 😢" / "No restaurants nearby serve this dish."
  - Below the message: "试试类似口味的菜？" / "Try something with a similar taste?"
  - Show 3 alternative dish suggestions with similar flavor profiles.
  - Tapping an alternative → reloads Restaurant Results for that dish.

---

## 6. Favorites Screen

- Accessible from bottom nav bar.
- **Requires sign-in**: If user is not signed in, show a prompt to sign in first.
- Displays a list of dishes the user has marked as favorites.
- Each favorite card shows:
  - Dish photo
  - Dish name (中文 + English)
  - Cuisine tag
- Tapping a favorite → Restaurant Results Screen for that dish.
- User can remove favorites with a swipe or tap action.

### How to Favorite a Dish

- A heart/bookmark icon appears on every dish card (in Dish Results and Restaurant Results).
- Tap to toggle favorite on/off.
- If user is not signed in when tapping favorite → prompt to sign in.

---

## 7. Settings Screen

- Accessible from bottom nav bar.
- Options:
  - **Account**: Sign in / Sign out / Account info
  - **Location Mode**: GPS (default) / Travel Mode (manually set a city, similar to Hinge)
  - **Language**: 中文 / English / Bilingual
  - **Cuisine Preferences**: Re-select preferred cuisine styles (same picker as onboarding)

---

## 8. Sign-In Flow

- Triggered when:
  - User taps "Sign In" in Settings.
  - User tries to favorite a dish without being signed in.
- **Sign-in methods** (displayed as buttons):
  - Continue with Apple
  - Continue with Google
  - Continue with Phone (SMS code)
  - Continue with Email (magic link or password)
- Process should be as frictionless as possible — prioritize single-tap OAuth methods.
- After sign-in → return user to wherever they were.

---

## Navigation Summary

| Action | From | To |
|---|---|---|
| App opens (first time) | Splash | Onboarding |
| App opens (returning) | Splash | Home |
| Submit search | Home | Dish Results |
| Tap pre-loaded dish | Home | Restaurant Results |
| Tap dish card | Dish Results | Restaurant Results |
| Tap "Navigate" | Restaurant Results | Google/Apple Maps (external) |
| Tap alternative dish (no results) | Restaurant Results | Restaurant Results (new dish) |
| Tap favorite dish | Favorites | Restaurant Results |
| Tap bottom nav: Home | Any screen | Home |
| Tap bottom nav: Favorites | Any screen | Favorites |
| Tap bottom nav: Settings | Any screen | Settings |
| Tap favorite icon (not signed in) | Any screen | Sign-In Flow |
