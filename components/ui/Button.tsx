"use client";

import { cn } from "@/lib/cn";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "dark" | "outline";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold cursor-pointer transition-all duration-200 select-none";

  const variants: Record<string, string> = {
    primary:
      "bg-[#FF6B35] text-white rounded-full px-7 py-3 text-sm shadow-[0_4px_20px_rgba(255,107,53,0.30)] hover:bg-[#e55a24] hover:shadow-[0_6px_24px_rgba(255,107,53,0.40)]",
    dark: "bg-[#020073] text-white rounded-[5px] px-7 py-3 text-sm hover:bg-black",
    outline:
      "border border-[#020073] text-[#020073] rounded-[10px] px-7 py-3 text-sm hover:bg-[#020073] hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </button>
  );
}
