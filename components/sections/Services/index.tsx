"use client";

import { useRegisterSection } from "@/hooks/useRegisterSection";

export default function ServicesSection() {
  const sectionRef = useRegisterSection("002", "services");

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col min-[780px]:flex-row"
      style={{ background: "#ffffff", padding: "3.5rem" }}
    >
      {/* Left column — 60% */}
      <div
        className="w-full min-[780px]:w-[60%] flex flex-col"
        style={{ minHeight: "calc(100vh - 35rem)" }}
      >
        {/* Row 1 — 50% height */}
        <div className="h-[50%] flex items-end">
          <h2
            className="text-[80px] lg:text-[180px]"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              color: "#000000",
              letterSpacing: "9.6px",
            }}
          >
            PHOTO
          </h2>
        </div>

        {/* Row 2 — 15% height */}
        <div className="h-[15%] flex items-center">
          <p
            className="text-[13px] sm:text-[15px]"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 400,
              color: "#000000",
            }}
          >
            stories in every moment; kept in a frame.
          </p>
        </div>

        {/* Row 3 — 20% height */}
        <div className="h-[20%] flex items-start">
          <p
            className="text-[16px] sm:text-[18px]"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              color: "#000000",
            }}
          >
            something you&apos;ll remember
          </p>
        </div>
      </div>

      {/* Right column — 40% placeholder */}
      <div
        className="w-full min-[780px]:w-[40%] bg-gray-200"
        style={{ minHeight: "40vh" }}
      />
    </section>
  );
}
