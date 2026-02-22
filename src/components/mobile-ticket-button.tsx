"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Ticket } from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { trackTicketButtonClick } from "@/lib/gtag";

export function MobileTicketButton() {
  const t = useTranslations();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="container mx-auto px-4 pb-4 pt-2">
        <Link
          href={EVENT_INFO.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTicketButtonClick("mobile_fixed")}
          className={cn(
            "w-full h-12 flex items-center justify-center gap-2.5",
            "text-base font-semibold shadow-xl",
            "bg-gradient-to-r from-[#e81111] to-[#b30d0d] text-white",
            "hover:from-[#ff2b2b] hover:to-[#d31212]",
            "relative inline-flex items-center justify-center",
            "animate-gradient rounded-xl",
            "transition-all duration-200",
            "active:scale-95",
          )}
        >
          <Ticket className="size-5" />
          <span>{t("hero.getTicket")}</span>
        </Link>
      </div>
    </div>
  );
}
