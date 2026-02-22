import { EVENT_INFO, OG_IMAGE_PATH, SITE_URL } from "@/lib/constants";

/**
 * イベント情報の構造化データ（JSON-LD）を生成
 * Schema.org Event schemaを使用
 */
export function StructuredData() {
  const eventDate = EVENT_INFO.date.toISOString();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "XRP Tokyo 2026",
    description:
      "「XRP Tokyo 2026」は、XRPL Japanが主催する日本最大級のXRPイベント。TEAMZ Web3/AI Summit 2026のタイトルスポンサーイベントとして東京・八芳園で開催され、XRP LedgerのRWA・決済・DeFi・NFTをテーマに、国内外のリーダー・開発者・投資家・企業が集結します。",
    startDate: eventDate,
    endDate: eventDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: EVENT_INFO.location,
      url: EVENT_INFO.locationUrl,
    },
    organizer: {
      "@type": "Organization",
      name: EVENT_INFO.host,
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      url: EVENT_INFO.ticketUrl,
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "JPY",
    },
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
    url: SITE_URL,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
