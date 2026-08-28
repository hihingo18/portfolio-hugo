import { NextRequest, NextResponse } from "next/server";
import { locales, isValidLocale } from "@/lib/i18n";

const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameLocale = locales.find(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameLocale) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-portfolio-locale", pathnameLocale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Read preferred locale from cookie, fall back to default
  const cookieLocale = request.cookies.get("locale")?.value;
  const locale =
    cookieLocale && isValidLocale(cookieLocale) ? cookieLocale : defaultLocale;

  const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|.*\\..*).*)"],
};
