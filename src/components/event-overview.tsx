"use client";

import { useTranslations } from "next-intl";
import { getFadeInAnimation } from "@/lib/utils/animation";
import { SECTION_STYLES } from "@/lib/styles/common";
import { Card, CardContent } from "@/components/ui/card";
import { GlitchText } from "@/components/glitch-text";
import { useBackgroundAttachment } from "@/hooks/use-background-attachment";

export function EventOverview() {
  const t = useTranslations();
  const cardAnimation = getFadeInAnimation("immediate");
  const backgroundAttachment = useBackgroundAttachment();

  return (
    <section
      id="about"
      className={`relative w-full ${SECTION_STYLES.sticky} flex flex-col items-center justify-center scroll-mt-24`}
      style={{
        backgroundImage: "url('/carp.jpeg')",
        backgroundAttachment,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/70 z-[1]" />

      <div className="relative z-10 w-full pt-16 sm:pt-20 md:pt-0">
        <div className={SECTION_STYLES.container}>
          <Card
            className={`${cardAnimation.className} bg-card/60 backdrop-blur-sm w-full`}
            style={cardAnimation.style}
          >
            <CardContent className="p-5 sm:p-6 md:py-8 md:px-8">
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight md:leading-[1.2] text-foreground break-words">
  {t("eventOverview.heading.line1")}
  <br className="hidden sm:block" />

  <span className="inline-flex flex-wrap items-baseline gap-1 sm:gap-1.5">
    <span className="whitespace-normal sm:whitespace-nowrap">
      {t("eventOverview.heading.line2Before")}
    </span>

    <GlitchText>{t("eventOverview.heading.glitchWord")}</GlitchText>

    <span className="whitespace-normal sm:whitespace-nowrap">
      {t("eventOverview.heading.line2After")}
    </span>
  </span>
</h3>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-foreground">
                  {t("eventOverview.content.paragraph1")}
                </p>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-foreground">
                  {t("eventOverview.content.paragraph2")}
                </p>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-foreground">
                  {t("eventOverview.content.paragraph3")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
