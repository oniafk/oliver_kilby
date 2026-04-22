"use client";

import { useRegisterSection } from "@/hooks/useRegisterSection";
import { useSectionIndex } from "@/hooks/useSectionIndex";
import { mergeRefs } from "@/lib/utils/mergeRefs";
import GalleryViewer from "@/components/webgl/GalleryViewer";

export default function GallerySection() {
  const sectionRef = useRegisterSection("003", "gallery", { theme: "dark" });
  const sectionIndexRef = useSectionIndex(2);

  return (
    <section
      ref={mergeRefs(sectionRef, sectionIndexRef)}
      className="min-h-[800vh]"
      style={{ background: "var(--color-section-dark)" }}
    >
      <GalleryViewer imagePath="/images/image.png" sectionRef={sectionRef} />
    </section>
  );
}
