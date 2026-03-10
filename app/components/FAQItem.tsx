"use client";

import { useState } from "react";

interface Props {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item py-5 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex items-start justify-between gap-4">
        <h4 className="font-display text-lg font-bold text-[#1A0A00] leading-snug pr-4">
          {question}
        </h4>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold text-lg transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </div>
      {open && (
        <p className="mt-3 text-[#6B4A3A] leading-relaxed text-base">{answer}</p>
      )}
    </div>
  );
}
