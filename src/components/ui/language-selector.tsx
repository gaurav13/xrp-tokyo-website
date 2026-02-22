"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import { LOCALES, type Locale } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LanguageSelectorProps = {
  className?: string;
};

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const t = useTranslations();
  const [currentLocale, setCurrentLocale] = useState<Locale>("ja");

  useEffect(() => {
    // Cookieから現在のロケールを読み込む（サーバー側と同期）
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const cookieLocale = getCookie("locale") as Locale | null;
    if (cookieLocale && LOCALES.some((loc) => loc.code === cookieLocale)) {
      setCurrentLocale(cookieLocale);
    } else {
      // Cookieがない場合はlocalStorageから読み込む
      const savedLocale = localStorage.getItem("locale") as Locale | null;
      if (savedLocale && LOCALES.some((loc) => loc.code === savedLocale)) {
        setCurrentLocale(savedLocale);
        // Cookieにも同期
        document.cookie = `locale=${savedLocale}; path=/; max-age=31536000`;
      }
    }
  }, []);

  const handleLocaleChange = async (locale: Locale) => {
    setCurrentLocale(locale);
    localStorage.setItem("locale", locale);

    // Cookieにも保存（サーバー側で読み取るため）
    document.cookie = `locale=${locale}; path=/; max-age=31536000`; // 1年間有効

    // ページをリロードしてロケールを反映
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className,
          )}
          aria-label={t("header.selectLanguage")}
        >
          <Globe className="size-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => handleLocaleChange(locale.code)}
            className={currentLocale === locale.code ? "bg-accent" : ""}
          >
            {locale.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
