"use client";

import { useEffect, useRef } from "react";
import { useSectionContext } from "@/lib/SectionContext";

interface SectionOptions {
  theme?: "light" | "dark";
  hideHud?: boolean;
}

export function useRegisterSection(
  number: string,
  label: string,
  options?: SectionOptions
) {
  const ref = useRef<HTMLElement>(null);
  const { setActive } = useSectionContext();
  const theme = options?.theme ?? "light";
  const hideHud = options?.hideHud ?? false;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // For sections taller than the viewport, 0.5 is unreachable — scale down.
    const threshold = Math.min(0.5, window.innerHeight / el.offsetHeight * 0.5);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive({ number, label, theme, hideHud });
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [number, label, theme, hideHud, setActive]);

  return ref;
}
