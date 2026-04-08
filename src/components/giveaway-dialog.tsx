"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
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
  const pathname = usePathname();
  const { isSplashComplete } = useSplash();
  const [isOpen, setIsOpen] = useState(false);
  const suppressGiveawayOnThisPage = pathname === "/agenda";

  useEffect(() => {
    if (!isSplashComplete || suppressGiveawayOnThisPage) return;

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
  }, [isSplashComplete, suppressGiveawayOnThisPage]);

  const openDialog = useCallback(() => {
    if (suppressGiveawayOnThisPage) return;
    setIsOpen(true);
  }, [suppressGiveawayOnThisPage]);
  const handleClose = useCallback(() => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, "true");
  }, []);

  return (
    <GiveawayDialogContext.Provider value={{ openDialog }}>
      {children}
      <GiveawayDialogContent
        isOpen={isOpen && !suppressGiveawayOnThisPage}
        onClose={handleClose}
      />
    </GiveawayDialogContext.Provider>
  );
}

// Stagger container variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.18,
    },
  },
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          <div
            key="scroll-container"
            className="fixed inset-0 z-[9999] overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]"
            data-lenis-prevent=""
          >
            <div
              className="flex min-h-full items-center justify-center p-4 py-8"
              onClick={onClose}
            >
              <motion.div
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
                initial={{ opacity: 0, scale: 0.91, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                {/* Top accent line — animates from center out */}
                <motion.div
                  className="h-[3px] bg-gradient-to-r from-transparent via-[#e81111]/60 to-transparent"
                  aria-hidden="true"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 }}
                  style={{ transformOrigin: "center" }}
                />

                {/* Hero area */}
                <motion.div
                  className="relative flex flex-col items-center pt-8 pb-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Thank You badge */}
                  <motion.div
                    variants={itemVariants}
                    className="relative mb-5 px-5 py-1 rounded-full bg-[#e81111]/[0.07] border border-[#e81111]/20"
                  >
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#e81111] uppercase">
                      Thank You
                    </span>
                  </motion.div>

                  {/* Image — subtle pop + gentle float */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.82, y: 18 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: EASE_OUT },
                      },
                    }}
                    animate={{
                      y: [0, -5, 0],
                      transition: {
                        delay: 1,
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <Image
                      src="/toushindai_1200_1500.png"
                      alt="XRP Tokyo 2026"
                      width={1200}
                      height={1500}
                      sizes="(max-width: 640px) 150px, 170px"
                      className="relative w-[140px] sm:w-[160px] h-auto"
                    />
                  </motion.div>
                </motion.div>

                {/* Content */}
                <motion.div
                  className="px-7 pt-5 pb-8 sm:px-9 sm:pb-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Bilingual title */}
                  <motion.div variants={itemVariants} className="text-center mb-5">
                    <h2 className="text-[21px] sm:text-[23px] font-bold tracking-tight text-zinc-900 leading-snug">
                      心より御礼申し上げます
                    </h2>
                    <p className="mt-1.5 text-[13px] text-zinc-400 font-medium tracking-wide">
                      From the Bottom of Our Hearts
                    </p>
                  </motion.div>

                  {/* Ornamental divider */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-3 mb-5"
                    aria-hidden="true"
                  >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-zinc-200" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#e81111]/35" />
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-zinc-200" />
                  </motion.div>

                  {/* Japanese message */}
                  <motion.p
                    variants={itemVariants}
                    className="text-[13px] sm:text-[13.5px] leading-[2.05] text-zinc-600 mb-5"
                  >
                    ご来場いただいた皆さま、スポンサーとしてご支援くださった企業の皆さま、スピーカーとして貴重な知見を共有してくださった皆さま、遠方から温かい応援をいただいた皆さま、そしてSNSでイベントを盛り上げてくださったすべての皆さまに、運営チーム一同、心より感謝申し上げます。
                    <br /><br />
                    皆さまと共に創り上げたこの一日は、XRPコミュニティにとってかけがえのない財産です。
                  </motion.p>

                  {/* Language separator */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-2.5 mb-5"
                    aria-hidden="true"
                  >
                    <div className="flex-1 h-px bg-zinc-100" />
                    <span className="text-[9px] font-bold tracking-[0.3em] text-zinc-300 uppercase">English</span>
                    <div className="flex-1 h-px bg-zinc-100" />
                  </motion.div>

                  {/* English message */}
                  <motion.p
                    variants={itemVariants}
                    className="text-[12px] sm:text-[12.5px] leading-[1.9] text-zinc-400 mb-6"
                  >
                    To everyone who attended, the sponsors who made this possible, the speakers who shared their invaluable insights, those who supported us from afar, and everyone who amplified our event on social media — the entire XRP Tokyo team extends our deepest gratitude.
                    <br /><br />
                    The day we built together is an irreplaceable treasure for the XRP community.
                  </motion.p>

                  {/* Signature */}
                  <motion.div variants={itemVariants} className="text-center mb-7">
                    <p className="text-[13.5px] font-semibold text-zinc-800 tracking-wide">
                      XRPL Japan &amp; Asia Web3 Alliance JAPAN 一同
                    </p>
                  </motion.div>

                  {/* Close button */}
                  <motion.button
                    type="button"
                    onClick={onClose}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, transition: { duration: 0.18 } }}
                    whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                    className={cn(
                      "w-full flex items-center justify-center gap-2",
                      "h-11 rounded-full",
                      "bg-zinc-900 text-white",
                      "text-[13px] font-medium tracking-wide",
                      "transition-colors duration-200",
                      "hover:bg-zinc-700",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                    )}
                  >
                    <span>また東京で</span>
                    <span className="text-zinc-500 text-[12px]">/ See You in Tokyo</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
