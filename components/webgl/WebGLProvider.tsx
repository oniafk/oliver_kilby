"use client";

import { useEffect, type ReactNode } from "react";
import WebGLCanvas from "@/components/webgl/WebGLCanvas";
import MouseLens from "@/components/ui/MouseLens";
import { WebGLStateProvider, useWebGLState } from "@/lib/webgl/WebGLContext";

/**
 * Inner component so the mousemove listener can consume the context via
 * `useWebGLState()`. Sits between <WebGLStateProvider> and the <WebGLCanvas>
 * / {children} it owns.
 */
function WebGLProviderInner({ children }: { children: ReactNode }) {
  const { cursorRef } = useWebGLState();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize to UV (0..1) with Y flipped so 1.0 is top of the viewport.
      cursorRef.current.x = event.clientX / window.innerWidth;
      cursorRef.current.y = 1.0 - event.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorRef]);

  return (
    <>
      <WebGLCanvas />
      <MouseLens />
      {children}
    </>
  );
}

export default function WebGLProvider({ children }: { children: ReactNode }) {
  return (
    <WebGLStateProvider>
      <WebGLProviderInner>{children}</WebGLProviderInner>
    </WebGLStateProvider>
  );
}
