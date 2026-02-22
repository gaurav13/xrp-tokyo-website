import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // localStorageからロケールを取得（クライアント側）またはcookieから取得（サーバー側）
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value || "ja") as "ja" | "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
