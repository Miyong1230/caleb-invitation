"use client";

// Live countdown with rolling digits. Digits slide when they change;
// static the rest of the time so the motion stays meaningful.

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function remaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

function Digit({ value }: { value: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-block h-[1.1em] w-[0.62em] overflow-hidden align-baseline">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          className="absolute inset-0 flex items-center justify-center"
          initial={reduce ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { y: "0%", opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="font-serif text-5xl font-semibold tabular-nums text-[var(--ink)] md:text-6xl">
        <Digit value={str[0]} />
        <Digit value={str[1]} />
      </div>
      <span className="mt-1 font-serif-caps text-[10px] text-[var(--tan-deep)] md:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({
  targetISO,
  doneText,
}: {
  targetISO: string;
  doneText: string;
}) {
  const [now, setNow] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    const target = new Date(targetISO).getTime();
    if (Number.isNaN(target)) return;
    const tick = () => setNow(remaining(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  if (!now) {
    return (
      <div className="h-24" aria-hidden="true" />
    );
  }

  const done =
    now.days === 0 && now.hours === 0 && now.minutes === 0 && now.seconds === 0;

  if (done) {
    return (
      <p className="text-center font-script text-4xl text-[var(--ink)]">
        {doneText}
      </p>
    );
  }

  return (
    <div
      className="flex items-start justify-center gap-2 md:gap-4"
      role="timer"
      aria-label="Countdown to the celebration"
    >
      <Unit value={now.days} label="Days" />
      <span className="pt-1 font-serif text-4xl text-[var(--tan)] md:text-5xl">:</span>
      <Unit value={now.hours} label="Hours" />
      <span className="pt-1 font-serif text-4xl text-[var(--tan)] md:text-5xl">:</span>
      <Unit value={now.minutes} label="Minutes" />
      <span className="pt-1 font-serif text-4xl text-[var(--tan)] md:text-5xl">:</span>
      <Unit value={now.seconds} label="Seconds" />
    </div>
  );
}
