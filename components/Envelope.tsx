"use client";

// The front door: a sealed envelope on a drifting watercolor sky.
// Click the wax seal → flap swings open in 3D, the card rises, the sky parts.

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { SiteContent } from "@/lib/content";
import { Parallax } from "./motion-kit";
import {
  TeddyBear,
  Cloud,
  GoldStar,
  HotAirBalloon,
  BalloonCluster,
} from "./decor";

const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

export default function Envelope({
  content,
  onOpened,
}: {
  content: SiteContent;
  onOpened: () => void;
}) {
  const [opening, setOpening] = useState(false);
  const reduce = useReducedMotion();

  const open = () => {
    if (opening) return;
    setOpening(true);
    // Hand control to the page once the card has risen.
    window.setTimeout(onOpened, reduce ? 250 : 1650);
  };

  return (
    <motion.div
      className="watercolor-ground paper-grain fixed inset-0 z-50 overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeOut" } }}
      aria-label="Invitation envelope"
    >
      {/* ambient sky */}
      <Parallax depth={26} className="absolute left-[4%] top-[6%] w-40 opacity-90 md:w-56">
        <Cloud className="anim-drift w-full" />
      </Parallax>
      <Parallax depth={18} className="absolute right-[6%] top-[3%] w-36 md:w-52">
        <div className="anim-bob-soft" style={{ ["--dur" as string]: "5.5s" }}>
          <Cloud className="w-full -scale-x-100" />
          <TeddyBear className="absolute -top-12 left-1/2 w-20 -translate-x-1/2 md:w-24" />
        </div>
      </Parallax>
      <Parallax depth={34} className="absolute bottom-[8%] right-[5%] w-28 md:w-40">
        <HotAirBalloon className="anim-balloon w-full" />
      </Parallax>
      <Parallax depth={22} className="absolute bottom-[16%] left-[4%] w-24 md:w-36">
        <div className="anim-bob" style={{ ["--dur" as string]: "6s", ["--tilt" as string]: "-3deg" }}>
          <BalloonCluster className="w-full" />
          <TeddyBear className="absolute -bottom-4 left-1/2 w-16 -translate-x-1/2 md:w-20" bowColor="#eec95f" />
        </div>
      </Parallax>
      {[
        ["10%", "26%", "2.2s"],
        ["20%", "12%", "3.1s"],
        ["86%", "30%", "2.7s"],
        ["78%", "14%", "3.5s"],
        ["8%", "62%", "2.9s"],
        ["90%", "58%", "2.4s"],
      ].map(([left, top, dur], i) => (
        <GoldStar
          key={i}
          className="anim-twinkle absolute w-5 md:w-7"
          style={
            {
              left,
              top,
              "--dur": dur,
              animationDelay: `${i * 0.4}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* center stage */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <motion.h1
          className="font-script text-6xl text-[var(--ink)] drop-shadow-sm md:text-8xl"
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={
            opening
              ? { opacity: 0, y: -40, transition: { duration: 0.5 } }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          {content.envelope.title}
        </motion.h1>

        {/* envelope */}
        <motion.div
          className="relative mt-10 w-[min(88vw,480px)]"
          style={{ perspective: 1400 }}
          initial={{ opacity: 0, y: 40 }}
          animate={
            opening
              ? { y: 90, opacity: 1 }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
        >
          <motion.div
            className="relative aspect-[3/2]"
            animate={
              opening
                ? {}
                : reduce
                  ? {}
                  : { y: [0, -8, 0] }
            }
            transition={
              opening
                ? {}
                : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            {/* back */}
            <div className="absolute inset-0 rounded-xl bg-[#f4f1ea] shadow-[0_24px_60px_rgba(51,86,156,0.28)]" />

            {/* rising card */}
            <motion.div
              className="absolute inset-x-[7%] bottom-[6%] top-[10%] z-10 overflow-hidden rounded-lg bg-white shadow-[0_6px_18px_rgba(51,86,156,0.18)]"
              animate={
                opening
                  ? {
                      y: "-125%",
                      scale: 1.12,
                      zIndex: 40,
                      transition: {
                        y: { delay: 0.62, duration: 0.85, ease: EASE_DRAWER },
                        scale: { delay: 0.62, duration: 0.85, ease: EASE_DRAWER },
                        zIndex: { delay: 0.6 },
                      },
                    }
                  : {}
              }
            >
              {/* mini preview of the invitation */}
              <div className="flex h-full flex-col items-center justify-center gap-1 border-[6px] border-[#e7eef7] px-4 text-center">
                <span className="font-serif-caps text-[9px] text-[var(--ink)] md:text-[11px]">
                  Join us as we celebrate the
                </span>
                <span className="font-script text-3xl leading-tight text-[var(--ink)] md:text-4xl">
                  {content.hero.eventType}
                </span>
                <span className="font-serif-caps text-[8px] text-[var(--tan-deep)] md:text-[10px]">
                  of our child
                </span>
                <span className="font-script text-2xl text-[var(--ink)] md:text-3xl">
                  {content.hero.childName}
                </span>
              </div>
            </motion.div>

            {/* pocket */}
            <div
              className="absolute inset-0 z-20 rounded-b-xl bg-gradient-to-b from-[#fdfcf9] to-[#eef0ee]"
              style={{
                clipPath:
                  "polygon(0% 0%, 50% 52%, 100% 0%, 100% 100%, 0% 100%)",
                boxShadow: "inset 0 -4px 14px rgba(51,86,156,0.08)",
              }}
            />
            <div
              className="absolute inset-0 z-20 opacity-60"
              style={{
                clipPath:
                  "polygon(0% 0%, 50% 52%, 100% 0%, 100% 2.5%, 50% 55%, 0% 2.5%)",
                background: "rgba(163,190,220,0.65)",
              }}
            />

            {/* flap */}
            <motion.div
              className="absolute inset-x-0 top-0 z-30 h-[55%] origin-top"
              style={{ transformStyle: "preserve-3d" }}
              animate={
                opening
                  ? {
                      rotateX: reduce ? 0 : -180,
                      zIndex: 5,
                      transition: {
                        rotateX: { duration: 0.75, ease: EASE_DRAWER, delay: 0.18 },
                        zIndex: { delay: 0.52 },
                      },
                    }
                  : {}
              }
            >
              <div
                className="absolute inset-0 rounded-t-xl bg-gradient-to-b from-white to-[#eef2f7]"
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 50% 96%)",
                  boxShadow: "0 3px 8px rgba(51,86,156,0.10)",
                  backfaceVisibility: "hidden",
                }}
              />
              <div
                className="gingham-blue absolute inset-0 rounded-t-xl"
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 50% 96%)",
                  transform: "rotateX(180deg)",
                  backfaceVisibility: "hidden",
                }}
              />
            </motion.div>

            {/* wax seal */}
            <motion.button
              type="button"
              onClick={open}
              aria-label="Break the seal and open the invitation"
              className="pressable absolute left-1/2 top-[46%] z-40 w-[92px] -translate-x-1/2 cursor-pointer rounded-full md:w-[104px]"
              style={{ animation: opening ? "none" : "seal-pulse 2.6s ease-out infinite" }}
              whileHover={reduce ? {} : { scale: 1.07 }}
              animate={
                opening
                  ? {
                      scale: [1, 1.14, 0.2],
                      opacity: [1, 1, 0],
                      rotate: [0, -6, 20],
                      transition: { duration: 0.45, times: [0, 0.4, 1] },
                    }
                  : {}
              }
            >
              <svg viewBox="0 0 120 120" className="w-full drop-shadow-md">
                <defs>
                  <radialGradient id="waxG" cx="38%" cy="32%" r="80%">
                    <stop offset="0%" stopColor="#8db0da" />
                    <stop offset="70%" stopColor="#5b84b8" />
                    <stop offset="100%" stopColor="#46689a" />
                  </radialGradient>
                </defs>
                <path
                  d="M60 8 C74 6 82 14 92 16 C102 18 112 26 110 40 C109 50 114 58 112 68 C110 80 102 88 94 92 C84 97 78 108 64 110 C50 112 44 102 34 98 C22 94 10 88 10 72 C10 62 6 54 8 44 C10 30 20 22 32 18 C42 14 48 10 60 8 Z"
                  fill="url(#waxG)"
                />
                <circle
                  cx="60"
                  cy="59"
                  r="38"
                  fill="none"
                  stroke="#3d5c8c"
                  strokeWidth="2.4"
                  strokeDasharray="4 5"
                  opacity="0.75"
                />
                <text
                  x="60"
                  y="74"
                  textAnchor="middle"
                  fontSize="42"
                  fill="#2e4a75"
                  fontFamily="var(--font-great-vibes), cursive"
                >
                  {content.envelope.sealInitial}
                </text>
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-12 font-hand text-xl text-[var(--ink)] md:text-2xl"
          initial={{ opacity: 0 }}
          animate={opening ? { opacity: 0 } : { opacity: 1 }}
          transition={{ delay: opening ? 0 : 0.7, duration: 0.6 }}
        >
          {content.envelope.hint}
        </motion.p>
      </div>
    </motion.div>
  );
}
