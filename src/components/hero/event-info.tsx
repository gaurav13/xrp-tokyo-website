"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Calendar as CalendarIcon, MapPin } from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";
import { getFadeInAnimation } from "@/lib/utils/animation";

type EventInfoProps = {
  onCalendarClick: () => void;
  shouldAnimate?: boolean;
};

export function EventInfo({
  onCalendarClick,
  shouldAnimate = false,
}: EventInfoProps) {
  const t = useTranslations();
  const animation = getFadeInAnimation("medium");

  return (
    <div
      className={`mb-10 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-8 ${shouldAnimate ? animation.className : "opacity-0"}`}
      style={shouldAnimate ? animation.style : undefined}
    >
      <button
        onClick={onCalendarClick}
        className="flex items-center gap-2.5 rounded-full border border-border/50 bg-background/50 px-5 py-2 backdrop-blur-sm md:border-transparent md:bg-transparent md:p-0 md:backdrop-blur-none transition-colors hover:bg-accent/50 cursor-pointer"
      >
        <CalendarIcon className="size-5 text-primary" />
        <span className="font-mono text-base font-medium tracking-wider text-foreground md:text-lg">
          {t("eventInfo.dateDisplay")}
        </span>
      </button>

      <div className="hidden h-8 w-px bg-white md:block" />

      <Link
        href={EVENT_INFO.locationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 rounded-full border border-border/50 bg-background/50 px-5 py-2 backdrop-blur-sm md:border-transparent md:bg-transparent md:p-0 md:backdrop-blur-none transition-colors hover:bg-accent/50"
      >
        <MapPin className="size-5 text-primary" />
        <span className="font-mono text-base font-medium tracking-wider text-foreground md:text-lg">
          {t("eventInfo.location")}
        </span>
      </Link>
    </div>
  );
}
