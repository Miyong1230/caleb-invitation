---
name: Levi's Baptism Invitation
description: A sealed envelope that opens into a living watercolor nursery-sky keepsake.
colors:
  sky-wash: "#e3eff9"
  sky-light: "#f2f8fd"
  sky-mid: "#bcd6ec"
  sky-deep: "#8fb4d9"
  ink: "#33569c"
  ink-deep: "#2a4780"
  navy-panel: "#31507e"
  cream: "#fdf9f0"
  tan: "#c19a6f"
  tan-deep: "#9a7048"
  fur: "#d3a878"
  fur-light: "#ecd4b4"
  gold: "#eec95f"
typography:
  display:
    fontFamily: "Great Vibes, cursive"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(3.75rem, 7vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Patrick Hand, 'Comic Sans MS', cursive"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.375
  label:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.18em"
rounded:
  soft: "12px"
  input: "16px"
  card-inner: "26px"
  card-mat: "34px"
  pill: "9999px"
spacing:
  xs: "0.375rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  section-y: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
    typography: "{typography.body}"
  button-map-chip:
    backgroundColor: "#eaf3fb"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
    typography: "{typography.label}"
  button-map-chip-hover:
    backgroundColor: "#d8e8f7"
  input-field:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink-deep}"
    rounded: "{rounded.input}"
    padding: "12px 16px"
    typography: "{typography.body}"
  card-polaroid:
    backgroundColor: "#ffffff"
    padding: "8px 8px 12px"
---

# Design System: Levi's Baptism Invitation

## Overview

**Creative North Star: "The Kept Keepsake"**

A sealed envelope that opens into a living watercolor nursery-sky. The guest breaks a blue wax seal, a 3D flap swings back, the card rises out of the pocket, and the page beneath is a drifting powder-blue sky populated by hand-drawn teddy bears, clouds, hot-air balloons, and gold stars — every one of them an inline SVG that floats, twinkles, or leans toward the cursor. The invitation refuses the static card-image-in-a-page default: it is a physical object (envelope, polaroids with tape, torn navy paper, gingham mats, stitched borders) rendered in pigment and paper grain, built to be opened on a phone in bright daylight. Light theme only; the scene forces it.

The world is recognizable with all content removed: powder-blue turbulence-displaced watercolor washes on every ground, cream and tan gingham checks, arched panels shaped like nursery windows, script + hand-print + small-caps typography, and a decor family drawn in one grammar (soft radial-gradient fills, rounded tan strokes at ~50% opacity, no hard lines).

**Key Characteristics:**
- Single powder-blue hue family for surfaces and ink; warmth arrives only through tan/cream/gold accents.
- Every decorative element is alive: a CSS ambient loop plus spring pointer-parallax, all reduced-motion-guarded.
- Paper physicality everywhere: grain overlays, watercolor wash overlays, tape, torn edges, dashed stitching.
- Content lives inside keepsake shapes — arches, inverted arches, matted cards — never plain rectangles.
- Two registers: the invitation (this world) and `/admin`, a deliberately plain Operate surface.

## Colors

One sky, three warmths: a blue monochrome ground (wash → deep) with navy ink, warmed by cream paper, tan wood/kraft, teddy fur, and gold stars.

### Primary
- **Storybook Ink** (`--ink`, #33569c): the voice of the page — nearly all text, the primary RSVP button fill, focus outlines, and the base of every shadow tint. By far the most-used token (~50 references).
- **Deep Ink** (`--ink-deep`, #2a4780): default body text color set on `<body>`; slightly darker for long-form reading.

### Secondary
- **Kraft Tan** (`--tan`, #c19a6f): borders of the hero date block, dashed reminder-card frames, balloon baskets and bunting strings in the SVG family.
- **Toasted Tan** (`--tan-deep`, #9a7048): small-caps sub-labels (addresses, month names, countdown unit labels) and the stroke color of every drawn asset.
- **Nursery Cream** (`--cream`, #fdf9f0): warm paper fill inside the tan-gingham reminders card; also the base of `.gingham-tan`.

### Tertiary
- **Teddy Fur** (`--fur`, #d3a878) and **Belly Fur** (`--fur-light`, #ecd4b4): the bear family's radial-gradient fills inside `decor.tsx` (used as literal hex in the SVGs, declared as tokens).
- **Star Gold** (`--gold`, #eec95f): bunting pennants, alternate bear bows; the star SVG deepens it to a #f7dd8f → #dfa93a gradient with a #c98f27 stroke.

### Neutral
- **Sky Wash** (`--sky-wash`, #e3eff9): the page ground and browser theme-color; base of `.watercolor-ground`.
- **Sky Light** (`--sky-light`, #f2f8fd): top of the sky gradient.
- **Sky Mid** (`--sky-mid`, #bcd6ec): input borders, wash gradients.
- **Sky Deep** (`--sky-deep`, #8fb4d9): map-chip borders, thank-you card dashed border, swirl/divider accents, rainbow's outer band, balloon fills.
- **Navy Panel** (`--navy-panel`, #31507e): the one dark surface — the torn-paper dress-code panel, where text flips to #f2f6fc / #dfe9f5.
- Pure white (#ffffff) is reserved for paper: polaroid frames, input fills, the envelope card.

Three declared tokens (`--cream-deep`, `--gold-deep`, `--paper`) are currently unreferenced by any component; treat them as reserved, not canonical.

### Named Rules
**The One Sky Rule.** Every cool color on the page belongs to the single powder-blue family (#e3eff9 → #2a4780). No second cool hue — no teal, no violet, no gray — ever enters the sky.

**The Warm-Accent Rule.** Tan, cream, fur, and gold exist to make the blue feel like a nursery, not a corporation. They appear on objects (wood, paper, fur, stars, gingham), never as text-block backgrounds except the cream reminder card.

## Typography

**Display Font:** Great Vibes 400 (fallback cursive) — `.font-script`
**Headline/Serif Font:** EB Garamond (fallback Georgia, serif) — `.font-serif`, `.font-serif-caps`
**Body Font:** Patrick Hand 400 (fallback "Comic Sans MS", cursive) — `.font-hand`, set on `<body>`

All three load via `next/font/google` with `display: swap`, exposed as `--font-great-vibes`, `--font-garamond`, `--font-patrick-hand`.

**Character:** A wedding-calligraphy script announces, a child's felt-tip print speaks, and engraved small caps whisper the formalities. The pairing is what makes the invitation read as both ceremonial and babyish at once.

### Hierarchy
- **Display / Script** (Great Vibes 400, `text-5xl`–`text-8xl` ≈ 3rem–6rem, leading-none to 0.95): section headings ("You're invited!", "Dress code", "Save the date"), the child's name (largest on page, with a white offset text-shadow `0 2px 0 #fff, 0 4px 14px rgba(51,86,156,0.25)`), venue titles, "Thank you!".
- **Headline / Serif** (EB Garamond 400–500, `text-4xl`–`text-7xl`): the Details heading, date numerals, countdown digits (`tabular-nums`), and the giant photo-filled name letters (background-clip: text over a photo).
- **Body / Hand** (Patrick Hand 400, `text-lg`–`text-2xl` ≈ 1.125–1.5rem, leading-snug): all prose, hints, form inputs, buttons, reminders. Prose blocks are capped at 24–44ch.
- **Label / Small Caps** (`.font-serif-caps`: EB Garamond, `letter-spacing: 0.18em`, `text-transform: uppercase`, `text-[9px]`–`text-sm`): addresses, curved arch inscriptions (SVG `<textPath>`), form field labels, countdown unit names, the map chip.

### Named Rules
**The Three Voices Rule.** Script announces, print speaks, small caps label. Roles never swap: no script body copy, no hand-lettered headings, no small-caps sentences.

**The Big-Script Rule.** Great Vibes only works large. It never appears below ~1.875rem (`text-3xl`); at label sizes the small caps take over.

## Layout

A single centered column of keepsake panels on one continuous watercolor sky. Content panels are narrow — `max-w-[460px]` (hero card) to `max-w-[560px]` (dress code, reminders, RSVP) — centered with `mx-auto`, sections padded `px-4 py-16`/`py-20` (RSVP closes with `pb-24`). The envelope gate is a `fixed inset-0 z-50` full-viewport scene; the hero fills `min-h-svh`.

Decor is composed *around* the panels: absolutely positioned floaters pinned by percentage offsets (e.g. `left-[4%] top-[6%]`), stacked in small scenes (cloud + bear, balloon cluster + bear + cloud), with gold stars scattered by coordinate arrays. Panels themselves keep `overflow-hidden` and carry their wash/grain overlays; sections that host edge floaters use `overflow-hidden` on the section instead.

Phone-first with a single breakpoint: `md:` (768px) enlarges type one step, widens decor, and reveals the outermost floaters (`hidden md:block`). There is no desktop grid — the invitation is the same column, breathing wider.

**The Decor-Orbits Rule.** Content lives inside the panel; drawn characters live on its rim (overlapping corners, crowning the arch, peeking from behind). Decor never sits between paragraphs.

## Elevation & Depth

Depth is soft, colored, and physical — never black. Every shadow is a navy tint of the ink (`rgba(51,86,156,…)` or its darker siblings), so cards look lit through blue sky rather than floating over gray. Large panels get big diffuse plumes; small paper objects get tight lifts; the envelope pocket uses an inset shade. On the navy panel, shadow warms to `rgba(42,71,128,0.35)`. Additional depth comes from materials, not shadow: `.paper-grain` (fractal-noise multiply overlay at 0.5), `.watercolor-wash` (turbulence-displaced blooms, `mix-blend-mode: multiply`, opacity 0.55), and drop-shadows on free-floating SVGs.

### Shadow Vocabulary
- **Panel plume** (`0 30px 70px rgba(51,86,156,0.25)` / `0 26px 60px rgba(51,86,156,0.2)` / `0 24px 54px rgba(51,86,156,0.22)`): arch cards, gingham mats, the navy panel.
- **Paper lift** (`0 8px 20px rgba(51,86,156,0.16)` family, `0 10px 22–24px` at 0.15–0.16): polaroids and venue photos at rest.
- **Hover lift** (`0 14px 28px rgba(51,86,156,0.22)`): polaroid hover, paired with `scale(1.06)`.
- **Button glow** (`0 10px 24px rgba(51,86,156,0.35)`): the primary RSVP button.
- **Chip shadow** (`0 3px 8px rgba(51,86,156,0.14)`): map chips and other small pills.
- **Inset pocket** (`inset 0 -4px 14px rgba(51,86,156,0.08)`): the envelope pocket's interior shade.

### Named Rules
**The Tinted Shadow Rule.** No shadow is ever neutral black; every `box-shadow` and `drop-shadow` carries the ink's navy (51,86,156) or the panel's own hue (tan cards shade with `rgba(154,112,72,…)`).

## Shapes

The form language is the nursery arch and the kept paper object. Hero and details panels are arches via asymmetric `border-radius` (hero: `230px 230px 26px 26px`; details: `250px 250px 250px 250px / 300px 300px 90px 90px`); the RSVP panel inverts it (`40px 40px 300px 300px / 40px 40px 340px 340px`) to close the story. Paper objects are cut, not rounded: the dress-code panel's `.torn-edge-top` clip-path rips both edges; the envelope flap and pocket are `clip-path` triangles; the baby photo is masked into an organic blob (`border-radius: 58% 42% 46% 24% / 55% 38% 52% 22%` plus a radial-gradient mask fade).

Rounded corners follow a soft scale: inputs `rounded-2xl` (16px), gingham mats `rounded-[30px]`/`rounded-[34px]` with inner cards 22–26px, pills and the wax seal `rounded-full`. Borders are materials in themselves: 10px solid `#a3bedc` frame on the RSVP arch, 2px dashed tan on the reminders card, dashed `#8fb4d9`/50 "stitching" inset on the navy panel, `border-y-2`/`border-x-2` tan rules building the hero date block. Gingham (`.gingham-blue`, `.gingham-tan`) is a 14px/28px repeating-linear-gradient check used as a mat around cream/white inner cards.

**The Arch Rule.** Major content panels are arches, inverted arches, or torn/matted paper — never a plain rounded rectangle. Plain rectangles are allowed only inside a mat (polaroids, gift photos).

## Components

### Buttons
- **Primary ("Send my RSVP"):** pill (`rounded-full`), Storybook Ink fill, white Patrick Hand text at `text-2xl`, `px-8 py-3.5`, button glow shadow. Hover scales to 1.03 (Framer, skipped under reduced motion); press uses `.pressable` (`scale(0.96)` over 160ms `--ease-out-strong`); disabled drops to 60% opacity.
- **Map chip:** small pill, `#eaf3fb` fill, `border border-[var(--sky-deep)]`, small-caps label with an inline pin SVG; hover fill `#d8e8f7`, active `scale(0.95)` (`.view-map-btn`, hover gated behind `(hover: hover) and (pointer: fine)`).
- **Stepper buttons (guests):** 44px circles, white fill, 2px Sky Mid border, hand-font glyphs.
- **Character buttons:** interactive decor — the teddy "door" to details (hover scale 1.08 + rotate, periodic wiggle `rotate: [0, -5, 4, -2, 0]` every ~5s) and the wax seal (below). All buttons carry `.pressable` and an `aria-label` when non-textual.

### Inputs / Fields
- **Style:** white fill, 2px Sky Mid border, `rounded-2xl` (16px), `px-4 py-3`, Patrick Hand `text-xl` in Deep Ink; placeholders `#4d699b`.
- **Focus:** border shifts to Storybook Ink (`transition-colors 200ms`); global `:focus-visible` adds a 3px solid ink outline offset 3px.
- **Error:** message strip `bg-[#fbeaea]` with `#a03434` hand text, fading in from above.
- **Attendance toggle:** two-cell segmented control in an input-styled shell; an ink pill slides between cells with a spring (`duration 0.45, bounce 0.25`); selected text turns white.

### Cards / Containers
- **Arch panels:** see Shapes; each carries `border border-white/70-80`, a top-down sky gradient fill (e.g. `#e7f1fa → #dcebf7 → #cfe3f4`), `.paper-grain`, and often a `.watercolor-wash` overlay; internal padding `px-6 md:px-10`.
- **Gingham mats:** outer `.gingham-blue`/`.gingham-tan` rounded 30–34px with `p-4`, inner cream/white card rounded 22–26px — a mounted-on-fabric construction.
- **Polaroid:** white frame `p-2 pb-3` (thicker bottom lip), a `Tape` SVG strip across the top, a standing rotation of ±2–8°, paper-lift shadow. Hover (`.polaroid-hover`, fine pointers only): straightens to 0°, scales 1.06, hover-lift shadow, jumps to `z-30`. Collages reuse it smaller with `rotate`/`translateY` offsets from a fixed layout array.
- **Navy dress-code panel:** `--navy-panel` fill, torn top/bottom edges, dashed stitch inset, twinkling gold stars, light-blue text, and a white brushstroke swatch bar holding the palette dots (hover scale 1.2 + rotate 8).

### Navigation
There is no nav chrome. The flow is the story: seal → envelope opens → scroll; the teddy-door button and `scrollToDetails` (`scroll-behavior: smooth`, auto under reduced motion) are the only wayfinding, plus a hand-written hint with an `ArrowDoodle`.

### The Envelope (signature)
Full-viewport `watercolor-ground` scene with parallax sky. The envelope (`w-[min(88vw,480px)]`, `aspect-[3/2]`, `perspective: 1400`) idles with a slow bob (y 0 → −8, 4s) while the wax seal — an irregular blue blob SVG (radial gradient #8db0da → #46689a) bearing the child's initial in Great Vibes — pulses a soft ring (`seal-pulse`, 2.6s). On click: seal pops and spins away (scale [1, 1.14, 0.2] over 0.45s), flap rotates `rotateX: -180` in 3D over 0.75s revealing a gingham-blue underside (`backface-visibility` pair), the mini preview card rises `y: -125%, scale: 1.12` over 0.85s — all on `--ease-drawer` `cubic-bezier(0.32, 0.72, 0, 1)` — and the scene fades out, handing off at 1650ms (250ms under reduced motion, where the flap doesn't rotate).

### The Drawn Family (signature)
All decor is inline SVG from `components/decor.tsx`, sharing one grammar: soft radial/linear gradient fills, rounded `#9a7048` strokes at 45–70% opacity, no hard outlines. Characters: `TeddyBear` (parameterized `bowColor`), `BearFace`, `Cloud`, `GoldStar`, `HotAirBalloon`, `BalloonCluster`, `Rainbow`, `Bunting`, `Tape`, `Swirl`, `ArrowDoodle`, `Divider`, plus a stroke-family icon set (reminders + calendar/pin/gift icons, navy on cream). All are `aria-hidden`; monochrome doodles use `currentColor` so text color drives them.

### Motion Kit (system-wide)
- **Ambient loops (CSS, utility classes):** `.anim-bob` (y −12 + tilt, 5s), `.anim-bob-soft` (y −6, 4s), `.anim-drift` (x 26px, 9s), `.anim-twinkle` (opacity/scale/rotate, 2.6s), `.anim-balloon` (y −18 + rotate, 6s), `.anim-sway` (±3°, 4s); per-instance `--dur`, `--tilt`, `animationDelay` desynchronize the sky. All disabled under `prefers-reduced-motion`.
- **Pointer parallax (`Parallax`, framer-motion):** one shared mousemove listener (fine pointers only) feeds normalized −1…1 values; each floater translates by `depth` (8–34px, ×0.7 vertically) through a spring (`stiffness 60, damping 18, mass 0.6`).
- **Scroll reveals (`Reveal`/`RevealGroup`/`RevealItem`):** enter with `opacity 0, y 22–28, blur(4px)` → sharp, `duration 0.6–0.7`, ease `[0.23, 1, 0.32, 1]` (= `--ease-out-strong`), viewport margin −60/−70px, staggers 0.07–0.12; opacity-only under reduced motion.
- **Countdown digits:** per-digit `AnimatePresence popLayout` roll — old digit slides down/out, new slides in from above, 0.35s on the same ease; static between ticks.

### Admin Register (`/admin`)
A separate, deliberately plain Operate surface: clarity first, the watercolor world only in its hues. System-adjacent styling with literal values — white inputs `rounded-lg` bordered `#c3d6ea`, 13px semibold `#33569c` labels, focus ring `#33569c/20`, hint text `#7a90ad`, field groups on `#f7fafd` panels. No decor, no script type, no ambient motion. Do not port invitation materials into admin, and do not port admin's plain register back into the invitation.

## Do's and Don'ts

### Do:
- **Do** draw every new decorative element as inline SVG in the decor grammar: gradient fills from the fur/sky/gold families, rounded `#9a7048` strokes at ~50% opacity, `aria-hidden="true"`.
- **Do** give every decorative element an ambient loop (`anim-*` with a bespoke `--dur`) and, if free-floating, a `Parallax` wrapper with depth 8–34.
- **Do** guard every animation: CSS loops via the `prefers-reduced-motion` block, JS motion via `useReducedMotion()` with an opacity-only or instant fallback.
- **Do** tint every shadow with the ink (`rgba(51,86,156,…)`) or the local panel hue; keep panels on the plume/lift/glow vocabulary.
- **Do** enter content with the Reveal primitives (y + blur + `[0.23, 1, 0.32, 1]`), staggered 0.07–0.12 in groups.
- **Do** keep new panels inside keepsake shapes — arch radii, gingham mats, torn edges — with `.paper-grain` and usually a `.watercolor-wash`.

### Don't:
- **Don't** introduce icon fonts, emoji decor, stock clipart, or raster illustration; the drawn SVG family is the only image language besides real photos (which live in polaroid frames).
- **Don't** use black or neutral-gray shadows, borders, or text; the coolest neutral is the sky family, the darkest voice is Deep Ink.
- **Don't** set Great Vibes below `text-3xl`, use it for body copy, or letter-space it; small caps (0.18em) are the only tracked text.
- **Don't** add a second cool hue or a dark mode; the scene is a daylight sky, light theme forced.
- **Don't** animate anything without a purpose loop or interaction meaning — no motion on body text, and nothing that escapes the reduced-motion guards.
- **Don't** bring envelope/watercolor theatrics into `/admin`, or admin's utilitarian inputs into the invitation.
