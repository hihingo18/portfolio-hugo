"use client";

import { useState, FormEvent } from "react";
import { ArrowLeftIcon } from "@/components/icons/UIIcons";

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactPanel({ isOpen, onClose }: ContactPanelProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: wire up to email API when backend is ready
    console.log("Contact form submitted:", { email, name, message });
    setEmail("");
    setName("");
    setMessage("");
    onClose();
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
          <span className="font-light text-base text-black">Return</span>
        </button>

        {/* Contact info */}
        <div className="px-5 w-full border-b border-[#808080] pb-6 flex flex-col gap-5">
          <p className="font-bold text-[18px] text-[#808080]">Contact</p>
          <a
            href="mailto:hihingo18@gmail.com"
            className="font-normal text-[22px] text-black hover:text-[#020073] transition-colors duration-200"
          >
            hihingo18@gmail.com
          </a>
          <a
            href="tel:+84944548222"
            className="font-normal text-[22px] text-black hover:text-[#020073] transition-colors duration-200"
          >
            (+84) 944 548 222
          </a>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-15">
          {/* Email input */}
          <div className="w-full max-w-152">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white rounded-[10px] border border-[#020073] p-4 text-[18px] font-fira font-thin text-black placeholder:text-[#757575] outline-none focus:border-[#020073] focus:ring-2 focus:ring-[#020073]/20 transition-all duration-200"
            />
          </div>

          {/* Full name input */}
          <div className="w-full max-w-152">
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white rounded-[10px] border border-[#020073] p-4 text-[18px] font-fira font-thin text-black placeholder:text-[#757575] outline-none focus:border-[#020073] focus:ring-2 focus:ring-[#020073]/20 transition-all duration-200"
            />
          </div>

          {/* Message textarea */}
          <div className="w-full max-w-152">
            <textarea
              placeholder="How can I help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full bg-white rounded-[10px] border border-[#020073] p-4 text-[18px] font-fira font-thin text-black placeholder:text-[#757575] outline-none focus:border-[#020073] focus:ring-2 focus:ring-[#020073]/20 transition-all duration-200 resize-none h-33"
            />
          </div>

          {/* Send button */}
          <div className="flex justify-end max-w-152">
            <button
              type="submit"
              className="bg-[#020073] text-[#f6f9f7] text-xl px-8 py-4 rounded cursor-pointer hover:bg-black transition-colors duration-200 font-normal"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
