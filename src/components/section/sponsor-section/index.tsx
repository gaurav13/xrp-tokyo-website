
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
    containerClass: "flex flex-wrap justify-center items-start gap-6 w-full max-w-md mx-auto",
   
logoClass: "w-full max-w-xs aspect-[2/1] border-4 border-white rounded-2xl bg-white/5 shadow-[0_0_25px_rgba(255,255,255,0.3)]",
    gap: "mt-0",
    titleGap: "mb-6",
    initialY: 40,
  },
  {
    tier: Tier.Platinum,
    containerClass: "grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-0 w-full max-w-2xl mx-auto justify-items-center items-start",
   logoClass: "w-full max-w-[300px] md:max-w-[280px] aspect-[1.8/1] border-2 border-slate-300 rounded-xl platinum-blink-card",
    gap: "mt-16 md:mt-20",
    titleGap: "mb-5",
    initialY: 40,
  },
  {
    tier: Tier.Gold,
    containerClass:
      "flex flex-wrap justify-center items-start gap-x-5 gap-y-6 w-full max-w-3xl mx-auto",
    logoClass:
      "w-full max-w-[280px] md:max-w-[260px] aspect-[1.8/1] border-2 border-[#D4AF37] rounded-lg bg-black/20 shadow-[0_0_10px_rgba(212,175,55,0.2)]",
    gap: "mt-14 md:mt-16",
    titleGap: "mb-4",
    initialY: 32,
  },
  {
    tier: Tier.Silver,
    containerClass: "flex flex-wrap justify-center items-start gap-4 w-full max-w-3xl mx-auto",
   logoClass: "w-[calc(33.333%-1rem)] min-w-[160px] aspect-[1.5/1] border-[1.5px] border-[#C0C0C0] rounded-md bg-black/10 shadow-[0_0_8px_rgba(192,192,192,0.15)]",
    gap: "mt-12 md:mt-14",
    titleGap: "mb-4",
    initialY: 28,
  },
  {
    tier: Tier.Bronze,
    containerClass: "flex flex-wrap md:flex-nowrap justify-center items-start gap-3 w-full max-w-4xl mx-auto",
logoClass: "w-full max-w-[160px] md:w-auto md:flex-1 md:max-w-[200px] aspect-[1.5/1] border border-[#CD7F32]/60 rounded-md bg-black/5",
    gap: "mt-10 md:mt-12",
    titleGap: "mb-3",
    initialY: 24,
  },
  {
    tier: Tier.Research,
    containerClass:
      "flex flex-wrap md:flex-nowrap justify-center items-start gap-3 w-full max-w-4xl mx-auto",
logoClass: "w-full max-w-[160px] md:w-auto md:flex-1 md:max-w-[200px] aspect-[1.5/1] border border-cyan-300/40 rounded-md bg-white/5 shadow-sm",
    gap: "mt-10 md:mt-12",
    titleGap: "mb-3",
    initialY: 24,
  },
  {
    tier: Tier.Supporter,
    containerClass:
      "flex flex-wrap md:flex-nowrap justify-center items-start gap-3 w-full max-w-4xl mx-auto",
logoClass: "w-full max-w-[160px] md:w-auto md:flex-1 md:max-w-[200px] aspect-[1.5/1] border border-indigo-300/40 rounded-md bg-white/5 shadow-sm",
    gap: "mt-10 md:mt-12",
    titleGap: "mb-3",
    initialY: 24,
  },
  {
    tier: Tier.Media,
    containerClass:
      "flex flex-wrap md:flex-nowrap justify-center items-start gap-3 w-full max-w-4xl mx-auto",
logoClass: "w-full max-w-[160px] md:w-auto md:flex-1 md:max-w-[200px] aspect-[1.5/1] border border-[#4A90E2]/40 rounded-md bg-white/5 shadow-sm",
    gap: "mt-10 md:mt-12",
    titleGap: "mb-3",
    initialY: 24,
  },
  {
    tier: Tier.Education,
    containerClass:
      "flex flex-wrap md:flex-nowrap justify-center items-start gap-3 w-full max-w-4xl mx-auto",
    logoClass:
      "w-full max-w-[160px] md:w-auto md:flex-1 md:max-w-[200px] aspect-[1.4/1] border border-[#10B981]/40 rounded-md bg-white/5 shadow-sm",
    gap: "mt-10 md:mt-12",
    titleGap: "mb-3",
    initialY: 24,
  },
  {
    tier: Tier.Community,
    containerClass:
      "grid grid-cols-3 md:grid-cols-4 gap-2.5 w-full max-w-xl mx-auto items-start",
   
logoClass: "aspect-square border border-[#22D3EE]/30 rounded-lg bg-white/5 hover:border-[#22D3EE]/60 transition-colors",
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
      logo?: string;
      website?: string;
      whiteLogo?: boolean;
      forceWhiteBackground?: boolean;
      logoInset?: boolean;
      /** Bronze: "corporate" (企業) vs default / "individual" → Heroes */
      type?: string;
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
            tier?: string;
            logo?: string;
            website?: string;
            whiteLogo?: boolean;
            forceWhiteBackground?: boolean;
            logoInset?: boolean;
            type?: string;
          }[];
        };

        const tierMap: Record<string, Tier> = {
          Title: Tier.Title,
          Platinum: Tier.Platinum,
          Gold: Tier.Gold,
          Silver: Tier.Silver,
          Bronze: Tier.Bronze,
          Research: Tier.Research,
          "Research Partner": Tier.Research,
          Supporter: Tier.Supporter,
          Media: Tier.Media,
          "Media Partner": Tier.Media,
          Education: Tier.Education,
          "Education Partner": Tier.Education,
          Community: Tier.Community,
          "Community Partner": Tier.Community,
        };

        if (isMounted) {
          const mapped = (data.sponsors ?? []).map((sponsor) => ({
            name: sponsor.name,
            tier: tierMap[sponsor.tier ?? ""] ?? Tier.Community,
            logo: sponsor.logo,
            website: sponsor.website,
            whiteLogo: sponsor.whiteLogo,
            forceWhiteBackground: sponsor.forceWhiteBackground,
            logoInset: sponsor.logoInset,
            type: sponsor.type,
          }));
          // 同一 tier 内で同じ logo パスが重複しないようにする（先頭を残す）。logo なしは name で一意化
          const seen = new Set<string>();
          setSponsorsByTier(
            mapped.filter((s) => {
              const key = s.logo ? `${s.tier}:${s.logo}` : `${s.tier}:${s.name}`;
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            }),
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
      className="relative w-full flex flex-col items-center justify-center bg-black py-16 md:py-24 rounded-tr-2xl rounded-tl-2xl text-white scroll-mt-24"
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

              const bronzeSubLabelClass =
                "text-xs text-amber-600/70 uppercase tracking-widest mb-2 text-center";

              const renderLogoGrid = (list: typeof sponsors) => {
                return (
                <motion.div
                  className={containerClass}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ staggerChildren: 0.06 }}
                >
                  {list.map((sponsor) => (
                    <LogoBox
                      key={sponsor.name}
                      tier={tier}
                      alt={sponsor.name}
                      logo={sponsor.logo}
                      website={sponsor.website}
                      className={logoClass}
                      whiteLogo={sponsor.whiteLogo}
                      whiteBackground={sponsor.forceWhiteBackground}
                      logoInset={sponsor.logoInset}
                    />
                  ))}
                </motion.div>
                );
              };

              return (
                <motion.div
                  key={tier}
                  className={`w-full  ${gap}`}
                  initial={{ opacity: 0, y: initialY }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className={titleGap}>
                    <TierTitle tier={tier} />
                  </div>
                  {tier === Tier.Bronze ? (
                    <div className="flex flex-col w-full gap-8">
                      {(() => {
                        const corporate = sponsors.filter(
                          (s) => s.type === "corporate",
                        );
                        const heroes = sponsors.filter(
                          (s) => s.type !== "corporate",
                        );
                        return (
                          <>
                            {corporate.length > 0 && (
                              <div className="w-full">
                                <p className={bronzeSubLabelClass}>
                                  Corporate
                                </p>
                                {renderLogoGrid(corporate)}
                              </div>
                            )}
                            {heroes.length > 0 && (
                              <div className="w-full">
                                <p className={bronzeSubLabelClass}>Heroes</p>
                                {renderLogoGrid(heroes)}
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    renderLogoGrid(sponsors)
                  )}
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
