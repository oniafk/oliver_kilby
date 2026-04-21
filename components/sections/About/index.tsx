"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRegisterSection } from "@/hooks/useRegisterSection";
import { useSectionIndex } from "@/hooks/useSectionIndex";
import { mergeRefs } from "@/lib/utils/mergeRefs";

export default function AboutSection() {
  const sectionRef = useRegisterSection("001", "about");
  const sectionIndexRef = useSectionIndex(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const els = [headingRef.current, line1Ref.current, line2Ref.current].filter(Boolean);
    gsap.fromTo(
      els,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.15, delay: 0.3 }
    );
  }, []);

  return (
    <section
      ref={mergeRefs(sectionRef, sectionIndexRef)}
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "#ffffff" }}
    >
      <div className="flex flex-col items-center">
        <h1
          ref={headingRef}
          className="text-center"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "#000000",
            fontSize: "clamp(32px, 10vw, 150px)",
            letterSpacing: "0.06em",
            opacity: 0,
          }}
        >
          OLIVER KILBY
        </h1>

        <div className="mt-6 flex flex-col items-center gap-1">
          <p
            ref={line1Ref}
            className="text-center text-[13px] sm:text-[16px]"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 300,
              color: "#000000",
              opacity: 0,
            }}
          >
            +++ caring about work, how it looks, how it feels+++
          </p>
          <p
            ref={line2Ref}
            className="text-center text-[13px] sm:text-[16px]"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 300,
              color: "#000000",
              opacity: 0,
            }}
          >
            --- how it holds up to the future ---
          </p>
        </div>
      </div>
    </section>
  );
}
