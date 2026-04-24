import type { Metadata } from "next";
import { getDictionary, locales, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { LocaleProvider } from "@/context/LocaleContext";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "vn") {
    return {
      title: "Hugo — Technical Leader & Full-stack Developer",
      description:
        "Xây dựng sản phẩm chất lượng cao, có khả năng mở rộng với năng lực lãnh đạo kỹ thuật vững chắc. Đặt tại Hà Nội, Việt Nam.",
    };
  }
  return {
    title: "Hugo — Technical Leader & Full-stack Developer",
    description:
      "Crafting scalable, high-quality products with strong engineering leadership. Based in Hanoi, Vietnam.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : "en";
  const dict = await getDictionary(validLocale);

  return (
    <LocaleProvider dict={dict} locale={validLocale}>
      {children}
    </LocaleProvider>
  );
}
