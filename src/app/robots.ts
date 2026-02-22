import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * robots.txtを生成
 * 検索エンジンクローラーへの指示を設定
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dev/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
