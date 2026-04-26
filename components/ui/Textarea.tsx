import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full bg-white dark:bg-[#1a1a1a] rounded-[10px] border p-4",
            "text-[18px] font-fira font-thin text-black dark:text-white",
            "placeholder:text-[#757575] dark:placeholder:text-[#888]",
            "outline-none transition-all duration-200 resize-none",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-[#020073] dark:border-[#6b9fff] focus:border-[#020073] dark:focus:border-[#6b9fff] focus:ring-2 focus:ring-[#020073]/20 dark:focus:ring-[#6b9fff]/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea };
export type { TextareaProps };
