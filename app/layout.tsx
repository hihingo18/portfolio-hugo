import "./globals.css";
import type { Metadata } from "next";
import { sora, firaSans } from "@/lib/fonts";
import { cookies, headers } from "next/headers";
import { ThemeProvider } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export const metadata: Metadata = {
  icons: {
    icon: "/images/favicon.png",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const requestHeaders = await headers();
  const theme = (cookieStore.get("theme")?.value ?? "light") as Theme;
  const language = requestHeaders.get("x-portfolio-locale") === "vn" ? "vi" : "en";

  return (
    <html lang={language} className={cn(sora.variable, firaSans.variable, theme === "dark" && "dark")}>
      <body>
        <ThemeProvider initialTheme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
