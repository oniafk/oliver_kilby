"use client";

import { useEffect, useRef } from "react";
import { MOUSE_LENS_RADIUS } from "@/lib/webgl/constants";

export default function MouseLens() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // diameter = 2 * MOUSE_LENS_RADIUS * viewport height (matches shader's aspect-corrected circle)
    const getSize = () => MOUSE_LENS_RADIUS * 2 * window.innerHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const size = getSize();
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.transform = `translate(${e.clientX - size / 2}px, ${e.clientY - size / 2}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        borderRadius: "50%",
        backgroundColor: "white",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 101,
        willChange: "transform",
        transform: "translate(-200vw, -200vh)",
      }}
    />
  );
}
