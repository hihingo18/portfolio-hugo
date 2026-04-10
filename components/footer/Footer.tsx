export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#f1f1f1] py-[40px]">
      <div className="flex items-center justify-center gap-2 text-[16px] font-light text-black flex-wrap">
        <span>© Hugo</span>
        <a
          href="/privacy"
          className="underline decoration-solid hover:text-[#020073] transition-colors duration-200"
        >
          Privacy Policy
        </a>
        <span>|</span>
        <a
          href="/legal"
          className="underline decoration-solid hover:text-[#020073] transition-colors duration-200"
        >
          Legal Notice
        </a>
      </div>
    </footer>
  );
}
