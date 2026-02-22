"use client";

import { useEffect } from "react";
import { LOCALES, type Locale } from "@/lib/constants";

/**
 * 初回訪問時にcookieがない場合、確実に日本語のcookieを設定するコンポーネント
 */
export function LocaleInitializer() {
  useEffect(() => {
    // Cookieから現在のロケールを取得
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const cookieLocale = getCookie("locale") as Locale | null;
    const savedLocale = localStorage.getItem("locale") as Locale | null;

    // cookieもlocalStorageもない場合、日本語をデフォルトとして設定
    if (!cookieLocale && !savedLocale) {
      const defaultLocale: Locale = "ja";
      localStorage.setItem("locale", defaultLocale);
      document.cookie = `locale=${defaultLocale}; path=/; max-age=31536000`; // 1年間有効
    } else if (cookieLocale && !savedLocale) {
      // cookieはあるがlocalStorageにない場合、同期
      if (LOCALES.some((loc) => loc.code === cookieLocale)) {
        localStorage.setItem("locale", cookieLocale);
      }
    } else if (savedLocale && !cookieLocale) {
      // localStorageはあるがcookieにない場合、cookieに同期
      if (LOCALES.some((loc) => loc.code === savedLocale)) {
        document.cookie = `locale=${savedLocale}; path=/; max-age=31536000`;
      }
    }
  }, []);

  return null;
}
