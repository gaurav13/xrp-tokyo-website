"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { SECTION_STYLES } from "@/lib/styles/common";

type HubSectionProps = {
  variant?: "textLeft" | "imageLeft";
};

const STATS = [
  { value: "3,000+", labelKey: "hubSection.stats.attendees" },
  { value: "30+", labelKey: "hubSection.stats.sessions" },
  { value: "100+", labelKey: "hubSection.stats.companies" },
];

function HubImages() {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 lg:grid-cols-[1.1fr_1fr] grid-rows-2 gap-4">
        <div className="col-span-2">                                 
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-[#e81111]/60 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <Image
              src="/hub1.png"
              alt="Conference hall"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#e81111]/60 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <Image
            src="/hub2.png"
            alt="Venue"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#e81111]/60 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <Image
            src="/hub3.png"
            alt="Community"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#e81111]/20 blur-2xl" />
      <div className="pointer-events-none absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
    </div>
  );
}

function HubText() {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
          {t("hubSection.heading.line1")}
          <br />
          {t("hubSection.heading.line2")}
          <br />
          {t("hubSection.heading.line3")}
        </h2>

        <p className="text-base sm:text-lg text-white/80 font-semibold">
          {t("hubSection.subheading")}
        </p>

        <p className="text-sm sm:text-base text-white/60 max-w-xl">
          {t("hubSection.description")}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 sm:gap-8 w-full max-w-lg">
        {STATS.map((stat) => (
          <div
            key={stat.labelKey}
            className="space-y-1.5 text-center min-w-0"
          >
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tabular-nums">
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#fbc500]">
              {t(stat.labelKey)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HubSection({ variant = "textLeft" }: HubSectionProps) {
  const isImageLeft = variant === "imageLeft";
  const t = useTranslations();

  return (
    <section className="relative w-full bg-black text-white">
      <div className={`${SECTION_STYLES.container} py-16 md:py-24 space-y-16`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          {isImageLeft ? (
            <>
              <HubImages />
              <HubText />
            </>
          ) : (
            <>
              <HubText />
              <HubImages />
            </>
          )}
        </div>

        {/* New reversed block (as per screenshot) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
  {/* TEXT: first on mobile, second on desktop */}
        <div className="order-1 lg:order-2 space-y-6">
  <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
    <span className="block text-white">
      {t("redCarpetSection.heading.line1")}
    </span>

    <span className="block text-white">
      {t("redCarpetSection.heading.line2")}
    </span>

    <span className="block bg-gradient-to-r from-[#c89b3c] via-[#f6d365] to-[#b8860b] bg-clip-text text-transparent">
      {t("redCarpetSection.heading.line3")}
    </span>
  </h3>

  <p className="text-sm sm:text-base text-white/70 tracking-wide">
    {t("redCarpetSection.meta")}
  </p>

  <p className="text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
    {t("redCarpetSection.description")}
  </p>

  {/* VIP Button */}
  <a
    href="https://luma.com/da2ucul1"
    target="_blank"
    rel="noreferrer"
    className="
      inline-flex items-center justify-center
      rounded-full px-8 py-3
      font-semibold uppercase tracking-wide
      text-black
      bg-gradient-to-r from-[#c89b3c] via-[#f6d365] to-[#b8860b]
      shadow-[0_0_18px_rgba(246,211,101,0.35)]
      transition-all duration-300
      hover:scale-105
      hover:shadow-[0_0_28px_rgba(246,211,101,0.6)]
      focus:outline-none focus:ring-2 focus:ring-[#f6d365]/70 focus:ring-offset-2 focus:ring-offset-black
    "
  >
    {t("redCarpetSection.ctaLabel")}
  </a>
</div>

  {/* IMAGES: second on mobile, first on desktop */}
  <div className="order-2 lg:order-1">
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-[#e81111]/60 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <Image
            src="/redcarpet1img.webp"
            alt="Red carpet wall"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#e81111]/60 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        <Image
          src="/rcarpet2.png"
          alt="Networking"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#e81111]/60 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        <Image
          src="/rcarpet3.png"
          alt="VIP after party"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
      </div>
    </div>
  </div>
</div>
        
      </div>
    </section>
  );
}
