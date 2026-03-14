/**
 * CSS-generated placeholder images for dish cards.
 * Each dish gets a unique gradient + abstract food shape based on its cuisine/name.
 */

type PlaceholderStyle = {
  bg: string;
  shapes: React.ReactElement[];
};

function getStyle(nameZh: string, cuisineTag: string): PlaceholderStyle {
  // Hash the name to pick consistent colors
  let hash = 0;
  for (let i = 0; i < nameZh.length; i++) {
    hash = nameZh.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;

  // Cuisine-based palettes
  if (cuisineTag === "火锅" || nameZh.includes("火锅") || nameZh.includes("麻辣")) {
    return {
      bg: "linear-gradient(135deg, #8B1A1A 0%, #CC3333 50%, #FF4D00 100%)",
      shapes: [
        <circle key="b1" cx="30%" cy="60%" r="6" fill="rgba(255,200,100,0.3)" />,
        <circle key="b2" cx="55%" cy="45%" r="8" fill="rgba(255,180,80,0.25)" />,
        <circle key="b3" cx="70%" cy="65%" r="5" fill="rgba(255,220,120,0.3)" />,
        <circle key="b4" cx="40%" cy="35%" r="4" fill="rgba(255,255,200,0.2)" />,
        <path key="s1" d="M20,20 Q25,5 30,20" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />,
        <path key="s2" d="M60,15 Q65,0 70,15" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />,
      ],
    };
  }

  if (cuisineTag === "面食" || nameZh.includes("面") || nameZh.includes("粉")) {
    return {
      bg: "linear-gradient(135deg, #5C3D2E 0%, #8B6914 50%, #A0784C 100%)",
      shapes: [
        <path key="n1" d="M10,50 Q30,30 50,55 T90,45" stroke="rgba(255,230,160,0.4)" strokeWidth="3" fill="none" />,
        <path key="n2" d="M15,60 Q35,40 55,65 T95,55" stroke="rgba(255,230,160,0.3)" strokeWidth="2.5" fill="none" />,
        <path key="n3" d="M5,70 Q25,50 45,75 T85,65" stroke="rgba(255,230,160,0.25)" strokeWidth="2" fill="none" />,
        <path key="n4" d="M20,40 Q40,20 60,45 T100,35" stroke="rgba(255,220,140,0.2)" strokeWidth="2" fill="none" />,
        <circle key="m1" cx="75%" cy="30%" r="8" fill="rgba(139,69,19,0.4)" />,
      ],
    };
  }

  if (cuisineTag === "点心" || cuisineTag === "饺子" || nameZh.includes("饺") || nameZh.includes("包")) {
    return {
      bg: "linear-gradient(135deg, #F5E6D0 0%, #E8D5B8 50%, #DCC8A0 100%)",
      shapes: [
        <ellipse key="d1" cx="35%" cy="45%" rx="20" ry="14" fill="rgba(255,255,255,0.6)" />,
        <ellipse key="d2" cx="60%" cy="55%" rx="18" ry="12" fill="rgba(255,255,255,0.5)" />,
        <ellipse key="d3" cx="50%" cy="35%" rx="16" ry="11" fill="rgba(255,255,255,0.45)" />,
        <path key="p1" d="M25,42 Q35,35 45,42" stroke="rgba(180,150,100,0.4)" strokeWidth="1" fill="none" />,
        <path key="p2" d="M50,52 Q60,45 70,52" stroke="rgba(180,150,100,0.35)" strokeWidth="1" fill="none" />,
      ],
    };
  }

  if (nameZh.includes("烤") || nameZh.includes("串") || cuisineTag === "新疆菜") {
    return {
      bg: "linear-gradient(135deg, #3D1C00 0%, #8B4513 50%, #CC6600 100%)",
      shapes: [
        <line key="sk1" x1="20%" y1="80%" x2="35%" y2="15%" stroke="rgba(200,170,110,0.5)" strokeWidth="2.5" />,
        <line key="sk2" x1="45%" y1="85%" x2="55%" y2="10%" stroke="rgba(200,170,110,0.45)" strokeWidth="2.5" />,
        <line key="sk3" x1="65%" y1="80%" x2="75%" y2="15%" stroke="rgba(200,170,110,0.4)" strokeWidth="2.5" />,
        <rect key="m1" x="26%" y="30%" width="8" height="12" rx="3" fill="rgba(160,82,45,0.6)" />,
        <rect key="m2" x="28%" y="50%" width="7" height="10" rx="3" fill="rgba(139,69,19,0.5)" />,
        <rect key="m3" x="49%" y="35%" width="8" height="11" rx="3" fill="rgba(160,82,45,0.55)" />,
        <rect key="m4" x="51%" y="55%" width="7" height="10" rx="3" fill="rgba(139,69,19,0.45)" />,
      ],
    };
  }

  if (nameZh.includes("米") || nameZh.includes("饭") || nameZh.includes("卤")) {
    return {
      bg: "linear-gradient(135deg, #F5F0E0 0%, #E8DCC0 50%, #D4C8A8 100%)",
      shapes: [
        <ellipse key="b1" cx="50%" cy="55%" rx="30" ry="18" fill="rgba(255,255,255,0.5)" stroke="rgba(180,160,120,0.3)" strokeWidth="1" />,
        <ellipse key="r1" cx="45%" cy="48%" rx="4" ry="2" fill="rgba(255,255,250,0.7)" transform="rotate(-15 45 48)" />,
        <ellipse key="r2" cx="52%" cy="50%" rx="4" ry="2" fill="rgba(255,255,250,0.6)" transform="rotate(10 52 50)" />,
        <ellipse key="r3" cx="48%" cy="53%" rx="3.5" ry="2" fill="rgba(255,255,250,0.65)" transform="rotate(-5 48 53)" />,
        <path key="st" d="M45,30 Q47,22 49,30" stroke="rgba(200,200,200,0.3)" strokeWidth="1.5" fill="none" />,
      ],
    };
  }

  if (nameZh.includes("汤") || nameZh.includes("煲") || nameZh.includes("炖")) {
    return {
      bg: "linear-gradient(135deg, #6B3A2A 0%, #A0522D 50%, #C87537 100%)",
      shapes: [
        <ellipse key="bw" cx="50%" cy="60%" rx="32" ry="16" fill="rgba(255,240,220,0.2)" />,
        <path key="s1" d="M35,25 Q37,15 39,25" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />,
        <path key="s2" d="M50,22 Q52,12 54,22" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />,
        <path key="s3" d="M62,25 Q64,15 66,25" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />,
      ],
    };
  }

  // Default: warm-toned abstract based on name hash
  return {
    bg: `linear-gradient(135deg, hsl(${hue}, 40%, 25%) 0%, hsl(${(hue + 30) % 360}, 45%, 35%) 50%, hsl(${(hue + 60) % 360}, 40%, 40%) 100%)`,
    shapes: [
      <circle key="c1" cx="30%" cy="40%" r="15" fill={`hsla(${hue}, 30%, 60%, 0.2)`} />,
      <circle key="c2" cx="65%" cy="55%" r="20" fill={`hsla(${(hue + 40) % 360}, 35%, 55%, 0.15)`} />,
      <circle key="c3" cx="50%" cy="70%" r="10" fill={`hsla(${(hue + 80) % 360}, 30%, 50%, 0.2)`} />,
    ],
  };
}

export function DishPlaceholder({
  nameZh,
  cuisineTag = "",
}: {
  nameZh: string;
  cuisineTag?: string;
}) {
  const style = getStyle(nameZh, cuisineTag);

  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ height: 150, background: style.bg }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {style.shapes}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-[36px] font-light select-none"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          {nameZh.charAt(0)}
        </span>
      </div>
    </div>
  );
}
