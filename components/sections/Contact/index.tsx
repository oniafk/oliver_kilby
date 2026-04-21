"use client";

import Image from "next/image";
import { useRegisterSection } from "@/hooks/useRegisterSection";
import { useSectionIndex } from "@/hooks/useSectionIndex";
import { mergeRefs } from "@/lib/utils/mergeRefs";

export default function ContactSection() {
  const sectionRef = useRegisterSection("004", "contact", {
    theme: "dark",
    hideHud: true,
  });
  const sectionIndexRef = useSectionIndex(3);

  return (
    <section
      ref={mergeRefs(sectionRef, sectionIndexRef)}
      className="min-h-screen flex flex-col justify-between"
      style={{
        background: "var(--color-section-dark)",
        padding: "3.5rem",
      }}
    >
      {/* TOP */}
      <div className="flex flex-col gap-12">
        {/* Sub-row A */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 sm:gap-0">
          {/* Left col — heading + arrow */}
          <div className="flex flex-row items-center gap-4">
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                color: "#ffffff",
                fontSize: "clamp(40px, 8vw, 150px)",
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              CONTACT AU
            </h2>
            <Image
              src="/arrow_outward.svg"
              alt="arrow outward"
              width={150}
              height={150}
              style={{
                flexShrink: 0,
                width: "clamp(40px, 8vw, 120px)",
                height: "clamp(40px, 8vw, 120px)",
              }}
            />
          </div>

          {/* Right col — email + phone */}
          <div className="flex flex-col gap-2">
            <p
              className="text-[14px] lg:text-[32px]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 400,
              }}
            >
              email: hello@oliverkilby.com
            </p>
            <p
              className="text-[14px] lg:text-[32px]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 400,
              }}
            >
              phone: +1 000 000 0000
            </p>
          </div>
        </div>

        {/* Sub-row B */}
        <div className="flex justify-center">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(13px, 1.5vw, 24px)",
              fontWeight: 300,
            }}
          >
            so, what&apos;s your next project?
          </p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="sm:overflow-hidden sm:h-[8vw]">
        <h2
          className="leading-none sm:whitespace-nowrap"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "0.2em",
            fontSize: "13vw",
          }}
        >
          <span className="block sm:inline">OLIVER</span>
          <span className="hidden sm:inline"> </span>
          <span className="block sm:inline">KILBY</span>
        </h2>
      </div>
    </section>
  );
}
