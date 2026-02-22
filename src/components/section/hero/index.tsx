"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  Dialog,
  DialogPanel,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/headless/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Logo } from "@/components/ui/logo";
import { EVENT_INFO } from "@/lib/constants";
import { getFadeInAnimation } from "@/lib/utils/animation";
import { useSplash } from "@/contexts/splash-context";
import { SECTION_STYLES } from "@/lib/styles/common";
import { EventInfo } from "../../hero/event-info";
import { CTAButtons } from "../../hero/cta-buttons";

export function Hero() {
  const t = useTranslations();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { isSplashComplete } = useSplash();
  const logoAnimation = getFadeInAnimation("immediate");

  return (
    <section
      id="highlights"
      className="relative min-h-screen md:min-h-[calc(100vh-4rem)] overflow-hidden flex items-center bg-[#050505]"
    >
      {/* Animated X Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
      <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 512 424"
  className="w-[160%] h-[160%] md:w-[130%] md:h-[130%]"
  aria-hidden="true"
>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      
      {/* Top Part - Continuous Flow Animation */}
      <motion.path
        d="M437,0h74L357,152.48c-55.77,55.19-146.19,55.19-202,0L.94,0H75L192,115.83a91.11,91.11,0,0,0,127.91,0Z"
        fill="none"
        stroke="#e81111"
        strokeWidth="2.5" // बॉर्डर को पतला रखा है ताकि हैवी न लगे
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 12px #e81111)" }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ 
          duration: 4,      // घूमने की स्पीड (इसे कम/ज्यादा कर सकते हैं)
          repeat: Infinity, 
          ease: "easeInOut", // इससे घूमना ज्यादा स्मूथ लगेगा
          repeatType: "loop" 
        }}
      />

      {/* Bottom Part - Continuous Flow Animation */}
      <motion.path
        d="M74.05,424H0L155,270.58c55.77-55.19,146.19-55.19,202,0L512,424H438L320,307.23a91.11,91.11,0,0,0-127.91,0Z"
        fill="none"
        stroke="#e81111"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 12px #e81111)" }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          repeatType: "loop"
        }}
      />
      
    </g>
  </g>
</svg>
      </div>

      {/* コンテンツ */}
      <div className={`${SECTION_STYLES.container} relative z-10`}>
        <div className="flex flex-col items-center justify-center text-center">
          {/* 見出し */}
          <div
            className={`mb-10 ${isSplashComplete ? logoAnimation.className : "opacity-0"}`}
            style={isSplashComplete ? logoAnimation.style : undefined}
          >
            <h1 className="sr-only">XRP Tokyo 2026</h1>
            <Logo
              className="h-16 md:h-20"
              alt="XRP Tokyo 2026"
              useImage={false}
            />
          </div>

          {/* 日付と場所 */}
          <EventInfo
            onCalendarClick={() => setIsCalendarOpen(true)}
            shouldAnimate={isSplashComplete}
          />

          {/* CTAボタン */}
          <CTAButtons shouldAnimate={isSplashComplete} />
        </div>
      </div>

      {/* カレンダーモーダル */}
      <Dialog open={isCalendarOpen} onClose={setIsCalendarOpen}>
        <DialogPanel className="w-full max-w-[90vw] sm:max-w-sm md:max-w-md p-4 sm:p-6">
          <DialogHeader className="mb-4 sm:mb-5 text-center">
            <DialogTitle className="text-lg sm:text-xl font-semibold tracking-tight">
              {t("hero.eventSchedule")}
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={EVENT_INFO.date}
              defaultMonth={EVENT_INFO.date}
              className="w-full"
            />
          </div>
        </DialogPanel>
      </Dialog>
    </section>
  );
}
