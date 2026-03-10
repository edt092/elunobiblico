"use client";

import { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import PaymentModal from "./PaymentModal";

export default function StickyBottomBar() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div className="sticky-bottom px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="badge-live w-2.5 h-2.5 rounded-full bg-[#E63000] flex-shrink-0" />
            <p className="text-sm font-bold text-white">
              ¡Precio de lanzamiento termina en:{" "}
            </p>
            <CountdownTimer />
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="pulse-cta w-full sm:w-auto text-center bg-[#E63000] hover:bg-[#FF4500] text-white font-black text-base px-8 py-3 rounded-full uppercase tracking-widest transition-colors whitespace-nowrap"
          >
            ¡QUIERO EL MÍO AHORA!
          </button>
        </div>
      </div>
      <PaymentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
