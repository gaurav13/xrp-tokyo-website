export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Google 広告 コンバージョン ID（AW-17873890605） */
export const GOOGLE_ADS_CONVERSION_ID = "AW-17873890605";
const GOOGLE_ADS_CONVERSION_LABEL = "a7GECP-0se4bEK3a98pC";

export const trackEvent = (
  eventName: string,
  eventParams?: {
    button_location?: string;
    [key: string]: unknown;
  },
) => {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) {
    return;
  }

  window.gtag("event", eventName, {
    ...eventParams,
  });
};

export const trackTicketButtonClick = (buttonLocation: string) => {
  trackEvent("ticket_button_click", {
    button_location: buttonLocation,
    event_category: "engagement",
    event_label: "Ticket Purchase Button",
    form_name: "ticket_cta",
  });
  // Google 広告コンバージョン（チケット CTA クリックをコンバージョンとして計測）
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
    });
  }
};
