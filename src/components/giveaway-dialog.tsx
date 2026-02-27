"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogPanel,
  DialogClose,
} from "@/components/animate-ui/components/headless/dialog";
import { useSplash } from "@/contexts/splash-context";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "giveaway-dialog-dismissed";
const LUMA_REGISTRATION_URL = "https://luma.com/0dww2xk3";

type GiveawayDialogContextType = {
  openDialog: () => void;
};

const GiveawayDialogContext = createContext<GiveawayDialogContextType | undefined>(undefined);

export function useGiveawayDialog() {
  const context = useContext(GiveawayDialogContext);
  if (context === undefined) {
    throw new Error("useGiveawayDialog must be used within GiveawayDialogProvider");
  }
  return context;
}

export function GiveawayDialogProvider({ children }: { children: React.ReactNode }) {
  const { isSplashComplete } = useSplash();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isSplashComplete) return;

    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      const isDev = process.env.NODE_ENV === "development";
      if (isDev || dismissed !== "true") {
        const timer = setTimeout(() => setIsOpen(true), 500);
        return () => clearTimeout(timer);
      }
    } catch {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isSplashComplete]);

  const openDialog = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, "true");
  }, []);

  return (
    <GiveawayDialogContext.Provider value={{ openDialog }}>
      {children}
      <GiveawayDialogContent isOpen={isOpen} onClose={handleClose} />
    </GiveawayDialogContext.Provider>
  );
}

function GiveawayDialogContent({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations();

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[9999]">
     
  

  {/* Center container (required so panel stays visible) */}
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <DialogPanel
  from="bottom"
  showCloseButton={false}
  className={cn(
    "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    "w-[min(480px,calc(100%-2rem))]",
    "rounded-2xl overflow-hidden",
    "shadow-2xl",
    "border border-[#e81111]/70",
    "bg-black p-0"
  )}
>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-[url('/popup.png')] bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      />

      {/* Dark overlay (for readability) */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      {/* Top accent line (optional) */}
      <div className="relative h-[2px] bg-gradient-to-r from-transparent via-[#e81111]/80 to-transparent" />

      {/* Content */}
      <div className="relative px-7 pt-9 pb-7 sm:px-9 sm:pt-11 sm:pb-9">
        {/* glow (optional) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-amber-500/[0.03] blur-3xl pointer-events-none" />

        <div className="relative">
          <p className="text-center text-[11px] text-[#e81111] font-semibold tracking-[0.2em] uppercase  mb-6 sm:mb-7">
            Exclusive
          </p>

          <h2 className="text-center text-xl sm:text-2xl font-bold tracking-tight text-zinc-50 leading-snug mb-2.5">
            {t("giveaway.subtitle")}
          </h2>

          <p className="text-center text-[13px] sm:text-sm leading-relaxed text-zinc-400 mb-9 sm:mb-10 whitespace-pre-line">
            {t("giveaway.title")} &mdash; {t("giveaway.description")}
          </p>

          <a
  href={LUMA_REGISTRATION_URL}
  target="_blank"
  rel="noopener noreferrer"
  className={cn(
    "group w-full flex items-center justify-center gap-2.5",

    // height + pill shape
    "h-14 rounded-full",

    // smooth luxury gold gradient
    "bg-gradient-to-r from-[#b67c2c] via-[#e7b75c] to-[#b67c2c]",

    // text
    "text-black text-sm font-bold tracking-wide",

    // depth + glow
    "shadow-[0_8px_25px_rgba(231,183,92,0.35)]",

    // smooth hover
    "transition-all duration-300",
    "hover:brightness-105 hover:scale-[1.01]",

    // focus
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
  )}
>
  {t("giveaway.cta.register")}
  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
</a>

          <DialogClose
            as="button"
            className="w-full mt-5 text-center text-xs text-zinc-400/80 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            閉じる
          </DialogClose>
        </div>
      </div>
    </DialogPanel>
  </div>
</Dialog>
  );
}
