"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { SECTION_STYLES } from "@/lib/styles/common";
import { LogoBox } from "@/components/section/sponsor-section/logo-box";
import { SectionTitle } from "@/components/layout/section-title";
import { TierTitle } from "@/components/section/sponsor-section/tier-title";
import { Tier } from "@/config/enums";

/**
 * Tier ごとの表示設定
 *
 * - containerClass: ロゴ群のレイアウト（flex / grid）と最大幅
 * - logoClass: 個々のロゴボックスのサイズ（aspect-ratio で高さを制御）
 * - gap: tier ブロック全体の上マージン（上位 tier ほど広い）
 * - titleGap: TierTitle とロゴ群の間隔
 * - initialY: フェードイン時の y オフセット（上位ほど大きい）
 */
const TIER_DISPLAY_ORDER: {
  tier: Tier;
  containerClass: string;
  logoClass: string;
  gap: string;
  titleGap: string;
  initialY: number;
}[] = [
  {
    tier: Tier.Title,
    containerClass: "flex flex-wrap justify-center gap-6 w-full max-w-md mx-auto",
    logoClass: "w-full max-w-xs aspect-[2/1]",
    gap: "mt-0",
    titleGap: "mb-6",
    initialY: 40,
  },
  {
    tier: Tier.Platinum,
    containerClass: "flex flex-wrap justify-center gap-5 w-full max-w-lg mx-auto",
    logoClass: "w-full max-w-[280px] aspect-[1.8/1]",
    gap: "mt-16 md:mt-20",
    titleGap: "mb-5",
    initialY: 40,
  },
  {
    tier: Tier.Gold,
    containerClass: "flex flex-wrap justify-center gap-4 w-full max-w-lg mx-auto",
    logoClass: "w-full max-w-[220px] aspect-[1.6/1]",
    gap: "mt-14 md:mt-16",
    titleGap: "mb-4",
    initialY: 32,
  },
  {
    tier: Tier.Silver,
    containerClass: "flex flex-wrap justify-center gap-4 w-full max-w-xl mx-auto",
    logoClass: "w-[calc(50%-0.5rem)] max-w-[200px] aspect-[1.5/1]",
    gap: "mt-12 md:mt-14",
    titleGap: "mb-4",
    initialY: 28,
  },
  {
    tier: Tier.Bronze,
    containerClass: "flex flex-wrap justify-center gap-3 w-full max-w-lg mx-auto",
    logoClass: "w-[calc(33.333%-0.5rem)] max-w-[160px] aspect-[1.4/1]",
    gap: "mt-10 md:mt-12",
    titleGap: "mb-3",
    initialY: 24,
  },
  {
    tier: Tier.MediaPartner,
    containerClass:
      "grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-lg mx-auto",
    logoClass: "aspect-[1.4/1]",
    gap: "mt-10 md:mt-12",
    titleGap: "mb-3",
    initialY: 24,
  },
  {
    tier: Tier.CommunityPartner,
    containerClass:
      "grid grid-cols-3 md:grid-cols-4 gap-2.5 w-full max-w-xl mx-auto",
    logoClass: "aspect-square",
    gap: "mt-8 md:mt-10",
    titleGap: "mb-2",
    initialY: 24,
  },
];

export function SponsorSection() {
  const t = useTranslations();
  const [sponsorsByTier, setSponsorsByTier] = useState<
    {
      name: string;
      tier: Tier;
      logo: string;
      website?: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSponsors = async () => {
      try {
        const res = await fetch("/data.json");
        if (!res.ok) throw new Error("Failed to load data.json");
        const data = (await res.json()) as {
          sponsors?: {
            name: string;
            tier: string;
            logo: string;
            website?: string;
          }[];
        };

        const tierMap: Record<string, Tier> = {
          Title: Tier.Title,
          Platinum: Tier.Platinum,
          Gold: Tier.Gold,
          Silver: Tier.Silver,
          Bronze: Tier.Bronze,
          "Media Partner": Tier.MediaPartner,
          Education: Tier.Education,
          "Community Partner": Tier.CommunityPartner,
        };

        if (isMounted) {
          setSponsorsByTier(
            (data.sponsors ?? []).map((sponsor) => ({
              name: sponsor.name,
              tier: tierMap[sponsor.tier] ?? Tier.CommunityPartner,
              logo: sponsor.logo,
              website: sponsor.website,
            })),
          );
        }
      } catch (error) {
        console.error("Failed to fetch sponsors", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchSponsors();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="sponsors"
      className="relative w-full flex flex-col items-center justify-center bg-black py-16 md:py-24 rounded-tr-2xl rounded-tl-2xl text-white"
    >
      <div className={SECTION_STYLES.container}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 h-px w-24 bg-[#e81111]" aria-hidden="true" />
          <SectionTitle
            title={t("sponsorSection.title")}
            className="text-white"
            accentClassName="bg-gradient-to-r from-transparent via-[#e81111] to-transparent"
          />

          {isLoading ? (
            <motion.p
              className="text-white/70 text-sm md:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Loading sponsors...
            </motion.p>
          ) : (
            TIER_DISPLAY_ORDER.map(
            ({ tier, containerClass, logoClass, gap, titleGap, initialY }) => {
              const sponsors = sponsorsByTier.filter((s) => s.tier === tier);
              if (sponsors.length === 0) return null;

              return (
                <motion.div
                  key={tier}
                  className={`w-full ${gap}`}
                  initial={{ opacity: 0, y: initialY }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className={titleGap}>
                    <TierTitle tier={tier} />
                  </div>
                  <motion.div
                    className={containerClass}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ staggerChildren: 0.06 }}
                  >
                    {sponsors.map((sponsor) => (
                      <LogoBox
                        key={sponsor.name}
                        tier={tier}
                        alt={sponsor.name}
                        logo={sponsor.logo}
                        website={sponsor.website}
                        className={logoClass}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              );
            },
          )
          )}
        </div>
      </div>
    </section>
  );
}
