import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Tier } from "@/config/enums";
import { TIER_CONFIGS } from "@/config/sponsors";

/**
 * Tier ごとのロゴボックススタイル
 * 上位 tier ほどパディング・角丸・ホバー効果が大きい
 */
const TIER_STYLES: Record<
  Tier,
  { padding: string; rounded: string; hover: string; shadow: string }
> = {
  [Tier.Title]: {
    padding: "p-8 md:p-10",
    rounded: "rounded-2xl",
    hover: "hover:shadow-lg hover:scale-[1.03]",
    shadow: "shadow-sm",
  },
  [Tier.Platinum]: {
    padding: "p-6 md:p-8",
    rounded: "rounded-xl",
    hover: "hover:shadow-lg hover:scale-[1.03]",
    shadow: "shadow-sm",
  },
  [Tier.Gold]: {
    padding: "p-5 md:p-6",
    rounded: "rounded-xl",
    hover: "hover:shadow-md hover:scale-105",
    shadow: "",
  },
  [Tier.Silver]: {
    padding: "p-4 md:p-5",
    rounded: "rounded-lg",
    hover: "hover:shadow-md hover:scale-105",
    shadow: "",
  },
  [Tier.Bronze]: {
    padding: "p-3 md:p-4",
    rounded: "rounded-lg",
    hover: "hover:shadow-sm hover:scale-105",
    shadow: "",
  },
  [Tier.MediaPartner]: {
    padding: "p-3 md:p-4",
    rounded: "rounded-lg",
    hover: "hover:shadow-sm hover:scale-105",
    shadow: "",
  },
  [Tier.Education]: {
    padding: "p-3 md:p-4",
    rounded: "rounded-lg",
    hover: "hover:shadow-sm hover:scale-105",
    shadow: "",
  },
  [Tier.CommunityPartner]: {
    padding: "p-2.5 md:p-3",
    rounded: "rounded-md",
    hover: "hover:shadow-sm hover:scale-105",
    shadow: "",
  },
};

const logoVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

interface LogoBoxProps {
  tier: Tier;
  logo: string;
  alt: string;
  className?: string;
  website?: string;
}

export const LogoBox = ({
  tier,
  logo,
  alt,
  website,
  className,
}: LogoBoxProps) => {
  const ts = TIER_STYLES[tier];
  const { borderAccent } = TIER_CONFIGS[tier];
  const styles = cn(
    "relative w-full bg-black border border-white/40 transition-all duration-200 cursor-pointer active:scale-100",
    ts.padding,
    ts.rounded,
    ts.hover,
    ts.shadow,
    borderAccent,
    className,
  );

  const inner = (
 <div
  className="
    w-full h-full
    rounded-xl
    bg-black/40
    shadow-[0_10px_30px_rgba(0,0,0,0.6)]
     flex items-center justify-center
    backdrop-blur-sm
  "
>
  <div className="relative w-full h-full">
    <Image
      src={logo}
      alt={alt}
      fill
      className="object-contain"
      sizes="(max-width: 768px) 50vw, 200px"
    />
  </div>
</div>
  );

  if (website) {
    return (
      <motion.a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
        variants={logoVariants}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div className={styles} variants={logoVariants}>
      {inner}
    </motion.div>
  );
};
