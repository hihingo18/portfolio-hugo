"use client";

import { useLocale } from "@/context/LocaleContext";

export default function Footer() {
  const { dict } = useLocale();
  return (
    <footer className="w-full bg-white dark:bg-[#0f0f0f] border-[#f1f1f1] dark:border-[#2a2a2a] py-10">
      <div className="flex items-center justify-center gap-2 text-base font-light text-black dark:text-gray-300 flex-wrap">
        <span>{dict.footer.copy}</span>
      </div>
    </footer>
  );
}
