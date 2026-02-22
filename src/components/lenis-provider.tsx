"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  return <ReactLenis root>{children}</ReactLenis>;
}
