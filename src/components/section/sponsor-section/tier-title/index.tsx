"use client";

import { motion } from "motion/react";
import { TIER_CONFIGS } from "@/config/sponsors";
import { Tier } from "@/config/enums";

const TIER_TEXT_SIZE: Record<Tier, string> = {
  [Tier.Title]: "text-2xl md:text-4xl font-semibold",
  [Tier.Platinum]: "text-xl md:text-3xl font-semibold",
  [Tier.Gold]: "text-xl md:text-2xl font-medium",
  [Tier.Silver]: "text-lg md:text-xl font-medium",
  [Tier.Bronze]: "text-base md:text-lg font-medium",
  [Tier.MediaPartner]: "text-base md:text-lg font-medium",
  [Tier.Education]: "text-base md:text-lg font-medium",
  [Tier.CommunityPartner]: "text-base md:text-lg font-medium",
};

const UPPER_TIERS = new Set([Tier.Title, Tier.Platinum]);

export function TierTitle({ tier }: { tier: Tier }) {
  const borderThickness = UPPER_TIERS.has(tier) ? "border-t-2" : "border-t";

  return (
    <motion.div
      className="relative flex items-center justify-center w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div
        className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0 ${borderThickness} border-white/20`}
        aria-hidden="true"
      />
      <h3
        className={`relative z-10 px-4 bg-black ${TIER_TEXT_SIZE[tier]} ${TIER_CONFIGS[tier].textColor} tracking-normal whitespace-nowrap`}
      >
        {TIER_CONFIGS[tier].name}
      </h3>
    </motion.div>
  );
}
