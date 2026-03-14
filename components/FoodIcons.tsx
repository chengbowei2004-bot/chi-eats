/* 11 flat-style inline SVG food illustrations for the splash waterfall */

const S = 48; // viewBox size

export function Dumpling() {
  return (
    <svg width={S} height={S} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* body */}
      <path d="M8 28C8 28 12 38 24 38C36 38 40 28 40 28C40 28 36 18 24 18C12 18 8 28 8 28Z" fill="#F5DEB3" stroke="#D4A853" strokeWidth="1.5"/>
      {/* pleats */}
      <path d="M12 27C14 24 17 21 24 21C31 21 34 24 36 27" fill="none" stroke="#D4A853" strokeWidth="1.2"/>
      <path d="M15 26.5L17 23.5" stroke="#D4A853" strokeWidth="1" strokeLinecap="round"/>
      <path d="M21 25L22 22" stroke="#D4A853" strokeWidth="1" strokeLinecap="round"/>
      <path d="M27 25L26 22" stroke="#D4A853" strokeWidth="1" strokeLinecap="round"/>
      <path d="M33 26.5L31 23.5" stroke="#D4A853" strokeWidth="1" strokeLinecap="round"/>
      {/* shine */}
      <ellipse cx="20" cy="30" rx="4" ry="2" fill="#FFF8DC" opacity="0.5"/>
    </svg>
  );
}

export function NoodleBowl() {
  return (
    <svg width={S} height={S} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* steam */}
      <path d="M18 12C18 9 20 8 20 6" stroke="#D4D4D4" strokeWidth="1" strokeLinecap="round"/>
      <path d="M24 11C24 8 26 7 26 5" stroke="#D4D4D4" strokeWidth="1" strokeLinecap="round"/>
      <path d="M30 12C30 9 32 8 32 6" stroke="#D4D4D4" strokeWidth="1" strokeLinecap="round"/>
      {/* broth surface */}
      <ellipse cx="24" cy="22" rx="18" ry="6" fill="#C0392B" opacity="0.85"/>
      {/* bowl */}
      <path d="M6 22C6 22 8 40 24 40C40 40 42 22 42 22" fill="#FFFFFF" stroke="#E5E5E5" strokeWidth="1.5"/>
      {/* broth inside */}
      <path d="M8 22C8 22 10 36 24 36C38 36 40 22 40 22" fill="#D94F3B" opacity="0.7"/>
      {/* noodles */}
      <path d="M14 24C16 28 18 24 20 28C22 32 24 28 26 32" stroke="#F5DEB3" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M20 23C22 27 24 23 26 27C28 31 30 27 32 31" stroke="#F5DEB3" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* beef slices */}
      <ellipse cx="16" cy="25" rx="3" ry="2" fill="#8B4513" opacity="0.8"/>
      <ellipse cx="30" cy="24" rx="3.5" ry="2" fill="#8B4513" opacity="0.8"/>
      {/* scallion */}
      <circle cx="24" cy="22" r="1.5" fill="#4CAF50"/>
      <circle cx="20" cy="21" r="1" fill="#4CAF50"/>
    </svg>
  );
}

export function RiceBowl() {
  return (
    <svg width={S} height={S} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* steam */}
      <path d="M19 14C19 11 21 10 21 8" stroke="#D4D4D4" strokeWidth="1" strokeLinecap="round"/>
      <path d="M25 13C25 10 27 9 27 7" stroke="#D4D4D4" strokeWidth="1" strokeLinecap="round"/>
      {/* rice dome */}
      <path d="M10 22C10 22 12 14 24 14C36 14 38 22 38 22Z" fill="#FFFEF5" stroke="#E8E0C8" strokeWidth="1"/>
      {/* bowl */}
      <path d="M6 22C6 22 8 40 24 40C40 40 42 22 42 22" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1.5"/>
      {/* bowl band */}
      <path d="M7 24C7 24 10 34 24 34C38 34 41 24 41 24" fill="none" stroke="#4169E1" strokeWidth="2" opacity="0.3"/>
      {/* rice grains */}
      <ellipse cx="18" cy="18" rx="2" ry="1" fill="#FFF" stroke="#E8E0C8" strokeWidth="0.5" transform="rotate(-20 18 18)"/>
      <ellipse cx="24" cy="16" rx="2" ry="1" fill="#FFF" stroke="#E8E0C8" strokeWidth="0.5"/>
      <ellipse cx="30" cy="18" rx="2" ry="1" fill="#FFF" stroke="#E8E0C8" strokeWidth="0.5" transform="rotate(20 30 18)"/>
    </svg>
  );
}

export function MaLaTang() {
  return (
    <svg width={S} height={S} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* steam */}
      <path d="M16 10C16 7 18 6 18 4" stroke="#D4D4D4" strokeWidth="1" strokeLinecap="round"/>
      <path d="M24 9C24 6 26 5 26 3" stroke="#D4D4D4" strokeWidth="1" strokeLinecap="round"/>
      {/* bowl */}
      <path d="M6 20C6 20 8 40 24 40C40 40 42 20 42 20" fill="#FFF" stroke="#E5E5E5" strokeWidth="1.5"/>
      {/* red broth */}
      <ellipse cx="24" cy="20" rx="18" ry="5" fill="#E74C3C"/>
      <path d="M8 20C8 20 10 36 24 36C38 36 40 20 40 20" fill="#C0392B" opacity="0.6"/>
      {/* chili oil spots */}
      <circle cx="16" cy="20" r="1.5" fill="#FF6347" opacity="0.7"/>
      <circle cx="28" cy="19" r="2" fill="#FF6347" opacity="0.6"/>
      {/* skewers sticking out */}
      <line x1="18" y1="6" x2="20" y2="22" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="28" y1="5" x2="27" y2="22" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round"/>
      {/* food on skewers */}
      <circle cx="19" cy="12" r="2.5" fill="#8B4513"/>
      <rect x="26" y="10" width="3" height="4" rx="1" fill="#4CAF50"/>
    </svg>
  );
}

export function HotPot() {
  return (
    <svg width={S} height={S} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* steam */}
      <path d="M14 10C14 7 16 6 16 4" stroke="#D4D4D4" strokeWidth="1" strokeLinecap="round"/>
      <path d="M24 8C24 5 26 4 26 2" stroke="#D4D4D4" strokeWidth="1" strokeLinecap="round"/>
      <path d="M34 10C34 7 36 6 36 4" stroke="#D4D4D4" strokeWidth="1" strokeLinecap="round"/>
      {/* pot body */}
      <path d="M4 18C4 18 6 40 24 40C42 40 44 18 44 18" fill="#4A4A4A" stroke="#333" strokeWidth="1.5"/>
      {/* divider */}
      <line x1="24" y1="14" x2="24" y2="38" stroke="#666" strokeWidth="1.5"/>
      {/* broth - red side */}
      <path d="M6 18C6 18 8 36 24 36L24 18Z" fill="#D94F3B" opacity="0.85"/>
      {/* broth - white side */}
      <path d="M24 18L24 36C40 36 42 18 42 18Z" fill="#FFF5E1" opacity="0.9"/>
      {/* surface */}
      <ellipse cx="24" cy="18" rx="20" ry="5" fill="none" stroke="#333" strokeWidth="1.5"/>
      <path d="M4 18C4 13 13 10 24 10C35 10 44 13 44 18" fill="none" stroke="#333" strokeWidth="0"/>
      {/* chili on red side */}
      <circle cx="14" cy="17" r="1.5" fill="#FF4500" opacity="0.7"/>
      <circle cx="18" cy="19" r="1" fill="#FF4500" opacity="0.6"/>
      {/* handles */}
      <rect x="0" y="22" width="6" height="3" rx="1.5" fill="#666"/>
      <rect x="42" y="22" width="6" height="3" rx="1.5" fill="#666"/>
    </svg>
  );
}

export function Skewers() {
  return (
    <svg width={S} height={S} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* skewer sticks */}
      <line x1="10" y1="44" x2="18" y2="4" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round"/>
      <line x1="22" y1="44" x2="28" y2="4" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round"/>
      <line x1="34" y1="44" x2="38" y2="4" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round"/>
      {/* meat pieces - skewer 1 */}
      <rect x="12" y="12" width="6" height="5" rx="2" fill="#8B4513"/>
      <rect x="13" y="20" width="5" height="5" rx="2" fill="#A0522D"/>
      <rect x="12.5" y="28" width="5.5" height="5" rx="2" fill="#8B4513"/>
      {/* char marks */}
      <line x1="13" y1="14" x2="17" y2="14" stroke="#5D2E0C" strokeWidth="0.8"/>
      <line x1="13" y1="22" x2="17" y2="22" stroke="#5D2E0C" strokeWidth="0.8"/>
      <line x1="13" y1="30" x2="17" y2="30" stroke="#5D2E0C" strokeWidth="0.8"/>
      {/* meat pieces - skewer 2 */}
      <rect x="23" y="14" width="5.5" height="5" rx="2" fill="#A0522D"/>
      <rect x="24" y="22" width="5" height="5" rx="2" fill="#8B4513"/>
      <rect x="23.5" y="30" width="5.5" height="5" rx="2" fill="#A0522D"/>
      {/* meat pieces - skewer 3 */}
      <rect x="34" y="10" width="5" height="5" rx="2" fill="#8B4513"/>
      <rect x="35" y="18" width="5" height="5" rx="2" fill="#A0522D"/>
      <rect x="34.5" y="26" width="5" height="5" rx="2" fill="#8B4513"/>
      {/* spice sprinkle */}
      <circle cx="15" cy="16" r="0.6" fill="#DAA520"/>
      <circle cx="26" cy="24" r="0.6" fill="#DAA520"/>
      <circle cx="37" cy="20" r="0.6" fill="#DAA520"/>
    </svg>
  );
}

export function DimSum() {
  return (
    <svg width={S} height={S} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* steam */}
      <path d="M20 6C20 3 22 2 22 0" stroke="#D4D4D4" strokeWidth="1" strokeLinecap="round"/>
      <path d="M28 5C28 2 30 1 30 -1" stroke="#D4D4D4" strokeWidth="1" strokeLinecap="round"/>
      {/* steamer lid */}
      <path d="M8 14C8 14 12 6 24 6C36 6 40 14 40 14" fill="#C8A96E" stroke="#A0845C" strokeWidth="1.2"/>
      {/* lid handle */}
      <circle cx="24" cy="7" r="2" fill="#A0845C"/>
      {/* steamer body - top tier */}
      <rect x="8" y="14" width="32" height="12" rx="2" fill="#D4B07A" stroke="#A0845C" strokeWidth="1"/>
      {/* bamboo slats */}
      <line x1="10" y1="18" x2="38" y2="18" stroke="#C8A96E" strokeWidth="0.5" opacity="0.5"/>
      <line x1="10" y1="22" x2="38" y2="22" stroke="#C8A96E" strokeWidth="0.5" opacity="0.5"/>
      {/* steamer body - bottom tier */}
      <rect x="8" y="26" width="32" height="12" rx="2" fill="#D4B07A" stroke="#A0845C" strokeWidth="1"/>
      <line x1="10" y1="30" x2="38" y2="30" stroke="#C8A96E" strokeWidth="0.5" opacity="0.5"/>
      <line x1="10" y1="34" x2="38" y2="34" stroke="#C8A96E" strokeWidth="0.5" opacity="0.5"/>
      {/* dim sum peeking out - top */}
      <ellipse cx="18" cy="15" rx="4" ry="2.5" fill="#FFF5E1" stroke="#E8D5B0" strokeWidth="0.8"/>
      <ellipse cx="30" cy="15" rx="4" ry="2.5" fill="#FFF5E1" stroke="#E8D5B0" strokeWidth="0.8"/>
      {/* dim sum tops */}
      <circle cx="18" cy="14" r="1" fill="#FF8C00" opacity="0.6"/>
      <circle cx="30" cy="14" r="1" fill="#FF8C00" opacity="0.6"/>
      {/* base plate */}
      <ellipse cx="24" cy="39" rx="20" ry="3" fill="#E8E0D0" opacity="0.4"/>
    </svg>
  );
}

export function RoastDuck() {
  return (
    <svg width={S} height={S} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* plate */}
      <ellipse cx="24" cy="40" rx="18" ry="4" fill="#E8E0D0" stroke="#D4C8B0" strokeWidth="1"/>
      {/* duck body */}
      <ellipse cx="24" cy="28" rx="14" ry="10" fill="#C8820E"/>
      {/* glazed highlight */}
      <ellipse cx="20" cy="24" rx="6" ry="4" fill="#DAA520" opacity="0.5"/>
      {/* crispy skin texture */}
      <path d="M14 26C16 24 18 26 20 24C22 22 24 24 26 22" stroke="#A06010" strokeWidth="0.8" opacity="0.6" fill="none"/>
      <path d="M18 30C20 28 22 30 24 28C26 26 28 28 30 26" stroke="#A06010" strokeWidth="0.8" opacity="0.6" fill="none"/>
      {/* drumstick */}
      <path d="M34 30C38 34 40 32 38 28" fill="#B8720E" stroke="#8B5A0A" strokeWidth="0.8"/>
      {/* drumstick bone */}
      <line x1="38" y1="28" x2="40" y2="24" stroke="#FFF5E1" strokeWidth="1.5" strokeLinecap="round"/>
      {/* neck area */}
      <path d="M12 22C8 18 10 14 14 16" fill="#C8820E" stroke="#A06010" strokeWidth="0.8"/>
      {/* glaze drip */}
      <path d="M22 36C22 38 24 38 24 36" fill="#8B5A0A" opacity="0.4"/>
    </svg>
  );
}

export function BeerBottle() {
  return (
    <svg width={S} height={S} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* cap */}
      <rect x="20" y="2" width="8" height="4" rx="1" fill="#DAA520"/>
      <line x1="21" y1="4" x2="27" y2="4" stroke="#C89520" strokeWidth="0.8"/>
      {/* neck */}
      <rect x="21" y="6" width="6" height="10" fill="#2E7D32"/>
      {/* neck ring */}
      <rect x="20" y="8" width="8" height="2" rx="1" fill="#1B5E20" opacity="0.5"/>
      {/* shoulder */}
      <path d="M21 16C21 16 16 20 16 24L16 24L32 24C32 20 27 16 27 16Z" fill="#2E7D32"/>
      {/* body */}
      <rect x="16" y="24" width="16" height="18" rx="2" fill="#2E7D32"/>
      {/* label */}
      <rect x="17" y="26" width="14" height="12" rx="1" fill="#FFF8DC"/>
      {/* label text area */}
      <rect x="19" y="28" width="10" height="3" rx="0.5" fill="#C0392B" opacity="0.8"/>
      <rect x="20" y="33" width="8" height="1.5" rx="0.5" fill="#DAA520" opacity="0.6"/>
      <rect x="21" y="35.5" width="6" height="1" rx="0.5" fill="#2E7D32" opacity="0.4"/>
      {/* bottle shine */}
      <rect x="17" y="24" width="2" height="18" rx="1" fill="#4CAF50" opacity="0.3"/>
      {/* base */}
      <rect x="16" y="42" width="16" height="2" rx="1" fill="#1B5E20"/>
    </svg>
  );
}

export function BubbleTea() {
  return (
    <svg width={S} height={S} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* straw */}
      <rect x="26" y="0" width="3" height="24" rx="1" fill="#E74C3C"/>
      <line x1="26.5" y1="0" x2="26.5" y2="24" stroke="#C0392B" strokeWidth="0.5"/>
      {/* dome lid */}
      <path d="M12 14C12 10 17 8 24 8C31 8 36 10 36 14" fill="#E0E0E0" opacity="0.6" stroke="#CCC" strokeWidth="1"/>
      {/* cup body */}
      <path d="M12 14L16 44L32 44L36 14Z" fill="#FFF" stroke="#E0E0E0" strokeWidth="1.2"/>
      {/* tea fill */}
      <path d="M13 18L16.5 42L31.5 42L35 18Z" fill="#D4956A" opacity="0.7"/>
      {/* milk layer */}
      <path d="M13 18L14 26L34 26L35 18Z" fill="#FFF5E1" opacity="0.5"/>
      {/* pearls */}
      <circle cx="20" cy="36" r="2.2" fill="#1A1A1A"/>
      <circle cx="26" cy="38" r="2.2" fill="#1A1A1A"/>
      <circle cx="22" cy="40" r="2.2" fill="#1A1A1A"/>
      <circle cx="28" cy="36" r="2.2" fill="#1A1A1A"/>
      <circle cx="18" cy="39" r="2.2" fill="#1A1A1A"/>
      <circle cx="24" cy="41" r="2.2" fill="#1A1A1A"/>
      <circle cx="30" cy="40" r="2.2" fill="#1A1A1A"/>
      {/* pearl shine */}
      <circle cx="19.5" cy="35.5" r="0.6" fill="#555"/>
      <circle cx="25.5" cy="37.5" r="0.6" fill="#555"/>
      <circle cx="27.5" cy="35.5" r="0.6" fill="#555"/>
    </svg>
  );
}

export function EggTart() {
  return (
    <svg width={S} height={S} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* crust - outer */}
      <path d="M6 24C6 24 8 42 24 42C40 42 42 24 42 24" fill="#D4A053" stroke="#B8862D" strokeWidth="1.2"/>
      {/* crust - top edge */}
      <ellipse cx="24" cy="24" rx="18" ry="6" fill="#D4A053" stroke="#B8862D" strokeWidth="1"/>
      {/* crust pleats */}
      <path d="M8 26C10 23 12 26 14 23C16 20 18 23 20 20" stroke="#C89530" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <path d="M28 20C30 23 32 20 34 23C36 26 38 23 40 26" stroke="#C89530" strokeWidth="0.8" fill="none" opacity="0.6"/>
      {/* custard filling */}
      <ellipse cx="24" cy="23" rx="14" ry="4.5" fill="#FFD700"/>
      {/* caramelized top spots */}
      <ellipse cx="20" cy="22" rx="4" ry="2" fill="#E8A317" opacity="0.7"/>
      <ellipse cx="28" cy="23" rx="3" ry="2" fill="#CC8400" opacity="0.5"/>
      <ellipse cx="24" cy="21.5" rx="2.5" ry="1.5" fill="#CC8400" opacity="0.4"/>
      {/* shine */}
      <ellipse cx="18" cy="22" rx="2" ry="1" fill="#FFE44D" opacity="0.6"/>
    </svg>
  );
}

/* ── Icon registry ── */

export type FoodIconKey =
  | "dumpling" | "noodle" | "rice" | "malatang" | "hotpot"
  | "skewers" | "dimsum" | "duck" | "beer" | "bubbletea" | "eggtart";

export const FOOD_ICONS: Record<FoodIconKey, { component: () => React.ReactElement; label: string }> = {
  dumpling:  { component: Dumpling,   label: "饺子" },
  noodle:    { component: NoodleBowl, label: "牛肉面" },
  rice:      { component: RiceBowl,   label: "米饭" },
  malatang:  { component: MaLaTang,   label: "麻辣烫" },
  hotpot:    { component: HotPot,     label: "火锅" },
  skewers:   { component: Skewers,    label: "烤串" },
  dimsum:    { component: DimSum,     label: "点心" },
  duck:      { component: RoastDuck,  label: "烤鸭" },
  beer:      { component: BeerBottle, label: "青岛啤酒" },
  bubbletea: { component: BubbleTea,  label: "奶茶" },
  eggtart:   { component: EggTart,    label: "蛋挞" },
};
