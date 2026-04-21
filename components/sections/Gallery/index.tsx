"use client";

import { useRegisterSection } from "@/hooks/useRegisterSection";
import { useSectionIndex } from "@/hooks/useSectionIndex";
import { mergeRefs } from "@/lib/utils/mergeRefs";

export default function GallerySection() {
  const sectionRef = useRegisterSection("003", "gallery", { theme: "dark" });
  const sectionIndexRef = useSectionIndex(2);

  return (
    <section
      ref={mergeRefs(sectionRef, sectionIndexRef)}
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
