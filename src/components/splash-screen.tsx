"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useSplash } from "@/contexts/splash-context";
import { getFadeInAnimation } from "@/lib/utils/animation";
import { motion } from "motion/react";
export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);
  const { setIsSplashComplete } = useSplash();
  const t = useTranslations();
  const fadeIn = getFadeInAnimation("short");

  useEffect(() => {
    // スプラッシュ画面を表示（1.5秒後）
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      // フェードアウト後に非表示
      setTimeout(() => {
        setIsMounted(false);
        // bodyのoverflow制限を解除
        document.body.style.overflow = "";
        // スプラッシュ画面完了を通知（1.5秒 + 500ms = 2秒後）
        setIsSplashComplete(true);
      }, 500);
    }, 1500);

    // bodyのoverflowを制限してスクロールを防ぐ
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="flex flex-col items-center gap-6">
       
        <div
          className={cn(
            "flex flex-row items-center gap-3",
            fadeIn.className,
          )}
          style={fadeIn.style}
        >
         
        <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 512 424"
  className="w-[160%] h-[160%] md:w-[130%] md:h-[130%]"
  style={{ opacity: 0.5 }} 
>
  <defs>
    <filter id="neonBlur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

 
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
  x="50%" y="50%"
  dominantBaseline="middle" textAnchor="middle"
  fill="none" stroke="#e81111" strokeWidth="2"
  style={{ 
    fontSize: "45px", 
    fontWeight: "bold", 
    letterSpacing: "4px", 
    filter: "url(#neonBlur)" 
  }}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ 
    opacity: [0, 0, 1, 1, 0],
    scale: [0.8, 0.8, 1, 1.05, 1.1], 
    letterSpacing: ["2px", "2px", "4px", "8px", "12px"] 
  }}
  transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.45, 0.7, 0.8] }}
>
  XRP TOKYO 2026
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
      </div>
    </div>
  );
}
