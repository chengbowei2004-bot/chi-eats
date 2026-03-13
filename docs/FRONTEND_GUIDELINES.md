# FRONTEND_GUIDELINES.md — DeeDao

## Design Philosophy

Minimal, clean, elevated. Inspired by SSENSE's editorial luxury aesthetic — generous whitespace, restrained typography, and intentional use of color. The app should feel premium and confident, not cluttered or "food app generic." Every element earns its place on screen.

---

## Brand Identity

| Element | Value |
|---|---|
| App name | DeeDao |
| Tagline (optional) | 发现你身边的地道中国味 / Find authentic flavors near you |
| Voice | Concise, confident, slightly playful in Chinese |

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#004D40` | British racing green. Primary buttons, active states, key accents. |
| `--primary-light` | `#00695C` | Hover states, secondary accents. |
| `--primary-dark` | `#00332C` | Pressed states, headers. |
| `--background` | `#FAFAFA` | Page background. Off-white, not pure white. |
| `--surface` | `#FFFFFF` | Card backgrounds, modals. |
| `--text-primary` | `#1A1A1A` | Body text. Near-black. |
| `--text-secondary` | `#6B6B6B` | Secondary text, captions, placeholders. |
| `--text-on-primary` | `#FFFFFF` | Text on green buttons/backgrounds. |
| `--border` | `#E5E5E5` | Subtle dividers, card borders. |
| `--error` | `#D32F2F` | Error states. |
| `--success` | `#2E7D32` | Success states. |

### Color Rules

- Green is used sparingly — only for primary actions and key highlights. Never as background fill.
- The overall feel is black + white + green accents. Similar to SSENSE's black/white with selective color.
- No gradients. No shadows heavier than `shadow-sm`. Flat and clean.

---

## Typography

### Font Stack

```css
/* English */
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

/* Chinese — system default */
font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;

/* Combined (set on body) */
font-family: 'Helvetica Neue', Helvetica, Arial, -apple-system, 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;
```

### Type Scale

| Role | Size | Weight | Usage |
|---|---|---|---|
| H1 | 28px / 1.75rem | 700 | Screen titles (e.g., "今天想吃什么") |
| H2 | 22px / 1.375rem | 600 | Section headers |
| H3 | 18px / 1.125rem | 600 | Card titles, dish names |
| Body | 16px / 1rem | 400 | General text |
| Caption | 14px / 0.875rem | 400 | Secondary info, tags, distances |
| Small | 12px / 0.75rem | 400 | Labels, timestamps |

### Typography Rules

- All caps for English labels and navigation (SSENSE style). Example: "FAVORITES", "SETTINGS", "NAVIGATE".
- Chinese text is never all caps (not applicable).
- Letter-spacing: `0.05em` on all-caps text.
- Line height: 1.5 for body text, 1.3 for headings.
- No bold overuse — weight 600 max for emphasis, 700 only for H1.

---

## Layout & Spacing

### Grid

- Mobile-first single column layout.
- Max content width: 430px (largest phone width). Centered on larger screens.
- Side padding: 20px (consistent on all screens).

### Spacing Scale (Tailwind)

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Tight gaps (icon + label) |
| `space-2` | 8px | Inline spacing |
| `space-3` | 12px | Card internal padding |
| `space-4` | 16px | Between elements |
| `space-6` | 24px | Between sections |
| `space-8` | 32px | Major section breaks |
| `space-12` | 48px | Screen top/bottom padding |

### Whitespace Philosophy

- Generous whitespace everywhere. When in doubt, add more space.
- No cramming. Each dish card should breathe.
- Empty states should feel intentional, not broken.

---

## Components

### Dish Card

```
┌──────────────────────────────┐
│  [Dish Image — 16:9 ratio]   │
│                              │
│  红烧肉                      │
│  Braised Pork Belly          │
│  川菜 · Savory & Rich        │
│                          ♡   │
└──────────────────────────────┘
```

- Image: rounded corners (`rounded-lg`), 16:9 aspect ratio.
- Dish name: H3 weight, primary text color.
- English name (or Chinese, depending on UI language): Caption size, secondary text.
- Cuisine tag: Caption size, secondary text.
- Favorite icon: outlined heart, top-right or bottom-right. Filled green when favorited.
- Card: white background, subtle border (`border-gray-200`), no heavy shadow. `rounded-xl`.

### Restaurant Card

```
┌──────────────────────────────┐
│  ★ TOP PICK                  │
│  Chongqing House             │
│  重庆楼                       │
│  0.8 mi away                 │
│  "正宗重庆味道，强烈推荐"      │
│                              │
│  [ NAVIGATE →  ]             │
└──────────────────────────────┘
```

- "TOP PICK" label: all caps, green text, only on first result.
- Restaurant name: H3.
- Distance: Caption, secondary text.
- Review snippet: Body size, italic, one line max with ellipsis overflow.
- Navigate button: primary green, all-caps text, full width at bottom of card.

### Search Bar

- Full width, rounded-full (`rounded-full`).
- Light gray background (`bg-gray-100`) when unfocused.
- White background + green border when focused.
- Placeholder: "今天想吃什么？" in secondary text color.
- No search icon inside — clean and minimal.
- Text input, not a button.

### Buttons

| Type | Style |
|---|---|
| Primary | Green background, white text, all-caps, `rounded-full`, `py-3 px-6` |
| Secondary | White background, green border, green text, all-caps, `rounded-full` |
| Ghost | No background, green text, all-caps, underline on hover |

### Bottom Navigation Bar

- 3 items: Home, Favorites, Settings.
- Icons only (no labels) — minimal like SSENSE.
- Active state: green icon. Inactive: gray icon.
- Thin top border separator.
- Fixed at bottom of viewport.

### Sort Toggle

- Two options: "NEAREST" / "BEST REVIEWED".
- Pill-style toggle. Active pill: green background, white text. Inactive: transparent, secondary text.

### Tags (Cuisine / Flavor)

- Small pill shape, `rounded-full`.
- Light gray background, dark text.
- No border. Subtle and unobtrusive.

---

## Imagery

### Dish Photos

- AI-generated, consistent style across all dishes.
- Style: overhead shot, clean plating, neutral background (white or light wood).
- Aspect ratio: 16:9 for cards, 1:1 for thumbnails.
- Format: `.webp` for performance.

### Empty States

- Minimal illustration or just text.
- Example (no results): centered text, secondary color, with a subtle suggestion below.
- No sad-face emojis or cartoon illustrations — keep it elevated.

### Icons

- Use Lucide icons (available in the stack).
- Stroke weight: 1.5px.
- Size: 24px for navigation, 20px for inline.

---

## Motion & Interaction

- Keep animations minimal and functional.
- Page transitions: none (instant navigation for speed).
- Card tap: subtle scale down (`scale-[0.98]`) on press, 100ms duration.
- Favorite heart: quick fill animation, 200ms.
- Loading state: simple centered spinner (green, thin stroke). No playful animations.
- Skeleton loaders for dish cards while content loads.

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| < 430px | Full mobile layout. Single column. |
| 430px – 768px | Same layout, centered with max-width 430px. |
| > 768px | Centered card with max-width 430px, gray background outside. App feels like a phone preview on desktop — suitable for demo/presentation. |

On desktop (professor demo), the app should look like a phone-sized app centered on screen, similar to how mobile app previews look. This keeps the mobile-first design intact and looks intentional during presentation.

---

## Accessibility

- All interactive elements have minimum tap target of 44x44px.
- Color contrast: all text meets WCAG AA (4.5:1 ratio minimum).
- Green (#004D40) on white (#FFFFFF) = 10.1:1 contrast ratio — passes AAA.
- Focus states: green outline ring on keyboard navigation.
- Alt text on all dish images.
- Language attribute set on `<html>` tag based on selected language.

---

## Do's and Don'ts

### Do

- Use whitespace generously.
- Keep text short and direct.
- Use all-caps for English UI labels.
- Let the dish photos be the visual focus.
- Keep interactions fast and instant-feeling.

### Don't

- Don't use gradients, heavy shadows, or glows.
- Don't use more than 2 font weights on a single screen.
- Don't use colored backgrounds (except green buttons).
- Don't use emojis in the UI (except the no-results fallback).
- Don't add decorative elements — every element should be functional.
- Don't use rounded corners larger than `rounded-xl` (16px).
