"use client";

// Shared motion primitives: one mouse listener feeds spring-smoothed parallax
// for every decorative floater; Reveal handles scroll entrances.

import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

interface MouseCtx {
  mx: MotionValue<number>;
  my: MotionValue<number>;
}

const ParallaxCtx = createContext<MouseCtx | null>(null);

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <ParallaxCtx.Provider value={{ mx, my }}>{children}</ParallaxCtx.Provider>
  );
}

/** Decorative element that leans toward the cursor with spring momentum. */
export function Parallax({
  depth = 12,
  className = "",
  style,
  children,
}: {
  depth?: number;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const ctx = useContext(ParallaxCtx);
  const reduce = useReducedMotion();
  const zero = useMotionValue(0);
  const mx = ctx?.mx ?? zero;
  const my = ctx?.my ?? zero;
  const tx = useTransform(mx, (v) => v * depth);
  const ty = useTransform(my, (v) => v * depth * 0.7);
  const sx = useSpring(tx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(ty, { stiffness: 60, damping: 18, mass: 0.6 });

  return (
    <motion.div
      className={className}
      style={{
        ...style,
        x: reduce ? 0 : sx,
        y: reduce ? 0 : sy,
      }}
    >
      {children}
    </motion.div>
  );
}

/** Scroll-triggered entrance: rises, sharpens, fades in. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y, filter: "blur(4px)" }
      }
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once, margin: "-70px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered children reveal for lists. */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce
          ? { opacity: 0 }
          : { opacity: 0, y, filter: "blur(3px)" },
        show: reduce
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
            },
      }}
    >
      {children}
    </motion.div>
  );
}
