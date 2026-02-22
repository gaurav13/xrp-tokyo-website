/**
 * イベント情報の定数定義
 */

const EVENT_DATE = new Date(2026, 3, 7); // 2026年4月7日 (月は0ベースなので3が4月)

export const EVENT_INFO = {
  date: EVENT_DATE,
  dateDisplay: "2026年4月7日",
  location: "東京・八芳園",
  locationUrl: "https://happo-en.com/",
  host: "XRPL Japan",
  ticketUrl: "https://www.teamz.co.jp/tickets?utm_source=xrp",
} as const;

export const SOCIAL_LINKS = {
  x: "https://x.com/XRPLJapan",
} as const;

export const SPONSOR_LINKS = {
  teamz: "https://forms.gle/2EA5CyN4sZJB3aNZ6",
} as const;

/**
 * 背景動画のURL
 */
export const BACKGROUND_VIDEO_URL =
  "https://cms-public-artifacts.artlist.io/content/artgrid/footage-hls/4aa67173-fab9-477f-8dc1-104854c8988b_playlist_1752074962.m3u8";

export const LOCALES = [
  { code: "ja", label: "日本語", shortLabel: "JA" },
  { code: "en", label: "English", shortLabel: "EN" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

/**
 * アニメーション遅延時間の定数（ミリ秒）
 */
export const ANIMATION_DELAYS = {
  immediate: 0,
  short: 100,
  medium: 150,
  long: 300,
} as const;

/**
 * サイトの基本情報
 * 本番: https://xrp-tokyo.io
 * OGP など絶対URLはここを参照。vercel.app は dev へリダイレクトするため使用しない。
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://xrp-tokyo.io";

/**
 * メタデータ用の説明文
 */
export const METADATA = {
  ja: {
    title: "XRP Tokyo 2026",
    description:
      "「XRP Tokyo 2026」は、XRPL Japanが主催する日本最大級のXRPイベント。TEAMZ Web3/AI Summit 2026のタイトルスポンサーイベントとして東京・八芳園で開催され、XRP LedgerのRWA・決済・DeFi・NFTをテーマに、国内外のリーダー・開発者・投資家・企業が集結する公式サイトです。",
  },
  en: {
    title: "XRP Tokyo 2026",
    description:
      "Official website for XRP Tokyo event held on April 7, 2026 at Happo-en, Tokyo. An official event hosted by XRPL Japan.",
  },
} as const;

/**
 * OGP画像のパス
 */
export const OG_IMAGE_PATH = "/ogp.jpg";

