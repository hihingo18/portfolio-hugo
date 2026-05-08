import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  isLoading?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-xl",
};

export function Button({
  size = "md",
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "rounded font-medium transition-colors duration-200",
        "bg-[#020073] text-white hover:bg-[rgb(0,0,54)]",
        "dark:bg-[#6b9fff] dark:text-[#0f0f0f] dark:hover:bg-[#5585ef]",
        "focus:outline-none focus:ring-2 focus:ring-[#020073]/30 dark:focus:ring-[#6b9fff]/30",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {isLoading && (
        <span className="inline-block animate-spin text-sm">⚡</span>
      )}
      {children}
    </button>
  );
}

export type { ButtonProps };
