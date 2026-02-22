interface Window {
  dataLayer?: unknown[];
  gtag?: (
    command: "config" | "event" | "js" | "set",
    targetId: string | Date,
    config?: {
      page_path?: string;
      button_location?: string;
      event_category?: string;
      event_label?: string;
      [key: string]: unknown;
    },
  ) => void;
}
