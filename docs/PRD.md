# PRD.md — ChiEats (Working Title)

## 1. Overview

ChiEats is a dish-first Chinese food discovery app for Chinese internationals living in the US. Unlike existing platforms that organize around restaurants, ChiEats starts from what the user wants to eat and finds the best nearby place to get it.

## 2. Problem Statement

Chinese international students and young professionals in the US regularly crave authentic Chinese dishes. Their current research method is browsing RedNote (小红书) for user-generated reviews, city food guides, and must-eat lists — then cross-referencing with Yelp or Google Maps to find nearby restaurants that serve those dishes.

This process is:

- **Fragmented**: Information is scattered across multiple platforms and posts.
- **Restaurant-centric**: Yelp and Google organize by restaurant, not by dish. A user who wants 红烧肉 has no direct way to search for it.
- **Language-mismatched**: Chinese users think in Chinese dish names, but US restaurant menus are often in English.
- **Time-consuming**: Manually matching dish cravings to nearby availability takes significant effort.

## 3. Target Users

- **Primary**: Chinese international students at US universities (ages 18–26).
- **Secondary**: Chinese international young professionals in the US (ages 22–35).
- **Common traits**: Mandarin-speaking, familiar with Chinese food culture, use Chinese social platforms (RedNote, WeChat), live in US metro areas or college towns.

## 4. Core User Flow

### Step 1 — "What do you want to eat?"

The user expresses what they're craving. Input can be:

- A specific dish name (e.g., "兰州拉面", "酸菜鱼")
- A cuisine region (e.g., "川菜", "粤菜", "东北菜")
- A broad category (e.g., "火锅", "烧烤", "面条")
- A vague direction (e.g., "something spicy", "想吃点清淡的")

The app responds with **5 dish recommendations** as inspiration. These are personalized based on the user's past selections and preferences. Each dish card shows the dish name (中/EN), a photo, and a brief description.

The user selects one dish to proceed.

### Step 2 — "Where can I get it?"

The system searches its pre-built database to find nearby restaurants that serve the selected dish. The database is constructed by:

- **Menu scanning**: An automated agent scrapes restaurant menu images from Yelp, uses OCR/AI to identify individual dishes, and maps Chinese dish names to their English equivalents (e.g., 红烧肉 ↔ Braised Pork Belly).
- **Review aggregation**: The agent pulls text-based reviews and recommendations from RedNote — including city food guides (美食指南), must-eat lists (必吃榜单), and new restaurant spotlights (新餐厅推荐).

All data is stored in a pre-built database that updates **monthly** via automated scraping jobs.

### Step 3 — "Go eat it."

The app presents results as a list of up to **5 restaurant options**, with the top pick highlighted. The user can sort by:

- **Nearest** (by distance from current location)
- **Best reviewed** (by aggregated positive review count)

Each result card shows: restaurant name, dish name, distance, review summary, and a "Navigate" button.

Tapping "Navigate" redirects to **Google Maps or Apple Maps** for turn-by-turn directions.

## 5. Key Features (V1)

| Feature | Description |
|---|---|
| **Dish-first search** | Natural language input in Chinese or English to express food cravings |
| **Smart dish recommendations** | 5 personalized dish suggestions based on user input and history |
| **Cross-language dish matching** | Maps Chinese dish names to English menu items automatically |
| **RedNote review integration** | Aggregated Chinese-language reviews and food guides per restaurant/dish |
| **Menu scanning** | Automated extraction of dishes from Yelp restaurant menu photos |
| **Dual sorting** | Sort results by nearest distance or best reviews |
| **Map navigation** | One-tap redirect to Google Maps / Apple Maps |
| **Bilingual UI** | Full interface available in Chinese and English |
| **Simple auth** | Sign in via Phone, Email, Google, or Apple |

## 6. Out of Scope (V1)

- Social features (user reviews, sharing, community posts)
- In-app ordering or reservation
- Monetization (ads, sponsored listings, premium tier)
- Multi-city support beyond Providence, RI area
- Real-time scraping (all data is pre-built and monthly-updated)

## 7. Geography

**V1 launch area**: Providence, RI and surrounding cities.

Location is determined by **GPS** by default. Users can manually set a different location via a "Travel Mode" toggle in Settings (similar to Hinge's travel mode).

## 8. Authentication

Sign-in is required to enable personalization and history tracking. The sign-up/sign-in process should be as frictionless as possible.

Supported methods:

- Phone number (SMS verification)
- Email
- Google OAuth
- Apple Sign-In

## 9. Data Pipeline

| Component | Source | Method | Update Frequency |
|---|---|---|---|
| Dish database | Yelp menu photos | Automated OCR/AI extraction | Monthly |
| Review data | RedNote (小红书) | Automated text scraping | Monthly |
| Restaurant info | Yelp, Google | API / scraping | Monthly |
| Dish name mapping | Internal | AI-generated Chinese ↔ English mapping | As dishes are added |

The initial dish database will contain **hundreds of dishes** sourced from a curated list of restaurants specified manually. Ongoing maintenance is fully automated.

## 10. Platform

Mobile app (priority — faster path to user hands). Framework TBD in TECH_STACK.md. Web app may follow in a future version.

## 11. Success Metrics

| Metric | Target (V1, 3 months post-launch) |
|---|---|
| Registered users | 200+ |
| Weekly active users | 50+ |
| Avg. searches per session | ≥ 2 |
| Navigation tap-through rate | ≥ 40% |
| Dish database coverage | 80%+ of dishes at target restaurants |

## 12. Assumptions & Risks

**Assumptions:**

- Chinese internationals in Providence have enough restaurant options to make the app useful.
- Yelp menu photos are available and legible enough for automated dish extraction.
- RedNote content for Providence-area restaurants exists in meaningful volume.
- Users are willing to sign in before using the app.

**Risks:**

- RedNote scraping may violate terms of service or be technically blocked.
- Menu photo quality may vary, causing OCR/AI extraction errors.
- Providence may have a limited Chinese restaurant ecosystem for V1.
- Monthly database updates may miss restaurant closures or menu changes.
