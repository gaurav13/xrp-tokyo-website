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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogPanel
        className={cn(
          "max-w-[calc(100%-2rem)] sm:max-w-[480px]",
          "rounded-2xl overflow-hidden",
          "shadow-2xl",
          "border border-amber-200/20",
          "bg-gradient-to-b from-zinc-800 to-zinc-900",
          "p-0"
        )}
        from="bottom"
        showCloseButton={false}
      >
        {/* ゴールドアクセントライン */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

        <div className="relative px-7 pt-9 pb-7 sm:px-9 sm:pt-11 sm:pb-9">
          {/* 背景：ウォームなソフトグロー */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-amber-500/[0.03] blur-3xl pointer-events-none" />

          <div className="relative">
            {/* ラベル */}
            <p className="text-center text-[11px] font-semibold tracking-[0.2em] uppercase text-amber-400/90 mb-6 sm:mb-7">
              Exclusive
            </p>

            {/* メインタイトル */}
            <h2 className="text-center text-xl sm:text-2xl font-bold tracking-tight text-zinc-50 leading-snug mb-2.5">
              {t("giveaway.subtitle")}
            </h2>

            {/* サブ情報 */}
            <p className="text-center text-[13px] sm:text-sm leading-relaxed text-zinc-400 mb-9 sm:mb-10 whitespace-pre-line">
              {t("giveaway.title")} &mdash; {t("giveaway.description")}
            </p>

            {/* CTAボタン */}
            <a
              href={LUMA_REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group w-full flex items-center justify-center gap-2.5",
                "h-12 rounded-xl",
                "bg-gradient-to-r from-amber-500 to-amber-400",
                "text-zinc-900 text-sm font-bold tracking-wide",
                "transition-all duration-200",
                "hover:from-amber-400 hover:to-amber-300",
                "shadow-lg shadow-amber-500/20",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
              )}
            >
              {t("giveaway.cta.register")}
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            {/* 閉じる */}
            <DialogClose
              as="button"
              className="w-full mt-5 text-center text-xs text-zinc-500 hover:text-zinc-400 transition-colors cursor-pointer"
            >
              閉じる
            </DialogClose>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
