"use client";

import { useState, FormEvent } from "react";

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
        className="fixed top-0 h-screen w-[728px] bg-[#f6f9f7] z-50 flex flex-col gap-[60px] pt-[20px] pb-[40px] overflow-y-auto transition-[right] duration-500"
        style={{
          right: isOpen ? "0px" : "-760px",
          boxShadow: "-4px 0 40px rgba(0,0,0,0.10)",
        }}
      >
        {/* Return button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-[20px] cursor-pointer group self-start"
        >
          <span className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-black group-hover:bg-[#020073] transition-colors duration-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-light text-[16px] text-black">Return</span>
        </button>

        {/* Contact info */}
        <div className="px-[20px] w-full border-b border-[#808080] pb-[23px] flex flex-col gap-[21px]">
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] px-[60px]">
          {/* Email input */}
          <div className="w-full max-w-[608px]">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white rounded-[10px] border border-[#020073] px-[16px] py-[16px] text-[18px] font-fira font-thin text-black placeholder:text-[#757575] outline-none focus:border-[#020073] focus:ring-2 focus:ring-[#020073]/20 transition-all duration-200"
            />
          </div>

          {/* Full name input */}
          <div className="w-full max-w-[608px]">
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white rounded-[10px] border border-[#020073] px-[16px] py-[16px] text-[18px] font-fira font-thin text-black placeholder:text-[#757575] outline-none focus:border-[#020073] focus:ring-2 focus:ring-[#020073]/20 transition-all duration-200"
            />
          </div>

          {/* Message textarea */}
          <div className="w-full max-w-[608px]">
            <textarea
              placeholder="How can I help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full bg-white rounded-[10px] border border-[#020073] px-[16px] py-[16px] text-[18px] font-fira font-thin text-black placeholder:text-[#757575] outline-none focus:border-[#020073] focus:ring-2 focus:ring-[#020073]/20 transition-all duration-200 resize-none h-[132px]"
            />
          </div>

          {/* Send button */}
          <div className="flex justify-end max-w-[608px]">
            <button
              type="submit"
              className="bg-[#020073] text-[#f6f9f7] text-[20px] px-[32px] py-[16px] rounded-[5px] cursor-pointer hover:bg-black transition-colors duration-200 font-normal"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
