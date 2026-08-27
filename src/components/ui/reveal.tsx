"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const emptySubscribe = () => () => {};

/**
 * Scroll reveal for gallery / key moments.
 * Progressive enhancement: content stays visible until JS mounts, then
 * animates in on intersect. No-ops when reduced motion is preferred.
 */
export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mounted || reduceMotion) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, reduceMotion]);

  const shouldHide = mounted && !reduceMotion && !visible;

  return (
    <div
      ref={ref}
      className={cn(
        shouldHide && "reveal-ready",
        visible && mounted && !reduceMotion && "reveal-in",
        className,
      )}
      style={
        visible && !reduceMotion && delayMs
          ? { animationDelay: `${delayMs}ms` }
          : undefined
      }
    >
      {children}
    </div>
  );
}
