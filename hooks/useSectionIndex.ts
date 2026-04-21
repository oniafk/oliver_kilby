"use client";

import { useEffect, useRef } from "react";
import { useWebGLState } from "@/lib/webgl/WebGLContext";
import { SECTION_OBSERVER_THRESHOLD } from "@/lib/webgl/constants";

/**
 * Registers a `<section>` DOM ref with the WebGL provider by index.
 * When the section crosses the IO threshold, writes `index` to
 * `sectionIndexRef.current` via `setSectionIndex`.
 *
 * Coexists with `useRegisterSection` — both can be called on the same element.
 * Each installs its own IntersectionObserver.
 */
export function useSectionIndex(index: number) {
  const ref = useRef<HTMLElement>(null);
  const { setSectionIndex } = useWebGLState();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionIndex(index);
          }
        });
      },
      { threshold: SECTION_OBSERVER_THRESHOLD }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [index, setSectionIndex]);

  return ref;
}
