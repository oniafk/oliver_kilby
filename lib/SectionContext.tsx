"use client";

import { createContext, useContext, useState } from "react";

interface ActiveSection {
  number: string;
  label: string;
  theme: "light" | "dark";
  hideHud?: boolean;
}

interface SectionContextValue {
  active: ActiveSection;
  setActive: (section: ActiveSection) => void;
}

const SectionContext = createContext<SectionContextValue | null>(null);

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<ActiveSection>({
    number: "001",
    label: "about",
    theme: "light",
  });

  return (
    <SectionContext.Provider value={{ active, setActive }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionContext(): SectionContextValue {
  const ctx = useContext(SectionContext);
  if (!ctx) {
    throw new Error("useSectionContext must be used inside SectionProvider");
  }
  return ctx;
}
