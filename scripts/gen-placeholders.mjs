// One-time generator for placeholder photo slots (replaced via admin uploads).
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "public", "placeholders");
mkdirSync(dir, { recursive: true });

const bear = (x, y, s) => `
<g transform="translate(${x} ${y}) scale(${s})">
  <g stroke="#9a7048" stroke-width="2.2" stroke-opacity="0.5">
    <circle cx="28" cy="26" r="15" fill="#d3a878"/>
    <circle cx="92" cy="26" r="15" fill="#d3a878"/>
    <circle cx="28" cy="27" r="7" fill="#ecd4b4" stroke-width="0"/>
    <circle cx="92" cy="27" r="7" fill="#ecd4b4" stroke-width="0"/>
    <ellipse cx="60" cy="60" rx="38" ry="34" fill="#d3a878"/>
    <ellipse cx="60" cy="72" rx="19" ry="13.5" fill="#ecd4b4" stroke-width="0"/>
  </g>
  <circle cx="45" cy="54" r="3.6" fill="#4a3320"/>
  <circle cx="75" cy="54" r="3.6" fill="#4a3320"/>
  <ellipse cx="60" cy="67" rx="6" ry="4.4" fill="#6b4a2c"/>
  <path d="M60 71 v4 M60 75 c-3 3.4 -6.5 3.4 -8.6 1.4 M60 75 c3 3.4 6.5 3.4 8.6 1.4" fill="none" stroke="#6b4a2c" stroke-width="2.2" stroke-linecap="round"/>
</g>`;

const star = (x, y, s, o = 1) => `
<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}">
  <path d="M32 4 C34 16 37 22 44 25 C51 27 55 28 60 30 C53 33 49 34 44 37 C38 40 35 46 32 58 C29 46 26 40 20 37 C15 34 11 33 4 30 C9 28 13 27 20 25 C27 22 30 16 32 4 Z" fill="#eec95f" stroke="#c98f27" stroke-width="1.4" stroke-opacity="0.5"/>
</g>`;

const cloud = (x, y, s, o = 0.9) => `
<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}">
  <ellipse cx="60" cy="80" rx="52" ry="30" fill="#ffffff"/>
  <ellipse cx="115" cy="58" rx="55" ry="38" fill="#ffffff"/>
  <ellipse cx="165" cy="82" rx="48" ry="28" fill="#ffffff"/>
</g>`;

function frame(w, h, hue, inner, label = "Photo placeholder — replace in Admin") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
    <stop offset="0%" stop-color="${hue[0]}"/>
    <stop offset="100%" stop-color="${hue[1]}"/>
  </linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
${inner}
<text x="${w / 2}" y="${h - 14}" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#33569c" opacity="0.75">${label}</text>
</svg>`;
}

const hues = [
  ["#dcebf8", "#b8d4ec"],
  ["#e8f2fb", "#c4dcf0"],
  ["#f3ead9", "#e0cba6"],
  ["#d8e8f6", "#aecbe8"],
  ["#eef5fc", "#cfe2f3"],
  ["#f6efe0", "#e6d3ae"],
  ["#d4e6f5", "#b2cfe9"],
  ["#e4f0fa", "#bfd8ee"],
  ["#f0f7fd", "#c9dff1"],
];

// 9 square baby-photo slots
hues.forEach((hue, i) => {
  const inner =
    bear(140, 130, 1.35) +
    star(40, 40, 0.8) +
    star(300, 60, 0.55, 0.8) +
    star(60, 300, 0.5, 0.7) +
    cloud(210, 270, 0.7, 0.8);
  writeFileSync(join(dir, `baby-${i + 1}.svg`), frame(400, 400, hue, inner));
});

// Hero portrait slot
writeFileSync(
  join(dir, "baby-hero.svg"),
  frame(
    520,
    420,
    ["#e8f2fb", "#bcd6ec"],
    bear(190, 140, 1.5) + star(70, 60, 0.9) + star(420, 90, 0.7) + cloud(40, 300, 0.9) + cloud(330, 280, 0.8),
    "Baby photo — replace in Admin"
  )
);

// Church
writeFileSync(
  join(dir, "church.svg"),
  frame(
    440,
    340,
    ["#eef5fc", "#cfe2f3"],
    `
<g stroke="#8fa8c4" stroke-width="3" stroke-linejoin="round">
  <rect x="150" y="130" width="140" height="140" fill="#f3ead9"/>
  <path d="M140 130 L220 70 L300 130 Z" fill="#d9b88f"/>
  <rect x="205" y="200" width="30" height="70" rx="14" fill="#8fb4d9"/>
  <rect x="90" y="170" width="60" height="100" fill="#efe3cd"/>
  <rect x="290" y="170" width="60" height="100" fill="#efe3cd"/>
  <circle cx="220" cy="150" r="17" fill="#bcd6ec"/>
  <circle cx="220" cy="52" r="10" fill="#eec95f" stroke="#c98f27" stroke-width="3"/>
</g>` + star(50, 50, 0.7) + cloud(310, 40, 0.6, 0.85),
    "Church photo — replace in Admin"
  )
);

// Reception
writeFileSync(
  join(dir, "reception.svg"),
  frame(
    440,
    340,
    ["#f6efe0", "#e6d3ae"],
    `
<g stroke="#8fa8c4" stroke-width="3" stroke-linejoin="round">
  <rect x="100" y="140" width="240" height="130" fill="#fdf9f0"/>
  <path d="M85 140 L110 95 H330 L355 140 Z" fill="#8fb4d9"/>
  <rect x="195" y="200" width="50" height="70" rx="6" fill="#c19a6f"/>
  <rect x="125" y="170" width="45" height="40" rx="4" fill="#bcd6ec"/>
  <rect x="270" y="170" width="45" height="40" rx="4" fill="#bcd6ec"/>
  <rect x="150" y="112" width="140" height="18" rx="9" fill="#f2e6cf"/>
</g>` + star(380, 60, 0.6) + cloud(30, 40, 0.6, 0.85),
    "Venue photo — replace in Admin"
  )
);

// Gifts
writeFileSync(
  join(dir, "gift-diaper.svg"),
  frame(
    360,
    300,
    ["#e4f0fa", "#bfd8ee"],
    `
<g stroke="#6a94c2" stroke-width="3" stroke-linejoin="round">
  <path d="M90 110 h180 v60 c0 40 -40 70 -90 70 c-50 0 -90 -30 -90 -70 Z" fill="#fdf9f0"/>
  <path d="M90 110 h180 v30 h-180 Z" fill="#bcd6ec"/>
</g>` + bear(120, 140, 1.0) + star(40, 40, 0.7) + star(290, 50, 0.55),
    "Product photo — replace in Admin"
  )
);
writeFileSync(
  join(dir, "gift-mustela.svg"),
  frame(
    360,
    300,
    ["#eef5fc", "#cfe2f3"],
    `
<g stroke="#6a94c2" stroke-width="3" stroke-linejoin="round">
  <rect x="110" y="80" width="60" height="160" rx="16" fill="#fdf9f0"/>
  <rect x="122" y="60" width="36" height="26" rx="6" fill="#8fb4d9"/>
  <rect x="196" y="110" width="66" height="130" rx="14" fill="#dcebf8"/>
  <rect x="212" y="92" width="34" height="24" rx="5" fill="#f2e6cf"/>
  <rect x="120" y="130" width="40" height="60" rx="5" fill="#bcd6ec"/>
  <rect x="206" y="150" width="46" height="52" rx="5" fill="#fdf9f0"/>
</g>` + star(50, 46, 0.6) + star(300, 40, 0.5),
    "Product photo — replace in Admin"
  )
);

// Dense sky-palette collage used as the photo-fill inside the big name letters.
{
  let inner = "";
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
      const x = col * 140 + (row % 2 ? 60 : 0) - 30;
      const y = row * 130 - 20;
      const pick = (row * 6 + col) % 3;
      if (pick === 0) inner += bear(x, y, 0.85);
      else if (pick === 1) inner += cloud(x, y + 30, 0.55, 0.95);
      else inner += star(x + 30, y + 20, 0.85);
    }
  }
  writeFileSync(
    join(dir, "letters.svg"),
    frame(800, 500, ["#a8c9e8", "#7fa9d6"], inner, "")
  );
}

console.log("placeholders written to", dir);
