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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive({ number, label, theme, hideHud });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [number, label, theme, hideHud, setActive]);

  return ref;
}
