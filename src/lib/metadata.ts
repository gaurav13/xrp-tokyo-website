import type { Metadata } from "next";
import { SITE_URL, METADATA, OG_IMAGE_PATH, type Locale } from "./constants";

/**
 * ロケールに応じたメタデータを生成
 */
export function getMetadata(locale: Locale): Metadata {
  const metadata = METADATA[locale];
  const alternateLocale = locale === "ja" ? "en" : "ja";
  const currentUrl = `${SITE_URL}/${locale}`;
  const ogImageUrl = `${SITE_URL}${OG_IMAGE_PATH}`;

  const keywords =
    locale === "ja"
      ? [
          "XRP Tokyo",
          "XRP Tokyo 2026",
          "XRPL Japan",
          "XRP Ledger",
          "RWA",
          "DeFi",
          "NFT",
          "ブロックチェーン",
          "Web3",
          "イベント",
          "東京",
          "TEAMZ Summit",
        ]
      : [
          "XRP Tokyo",
          "XRP Tokyo 2026",
          "XRPL Japan",
          "XRP Ledger",
          "RWA",
          "DeFi",
          "NFT",
          "blockchain",
          "Web3",
          "event",
          "Tokyo",
          "TEAMZ Summit",
        ];

  return {
    title: metadata.title,
    description: metadata.description,
    keywords,
    authors: [{ name: "XRPL Japan" }],
    metadataBase: new URL(SITE_URL),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: metadata.title,
          type: "image/jpeg",
        },
      ],
      url: currentUrl,
      type: "website",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      alternateLocale: alternateLocale === "ja" ? "ja_JP" : "en_US",
      siteName: "XRP Tokyo",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        ja: `${SITE_URL}/ja`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/ja`,
      },
    },
  };
}
