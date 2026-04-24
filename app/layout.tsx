import "./globals.css";
import { sora, firaSans } from "@/lib/fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${firaSans.variable}`}>
      <head></head>
      <body>{children}</body>
    </html>
  );
}
