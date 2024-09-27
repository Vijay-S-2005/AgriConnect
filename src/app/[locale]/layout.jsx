import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMessages, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import "../../styles/globals.css";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "Index" }); // Get translation for the correct locale
  return { title: t("title") };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}