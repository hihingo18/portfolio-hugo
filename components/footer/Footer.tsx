"use client";

import { useLocale } from "@/context/LocaleContext";

export default function Footer() {
  const { dict } = useLocale();
  return (
    <footer className="w-full bg-white border-t border-[#f1f1f1] py-10">
      <div className="flex items-center justify-center gap-2 text-base font-light text-black flex-wrap">
        <span>{dict.footer.copy}</span>
      </div>
    </footer>
  );
}
