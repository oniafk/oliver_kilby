"use client";

import { useRegisterSection } from "@/hooks/useRegisterSection";

export default function AboutSection() {
  const sectionRef = useRegisterSection("001", "about");

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "#ffffff" }}
    >
      <div className="flex flex-col items-center">
        <h1
          className="text-center"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "#000000",
            fontSize: "clamp(32px, 10vw, 150px)",
            letterSpacing: "0.06em",
          }}
        >
          OLIVER KILBY
        </h1>

        <div className="mt-6 flex flex-col items-center gap-1">
          <p
            className="text-center text-[13px] sm:text-[16px]"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 300,
              color: "#000000",
            }}
          >
            +++ caring about work, how it looks, how it feels+++
          </p>
          <p
            className="text-center text-[13px] sm:text-[16px]"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 300,
              color: "#000000",
            }}
          >
            --- how it holds up to the future ---
          </p>
        </div>
      </div>
    </section>
  );
}
