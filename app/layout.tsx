import "./globals.css";
import { sora, firaSans } from "@/lib/fonts";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/context/ThemeContext";

type Theme = "light" | "dark";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const theme = (cookieStore.get("theme")?.value ?? "light") as Theme;

  return (
    <html lang="en" className={`${sora.variable} ${firaSans.variable}${theme === "dark" ? " dark" : ""}`}>
      <head></head>
      <body>
        <ThemeProvider initialTheme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
