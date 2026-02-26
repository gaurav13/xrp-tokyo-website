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
import Image from "next/image";
import Link from "next/link";
export function Hero() {
  const t = useTranslations();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { isSplashComplete } = useSplash();
  const logoAnimation = getFadeInAnimation("immediate");

  return (
    <section
      id="hero"
      className="relative min-h-screen md:min-h-[calc(100vh-4rem)] overflow-hidden flex items-start md:items-center bg-[#050505] pt-14 md:pt-0"
    >

      {/* Animated X Background */}
 <div className="absolute inset-0 z-0 bg-[url('/herobackground.png')] bg-cover bg-center bg-no-repeat opacity-40" />
      <div className="absolute inset-0 z-0 flex items-center justify-center">
   <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 512 424"
  className="w-[160%] h-[160%] md:w-[130%] md:h-[130%]"
  style={{ opacity: 0.3 }} 
>
  <defs>
    <filter id="neonBlur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  {/* 1. The 'X' Logo Section */}
  <motion.g
    animate={{ 
      opacity: [1, 1, 0, 0, 1],
      scale: [1, 1.1, 0.8, 0.8, 1] 
    }}
    transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 0.4, 0.9, 1] }}
  >
    <motion.path
      d="M437,0h74L357,152.48c-55.77,55.19-146.19,55.19-202,0L.94,0H75L192,115.83a91.11,91.11,0,0,0,127.91,0Z"
      fill="none" stroke="#e81111" strokeWidth="3" filter="url(#neonBlur)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1] }}
      transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 1] }}
    />
    <motion.path
      d="M74.05,424H0L155,270.58c55.77-55.19,146.19-55.19,202,0L512,424H438L320,307.23a91.11,91.11,0,0,0-127.91,0Z"
      fill="none" stroke="#e81111" strokeWidth="3" filter="url(#neonBlur)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1] }}
      transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 1] }}
    />
  </motion.g>

  {/* 2. The "JOIN THE FUTURE" Text Section */}
  <motion.text
  x="50%"
  y={typeof window !== 'undefined' && window.innerWidth < 768 
    ? "50%" 
    : "calc(83% + 40px)"} 
  dominantBaseline="middle"
  textAnchor="middle"
  fill="none"
  stroke="#e81111"
  strokeWidth="2"
  className="text-[26px] md:text-[35px] font-bold"
  style={{ 
    letterSpacing: "3px", 
    filter: "drop-shadow(0 0 8px rgba(232, 17, 17, 0.8))",
    fontFamily: "sans-serif"
  }}
  initial={{ opacity: 0 }}
  animate={{ 
    opacity: [0, 0, 1, 1, 0],
    letterSpacing: ["2px", "4px", "2px"],
    strokeWidth: [1.5, 2, 1.5]
  }}
  transition={{ 
    duration: 6, 
    repeat: Infinity, 
    times: [0, 0.35, 0.5, 0.75, 1] 
  }}
>
  JOIN THE FUTURE OF FINANCE
</motion.text>

  {/* 3. Particle Explosion Section */}
  {[...Array(20)].map((_, i) => (
    <motion.circle
      key={i}
      cx="256" cy="212" r="1.5" fill="#e81111"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        x: [0, (i - 10) * 40 * Math.random()],
        y: [0, (i - 10) * 40 * Math.random()],
        scale: [0, 1.5, 0]
      }}
      transition={{ 
        duration: 6, 
        repeat: Infinity, 
        delay: 2.1, 
        times: [0.35, 0.5, 0.7] 
      }}
    />
  ))}
</svg>
      </div>

  
      <div className={`${SECTION_STYLES.container} relative z-10`}>
       {/* <div className="flex flex-col items-center justify-center text-center">
        
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

          
          <EventInfo
            onCalendarClick={() => setIsCalendarOpen(true)}
            shouldAnimate={isSplashComplete}
          />

          
          <CTAButtons shouldAnimate={isSplashComplete} />
        </div> */}
        <div className="flex flex-col items-center justify-center text-center">
  <Link
    href="https://tickets.teamz.co.jp/?utm_source=xrp"
    target="_blank"
    className="block w-full overflow-hidden rounded-xl"
  >
    <div className="w-full lg:w-[85%] mx-auto overflow-hidden rounded-xl">
      {/* Mobile image */}
      <div className="block md:hidden">
        <Image
          src="/xrp-header-mobile1.png"
          alt="XRP Tokyo 2026"
          width={800}
          height={1200}
          priority
          sizes="100vw"
          className="w-full h-auto object-cover object-top"
        />
      </div>

      {/* Desktop image */}
      <div className="hidden md:block">
        <Image
          src="/headerinternalimagedesktop4.png"
          alt="XRP Tokyo 2026"
          width={1920}
          height={800}
          priority
          sizes="100vw"
          className="w-full h-auto object-cover object-center"
        />
      </div>
    </div>
  </Link>
</div>
      </div>


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
