"use client";

import Image from "next/image";
import { useRegisterSection } from "@/hooks/useRegisterSection";

export default function ContactSection() {
  const sectionRef = useRegisterSection("004", "contact", {
    theme: "dark",
    hideHud: true,
  });

  return (
    <section
      ref={sectionRef}
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
                fontSize: "clamp(40px, 8vw, 120px)",
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              CONTACT AU
            </h2>
            <Image
              src="/arrow_outward.svg"
              alt="arrow outward"
              width={40}
              height={36}
              style={{ flexShrink: 0 }}
            />
          </div>

          {/* Right col — email + phone */}
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 14,
                fontWeight: 300,
              }}
            >
              email: hello@oliverkilby.com
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 14,
                fontWeight: 300,
              }}
            >
              phone: +1 000 000 0000
            </p>
          </div>
        </div>

        {/* Sub-row B */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(13px, 1.5vw, 18px)",
              fontWeight: 300,
            }}
          >
            so, what&apos;s your next project?
          </p>
        </div>
      </div>

      {/* BOTTOM */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "#ffffff",
            fontSize: "clamp(32px, 8vw, 120px)",
            letterSpacing: "0.06em",
            lineHeight: 1,
          }}
        >
          OLIVER KILBY
        </h2>
      </div>
    </section>
  );
}
