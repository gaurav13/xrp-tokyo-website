"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useSplash } from "@/contexts/splash-context";
import { getFadeInAnimation } from "@/lib/utils/animation";

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
        <Logo
          className="h-[6vw] max-h-[80px] animate-fade-in-up"
          alt="XRP TOKYO"
          useImage={false}
        />
        <div
          className={cn(
            "flex flex-row items-center gap-3",
            fadeIn.className,
          )}
          style={fadeIn.style}
        >
          <p className="font-sans text-sm md:text-base text-muted-foreground whitespace-nowrap">
            {t("splash.officialInEventOf")}
          </p>
          <Image
            src="/teamz.svg"
            alt="TEAMZ Summit 2026"
            width={50}
            height={50}
            className="h-auto w-[50px]"
            priority
          />
        </div>
      </div>
    </div>
  );
}
