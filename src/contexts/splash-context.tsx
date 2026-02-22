"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SplashContextType = {
  isSplashComplete: boolean;
  setIsSplashComplete: (value: boolean) => void;
};

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export function SplashContextProvider({ children }: { children: ReactNode }) {
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  return (
    <SplashContext.Provider value={{ isSplashComplete, setIsSplashComplete }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  const context = useContext(SplashContext);
  if (context === undefined) {
    throw new Error("useSplash must be used within a SplashContextProvider");
  }
  return context;
}
