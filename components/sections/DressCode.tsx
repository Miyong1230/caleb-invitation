"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SiteContent } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem, Parallax } from "../motion-kit";
import { TeddyBear, GoldStar } from "../decor";

function BabyBlocks({ className = "" }: { className?: string }) {
  const blocks = [
    { letter: "B", x: 0, y: 18, tilt: -6 },
    { letter: "A", x: 38, y: 24, tilt: 4 },
    { letter: "B", x: 76, y: 16, tilt: -3 },
    { letter: "Y", x: 114, y: 25, tilt: 7 },
  ];
  return (
    <svg viewBox="0 0 162 78" className={className} aria-hidden="true">
      {blocks.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.tilt} 20 20)`}>
          <rect width="40" height="40" rx="7" fill="#f2e6cf" stroke="#c19a6f" strokeWidth="2.4" />
          <rect x="5" y="5" width="30" height="30" rx="4" fill="#fdf9f0" stroke="#8fb4d9" strokeWidth="2" />
          <text
            x="20"
            y="29"
            textAnchor="middle"
            fontSize="22"
            fontWeight="bold"
            fill="#33569c"
            fontFamily="var(--font-garamond), serif"
          >
            {b.letter}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function DressCode({ content }: { content: SiteContent }) {
  const reduce = useReducedMotion();
  const dc = content.dressCode;
  return (
    <section className="relative px-4 py-16" aria-label="Dress code">
      <div className="torn-edge-top relative mx-auto max-w-[560px] bg-[var(--navy-panel)] px-8 py-16 shadow-[0_26px_60px_rgba(42,71,128,0.35)] md:px-12">
        {/* scattered stars on navy */}
        {[
          ["8%", "10%", 0.9], ["16%", "78%", 0.7], ["85%", "12%", 1], ["90%", "70%", 0.6],
          ["6%", "45%", 0.5], ["92%", "42%", 0.8], ["24%", "16%", 0.5], ["76%", "84%", 0.9],
        ].map(([left, top, scale], i) => (
          <GoldStar
            key={i}
            className="anim-twinkle absolute w-5"
            style={
              {
                left,
                top,
                transform: `scale(${scale})`,
                "--dur": `${2 + (i % 4) * 0.5}s`,
                animationDelay: `${i * 0.35}s`,
              } as React.CSSProperties
            }
          />
        ))}

        <Reveal>
          <h2 className="text-center font-script text-6xl text-[#f2f6fc] drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
            {dc.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-[40ch] text-center font-hand text-2xl leading-snug text-[#dfe9f5]">
            {dc.body}
          </p>
        </Reveal>

        <div className="mt-8 flex items-end justify-center gap-4">
          {/* brush stroke with swatches */}
          <div className="relative flex-1 max-w-[340px]">
            <svg viewBox="0 0 340 100" className="w-full" aria-hidden="true">
              <path
                d="M8 50 C30 18 90 10 170 14 C250 18 316 16 332 44 C322 76 250 88 170 84 C90 80 26 84 8 50 Z"
                fill="#fdfdfb"
                opacity="0.97"
              />
              <path
                d="M20 52 C50 30 110 24 170 26 C240 28 300 28 320 46"
                fill="none"
                stroke="#e8eef4"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <RevealGroup
              className="absolute inset-0 flex items-center justify-center gap-4 md:gap-5"
              stagger={0.1}
            >
              {dc.colors.map((c, i) => (
                <RevealItem key={i}>
                  <motion.span
                    className="block h-10 w-10 cursor-pointer rounded-full shadow-[0_4px_10px_rgba(42,71,128,0.3)] md:h-11 md:w-11"
                    style={{ backgroundColor: c }}
                    whileHover={reduce ? {} : { scale: 1.2, rotate: 8 }}
                    whileTap={{ scale: 0.9 }}
                    title={dc.colorNames[i] ?? c}
                  />
                </RevealItem>
              ))}
            </RevealGroup>
            {/* shade names under the palette — pitch matches the swatch row */}
            <div className="mt-2 flex justify-center">
              {dc.colors.map((c, i) => (
                <span
                  key={i}
                  className="w-14 whitespace-nowrap text-center font-serif-caps text-[9px] leading-tight text-[#dfe9f5] md:w-16"
                >
                  {dc.colorNames[i] ?? ""}
                </span>
              ))}
            </div>
          </div>

          {/* teddy with blocks */}
          <Parallax depth={8} className="hidden w-32 shrink-0 md:block">
            <div className="anim-bob-soft" style={{ ["--dur" as string]: "4.6s" }}>
              <TeddyBear className="w-24" />
              <BabyBlocks className="absolute -right-6 bottom-0 w-28" />
            </div>
          </Parallax>
        </div>

        {/* stitch border */}
        <div className="pointer-events-none absolute inset-4 rounded-sm border-2 border-dashed border-[#8fb4d9]/50" />
      </div>
    </section>
  );
}
