"use client";

import { motion } from "framer-motion";
import { SiteContent } from "@/lib/content";
import { Parallax, Reveal, RevealGroup, RevealItem } from "../motion-kit";
import {
  TeddyBear,
  BalloonCluster,
  HotAirBalloon,
  Bunting,
  MoneyEnvelope,
  GiftBox,
  Cloud,
} from "../decor";

export default function Gifts({ content }: { content: SiteContent }) {
  const g = content.gifts;
  return (
    <section className="relative overflow-hidden px-4 py-16" aria-label="Gift guide">
      {/* photo-filled name letters — plain wrapper: a filtered ancestor would
          isolate mix-blend-multiply and keep the cutouts' white boxes visible */}
      <div className="relative mx-auto flex w-fit items-center gap-2">
        <Parallax depth={14} className="w-20 md:w-24">
          <div className="anim-balloon" style={{ ["--dur" as string]: "6.4s" }}>
            <BalloonCluster className="w-full" />
            <TeddyBear className="absolute -bottom-5 left-1/2 w-12 -translate-x-1/2" />
          </div>
        </Parallax>
        {g.letterImages.length > 0 ? (
          <div className="flex max-w-[80vw] flex-wrap items-end justify-center gap-1 md:gap-2">
            {g.letterImages.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={g.nameLetters[i] ?? `Letter ${i + 1}`}
                className="h-[16vw] w-auto max-h-40 mix-blend-multiply md:h-44"
                initial={{ opacity: 0, y: 20, rotate: i % 2 ? 2 : -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.09,
                  ease: [0.23, 1, 0.32, 1],
                }}
              />
            ))}
          </div>
        ) : (
          <h2
            className="select-none font-serif text-[24vw] font-bold uppercase leading-none tracking-tight md:text-[10rem]"
            style={{
              backgroundImage: `linear-gradient(rgba(214,177,132,0.16), rgba(154,112,72,0.22)), url(${g.letterPhoto})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "none",
              filter: "drop-shadow(0 6px 14px rgba(154,112,72,0.35))",
            }}
          >
            {g.nameLetters}
          </h2>
        )}
      </div>

      {/* gingham gift card */}
      <div className="gingham-blue mx-auto mt-10 max-w-[540px] rounded-[34px] p-4 shadow-[0_24px_54px_rgba(51,86,156,0.22)]">
        <div className="paper-grain relative rounded-[26px] bg-[#fefcf7] px-6 py-10 md:px-9">
          <Bunting className="absolute -top-2 left-1/2 w-[92%] -translate-x-1/2" />

          <Reveal className="mt-6 flex items-center justify-center gap-3">
            <h2 className="font-script text-6xl text-[var(--ink)]">{g.heading}</h2>
            <span className="anim-bob-soft inline-block w-12" style={{ ["--dur" as string]: "3.6s" }}>
              <GiftBox className="w-full" />
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-[44ch] text-center font-hand text-2xl leading-snug text-[var(--ink)]">
              {g.intro}
            </p>
          </Reveal>

          <RevealGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.12}>
            {g.items.map((item, i) => (
              <RevealItem key={i}>
                <figure className="group flex flex-col items-center">
                  <div className="polaroid-hover w-full max-w-[220px] bg-white p-2 pb-3 shadow-[0_10px_22px_rgba(51,86,156,0.15)]"
                    style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="aspect-[6/5] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-3 max-w-[26ch] text-center font-hand text-lg leading-tight text-[var(--ink)]">
                    {item.name}
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-10 flex flex-col items-center">
            <span className="anim-bob-soft w-24" style={{ ["--dur" as string]: "4.2s" }}>
              <MoneyEnvelope className="w-full" />
            </span>
            <p className="mt-3 text-center font-hand text-2xl text-[var(--ink)]">
              {g.monetaryTitle}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-8 max-w-[46ch] text-center font-hand text-lg leading-snug text-[var(--tan-deep)]">
              {g.outro}
            </p>
          </Reveal>
        </div>
      </div>

      {/* drifting balloon + cloud */}
      <Parallax depth={26} className="absolute -left-6 bottom-10 w-28 md:left-[6%] md:w-36">
        <HotAirBalloon className="anim-balloon w-full" />
      </Parallax>
      <Parallax depth={18} className="absolute right-[2%] top-[38%] hidden w-36 md:block">
        <Cloud className="anim-drift w-full opacity-90" />
      </Parallax>
    </section>
  );
}
