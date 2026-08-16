"use client";

import { SiteContent, ReminderItem } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "../motion-kit";
import {
  IconNoKiss,
  IconSanitize,
  IconNoSmoke,
  IconMask,
  GoldStar,
} from "../decor";

const ICONS: Record<ReminderItem["icon"], React.ComponentType<{ className?: string }>> = {
  "no-kiss": IconNoKiss,
  sanitize: IconSanitize,
  "no-smoke": IconNoSmoke,
  mask: IconMask,
};

export default function Reminders({ content }: { content: SiteContent }) {
  const r = content.reminders;
  return (
    <section className="relative px-4 py-16" aria-label="Reminders">
      <div className="gingham-tan mx-auto max-w-[560px] rounded-[30px] p-4 shadow-[0_24px_54px_rgba(154,112,72,0.25)]">
        <div className="paper-grain relative rounded-[22px] border-2 border-dashed border-[var(--tan)] bg-[var(--cream)] px-7 py-12 md:px-10">
          <Reveal className="relative mx-auto w-fit">
            <h2 className="font-script text-6xl text-[var(--tan-deep)]">{r.heading}</h2>
            <GoldStar
              className="anim-twinkle absolute -right-8 -top-2 w-6"
              style={{ "--dur": "2.4s" } as React.CSSProperties}
            />
            <GoldStar
              className="anim-twinkle absolute -right-12 top-6 w-4"
              style={{ "--dur": "3s", animationDelay: "0.6s" } as React.CSSProperties}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-[42ch] text-center font-hand text-2xl leading-snug text-[#6d4a28]">
              {r.intro}
            </p>
          </Reveal>

          <RevealGroup className="mt-8 flex flex-col gap-5" stagger={0.12}>
            {r.items.map((item, i) => {
              const Icon = ICONS[item.icon] ?? IconMask;
              return (
                <RevealItem key={i}>
                  <div className="group flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[var(--tan)] bg-white text-[#6d4a28] shadow-[0_4px_10px_rgba(154,112,72,0.18)] transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="w-8" />
                    </span>
                    <p className="font-hand text-xl leading-snug text-[#5d3f22] md:text-2xl">
                      {item.text}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
