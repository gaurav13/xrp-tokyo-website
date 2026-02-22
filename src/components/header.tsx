"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Ticket, Gift } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { IconButton } from "@/components/animate-ui/components/buttons/icon";
import { SOCIAL_LINKS, EVENT_INFO, SPONSOR_LINKS } from "@/lib/constants";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { trackTicketButtonClick } from "@/lib/gtag";
import { useGiveawayDialog } from "@/components/giveaway-dialog";

export function Header() {
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrolled();
  const { openDialog } = useGiveawayDialog();

  const navItems = [
    { label: t("header.about"), href: "#about" },
    { label: t("header.highlights"), href: "#highlights" },
    { label: t("header.speakers"), href: "#speakers" },
    { label: t("header.sponsors"), href: "#sponsors" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 text-white backdrop-blur border-b border-white/10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* ブランド */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white tracking-[0.25em] text-sm sm:text-base font-semibold"
          aria-label="XRP Tokyo 2026"
        >
          <span className="uppercase">XRP</span>
          <span className="uppercase tracking-[0.2em]">Tokyo</span>
          <span className="uppercase text-[#e81111] tracking-[0.25em]">
            2026
          </span>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 transition-colors hover:bg-white/20"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 右側のアクション */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          {/* スポンサーボタン（デスクトップのみ） */}
          <Link
            href={SPONSOR_LINKS.teamz}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors hover:bg-white/15"
            aria-label={t("header.sponsor")}
          >
            {t("header.sponsor")}
          </Link>
          {/* ギブアウェイボタン（デスクトップのみ） */}
          <button
            onClick={openDialog}
            className="hidden md:flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white/80 transition-colors hover:bg-white/15"
            aria-label={t("header.giveaway")}
          >
            <Gift className="size-5" />
          </button>
          {/* 言語選択 */}
          <LanguageSelector className="rounded-full border border-white/15 bg-white/5 text-white/80 hover:bg-white/15" />
          {/* Xアイコンボタン */}
          <XIconButton className="rounded-full border border-white/15 bg-white/5 text-white/80 hover:bg-white/15" />

          {/* チケットボタン */}
          <div
            className={cn(
              "hidden md:block relative h-9 transition-all duration-300",
              isScrolled ? "w-[120px]" : "w-9",
            )}
          >
            {/* アイコンボタン（スクロール前） */}
            <div
              className={cn(
                "absolute inset-0 transition-all duration-300",
                isScrolled ? "opacity-0 pointer-events-none" : "opacity-100",
              )}
            >
              <Link
                href={EVENT_INFO.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("header.getTicket")}
                onClick={() => trackTicketButtonClick("header_icon")}
                className="block"
              >
                <IconButton variant="ghost" size="default">
                  <Ticket className="size-5" />
                </IconButton>
              </Link>
            </div>

            {/* テキストボタン（スクロール後） */}
            <motion.div
              className={cn(
                "absolute inset-0",
                isScrolled ? "pointer-events-auto" : "pointer-events-none",
              )}
              initial={{ opacity: 0 }}
              animate={isScrolled ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                size="sm"
                variant="default"
                className="h-9 px-4 text-sm font-semibold w-full relative overflow-hidden bg-[#e81111] text-white hover:bg-[#ff2b2b]"
                asChild
              >
                <Link
                  href={EVENT_INFO.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackTicketButtonClick("header_text")}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isScrolled ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <Ticket className="size-4" />
                    {t("hero.getTicket")}
                  </motion.span>
                </Link>
              </Button>

            </motion.div>
          </div>

          {/* モバイルメニューボタン */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white transition-colors hover:bg-white/15 md:hidden"
            aria-label={t("header.openMenu")}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-white/10 bg-black md:hidden overflow-hidden"
          >
            <nav className="container mx-auto flex flex-col px-4 py-4 md:px-6 lg:px-8 gap-4 text-white">
              {/* モバイル用ナビゲーション */}
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 transition-colors hover:bg-white/15"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              {/* モバイル用チケットボタン */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              >
                <Button
                  size="default"
                  className="w-full h-10 text-sm font-semibold bg-[#e81111] text-white hover:bg-[#ff2b2b]"
                  asChild
                >
                  <Link
                    href={EVENT_INFO.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackTicketButtonClick("header_mobile_menu")}
                  >
                    {t("hero.getTicket")}
                  </Link>
                </Button>
              </motion.div>
              {/* ギブアウェイボタン（モバイル） */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
              >
                <button
                  onClick={() => {
                    openDialog();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors w-full text-left"
                >
                  <Gift className="size-4" />
                  {t("header.giveaway")}
                </button>
              </motion.div>
              {/* スポンサーリンク */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
              >
                <Link
                  href={SPONSOR_LINKS.teamz}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {t("header.sponsor")}
                </Link>
              </motion.div>
              {/* ナビゲーション項目は後で追加可能 */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e81111] to-transparent shadow-[0_0_15px_#e81111] animate-pulse"
        aria-hidden="true"
      />
    </header>
  );
}

// Xアイコンボタンコンポーネント
function XIconButton({ className }: { className?: string }) {
  const t = useTranslations();
  return (
    <a
      href={SOCIAL_LINKS.x}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      aria-label={t("header.followOnX")}
    >
      <svg
        fill="none"
        viewBox="0 0 1200 1227"
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
      >
        <path
          fill="currentColor"
          d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
        />
      </svg>
    </a>
  );
}
