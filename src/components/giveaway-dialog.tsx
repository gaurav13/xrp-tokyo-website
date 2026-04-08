"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useSplash } from "@/contexts/splash-context";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "giveaway-dialog-dismissed";

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
  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // ESC key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        className="fixed inset-0 z-[9999] overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]"
        data-lenis-prevent=""
      >
        <div
          className="flex min-h-full items-center justify-center p-4 py-8"
          onClick={onClose}
        >
          <div
            className={cn(
              "relative w-[min(480px,calc(100%-2rem))] min-h-0",
              "max-h-[min(92dvh,calc(100dvh-2rem))]",
              "overflow-y-auto overflow-x-hidden overscroll-y-contain touch-pan-y [-webkit-overflow-scrolling:touch]",
              "rounded-3xl",
              "shadow-[0_8px_16px_-4px_rgba(232,17,17,0.15),0_24px_60px_-8px_rgba(232,17,17,0.2),0_0_0_1px_rgba(232,17,17,0.08)]",
              "bg-white"
            )}
            data-lenis-prevent=""
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent line */}
            <div className="h-[3px] bg-gradient-to-r from-transparent via-[#e81111]/60 to-transparent" aria-hidden="true" />

            {/* Hero area */}
            <div className="relative flex flex-col items-center pt-8 pb-4">

              <div className="relative mb-5 px-5 py-1 rounded-full bg-[#e81111]/[0.07] border border-[#e81111]/20">
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#e81111] uppercase">
                  Thank You
                </span>
              </div>

              <Image
                src="/toushindai_1200_1500.png"
                alt="XRP Tokyo 2026"
                width={1200}
                height={1500}
                sizes="(max-width: 640px) 150px, 170px"
                className="relative w-[140px] sm:w-[160px] h-auto"
              />
            </div>

            {/* Content */}
            <div className="px-7 pt-5 pb-8 sm:px-9 sm:pb-10">

              {/* Bilingual title */}
              <div className="text-center mb-5">
                <h2 className="text-[21px] sm:text-[23px] font-bold tracking-tight text-zinc-900 leading-snug">
                  心より御礼申し上げます
                </h2>
                <p className="mt-1.5 text-[13px] text-zinc-400 font-medium tracking-wide">
                  From the Bottom of Our Hearts
                </p>
              </div>

              {/* Ornamental divider */}
              <div className="flex items-center gap-3 mb-5" aria-hidden="true">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-zinc-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#e81111]/35" />
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-zinc-200" />
              </div>

              {/* Japanese message */}
              <p className="text-[13px] sm:text-[13.5px] leading-[2.05] text-zinc-600 mb-5">
                ご来場いただいた皆さま、スポンサーとしてご支援くださった企業の皆さま、スピーカーとして貴重な知見を共有してくださった皆さま、遠方から温かい応援をいただいた皆さま、そしてSNSでイベントを盛り上げてくださったすべての皆さまに、運営チーム一同、心より感謝申し上げます。
                <br /><br />
                皆さまと共に創り上げたこの一日は、XRPコミュニティにとってかけがえのない財産です。
              </p>

              {/* Language separator */}
              <div className="flex items-center gap-2.5 mb-5" aria-hidden="true">
                <div className="flex-1 h-px bg-zinc-100" />
                <span className="text-[9px] font-bold tracking-[0.3em] text-zinc-300 uppercase">English</span>
                <div className="flex-1 h-px bg-zinc-100" />
              </div>

              {/* English message */}
              <p className="text-[12px] sm:text-[12.5px] leading-[1.9] text-zinc-400 mb-6">
                To everyone who attended, the sponsors who made this possible, the speakers who shared their invaluable insights, those who supported us from afar, and everyone who amplified our event on social media — the entire XRP Tokyo team extends our deepest gratitude.
                <br /><br />
                The day we built together is an irreplaceable treasure for the XRP community.
              </p>

              {/* Bilingual closing / signature */}
              <div className="text-center mb-7">
                <p className="text-[13.5px] font-semibold text-zinc-800 tracking-wide">
                  XRPL Japan & Asia Web3 Alliance JAPAN 一同
                </p>
                <p className="text-[11px] text-zinc-400 mt-1 tracking-wider leading-relaxed">
                  XRPL Japan &amp; Asia Web3 Alliance JAPAN
                </p>
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "w-full flex items-center justify-center gap-2",
                  "h-11 rounded-full",
                  "bg-zinc-900 text-white",
                  "text-[13px] font-medium tracking-wide",
                  "transition-all duration-200",
                  "hover:bg-zinc-700",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                )}
              >
                <span>また東京で</span>
                <span className="text-zinc-500 text-[12px]">/ See You in Tokyo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
