"use client";

import { useState, FormEvent } from "react";
import { ArrowLeftIcon } from "@/components/icons/UIIcons";
import { Button, Input, Textarea } from "@/components/ui";
import { useLocale } from "@/context/LocaleContext";
import { FORM_CONSTRAINTS } from "@/lib/constants";
import { COLORS } from "@/lib/theme";

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactPanel({ isOpen, onClose }: ContactPanelProps) {
  const { dict } = useLocale();
  const c = dict.contact;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Validation
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

    // Validate
    if (!validateForm()) {
      return;
    }

    setStatus("loading");

    try {
      // Call API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, message }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Success
      setStatus("success");
      setSuccessMessage(data.message || "Message sent successfully! I'll get back to you soon.");
      
      // Clear form
      setEmail("");
      setName("");
      setMessage("");

      // Close after 2 seconds
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setSuccessMessage(null);
      }, 2000);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again."
      );
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
        className="fixed top-0 h-screen w-182 bg-[#f6f9f7] z-50 flex flex-col gap-15 pt-5 pb-10 overflow-y-auto transition-[right] duration-500"
        style={{
          right: isOpen ? "0px" : "-760px",
          boxShadow: "-4px 0 40px rgba(0,0,0,0.10)",
        }}
      >
        {/* Return button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-5 cursor-pointer group self-start"
        >
            <span className="flex items-center justify-center size-8.5 rounded-full bg-black group-hover:bg-[#020073] transition-colors duration-200 text-white">
              <ArrowLeftIcon />
            </span>
          <span className="font-light text-base text-black">{c.return}</span>
        </button>

        {/* Contact info */}
        <div className="px-5 w-full border-b border-[#808080] pb-6 flex flex-col gap-5">
          <p className="font-bold text-[18px] text-[#808080]">{c.heading}</p>
          <a
            href={`mailto:${c.email}`}
            className="font-normal text-[22px] text-black hover:text-[#020073] transition-colors duration-200"
          >
            {c.email}
          </a>
          <a
            href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}
            className="font-normal text-[22px] text-black hover:text-[#020073] transition-colors duration-200"
          >
            {c.phone}
          </a>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-15">
          {/* Status Messages */}
          {error && (
            <div
              className="w-full max-w-152 p-4 rounded-lg border-l-4"
              style={{ borderColor: COLORS.error, backgroundColor: `${COLORS.error}15` }}
            >
              <p style={{ color: COLORS.error }} className="text-sm font-medium">
                {error}
              </p>
            </div>
          )}

          {successMessage && (
            <div
              className="w-full max-w-152 p-4 rounded-lg border-l-4"
              style={{ borderColor: COLORS.success, backgroundColor: `${COLORS.success}15` }}
            >
              <p style={{ color: COLORS.success }} className="text-sm font-medium">
                {successMessage}
              </p>
            </div>
          )}

          <div className="w-full max-w-152">
            <Input
              type="email"
              label={c.emailPlaceholder}
              placeholder={c.emailPlaceholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              disabled={status === "loading"}
              required
            />
          </div>

          <div className="w-full max-w-152">
            <Input
              type="text"
              label={c.namePlaceholder}
              placeholder={c.namePlaceholder}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              disabled={status === "loading"}
              required
            />
          </div>

          <div className="w-full max-w-152">
            <Textarea
              label={c.messagePlaceholder}
              placeholder={c.messagePlaceholder}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError(null);
              }}
              disabled={status === "loading"}
              required
              rows={5}
              className="h-33"
            />
          </div>

          {/* Send button */}
          <div className="flex justify-end max-w-152">
            <Button type="submit" size="lg" isLoading={status === "loading"}>
              {status === "loading" ? "Sending..." : c.send}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
