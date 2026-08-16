"use client";

import { SiteContent } from "@/lib/content";
import { Parallax, Reveal, RevealGroup, RevealItem } from "../motion-kit";
import RsvpForm from "../RsvpForm";
import {
  TeddyBear,
  HotAirBalloon,
  Cloud,
  GoldStar,
  Divider,
  Swirl,
  Tape,
} from "../decor";

const COLLAGE_LAYOUT = [
  { rotate: -7, y: 0 },
  { rotate: 4, y: 18 },
  { rotate: -3, y: 6 },
  { rotate: 6, y: 26 },
  { rotate: -5, y: 10 },
  { rotate: 3, y: 0 },
  { rotate: -6, y: 22 },
  { rotate: 5, y: 8 },
  { rotate: -2, y: 16 },
];

export default function Rsvp({ content }: { content: SiteContent }) {
  const r = content.rsvp;
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-10" aria-label="Save the date and RSVP">
      {/* swirl top border */}
      <div className="mb-8 flex justify-center gap-4 text-[var(--sky-deep)]">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Swirl key={i} className={`w-6 ${i % 2 ? "-scale-x-100" : ""}`} />
        ))}
      </div>

      <div
        className="paper-grain relative mx-auto w-full max-w-[560px] border-[10px] border-[#a3bedc] bg-[#f7fbfe] px-6 pb-20 pt-16 shadow-[0_30px_70px_rgba(51,86,156,0.22)] md:px-10"
        style={{ borderRadius: "40px 40px 300px 300px / 40px 40px 340px 340px" }}
      >
        <Reveal>
          <h2 className="text-center font-script text-6xl text-[var(--ink)] md:text-7xl">
            {r.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-4 max-w-[30ch] text-center font-hand text-2xl leading-snug text-[var(--ink)]">
            {r.message}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-center font-hand text-2xl text-[var(--ink)]">{r.hosts}</p>
        </Reveal>

        <Reveal delay={0.14}>
          <Divider className="mx-auto mt-6 w-64 text-[var(--ink)]" />
        </Reveal>

        <Reveal delay={0.16} className="mt-6">
          <div className="flex items-start justify-center gap-4">
            <h3 className="font-script text-6xl leading-none text-[var(--ink)]">{r.rsvpTitle}</h3>
            <p className="max-w-[24ch] pt-2 font-hand text-lg leading-snug text-[var(--ink)]">
              {r.rsvpNote}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mx-auto mt-8 max-w-[400px]">
          <RsvpForm content={content} />
        </Reveal>

        {/* photo collage */}
        <RevealGroup className="mt-14 flex flex-wrap justify-center gap-3" stagger={0.07}>
          {r.collage.map((src, i) => {
            const l = COLLAGE_LAYOUT[i % COLLAGE_LAYOUT.length];
            return (
              <RevealItem key={i}>
                <div
                  className="polaroid-hover relative w-[27%] min-w-[92px] max-w-[120px] bg-white p-1.5 pb-2.5 shadow-[0_8px_18px_rgba(51,86,156,0.16)]"
                  style={{ transform: `rotate(${l.rotate}deg) translateY(${l.y}px)` }}
                >
                  <Tape className="absolute -top-2.5 left-1/2 w-10 -translate-x-1/2" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Levi photo ${i + 1}`}
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* stars sprinkled between polaroids */}
        {[
          ["8%", "58%", "2.5s"],
          ["90%", "62%", "3s"],
          ["6%", "80%", "2.2s"],
          ["92%", "84%", "2.8s"],
        ].map(([left, top, dur], i) => (
          <GoldStar
            key={i}
            className="anim-twinkle absolute w-5"
            style={
              { left, top, "--dur": dur, animationDelay: `${i * 0.5}s` } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* grounded clouds + balloon farewell */}
      <Parallax depth={20} className="absolute bottom-2 left-[6%] w-36 md:w-44">
        <Cloud className="anim-drift w-full opacity-90" />
      </Parallax>
      <Parallax depth={26} className="absolute bottom-6 right-[4%] w-28 md:w-36">
        <HotAirBalloon className="anim-balloon w-full" />
      </Parallax>
      <Parallax depth={14} className="absolute bottom-0 left-1/2 hidden w-24 -translate-x-1/2 md:block">
        <div className="anim-bob-soft" style={{ ["--dur" as string]: "5s" }}>
          <Cloud className="w-full" />
          <TeddyBear className="absolute -top-12 left-1/2 w-16 -translate-x-1/2" bowColor="#eec95f" />
        </div>
      </Parallax>
    </section>
  );
}
