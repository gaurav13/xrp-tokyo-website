"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { buttonVariants } from "@/components/animate-ui/components/buttons/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/animate-ui/components/radix/tooltip";
import { EVENT_INFO, ANIMATION_DELAYS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { trackTicketButtonClick } from "@/lib/gtag";

const MotionLink = motion(Link);

type CTAButtonsProps = {
  shouldAnimate?: boolean;
};

export function CTAButtons({ shouldAnimate = false }: CTAButtonsProps) {
  const t = useTranslations();
  const buttonDelay = ANIMATION_DELAYS.long / 1000; // 0.3秒
  const buttonDuration = 0.5; // 0.5秒

  return (
    <div className="hidden md:flex flex-col gap-4 sm:flex-row">
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionLink
            href={EVENT_INFO.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackTicketButtonClick("hero_cta")}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              shouldAnimate
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: buttonDuration,
              delay: shouldAnimate ? buttonDelay : 0,
              ease: "easeOut",
            }}
            style={{ willChange: "opacity, transform" }}
            className={cn(
              buttonVariants({ variant: "cta", size: "lg" }),
              "min-w-[180px] h-12 text-base font-semibold shadow-lg hover:shadow-xl uppercase relative inline-flex items-center justify-center animate-gradient",
              "bg-[#e81111] text-white hover:bg-[#ff2b2b] shadow-[0_0_20px_rgba(232,17,17,0.5)]",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: shouldAnimate ? buttonDelay : 0,
                ease: "easeOut",
              }}
              style={{ willChange: "opacity" }}
            >
              {t("hero.getTicket")}
            </motion.span>
          </MotionLink>
        </TooltipTrigger>
        <TooltipContent className="font-sans">
          <p>{t("hero.getTicketTooltip")}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
