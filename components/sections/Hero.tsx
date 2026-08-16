"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SiteContent } from "@/lib/content";
import { Parallax, Reveal } from "../motion-kit";
import {
  TeddyBear,
  GoldStar,
  BalloonCluster,
  Rainbow,
  Cloud,
  ArrowDoodle,
  Tape,
} from "../decor";

function Polaroid({
  src,
  rotate,
  className = "",
  alt,
}: {
  src: string;
  rotate: number;
  className?: string;
  alt: string;
}) {
  return (
    <div
      className={`polaroid-hover relative bg-white p-2 pb-3 shadow-[0_8px_20px_rgba(51,86,156,0.16)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <Tape className="absolute -top-3 left-1/2 w-14 -translate-x-1/2" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="aspect-[4/5] w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

export default function Hero({
  content,
  entered,
}: {
  content: SiteContent;
  entered: boolean;
}) {
  const reduce = useReducedMotion();
  const h = content.hero;

  const scrollToDetails = () => {
    document
      .getElementById("details")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-16"
      aria-label="Invitation"
    >
      {/* sky decor around the card */}
      <Parallax depth={30} className="absolute left-[3%] top-[8%] hidden w-44 md:block">
        <Cloud className="anim-drift w-full opacity-90" />
      </Parallax>
      <Parallax depth={20} className="absolute right-[2%] bottom-[12%] hidden w-40 md:block">
        <Cloud className="anim-drift w-full opacity-80 -scale-x-100" />
      </Parallax>

      <motion.div
        className="relative w-full max-w-[460px]"
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={entered ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
      >
        {/* stars crown */}
        {[
          ["6%", "-7%", "2.4s"],
          ["18%", "-11%", "3s"],
          ["30%", "-5%", "2.1s"],
          ["66%", "-10%", "2.8s"],
        ].map(([left, top, dur], i) => (
          <GoldStar
            key={i}
            className="anim-twinkle absolute z-20 w-5"
            style={
              { left, top, "--dur": dur, animationDelay: `${i * 0.5}s` } as React.CSSProperties
            }
          />
        ))}
        {/* rainbow bear top-right */}
        <Parallax depth={18} className="absolute -right-10 -top-10 z-20 w-28 md:-right-16 md:w-36">
          <div className="anim-bob" style={{ ["--dur" as string]: "5.6s", ["--tilt" as string]: "3deg" }}>
            <Rainbow className="w-full" />
            <TeddyBear className="absolute -top-10 right-3 w-16 md:w-20" />
            <Cloud className="absolute -bottom-4 -left-3 w-16 opacity-95" />
          </div>
        </Parallax>

        {/* arch card */}
        <div
          className="paper-grain relative overflow-hidden border border-white/70 bg-gradient-to-b from-[#e7f1fa] via-[#dcebf7] to-[#cfe3f4] px-6 pb-52 pt-24 shadow-[0_30px_70px_rgba(51,86,156,0.25)] md:px-10"
          style={{ borderRadius: "230px 230px 26px 26px" }}
        >
          <div className="watercolor-wash" aria-hidden="true" />
          {/* curved top line */}
          <svg viewBox="0 0 400 110" className="mx-auto w-full max-w-[360px]">
            <path id="curveTop" d="M28 104 Q200 -18 372 104" fill="none" />
            <text className="font-serif-caps" fontSize="19" fill="var(--ink)" letterSpacing="3.5">
              <textPath href="#curveTop" startOffset="50%" textAnchor="middle">
                {h.topLine.toUpperCase()}
              </textPath>
            </text>
          </svg>

          <Reveal delay={0.05}>
            <h1 className="text-center font-script text-6xl leading-none text-[var(--ink)] md:text-7xl">
              {h.eventType}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-center font-serif-caps text-sm text-[var(--ink)]">
              {h.ofLine}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            {/* sticker treatment: a stroked copy sits behind the filled name */}
            <p className="relative mt-2 px-2 text-center font-script text-7xl leading-[1.05] text-[var(--ink)] md:text-8xl">
              <span
                aria-hidden="true"
                className="absolute inset-0 select-none px-2"
                style={{
                  WebkitTextStroke: "0.14em #fff",
                  filter: "drop-shadow(0 6px 16px rgba(51,86,156,0.35))",
                }}
              >
                {h.childName}
              </span>
              <span className="relative">{h.childName}</span>
            </p>
          </Reveal>

          {/* date block */}
          <Reveal delay={0.24}>
            <div className="mx-auto mt-8 flex max-w-[340px] items-stretch justify-center text-[var(--ink)]">
              <div className="flex items-center border-y-2 border-[var(--tan)] px-4 py-2 font-serif-caps text-sm md:text-base">
                {h.dayName}
              </div>
              <div className="flex flex-col items-center justify-center border-x-2 border-[var(--tan)] px-5">
                <span className="font-serif text-4xl font-medium leading-none md:text-5xl">
                  {h.dayNumber}
                </span>
                <span className="font-serif-caps text-xs text-[var(--tan-deep)] md:text-sm">
                  {h.monthName}
                </span>
              </div>
              <div className="flex items-center border-y-2 border-[var(--tan)] px-4 py-2 font-serif-caps text-sm md:text-base">
                {h.time}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-5 text-center font-serif text-lg text-[var(--ink)] md:text-xl">
              {h.venueName}
            </p>
            <p className="text-center font-serif-caps text-xs text-[var(--tan-deep)]">
              {h.venueAddress}
            </p>
          </Reveal>

          {/* polaroid strip */}
          <div className="pointer-events-auto absolute bottom-16 right-2 z-10 flex md:right-4">
            {h.polaroids.slice(0, 3).map((src, i) => (
              <Reveal key={i} delay={0.35 + i * 0.1} className="-ml-4 first:ml-0">
                <Polaroid
                  src={src}
                  alt={`Baby photo ${i + 1}`}
                  rotate={[-8, 4, -3][i]}
                  className="w-20 md:w-24"
                />
              </Reveal>
            ))}
          </div>

          {/* baby photo bottom-left */}
          <Reveal delay={0.4} className="absolute -bottom-2 left-0 w-44 md:w-52">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={h.babyPhoto}
              alt={`${h.childName}, the celebrant`}
              className="aspect-square w-full object-cover"
              style={{
                borderRadius: "58% 42% 46% 24% / 55% 38% 52% 22%",
                maskImage:
                  "radial-gradient(120% 115% at 40% 40%, #000 62%, transparent 78%)",
                WebkitMaskImage:
                  "radial-gradient(120% 115% at 40% 40%, #000 62%, transparent 78%)",
              }}
              loading="lazy"
            />
          </Reveal>
        </div>

        {/* balloon bear left of card */}
        <Parallax depth={24} className="absolute -left-8 top-[42%] z-20 w-24 md:-left-16 md:w-32">
          <div className="anim-balloon" style={{ ["--dur" as string]: "7s" }}>
            <BalloonCluster className="w-full" />
            <TeddyBear className="absolute -bottom-6 left-1/2 w-14 -translate-x-1/2 md:w-16" />
            <Cloud className="absolute -bottom-10 left-1/2 w-20 -translate-x-1/2 opacity-95" />
          </div>
        </Parallax>

        {/* bear door to details */}
        <div className="absolute -bottom-10 -right-2 z-30 flex items-end gap-1 md:-right-10">
          <div className="mb-4 flex flex-col items-center">
            <p className="max-w-[110px] text-center font-hand text-sm leading-tight text-[var(--ink)]">
              {h.hint}
            </p>
            <ArrowDoodle className="mt-1 w-12 text-[var(--ink)] [transform:scaleY(-1)_rotate(-16deg)]" />
          </div>
          <motion.button
            type="button"
            onClick={scrollToDetails}
            aria-label="Scroll to the event details"
            className="pressable w-28 cursor-pointer md:w-36"
            whileHover={reduce ? {} : { scale: 1.08, rotate: 3 }}
            animate={reduce ? {} : { rotate: [0, -5, 4, -2, 0] }}
            transition={{
              rotate: { duration: 1, repeat: Infinity, repeatDelay: 4.2, ease: "easeInOut" },
            }}
          >
            <TeddyBear className="w-full drop-shadow-[0_14px_18px_rgba(51,86,156,0.3)]" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
