"use client";

import { useRegisterSection } from "@/hooks/useRegisterSection";

export default function GallerySection() {
  const sectionRef = useRegisterSection("003", "gallery", { theme: "dark" });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--color-section-dark)" }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          color: "rgba(255,255,255,0.3)",
          fontSize: 14,
          letterSpacing: "0.1em",
        }}
      >
        gallery — coming soon
      </p>
    </section>
  );
}
