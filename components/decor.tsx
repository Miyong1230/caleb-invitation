// Hand-drawn watercolor decor, all inline SVG so every piece can move.
// One shared grammar: soft gradient fills, rounded tan strokes, no hard lines.

export function TeddyBear({
  className = "",
  bowColor = "#7fa6d4",
}: {
  className?: string;
  bowColor?: string;
}) {
  return (
    <svg viewBox="0 0 200 224" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="furG" cx="42%" cy="34%" r="80%">
          <stop offset="0%" stopColor="#e8c69c" />
          <stop offset="70%" stopColor="#d3a878" />
          <stop offset="100%" stopColor="#c0925f" />
        </radialGradient>
        <radialGradient id="furLightG" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#f8ecda" />
          <stop offset="100%" stopColor="#ecd4b4" />
        </radialGradient>
      </defs>
      <g stroke="#9a7048" strokeWidth="2.5" strokeOpacity="0.55">
        {/* ears */}
        <circle cx="56" cy="44" r="23" fill="url(#furG)" />
        <circle cx="144" cy="44" r="23" fill="url(#furG)" />
        <circle cx="56" cy="46" r="11" fill="url(#furLightG)" strokeWidth="0" />
        <circle cx="144" cy="46" r="11" fill="url(#furLightG)" strokeWidth="0" />
        {/* body */}
        <ellipse cx="100" cy="162" rx="49" ry="54" fill="url(#furG)" />
        {/* arms */}
        <ellipse cx="54" cy="142" rx="17" ry="30" fill="url(#furG)" transform="rotate(24 54 142)" />
        <ellipse cx="146" cy="142" rx="17" ry="30" fill="url(#furG)" transform="rotate(-24 146 142)" />
        {/* legs */}
        <ellipse cx="66" cy="200" rx="21" ry="17" fill="url(#furG)" />
        <ellipse cx="134" cy="200" rx="21" ry="17" fill="url(#furG)" />
        <ellipse cx="66" cy="202" rx="11" ry="8.5" fill="url(#furLightG)" strokeWidth="0" />
        <ellipse cx="134" cy="202" rx="11" ry="8.5" fill="url(#furLightG)" strokeWidth="0" />
        {/* belly */}
        <ellipse cx="100" cy="168" rx="30" ry="36" fill="url(#furLightG)" strokeWidth="0" />
        {/* head */}
        <ellipse cx="100" cy="74" rx="53" ry="47" fill="url(#furG)" />
        <ellipse cx="100" cy="91" rx="27" ry="19" fill="url(#furLightG)" strokeWidth="0" />
      </g>
      {/* face */}
      <circle cx="79" cy="66" r="4.6" fill="#4a3320" />
      <circle cx="121" cy="66" r="4.6" fill="#4a3320" />
      <circle cx="80.6" cy="64.4" r="1.5" fill="#fff" />
      <circle cx="122.6" cy="64.4" r="1.5" fill="#fff" />
      <ellipse cx="100" cy="84" rx="8.5" ry="6" fill="#6b4a2c" />
      <path
        d="M100 90 v6 M100 96 c-4 5 -9 5 -12 2 M100 96 c4 5 9 5 12 2"
        fill="none"
        stroke="#6b4a2c"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* stitches */}
      <path
        d="M100 118 v8 M96 122 h8"
        stroke="#9a7048"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
      {/* bow */}
      <g stroke="#4c709e" strokeWidth="2" strokeOpacity="0.5">
        <path d="M100 124 C86 112 66 114 70 130 C73 143 90 138 100 130 Z" fill={bowColor} />
        <path d="M100 124 C114 112 134 114 130 130 C127 143 110 138 100 130 Z" fill={bowColor} />
        <circle cx="100" cy="127" r="7" fill={bowColor} />
      </g>
    </svg>
  );
}

export function BearFace({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 110" className={className} aria-hidden="true">
      <g stroke="#9a7048" strokeWidth="2.2" strokeOpacity="0.55">
        <circle cx="28" cy="26" r="15" fill="#d3a878" />
        <circle cx="92" cy="26" r="15" fill="#d3a878" />
        <circle cx="28" cy="27" r="7" fill="#ecd4b4" strokeWidth="0" />
        <circle cx="92" cy="27" r="7" fill="#ecd4b4" strokeWidth="0" />
        <ellipse cx="60" cy="60" rx="38" ry="34" fill="#d3a878" />
        <ellipse cx="60" cy="72" rx="19" ry="13.5" fill="#ecd4b4" strokeWidth="0" />
      </g>
      <circle cx="45" cy="54" r="3.6" fill="#4a3320" />
      <circle cx="75" cy="54" r="3.6" fill="#4a3320" />
      <ellipse cx="60" cy="67" rx="6" ry="4.4" fill="#6b4a2c" />
      <path
        d="M60 71 v4 M60 75 c-3 3.4 -6.5 3.4 -8.6 1.4 M60 75 c3 3.4 6.5 3.4 8.6 1.4"
        fill="none"
        stroke="#6b4a2c"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="cloudG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cfe2f3" />
        </linearGradient>
      </defs>
      <g fill="url(#cloudG)">
        <ellipse cx="60" cy="80" rx="52" ry="30" />
        <ellipse cx="115" cy="58" rx="55" ry="38" />
        <ellipse cx="165" cy="82" rx="48" ry="28" />
      </g>
      <ellipse cx="112" cy="96" rx="88" ry="14" fill="#a9c8e4" opacity="0.4" />
    </svg>
  );
}

export function GoldStar({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="starG" cx="40%" cy="35%" r="80%">
          <stop offset="0%" stopColor="#f7dd8f" />
          <stop offset="100%" stopColor="#dfa93a" />
        </radialGradient>
      </defs>
      <path
        d="M32 4 C34 16 37 22 44 25 C51 27 55 28 60 30 C53 33 49 34 44 37 C38 40 35 46 32 58 C29 46 26 40 20 37 C15 34 11 33 4 30 C9 28 13 27 20 25 C27 22 30 16 32 4 Z"
        fill="url(#starG)"
        stroke="#c98f27"
        strokeWidth="1.6"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

export function HotAirBalloon({
  className = "",
  withBear = true,
}: {
  className?: string;
  withBear?: boolean;
}) {
  return (
    <svg viewBox="0 0 160 226" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="balloonBlue" cx="42%" cy="30%" r="85%">
          <stop offset="0%" stopColor="#bcd8f0" />
          <stop offset="100%" stopColor="#8fb4d9" />
        </radialGradient>
        <radialGradient id="balloonCream" cx="42%" cy="30%" r="85%">
          <stop offset="0%" stopColor="#fdf9f0" />
          <stop offset="100%" stopColor="#ecdfc4" />
        </radialGradient>
      </defs>
      {/* envelope */}
      <g stroke="#6a94c2" strokeWidth="2" strokeOpacity="0.45">
        <path d="M80 6 C34 6 12 44 14 78 C16 112 48 138 66 152 L94 152 C112 138 144 112 146 78 C148 44 126 6 80 6 Z" fill="url(#balloonBlue)" />
        <path d="M80 6 C62 6 50 44 51 78 C52 112 62 140 68 152 L92 152 C98 140 108 112 109 78 C110 44 98 6 80 6 Z" fill="url(#balloonCream)" strokeWidth="0" />
        <path d="M80 6 C72 6 66 44 67 78 C67.6 112 72 140 75 152 L85 152 C88 140 92.4 112 93 78 C94 44 88 6 80 6 Z" fill="url(#balloonBlue)" strokeWidth="0" />
      </g>
      {/* bunting */}
      <path d="M28 96 C50 116 110 116 132 96" fill="none" stroke="#c19a6f" strokeWidth="2.4" />
      <g fill="#eec95f">
        <path d="M46 106 l8 1 -3.6 8 Z" />
        <path d="M76 112 l8 0 -4 8 Z" />
        <path d="M106 106 l8 -1 -4.4 9 Z" />
      </g>
      {/* ropes */}
      <path d="M66 152 L70 180 M94 152 L90 180 M80 152 L80 180" stroke="#9a7048" strokeWidth="2" />
      {/* basket */}
      <g>
        <rect x="58" y="178" width="44" height="34" rx="9" fill="#c19a6f" stroke="#9a7048" strokeWidth="2.4" />
        <path d="M58 189 h44 M58 200 h44 M72 178 v34 M88 178 v34" stroke="#9a7048" strokeWidth="1.6" strokeOpacity="0.6" />
      </g>
      {withBear && (
        <g transform="translate(56 138) scale(0.42)">
          <BearFaceInner />
        </g>
      )}
    </svg>
  );
}

// Raw group version so it can be composed inside other SVGs.
function BearFaceInner() {
  return (
    <g>
      <g stroke="#9a7048" strokeWidth="2.2" strokeOpacity="0.55">
        <circle cx="28" cy="26" r="15" fill="#d3a878" />
        <circle cx="92" cy="26" r="15" fill="#d3a878" />
        <ellipse cx="60" cy="60" rx="38" ry="34" fill="#d3a878" />
        <ellipse cx="60" cy="72" rx="19" ry="13.5" fill="#ecd4b4" strokeWidth="0" />
      </g>
      <circle cx="45" cy="54" r="3.6" fill="#4a3320" />
      <circle cx="75" cy="54" r="3.6" fill="#4a3320" />
      <ellipse cx="60" cy="67" rx="6" ry="4.4" fill="#6b4a2c" />
    </g>
  );
}

export function BalloonCluster({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 190" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="bcBlue" cx="35%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#d3e6f7" />
          <stop offset="100%" stopColor="#8fb4d9" />
        </radialGradient>
        <radialGradient id="bcDeep" cx="35%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#9dbfe4" />
          <stop offset="100%" stopColor="#6b95c6" />
        </radialGradient>
        <radialGradient id="bcCream" cx="35%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#fffdf7" />
          <stop offset="100%" stopColor="#eadfc4" />
        </radialGradient>
      </defs>
      <path d="M38 74 C55 110 68 140 70 168 M70 60 C70 110 70 140 70 168 M104 78 C88 112 74 140 70 168" fill="none" stroke="#9a7048" strokeWidth="1.8" strokeOpacity="0.7" />
      <ellipse cx="38" cy="46" rx="26" ry="31" fill="url(#bcBlue)" />
      <ellipse cx="104" cy="50" rx="25" ry="30" fill="url(#bcDeep)" />
      <ellipse cx="70" cy="32" rx="27" ry="32" fill="url(#bcCream)" />
      <ellipse cx="30" cy="34" rx="7" ry="10" fill="#ffffff" opacity="0.55" transform="rotate(-18 30 34)" />
      <ellipse cx="62" cy="20" rx="7" ry="10" fill="#ffffff" opacity="0.6" transform="rotate(-18 62 20)" />
      <ellipse cx="97" cy="38" rx="6" ry="9" fill="#ffffff" opacity="0.5" transform="rotate(-18 97 38)" />
    </svg>
  );
}

export function Rainbow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 110" className={className} aria-hidden="true">
      <g fill="none" strokeLinecap="round">
        <path d="M30 100 A70 70 0 0 1 170 100" stroke="#8fb4d9" strokeWidth="14" />
        <path d="M44 100 A56 56 0 0 1 156 100" stroke="#f2e6cf" strokeWidth="13" />
        <path d="M58 100 A42 42 0 0 1 142 100" stroke="#d9b88f" strokeWidth="12" />
        <path d="M71 100 A29 29 0 0 1 129 100" stroke="#bcd6ec" strokeWidth="11" />
      </g>
    </svg>
  );
}

export function Bunting({ className = "" }: { className?: string }) {
  const colors = ["#8fb4d9", "#f2e6cf", "#eec95f", "#bcd6ec", "#f2e6cf", "#8fb4d9", "#eec95f", "#bcd6ec"];
  return (
    <svg viewBox="0 0 400 60" className={className} aria-hidden="true">
      <path d="M4 8 C100 46 300 46 396 8" fill="none" stroke="#c19a6f" strokeWidth="3" strokeLinecap="round" />
      {colors.map((c, i) => {
        const x = 28 + i * 44;
        const y = 18 + Math.sin((i / 7) * Math.PI) * 14;
        return (
          <path
            key={i}
            d={`M${x} ${y} l30 3 l-13 26 Z`}
            fill={c}
            stroke="#b0946e"
            strokeWidth="1.4"
            strokeOpacity="0.5"
          />
        );
      })}
    </svg>
  );
}

export function Tape({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 26" className={className} aria-hidden="true">
      <path
        d="M4 4 L76 2 L78 22 L2 24 Z"
        fill="#e8d9bd"
        opacity="0.85"
      />
    </svg>
  );
}

export function Swirl({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 4 C31 4 37 12 36 20 C35 29 27 34 20 33 C13 32 8 26 9 20 C10 14 15 11 20 12 C25 13 28 17 27 21 C26 25 22 27 19 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 70" className={className} aria-hidden="true">
      <path
        d="M6 56 C28 66 52 60 58 42 C63 28 50 20 42 28 C34 36 44 48 60 42 C72 37 78 26 80 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M70 18 L81 10 L84 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 34" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M20 17 H120" />
        <path d="M180 17 H280" />
        <path d="M104 9 L120 17 L104 25" />
        <path d="M196 9 L180 17 L196 25" />
        <path d="M30 17 l-8 -6 M30 17 l-8 6 M270 17 l8 -6 M270 17 l8 6" />
      </g>
      <circle cx="150" cy="17" r="5" fill="currentColor" />
      <circle cx="132" cy="17" r="2.4" fill="currentColor" />
      <circle cx="168" cy="17" r="2.4" fill="currentColor" />
    </svg>
  );
}

/* ---------- Reminder icons: one stroke family, navy on cream ---------- */

const iconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 4.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconNoKiss({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="27" {...iconStroke} />
      <path
        d="M20 34 C24 28 30 28 32 32 C34 28 40 28 44 34 C40 42 34 44 32 43 C30 44 24 42 20 34 Z"
        {...iconStroke}
        strokeWidth={3.6}
      />
      <path d="M12 12 L52 52" {...iconStroke} />
    </svg>
  );
}

export function IconSanitize({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M26 14 h12 M32 14 v-6 h8" {...iconStroke} />
      <path d="M24 22 h16 l3 8 v22 a4 4 0 0 1 -4 4 h-14 a4 4 0 0 1 -4 -4 v-22 Z" {...iconStroke} strokeWidth={3.8} />
      <path d="M15 34 c0 4 -6 6 -6 11 a6 6 0 0 0 12 0 c0 -5 -6 -7 -6 -11 Z" {...iconStroke} strokeWidth={3.4} />
      <path d="M28 38 h8 M32 34 v8" {...iconStroke} strokeWidth={3.4} />
    </svg>
  );
}

export function IconNoSmoke({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="27" {...iconStroke} />
      <rect x="16" y="34" width="26" height="8" rx="2" {...iconStroke} strokeWidth={3.6} />
      <path d="M46 34 v8 M46 24 c-4 -2 -4 -6 0 -8 M40 26 c-3 -1.6 -3 -4.4 0 -6" {...iconStroke} strokeWidth={3.4} />
      <path d="M12 12 L52 52" {...iconStroke} />
    </svg>
  );
}

export function IconMask({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="30" r="20" {...iconStroke} strokeWidth={3.8} />
      <path d="M18 34 c9 -4 19 -4 28 0 l-2 12 c-8 4 -16 4 -24 0 Z" {...iconStroke} strokeWidth={3.6} />
      <path d="M18 35 l-8 -4 M46 35 l8 -4" {...iconStroke} strokeWidth={3.4} />
      <circle cx="26" cy="26" r="1.6" fill="currentColor" />
      <circle cx="38" cy="26" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function IconCalendarClock({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 64" className={className} aria-hidden="true">
      <rect x="6" y="12" width="44" height="42" rx="6" {...iconStroke} strokeWidth={3.8} />
      <path d="M6 24 h44 M18 12 v-6 M38 12 v-6" {...iconStroke} strokeWidth={3.8} />
      <path d="M14 34 h6 M26 34 h6 M14 44 h6 M26 44 h6" {...iconStroke} strokeWidth={3.2} />
      <circle cx="60" cy="42" r="15" {...iconStroke} fill="#f2f8fd" strokeWidth={3.8} />
      <path d="M60 34 v8 l6 4" {...iconStroke} strokeWidth={3.4} />
    </svg>
  );
}

export function IconPin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M16 3 C10 3 6 8 6 13 C6 20 16 29 16 29 C16 29 26 20 26 13 C26 8 22 3 16 3 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="13" r="4" fill="currentColor" />
    </svg>
  );
}

export function MoneyEnvelope({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true">
      <rect x="10" y="26" width="100" height="64" rx="10" fill="#bcd6ec" stroke="#6a94c2" strokeWidth="3" />
      <path d="M10 36 L60 66 L110 36" fill="none" stroke="#6a94c2" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="30" r="19" fill="#eec95f" stroke="#c98f27" strokeWidth="3" />
      <text
        x="60"
        y="38"
        textAnchor="middle"
        fontSize="22"
        fontWeight="bold"
        fill="#8a5f14"
        fontFamily="var(--font-patrick-hand), cursive"
      >
        $
      </text>
      <circle cx="42" cy="76" r="2.6" fill="#33569c" />
      <circle cx="60" cy="78" r="2.6" fill="#33569c" />
      <circle cx="78" cy="76" r="2.6" fill="#33569c" />
    </svg>
  );
}

export function GiftBox({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect x="14" y="40" width="72" height="52" rx="6" fill="#8fb4d9" stroke="#5d86b6" strokeWidth="3" />
      <rect x="8" y="26" width="84" height="18" rx="5" fill="#bcd6ec" stroke="#5d86b6" strokeWidth="3" />
      <path d="M50 26 v66 M50 26 C40 10 24 12 28 22 C31 29 42 28 50 26 M50 26 C60 10 76 12 72 22 C69 29 58 28 50 26" fill="none" stroke="#f2e6cf" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
