"use client";

// Orchestrates the whole visit: sealed envelope → open → scrolling invitation.

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SiteContent } from "@/lib/content";
import { ParallaxProvider } from "./motion-kit";
import Envelope from "./Envelope";
import Hero from "./sections/Hero";
import Details from "./sections/Details";
import DressCode from "./sections/DressCode";
import Reminders from "./sections/Reminders";
import Gifts from "./sections/Gifts";
import Rsvp from "./sections/Rsvp";

export default function InvitationExperience({
  content,
}: {
  content: SiteContent;
}) {
  const [opened, setOpened] = useState(false);

  // Lock scroll while the envelope is sealed.
  useEffect(() => {
    document.documentElement.style.overflow = opened ? "" : "hidden";
    if (opened) window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [opened]);

  return (
    <ParallaxProvider>
      <AnimatePresence>
        {!opened && (
          <Envelope
            key="envelope"
            content={content}
            onOpened={() => setOpened(true)}
          />
        )}
      </AnimatePresence>

      <main className="watercolor-ground paper-grain relative min-h-svh overflow-hidden">
        <Hero content={content} entered={opened} />
        <Details content={content} />
        <DressCode content={content} />
        <Reminders content={content} />
        <Gifts content={content} />
        <Rsvp content={content} />

        <footer className="relative pb-10 text-center">
          <p className="font-hand text-lg text-[var(--ink)]/80">
            Made with love for {content.hero.childName}
          </p>
          <a
            href="/admin"
            className="mt-1 inline-block font-serif-caps text-[10px] text-[var(--ink)]/50 underline-offset-2 hover:underline"
          >
            Admin
          </a>
        </footer>
      </main>
    </ParallaxProvider>
  );
}
