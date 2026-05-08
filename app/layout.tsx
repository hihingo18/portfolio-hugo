import "./globals.css";
import { sora, firaSans } from "@/lib/fonts";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/context/ThemeContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


type Theme = "light" | "dark";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const theme = (cookieStore.get("theme")?.value ?? "light") as Theme;

  return (
    <html lang="en" className={cn(sora.variable, firaSans.variable, theme === "dark" ? " dark" : "", "font-sans", geist.variable)}>
      <head></head>
      <body>
        <ThemeProvider initialTheme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
