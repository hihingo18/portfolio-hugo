import { Sora, Fira_Sans } from "next/font/google";

export const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
  style: ["normal", "italic"],
  variable: "--font-fira",
  display: "swap",
});
