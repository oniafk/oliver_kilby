"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SectionProvider, useSectionContext } from "@/lib/SectionContext";

function HudOverlay() {
  const { active } = useSectionContext();
  const hudColor =
    active.theme === "dark" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)";
  const textColor = active.theme === "dark" ? "#ffffff" : "#000000";

  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!labelRef.current) return;
    gsap.fromTo(labelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  }, [active]);

  const cornerStyle = (sides: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  }) => ({
    position: "absolute" as const,
    width: 32,
    height: 32,
    ...(sides.top !== undefined ? { top: 24 } : { bottom: 24 }),
    ...(sides.left !== undefined ? { left: 24 } : { right: 24 }),
    borderTop: sides.top ? `2.5px solid ${hudColor}` : undefined,
    borderBottom: sides.bottom ? `2.5px solid ${hudColor}` : undefined,
    borderLeft: sides.left ? `2.5px solid ${hudColor}` : undefined,
    borderRight: sides.right ? `2.5px solid ${hudColor}` : undefined,
    transition: "border-color 0.4s ease",
  });

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        opacity: active.hideHud ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      {/* Top-left corner */}
      <div style={cornerStyle({ top: true, left: true })} />
      {/* Top-right corner */}
      <div style={cornerStyle({ top: true, right: true })} />
      {/* Bottom-left corner */}
      <div style={cornerStyle({ bottom: true, left: true })} />
      {/* Bottom-right corner */}
      <div style={cornerStyle({ bottom: true, right: true })} />

      {/* HUD label — top-left */}
      <div
        ref={labelRef}
        className="absolute grid items-center gap-x-2"
        style={{
          top: 38,
          left: 56,
          gridTemplateColumns: "auto auto auto",
        }}
      >
        {["number", "---", "label"].map((key, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-heading)",
              color: textColor,
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.05em",
              transition: "color 0.4s ease",
            }}
          >
            {key === "number"
              ? active.number
              : key === "label"
              ? active.label
              : "---"}
          </span>
        ))}
      </div>

      {/* REC indicator — bottom-right */}
      <div
        className="absolute grid items-center gap-x-2"
        style={{
          bottom: 38,
          right: 56,
          gridTemplateColumns: "8px 1fr",
        }}
      >
        <span
          className="rec-dot block rounded-full"
          style={{ width: 8, height: 8, backgroundColor: "#ef4444" }}
        />
        <span
          style={{
            fontFamily: "var(--font-heading)",
            color: textColor,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.05em",
            transition: "color 0.4s ease",
          }}
        >
          REC
        </span>
      </div>
    </div>
  );
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SectionProvider>
      <style>{`
        @keyframes rec-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .rec-dot {
          animation: rec-blink 1s ease-in-out infinite;
        }
      `}</style>

      <HudOverlay />

      {children}
    </SectionProvider>
  );
}
