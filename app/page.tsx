"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function LoadingPage() {
  const imageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!imageRef.current) return;

    const tl = gsap.timeline({ onComplete: () => router.push("/home") });

    // First iteration: fade in + scale
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
    );

    // 4 more iterations: scale only, opacity stays 1
    for (let i = 0; i < 4; i++) {
      tl.fromTo(
        imageRef.current,
        { scale: 0.5 },
        { scale: 1, duration: 0.6, ease: "power2.out" },
        "+=0.15"
      );
    }

    return () => { tl.kill(); };
  }, [router]);

  return (
    <section
      className="min-h-screen bg-white flex flex-col"
      style={{ padding: "5vh 3vw" }}
    >
      {/* Row 1 — Logo */}
      <div className="flex items-start">
        <Image
          src="/oliverLogo3.svg"
          alt="Oliver Kilby"
          width={300}
          height={106}
          className="h-auto w-[18vw] md:w-[10vw] xl:w-[7vw]"
          style={{ height: "auto" }}
          unoptimized
        />
      </div>

      {/* Row 2 — Hero image */}
      <div className="flex-1 flex items-center justify-center">
        <div
          ref={imageRef}
          className="relative w-full max-w-md"
          style={{ aspectRatio: "4/3", opacity: 0 }}
        >
          <Image
            src="/images/image.png"
            alt="Oliver Kilby"
            fill
            priority
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Row 3 — Name */}
      <div className="text-center lg:text-left">
        <h1
          className="text-[48px] sm:text-[86px] md:text-[96px] lg:text-[125px] tracking-[3.8px] sm:tracking-[5.8px] md:tracking-[7.4px] lg:tracking-[9.6px] wrap-break-word"
          style={{
            color: "black",
            fontFamily: "var(--font-heading)",
            fontOpticalSizing: "auto",
            fontWeight: 800,
          }}
        >
          OLIVER KILBY
        </h1>
      </div>
    </section>
  );
}
