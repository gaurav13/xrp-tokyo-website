"use client";

import { useTranslations } from "next-intl";
import { Hero } from "@/components/section/hero";
import { HubSection } from "@/components/section/hub-section";
import { HighlightsSection } from "@/components/section/highlights-section";
import { EventOverview } from "@/components/event-overview";
import { NextSection } from "@/components/section/next-section";
import { SponsorSection } from "@/components/section/sponsor-section";
import { SpeakerSection } from "@/components/section/speaker-section";
import { MobileTicketButton } from "@/components/mobile-ticket-button";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { XLogoIcon, LinkedInLogoIcon } from "@/components/icons/social";
import { SOCIAL_LINKS } from "@/lib/constants";
import Image from "next/image";
export default function Home() {
  const t = useTranslations();
  const isAtBottom = useScrollPosition(0.95);

  return (
    <main className="bg-background">
      <div className="wrapper">
        {/* Hero Section - Sticky */}
        <section className="relative w-full bg-background sticky top-0">
          <Hero />
        </section>

        {/* About Section - Sticky */}
        <EventOverview />

        {/* Hub Section */}
        <HubSection />

        {/* Highlights Section */}
        <HighlightsSection />

        {/* Speaker Section */}
        <SpeakerSection />

        {/* Sponsor Section */}
        <SponsorSection />

        {/* Next Section - Sticky */}
        <NextSection />
      </div>

      {/* Footer Section */}
      <footer className="relative bg-black text-white border-t border-[#e81111] shadow-[0_-5px_15px_rgba(232,17,17,0.3)] pb-20 md:pb-0">
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e81111] to-transparent shadow-[0_0_15px_#e81111]"
          aria-hidden="true"
        />
        <div
          className="transition-all ease-linear flex flex-col items-center justify-center py-12 px-4 text-center gap-6"
          style={{
            transform: `translateY(${isAtBottom ? 16 : 80}px)`,
          }}
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          <Image
            src="/logo-dark.svg"
            alt="XRP Tokyo 2026"
            width={140}
            height={24}
            className="h-6 w-auto"
            priority
          />
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="X (Twitter) でフォロー"
            >
              <XLogoIcon className="text-white" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="LinkedIn でフォロー"
            >
              <LinkedInLogoIcon className="text-white" />
            </a>
          </div>
        </div>

        <div className="pb-6 text-center text-gray-500 text-xs">
          {t("footer.copyright")}
        </div>
      </footer>

      {/* モバイル用固定GET TICKETボタン */}
      <MobileTicketButton />
    </main>
  );
}
