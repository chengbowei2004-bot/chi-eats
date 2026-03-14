/**
 * 11 food SVG icons with 3D depth: gradients, highlights, shadows.
 * viewBox 0 0 56 56, rendered at 52–64px by the splash page.
 */

export function Dumpling3D() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="dmp-body" x1="10" y1="20" x2="46" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF5E0" />
          <stop offset="50%" stopColor="#F5DEB3" />
          <stop offset="100%" stopColor="#D4A853" />
        </linearGradient>
        <radialGradient id="dmp-hi" cx="0.35" cy="0.35" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="28" cy="42" rx="16" ry="3" fill="#00000015" />
      <path d="M8 32C8 32 13 44 28 44C43 44 48 32 48 32C48 32 43 20 28 20C13 20 8 32 8 32Z" fill="url(#dmp-body)" stroke="#C49640" strokeWidth="1" />
      <path d="M8 32C8 32 13 44 28 44C43 44 48 32 48 32" fill="none" />
      <path d="M13 30C16 26 20 22 28 22C36 22 40 26 43 30" fill="none" stroke="#C49640" strokeWidth="1" />
      <path d="M17 29L19 25" stroke="#C49640" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M23 27.5L24 24" stroke="#C49640" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M33 27.5L32 24" stroke="#C49640" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M39 29L37 25" stroke="#C49640" strokeWidth="0.8" strokeLinecap="round" />
      <ellipse cx="22" cy="34" rx="6" ry="3.5" fill="url(#dmp-hi)" />
    </svg>
  );
}

export function NoodleBowl3D() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="nb-bowl" x1="8" y1="24" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>
        <linearGradient id="nb-broth" x1="10" y1="24" x2="46" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E74C3C" />
          <stop offset="100%" stopColor="#A93226" />
        </linearGradient>
      </defs>
      <ellipse cx="28" cy="48" rx="18" ry="3" fill="#00000010" />
      <path d="M20 12C20 9 22 8 22 6" stroke="#CCC" strokeWidth="1" strokeLinecap="round" />
      <path d="M28 10C28 7 30 6 30 4" stroke="#CCC" strokeWidth="1" strokeLinecap="round" />
      <path d="M36 12C36 9 38 8 38 6" stroke="#CCC" strokeWidth="1" strokeLinecap="round" />
      <path d="M6 24C6 24 9 46 28 46C47 46 50 24 50 24" fill="url(#nb-bowl)" stroke="#D4D4D4" strokeWidth="1" />
      <ellipse cx="28" cy="24" rx="22" ry="6" fill="url(#nb-broth)" />
      <path d="M9 24C9 24 12 42 28 42C44 42 47 24 47 24" fill="#C0392B" opacity="0.5" />
      <path d="M16 26C18 30 20 26 22 30C24 34 26 30 28 34" stroke="#F5DEB3" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M24 25C26 29 28 25 30 29C32 33 34 29 36 33" stroke="#F5DEB3" strokeWidth="2" strokeLinecap="round" fill="none" />
      <ellipse cx="18" cy="27" rx="3.5" ry="2" fill="#7B3F00" opacity="0.7" />
      <ellipse cx="36" cy="26" rx="4" ry="2" fill="#7B3F00" opacity="0.7" />
      <circle cx="28" cy="23" r="1.8" fill="#4CAF50" />
    </svg>
  );
}

export function RiceBowl3D() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="rb-bowl" x1="8" y1="24" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E8E8E8" />
        </linearGradient>
        <radialGradient id="rb-rice" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#FFFFF5" />
          <stop offset="100%" stopColor="#F5F0E0" />
        </radialGradient>
      </defs>
      <ellipse cx="28" cy="48" rx="18" ry="3" fill="#00000010" />
      <path d="M22 14C22 11 24 10 24 8" stroke="#CCC" strokeWidth="1" strokeLinecap="round" />
      <path d="M30 13C30 10 32 9 32 7" stroke="#CCC" strokeWidth="1" strokeLinecap="round" />
      <path d="M6 26C6 26 9 46 28 46C47 46 50 26 50 26" fill="url(#rb-bowl)" stroke="#D4D4D4" strokeWidth="1" />
      <path d="M10 26C10 26 14 16 28 16C42 16 46 26 46 26Z" fill="url(#rb-rice)" stroke="#E0D8C0" strokeWidth="0.8" />
      <path d="M8 28C8 28 12 38 28 38C44 38 48 28 48 28" fill="none" stroke="#3B5998" strokeWidth="1.8" opacity="0.2" />
      <ellipse cx="22" cy="20" rx="2.5" ry="1.2" fill="#FFF" stroke="#E8E0C8" strokeWidth="0.4" transform="rotate(-15 22 20)" />
      <ellipse cx="28" cy="18.5" rx="2.5" ry="1.2" fill="#FFF" stroke="#E8E0C8" strokeWidth="0.4" />
      <ellipse cx="34" cy="20" rx="2.5" ry="1.2" fill="#FFF" stroke="#E8E0C8" strokeWidth="0.4" transform="rotate(15 34 20)" />
      <ellipse cx="21" cy="23" rx="4" ry="2" fill="#FFFFFF" opacity="0.4" />
    </svg>
  );
}

export function MaLaTang3D() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="mt-broth" x1="10" y1="20" x2="46" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF4500" />
          <stop offset="100%" stopColor="#B22222" />
        </linearGradient>
      </defs>
      <ellipse cx="28" cy="48" rx="18" ry="3" fill="#00000010" />
      <path d="M6 22C6 22 9 46 28 46C47 46 50 22 50 22" fill="#FFF" stroke="#E0E0E0" strokeWidth="1" />
      <ellipse cx="28" cy="22" rx="22" ry="5.5" fill="url(#mt-broth)" />
      <path d="M9 22C9 22 12 42 28 42C44 42 47 22 47 22" fill="#C0392B" opacity="0.5" />
      <circle cx="18" cy="22" r="2" fill="#FF6347" opacity="0.5" />
      <circle cx="34" cy="21" r="2.5" fill="#FF6347" opacity="0.4" />
      <line x1="20" y1="6" x2="22" y2="24" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" />
      <line x1="34" y1="5" x2="33" y2="24" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="21" cy="12" r="3" fill="#7B3F00" />
      <ellipse cx="21" cy="11" rx="1.5" ry="0.8" fill="#9B5F20" opacity="0.5" />
      <rect x="31.5" y="10" width="3.5" height="5" rx="1.2" fill="#4CAF50" />
    </svg>
  );
}

export function HotPot3D() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="hp-pot" x1="4" y1="18" x2="52" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#555" />
          <stop offset="100%" stopColor="#333" />
        </linearGradient>
        <linearGradient id="hp-red" x1="6" y1="18" x2="28" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E74C3C" />
          <stop offset="100%" stopColor="#922B21" />
        </linearGradient>
      </defs>
      <ellipse cx="28" cy="48" rx="20" ry="3" fill="#00000012" />
      <path d="M16 10C16 7 18 6 18 4" stroke="#CCC" strokeWidth="1" strokeLinecap="round" />
      <path d="M28 8C28 5 30 4 30 2" stroke="#CCC" strokeWidth="1" strokeLinecap="round" />
      <path d="M40 10C40 7 42 6 42 4" stroke="#CCC" strokeWidth="1" strokeLinecap="round" />
      <path d="M4 18C4 18 7 46 28 46C49 46 52 18 52 18" fill="url(#hp-pot)" stroke="#222" strokeWidth="1" />
      <line x1="28" y1="14" x2="28" y2="44" stroke="#555" strokeWidth="1.5" />
      <path d="M6 18C6 18 9 42 28 42L28 18Z" fill="url(#hp-red)" opacity="0.85" />
      <path d="M28 18L28 42C47 42 50 18 50 18Z" fill="#FFF5E1" opacity="0.85" />
      <ellipse cx="28" cy="18" rx="24" ry="5.5" fill="none" stroke="#222" strokeWidth="1" />
      <circle cx="16" cy="17.5" r="1.8" fill="#FF4500" opacity="0.6" />
      <circle cx="20" cy="19.5" r="1.2" fill="#FF4500" opacity="0.5" />
      <rect x="0" y="24" width="6" height="3.5" rx="1.8" fill="#555" />
      <rect x="50" y="24" width="6" height="3.5" rx="1.8" fill="#555" />
    </svg>
  );
}

export function Skewers3D() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="sk-meat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A0522D" />
          <stop offset="100%" stopColor="#6B3410" />
        </linearGradient>
      </defs>
      <ellipse cx="28" cy="50" rx="22" ry="2.5" fill="#00000008" />
      <line x1="12" y1="50" x2="20" y2="4" stroke="#C8A96E" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="26" y1="50" x2="30" y2="4" stroke="#C8A96E" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="50" x2="42" y2="4" stroke="#C8A96E" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="14" y="12" width="7" height="7" rx="2.5" fill="url(#sk-meat)" />
      <ellipse cx="17.5" cy="14" rx="2" ry="1" fill="#C08040" opacity="0.4" />
      <rect x="15" y="22" width="6" height="7" rx="2.5" fill="url(#sk-meat)" />
      <rect x="14.5" y="32" width="6.5" height="7" rx="2.5" fill="url(#sk-meat)" />
      <rect x="26.5" y="14" width="6.5" height="7" rx="2.5" fill="url(#sk-meat)" />
      <rect x="27" y="25" width="6" height="7" rx="2.5" fill="url(#sk-meat)" />
      <rect x="27.5" y="36" width="5.5" height="6" rx="2.5" fill="url(#sk-meat)" />
      <rect x="39" y="10" width="6" height="7" rx="2.5" fill="url(#sk-meat)" />
      <rect x="39.5" y="20" width="5.5" height="7" rx="2.5" fill="url(#sk-meat)" />
      <rect x="40" y="30" width="5.5" height="6" rx="2.5" fill="url(#sk-meat)" />
      <line x1="15" y1="15" x2="20" y2="15" stroke="#4A2000" strokeWidth="0.6" opacity="0.5" />
      <line x1="15.5" y1="25" x2="20.5" y2="25" stroke="#4A2000" strokeWidth="0.6" opacity="0.5" />
      <circle cx="17" cy="17" r="0.7" fill="#DAA520" opacity="0.7" />
      <circle cx="30" cy="27" r="0.7" fill="#DAA520" opacity="0.7" />
      <circle cx="42" cy="22" r="0.7" fill="#DAA520" opacity="0.7" />
    </svg>
  );
}

export function DimSum3D() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="ds-bam" x1="10" y1="8" x2="46" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DCBC84" />
          <stop offset="100%" stopColor="#B89860" />
        </linearGradient>
      </defs>
      <ellipse cx="28" cy="48" rx="20" ry="3.5" fill="#D4C8A0" opacity="0.3" />
      <path d="M8 14C8 14 14 6 28 6C42 6 48 14 48 14" fill="url(#ds-bam)" stroke="#A08050" strokeWidth="1" />
      <circle cx="28" cy="7.5" r="2.5" fill="#A08050" />
      <rect x="8" y="14" width="40" height="14" rx="2" fill="url(#ds-bam)" stroke="#A08050" strokeWidth="0.8" />
      <line x1="10" y1="18" x2="46" y2="18" stroke="#C8A96E" strokeWidth="0.5" opacity="0.4" />
      <line x1="10" y1="22" x2="46" y2="22" stroke="#C8A96E" strokeWidth="0.5" opacity="0.4" />
      <rect x="8" y="28" width="40" height="14" rx="2" fill="url(#ds-bam)" stroke="#A08050" strokeWidth="0.8" />
      <line x1="10" y1="32" x2="46" y2="32" stroke="#C8A96E" strokeWidth="0.5" opacity="0.4" />
      <line x1="10" y1="36" x2="46" y2="36" stroke="#C8A96E" strokeWidth="0.5" opacity="0.4" />
      <ellipse cx="20" cy="15" rx="5" ry="3" fill="#FFF5E1" stroke="#E8D5B0" strokeWidth="0.7" />
      <ellipse cx="36" cy="15" rx="5" ry="3" fill="#FFF5E1" stroke="#E8D5B0" strokeWidth="0.7" />
      <circle cx="20" cy="14" r="1.2" fill="#FF8C00" opacity="0.5" />
      <circle cx="36" cy="14" r="1.2" fill="#FF8C00" opacity="0.5" />
      <ellipse cx="18" cy="16" rx="2" ry="1" fill="#FFFFFF" opacity="0.3" />
      <ellipse cx="34" cy="16" rx="2" ry="1" fill="#FFFFFF" opacity="0.3" />
    </svg>
  );
}

export function RoastDuck3D() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="dk-body" x1="12" y1="16" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8A830" />
          <stop offset="50%" stopColor="#C07818" />
          <stop offset="100%" stopColor="#8B5A0A" />
        </linearGradient>
        <radialGradient id="dk-hi" cx="0.35" cy="0.3" r="0.4">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="28" cy="46" rx="20" ry="4" fill="#E8E0D0" stroke="#D4C8B0" strokeWidth="0.8" />
      <ellipse cx="28" cy="32" rx="16" ry="12" fill="url(#dk-body)" />
      <ellipse cx="28" cy="32" rx="16" ry="12" fill="url(#dk-hi)" />
      <path d="M16 30C18 28 20 30 22 28C24 26 26 28 28 26" stroke="#8B5A0A" strokeWidth="0.6" opacity="0.4" fill="none" />
      <path d="M22 34C24 32 26 34 28 32C30 30 32 32 34 30" stroke="#8B5A0A" strokeWidth="0.6" opacity="0.4" fill="none" />
      <path d="M40 34C44 38 46 36 44 32" fill="#B8720E" stroke="#8B5A0A" strokeWidth="0.7" />
      <line x1="44" y1="32" x2="46" y2="28" stroke="#FFF5E1" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 26C10 22 12 18 16 20" fill="#C8820E" stroke="#A06010" strokeWidth="0.7" />
      <ellipse cx="22" cy="28" rx="5" ry="3" fill="#FFD700" opacity="0.2" />
    </svg>
  );
}

export function BeerBottle3D() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="br-body" x1="20" y1="6" x2="36" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3E8E41" />
          <stop offset="50%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>
        <linearGradient id="br-hi" x1="20" y1="10" x2="24" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#66BB6A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#66BB6A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="28" cy="52" rx="10" ry="2" fill="#00000010" />
      <rect x="23" y="2" width="10" height="5" rx="1.5" fill="#DAA520" />
      <line x1="24" y1="4.5" x2="32" y2="4.5" stroke="#C89520" strokeWidth="0.7" />
      <rect x="24" y="7" width="8" height="12" fill="url(#br-body)" />
      <rect x="23" y="9" width="10" height="2.5" rx="1" fill="#1B5E20" opacity="0.4" />
      <path d="M24 19C24 19 19 23 19 27L19 27L37 27C37 23 32 19 32 19Z" fill="url(#br-body)" />
      <rect x="19" y="27" width="18" height="22" rx="2" fill="url(#br-body)" />
      <rect x="19" y="27" width="4" height="22" rx="1" fill="url(#br-hi)" />
      <rect x="20.5" y="30" width="15" height="14" rx="1" fill="#FFF8DC" />
      <rect x="22.5" y="32" width="11" height="3.5" rx="0.5" fill="#C0392B" opacity="0.8" />
      <rect x="23.5" y="37.5" width="9" height="1.8" rx="0.5" fill="#DAA520" opacity="0.6" />
      <rect x="24.5" y="40.5" width="7" height="1.2" rx="0.5" fill="#2E7D32" opacity="0.4" />
      <rect x="19" y="49" width="18" height="2" rx="1" fill="#1B5E20" />
    </svg>
  );
}

export function BubbleTea3D() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="bt-tea" x1="14" y1="18" x2="42" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8C8A0" />
          <stop offset="100%" stopColor="#C89060" />
        </linearGradient>
        <linearGradient id="bt-cup" x1="14" y1="14" x2="42" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E8E8E8" />
        </linearGradient>
      </defs>
      <ellipse cx="28" cy="52" rx="12" ry="2" fill="#00000010" />
      <rect x="30" y="0" width="3.5" height="28" rx="1.2" fill="#E74C3C" />
      <line x1="31" y1="0" x2="31" y2="28" stroke="#C0392B" strokeWidth="0.5" />
      <path d="M14 16C14 11 19 9 28 9C37 9 42 11 42 16" fill="#E0E0E0" opacity="0.6" stroke="#CCC" strokeWidth="0.8" />
      <path d="M14 16L18 50L38 50L42 16Z" fill="url(#bt-cup)" stroke="#DDD" strokeWidth="0.8" />
      <path d="M15 20L19 48L37 48L41 20Z" fill="url(#bt-tea)" opacity="0.65" />
      <path d="M15 20L16 30L40 30L41 20Z" fill="#FFF5E1" opacity="0.4" />
      <circle cx="22" cy="40" r="2.8" fill="#1A1A1A" />
      <circle cx="28" cy="42" r="2.8" fill="#1A1A1A" />
      <circle cx="34" cy="40" r="2.8" fill="#1A1A1A" />
      <circle cx="20" cy="44" r="2.8" fill="#1A1A1A" />
      <circle cx="26" cy="46" r="2.8" fill="#1A1A1A" />
      <circle cx="32" cy="45" r="2.8" fill="#1A1A1A" />
      <circle cx="38" cy="44" r="2.8" fill="#1A1A1A" />
      <circle cx="21.5" cy="39.5" r="0.8" fill="#444" />
      <circle cx="27.5" cy="41.5" r="0.8" fill="#444" />
      <circle cx="33.5" cy="39.5" r="0.8" fill="#444" />
    </svg>
  );
}

export function EggTart3D() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="et-crust" x1="8" y1="20" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0B060" />
          <stop offset="100%" stopColor="#B08030" />
        </linearGradient>
        <radialGradient id="et-custard" cx="0.45" cy="0.45" r="0.55">
          <stop offset="0%" stopColor="#FFE44D" />
          <stop offset="60%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#CC8400" />
        </radialGradient>
      </defs>
      <ellipse cx="28" cy="48" rx="18" ry="3" fill="#00000010" />
      <path d="M6 26C6 26 9 48 28 48C47 48 50 26 50 26" fill="url(#et-crust)" stroke="#A07020" strokeWidth="0.8" />
      <ellipse cx="28" cy="26" rx="22" ry="6.5" fill="url(#et-crust)" stroke="#A07020" strokeWidth="0.8" />
      <path d="M10 28C12 25 14 28 16 25C18 22 20 25 22 22" stroke="#C89530" strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M34 22C36 25 38 22 40 25C42 28 44 25 46 28" stroke="#C89530" strokeWidth="0.7" fill="none" opacity="0.5" />
      <ellipse cx="28" cy="25" rx="16" ry="5" fill="url(#et-custard)" />
      <ellipse cx="22" cy="23.5" rx="4" ry="2" fill="#CC8400" opacity="0.5" />
      <ellipse cx="32" cy="24.5" rx="3.5" ry="2" fill="#CC8400" opacity="0.4" />
      <ellipse cx="20" cy="24" rx="3" ry="1.2" fill="#FFE44D" opacity="0.5" />
    </svg>
  );
}

/* ── Registry ── */

export type FoodIcon3DKey =
  | "dumpling" | "noodle" | "rice" | "malatang" | "hotpot"
  | "skewers" | "dimsum" | "duck" | "beer" | "bubbletea" | "eggtart";

export const FOOD_ICONS_3D: Record<FoodIcon3DKey, { component: () => React.ReactElement; label: string }> = {
  dumpling:  { component: Dumpling3D,   label: "饺子" },
  noodle:    { component: NoodleBowl3D, label: "牛肉面" },
  rice:      { component: RiceBowl3D,   label: "米饭" },
  malatang:  { component: MaLaTang3D,   label: "麻辣烫" },
  hotpot:    { component: HotPot3D,     label: "火锅" },
  skewers:   { component: Skewers3D,    label: "烤串" },
  dimsum:    { component: DimSum3D,     label: "点心" },
  duck:      { component: RoastDuck3D,  label: "烤鸭" },
  beer:      { component: BeerBottle3D, label: "青岛啤酒" },
  bubbletea: { component: BubbleTea3D,  label: "奶茶" },
  eggtart:   { component: EggTart3D,    label: "蛋挞" },
};
