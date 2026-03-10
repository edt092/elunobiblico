"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
//  CONFIGURACIÓN PAYPHONE — valores en .env.local (nunca en git)
// ─────────────────────────────────────────────────────────────
const PP_TOKEN    = process.env.NEXT_PUBLIC_PP_TOKEN    ?? "";
const PP_STORE    = process.env.NEXT_PUBLIC_PP_STORE_ID ?? "";
const PP_AMOUNT   = 1499;   // centavos → $14.99
const PP_CURRENCY  = "USD";
const PP_REFERENCE = "El UNO Bíblico — Paquete Completo";
// ─────────────────────────────────────────────────────────────

declare global {
  interface Window {
    PPaymentButtonBox: new (config: object) => { render: (id: string) => void };
  }
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PaymentModal({ open, onClose }: Props) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [cssLoaded, setCssLoaded] = useState(false);
  const initialized = useRef(false);

  // Load Payphone CSS once
  useEffect(() => {
    if (document.getElementById("pp-css")) { setCssLoaded(true); return; }
    const link = document.createElement("link");
    link.id = "pp-css";
    link.rel = "stylesheet";
    link.href = "https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.css";
    link.onload = () => setCssLoaded(true);
    document.head.appendChild(link);
  }, []);

  // Load Payphone JS module once
  useEffect(() => {
    if (document.getElementById("pp-js")) { setScriptLoaded(true); return; }
    const script = document.createElement("script");
    script.id = "pp-js";
    script.type = "module";
    script.src = "https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.js";
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);
  }, []);

  // Initialize widget when modal opens and resources are ready
  const initWidget = useCallback(() => {
    if (!open || !scriptLoaded || initialized.current) return;

    // Small delay so the div is mounted in DOM
    setTimeout(() => {
      if (typeof window.PPaymentButtonBox === "undefined") return;
      const txId = `unobiblico-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      new window.PPaymentButtonBox({
        token: PP_TOKEN,
        clientTransactionId: txId,
        amount: PP_AMOUNT,           // total en centavos: 1499
        amountWithoutTax: PP_AMOUNT, // sin impuesto = total (producto digital)
        amountWithTax: 0,
        tax: 0,
        service: 0,
        tip: 0,
        currency: PP_CURRENCY,
        storeId: PP_STORE,
        reference: PP_REFERENCE,
      }).render("pp-button");
      initialized.current = true;
    }, 200);
  }, [open, scriptLoaded]);

  useEffect(() => {
    if (open) {
      initialized.current = false; // reset so new tx id is generated each open
      initWidget();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, initWidget]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal box */}
      <div className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{ border: "1px solid rgba(212,175,55,0.4)", boxShadow: "0 0 80px rgba(212,175,55,0.15), 0 30px 80px rgba(0,0,0,0.7)" }}>

        {/* Header */}
        <div className="bg-[#0D0305] px-6 py-5 flex items-center justify-between border-b border-[rgba(212,175,55,0.2)]">
          <div>
            <p style={{ fontFamily: "'Cinzel', serif" }} className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase mb-0.5">
              Pago Seguro
            </p>
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-bold text-lg">
              El UNO Bíblico — $14.99
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Payphone widget */}
        <div className="bg-white px-4 py-6 min-h-[300px] flex flex-col items-center justify-center">
          {!scriptLoaded || !cssLoaded ? (
            <div className="flex flex-col items-center gap-3 text-gray-500">
              <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Cargando formulario de pago...</p>
            </div>
          ) : (
            <div id="pp-button" className="w-full" />
          )}
        </div>

        {/* Footer trust */}
        <div className="bg-[#0D0305] px-6 py-4 flex items-center justify-center gap-4 border-t border-[rgba(212,175,55,0.2)]">
          <span className="text-[#A89070] text-xs flex items-center gap-1.5">
            🔒 Pago cifrado SSL
          </span>
          <span className="text-[rgba(212,175,55,0.3)] text-xs">|</span>
          <span className="text-[#A89070] text-xs">Garantía 7 días</span>
          <span className="text-[rgba(212,175,55,0.3)] text-xs">|</span>
          <span className="text-[#A89070] text-xs">Acceso inmediato</span>
        </div>
      </div>
    </div>
  );
}
