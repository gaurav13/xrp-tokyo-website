import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { LenisProvider } from "@/components/lenis-provider";
import { SplashScreen } from "@/components/splash-screen";
import { SplashContextProvider } from "@/contexts/splash-context";
import { GiveawayDialogProvider } from "@/components/giveaway-dialog";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { getMetadata } from "@/lib/metadata";
import type { Locale } from "@/lib/constants";
import { StructuredData } from "@/components/structured-data";
import Script from "next/script";
import { GoogleAnalyticsPageView } from "@/components/google-analytics";
import { LocaleInitializer } from "@/components/locale-initializer";
import { GOOGLE_ADS_CONVERSION_ID } from "@/lib/gtag";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return (cookieStore.get("locale")?.value || "ja") as Locale;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const locale = await getLocale();
  return getMetadata(locale);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className="dark">
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                  gtag('config', '${GOOGLE_ADS_CONVERSION_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {GA_MEASUREMENT_ID && <GoogleAnalyticsPageView />}
        <LocaleInitializer />
        <StructuredData />
        <SplashContextProvider>
          <LenisProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <GiveawayDialogProvider>
                <SplashScreen />
                <Header />
                {children}
              </GiveawayDialogProvider>
            </NextIntlClientProvider>
          </LenisProvider>
        </SplashContextProvider>
      </body>
    </html>
  );
}
