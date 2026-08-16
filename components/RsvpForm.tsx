"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SiteContent, nickname, hostNames } from "@/lib/content";
import { BearFace, GoldStar } from "./decor";

type Status = "idle" | "sending" | "done" | "error";

export default function RsvpForm({ content }: { content: SiteContent }) {
  const reduce = useReducedMotion();
  const childName = nickname(content);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!name.trim()) {
      setError("Please tell us your name.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attending, guests, message }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-2xl border-2 border-[var(--sky-mid)] bg-white px-4 py-3 font-hand text-xl text-[var(--ink-deep)] placeholder:text-[#4d699b] focus:border-[var(--ink)] focus:outline-none transition-colors duration-200";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="thanks"
            className="relative flex flex-col items-center rounded-3xl border-2 border-dashed border-[var(--sky-deep)] bg-white/80 px-6 py-10 text-center"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              animate={reduce ? {} : { rotate: [0, -5, 5, -3, 0] }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <BearFace className="w-24" />
            </motion.div>
            {[
              ["12%", "16%"],
              ["82%", "20%"],
              ["18%", "72%"],
              ["86%", "68%"],
            ].map(([left, top], i) => (
              <GoldStar
                key={i}
                className="anim-twinkle absolute w-5"
                style={
                  { left, top, "--dur": `${2 + i * 0.4}s` } as React.CSSProperties
                }
              />
            ))}
            <p className="mt-3 font-script text-5xl text-[var(--ink)]">Thank you!</p>
            <p className="mt-2 max-w-[36ch] font-hand text-xl text-[var(--ink)]">
              {attending === "yes"
                ? `We can’t wait to celebrate ${childName}’s special day with you!`
                : `We’ll miss you — thank you for letting us know. ${childName} sends a hug!`}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            className="flex flex-col gap-4"
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14, filter: "blur(3px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <label className="flex flex-col gap-1.5">
              <span className="font-serif-caps text-xs text-[var(--ink)]">Your name</span>
              <input
                className={inputCls}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan & Maria Dela Cruz"
                maxLength={120}
                required
              />
            </label>

            <div className="flex flex-col gap-1.5">
              <span className="font-serif-caps text-xs text-[var(--ink)]">Will you join us?</span>
              <div className="relative grid grid-cols-2 rounded-2xl border-2 border-[var(--sky-mid)] bg-white p-1">
                <motion.span
                  className="absolute inset-y-1 w-[calc(50%-4px)] rounded-xl bg-[var(--ink)]"
                  animate={{ x: attending === "yes" ? 4 : "calc(100% + 4px)" }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", duration: 0.45, bounce: 0.25 }
                  }
                />
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAttending(v)}
                    aria-pressed={attending === v}
                    className={`pressable relative z-10 rounded-xl py-2.5 font-hand text-xl transition-colors duration-200 ${
                      attending === v ? "text-white" : "text-[var(--ink)]"
                    }`}
                  >
                    {v === "yes" ? "Joyfully yes!" : "Sadly, no"}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence initial={false}>
              {attending === "yes" && (
                <motion.label
                  className="flex flex-col gap-1.5 overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                >
                  <span className="font-serif-caps text-xs text-[var(--ink)]">
                    How many of you are coming?
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      aria-label="One less guest"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="pressable h-11 w-11 rounded-full border-2 border-[var(--sky-mid)] bg-white font-hand text-2xl text-[var(--ink)]"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-hand text-3xl tabular-nums text-[var(--ink-deep)]">
                      {guests}
                    </span>
                    <button
                      type="button"
                      aria-label="One more guest"
                      onClick={() => setGuests((g) => Math.min(20, g + 1))}
                      className="pressable h-11 w-11 rounded-full border-2 border-[var(--sky-mid)] bg-white font-hand text-2xl text-[var(--ink)]"
                    >
                      +
                    </button>
                  </div>
                </motion.label>
              )}
            </AnimatePresence>

            <label className="flex flex-col gap-1.5">
              <span className="font-serif-caps text-xs text-[var(--ink)]">
                A note for {hostNames(content)} & {childName} (optional)
              </span>
              <textarea
                className={`${inputCls} min-h-[90px] resize-none`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="We’re so happy for you!"
                maxLength={500}
              />
            </label>

            {status === "error" && (
              <motion.p
                className="rounded-xl bg-[#fbeaea] px-4 py-2 font-hand text-lg text-[#a03434]"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={status === "sending"}
              className="pressable mt-1 rounded-full bg-[var(--ink)] px-8 py-3.5 font-hand text-2xl text-white shadow-[0_10px_24px_rgba(51,86,156,0.35)] disabled:opacity-60"
              whileHover={reduce ? {} : { scale: 1.03 }}
            >
              {status === "sending" ? "Sending…" : "Send my RSVP"}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
