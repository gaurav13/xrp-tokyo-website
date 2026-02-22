import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * sitemap.xmlを生成
 * 検索エンジンにサイト構造を伝える
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/ja`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          ja: `${baseUrl}/ja`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          ja: `${baseUrl}/ja`,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];
}
