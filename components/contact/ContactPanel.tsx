"use client";

import { useState, FormEvent } from "react";
import { ArrowLeftIcon } from "@/components/icons/UIIcons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/context/LocaleContext";
import { useColors } from "@/context/ThemeContext";
import { FORM_CONSTRAINTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactPanel({ isOpen, onClose }: ContactPanelProps) {
  const { dict } = useLocale();
  const colors = useColors();
  const c = dict.contact;

  const [returnHovered, setReturnHovered] = useState(false);
  const [emailLinkHovered, setEmailLinkHovered] = useState(false);
  const [phoneLinkHovered, setPhoneLinkHovered] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!email || !FORM_CONSTRAINTS.email.pattern.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!name || name.length < FORM_CONSTRAINTS.name.minLength) {
      setError("Name must be at least 2 characters");
      return false;
    }
    if (!message || message.length < FORM_CONSTRAINTS.message.minLength) {
      setError("Message must be at least 10 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!validateForm()) return;
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, message }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      setStatus("success");
      setSuccessMessage(data.message || "Message sent successfully! I'll get back to you soon.");
      setEmail("");
      setName("");
      setMessage("");

      setTimeout(() => {
        onClose();
        setStatus("idle");
        setSuccessMessage(null);
      }, 2000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
      console.error("[ContactPanel] Error:", err);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-500"
          onClick={onClose}
        />
      )}

      {/* Slide-in panel */}
      <div
        className="fixed top-0 h-screen w-182 z-50 flex flex-col gap-15 pt-5 pb-10 overflow-y-auto transition-[right] duration-500"
        style={{
          right: isOpen ? "0px" : "-760px",
          backgroundColor: colors.bgPanel,
          boxShadow: "-4px 0 40px rgba(0,0,0,0.10)",
        }}
      >
        {/* Return button */}
        <button
          onClick={onClose}
          onMouseEnter={() => setReturnHovered(true)}
          onMouseLeave={() => setReturnHovered(false)}
          className="flex items-center gap-2 px-5 cursor-pointer self-start"
        >
          <span
            className="flex items-center justify-center size-8.5 rounded-full text-white transition-colors duration-200"
            style={{
              backgroundColor: returnHovered ? colors.brandPrimary : colors.bgIconDefault,
            }}
          >
            <ArrowLeftIcon />
          </span>
          <span className="font-light text-base transition-colors duration-200" style={{ color: colors.textBase }}>
            {c.return}
          </span>
        </button>

        {/* Contact info */}
        <div
          className="px-5 w-full pb-6 flex flex-col gap-5"
          style={{ borderBottom: `1px solid ${colors.borderStrong}` }}
        >
          <p className="font-bold text-[18px]" style={{ color: colors.textMuted }}>{c.heading}</p>
          <a
            href={`mailto:${c.email}`}
            onMouseEnter={() => setEmailLinkHovered(true)}
            onMouseLeave={() => setEmailLinkHovered(false)}
            className="font-normal text-[22px] transition-colors duration-200"
            style={{ color: emailLinkHovered ? colors.brandPrimary : colors.textBase }}
          >
            {c.email}
          </a>
          <a
            href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}
            onMouseEnter={() => setPhoneLinkHovered(true)}
            onMouseLeave={() => setPhoneLinkHovered(false)}
            className="font-normal text-[22px] transition-colors duration-200"
            style={{ color: phoneLinkHovered ? colors.brandPrimary : colors.textBase }}
          >
            {c.phone}
          </a>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-15">
          {error && (
            <div
              className="w-full max-w-152 p-4 rounded-lg border-l-4"
              style={{ borderColor: colors.statusError, backgroundColor: `${colors.statusError}15` }}
            >
              <p style={{ color: colors.statusError }} className="text-sm font-medium">{error}</p>
            </div>
          )}

          {successMessage && (
            <div
              className="w-full max-w-152 p-4 rounded-lg border-l-4"
              style={{ borderColor: colors.statusSuccess, backgroundColor: `${colors.statusSuccess}15` }}
            >
              <p style={{ color: colors.statusSuccess }} className="text-sm font-medium">{successMessage}</p>
            </div>
          )}

          <div className="flex flex-col gap-2 w-full max-w-152">
            <Label htmlFor="contact-email" style={{ color: colors.textBase }}>{c.emailPlaceholder}</Label>
            <Input
              id="contact-email"
              type="email"
              placeholder={c.emailPlaceholder}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              disabled={status === "loading"}
              required
              className="h-12 text-[18px] font-fira font-thin rounded-[10px] px-4"
            />
          </div>

          <div className="flex flex-col gap-2 w-full max-w-152">
            <Label htmlFor="contact-name" style={{ color: colors.textBase }}>{c.namePlaceholder}</Label>
            <Input
              id="contact-name"
              type="text"
              placeholder={c.namePlaceholder}
              value={name}
              onChange={(e) => { setName(e.target.value); setError(null); }}
              disabled={status === "loading"}
              required
              className="h-12 text-[18px] font-fira font-thin rounded-[10px] px-4"
            />
          </div>

          <div className="flex flex-col gap-2 w-full max-w-152">
            <Label htmlFor="contact-message" style={{ color: colors.textBase }}>{c.messagePlaceholder}</Label>
            <Textarea
              id="contact-message"
              placeholder={c.messagePlaceholder}
              value={message}
              onChange={(e) => { setMessage(e.target.value); setError(null); }}
              disabled={status === "loading"}
              required
              rows={5}
              className={cn("h-33 text-[18px] font-fira font-thin rounded-[10px] px-4 resize-none")}
            />
          </div>

          <div className="flex justify-end max-w-152">
            <Button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-3 h-auto text-base rounded"
            >
              {status === "loading" && (
                <span className="inline-block animate-spin text-sm mr-1">⚡</span>
              )}
              {status === "loading" ? "Sending..." : c.send}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
