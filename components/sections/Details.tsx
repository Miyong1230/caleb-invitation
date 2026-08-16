"use client";

import { SiteContent, nickname } from "@/lib/content";
import { Parallax, Reveal } from "../motion-kit";
import Countdown from "../Countdown";
import {
  TeddyBear,
  Rainbow,
  Cloud,
  GoldStar,
  IconCalendarClock,
  IconPin,
  Swirl,
} from "../decor";

function Venue({
  title,
  name,
  address,
  mapUrl,
  photo,
  delay,
}: {
  title: string;
  name: string;
  address: string;
  mapUrl: string;
  photo: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="flex flex-col items-center text-center">
      <div className="polaroid-hover relative w-40 rotate-[-2deg] bg-white p-2 pb-3 shadow-[0_10px_24px_rgba(51,86,156,0.16)] md:w-48">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={name}
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="mt-4 font-script text-5xl text-[var(--ink)]">{title}</h3>
      <p className="mt-2 font-serif text-lg leading-snug text-[var(--ink)]">{name}</p>
      <p className="font-serif-caps text-xs text-[var(--tan-deep)]">{address}</p>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="view-map-btn mt-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--sky-deep)] bg-[#eaf3fb] px-4 py-1.5 font-serif-caps text-xs text-[var(--ink)] shadow-[0_3px_8px_rgba(51,86,156,0.14)]"
      >
        <IconPin className="w-3.5" />
        View map
      </a>
    </Reveal>
  );
}

export default function Details({ content }: { content: SiteContent }) {
  const d = content.details;
  return (
    <section id="details" className="relative px-4 py-20" aria-label="Event details">
      {/* heading with rainbow bear */}
      <Reveal className="relative mx-auto flex w-fit items-end justify-center">
        <h2 className="font-serif text-6xl text-[var(--ink)] md:text-7xl">{d.heading}</h2>
        <Parallax depth={10} className="relative -mb-2 ml-2 w-24 md:w-28">
          <div className="anim-bob-soft" style={{ ["--dur" as string]: "5s" }}>
            <Rainbow className="w-full" />
            <TeddyBear className="absolute -top-12 left-1/2 w-16 -translate-x-1/2" />
            <Cloud className="absolute -bottom-3 -left-4 w-14 opacity-95" />
          </div>
        </Parallax>
        {[
          ["-14%", "-8%", "2.3s"],
          ["-6%", "-26%", "3s"],
          ["4%", "-4%", "2.6s"],
        ].map(([left, top, dur], i) => (
          <GoldStar
            key={i}
            className="anim-twinkle absolute w-4"
            style={
              { left, top, "--dur": dur, animationDelay: `${i * 0.45}s` } as React.CSSProperties
            }
          />
        ))}
      </Reveal>

      {/* arch panel */}
      <div
        className="paper-grain relative mx-auto mt-10 w-full max-w-[520px] border border-white/80 bg-gradient-to-b from-[#f4f9fd] to-[#e2eef8] px-6 pb-16 pt-16 shadow-[0_26px_60px_rgba(51,86,156,0.2)] md:px-10"
        style={{ borderRadius: "250px 250px 250px 250px / 300px 300px 90px 90px" }}
      >
        <Reveal className="flex flex-col items-center text-center">
          <IconCalendarClock className="w-16 text-[var(--ink)]" />
          <h3 className="mt-2 font-script text-5xl text-[var(--ink)]">{d.dateTimeTitle}</h3>
          <p className="mt-2 font-serif text-xl text-[var(--ink)]">{d.dateLine}</p>
          <p className="font-serif text-lg text-[var(--ink)]">{d.timeLine}</p>
        </Reveal>

        {/* A venue block hides when its name is left empty in admin. */}
        <div className="mt-12 flex flex-col items-center gap-12">
          {d.ceremonyName.trim() && (
            <Venue
              title={d.ceremonyTitle}
              name={d.ceremonyName}
              address={d.ceremonyAddress}
              mapUrl={d.ceremonyMapUrl}
              photo={d.ceremonyPhoto}
              delay={0.05}
            />
          )}
          {d.receptionName.trim() && (
            <Venue
              title={d.receptionTitle}
              name={d.receptionName}
              address={d.receptionAddress}
              mapUrl={d.receptionMapUrl}
              photo={d.receptionPhoto}
              delay={0.1}
            />
          )}
        </div>

        <Reveal className="mt-14">
          <h3 className="text-center font-script text-4xl text-[var(--ink)] md:text-5xl">
            {d.countdownTitle}
          </h3>
          <div className="mt-5">
            <Countdown
              targetISO={d.eventISO}
              doneText={`It’s ${nickname(content)}’s day!`}
            />
          </div>
        </Reveal>

        <div className="mt-10 flex justify-center gap-3 text-[var(--sky-deep)]">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Swirl
              key={i}
              className={`w-6 ${i % 2 ? "-scale-x-100" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
