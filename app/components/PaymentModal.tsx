"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
//  CONFIGURACIÓN PAYPHONE — valores en .env.local (nunca en git)
// ─────────────────────────────────────────────────────────────
const PP_TOKEN     = process.env.NEXT_PUBLIC_PP_TOKEN    ?? "";
const PP_STORE     = process.env.NEXT_PUBLIC_PP_STORE_ID ?? "";
const PP_AMOUNT    = 1499;
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
  const [cssLoaded, setCssLoaded]       = useState(false);
  const initialized = useRef(false);

  /* ── Cargar CSS de Payphone una sola vez ── */
  useEffect(() => {
    if (document.getElementById("pp-css")) { setCssLoaded(true); return; }
    const link  = document.createElement("link");
    link.id     = "pp-css";
    link.rel    = "stylesheet";
    link.href   = "https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.css";
    link.onload = () => setCssLoaded(true);
    document.head.appendChild(link);
  }, []);

  /* ── Cargar JS de Payphone una sola vez ── */
  useEffect(() => {
    if (document.getElementById("pp-js")) { setScriptLoaded(true); return; }
    const script    = document.createElement("script");
    script.id       = "pp-js";
    script.type     = "module";
    script.src      = "https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.js";
    script.onload   = () => setScriptLoaded(true);
    document.head.appendChild(script);
  }, []);

  /* ── Inicializar widget cuando el modal abre ── */
  const initWidget = useCallback(() => {
    if (!open || !scriptLoaded || initialized.current) return;
    setTimeout(() => {
      if (typeof window.PPaymentButtonBox === "undefined") return;
      const txId = `unobiblico-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      new window.PPaymentButtonBox({
        token:              PP_TOKEN,
        clientTransactionId: txId,
        amount:             PP_AMOUNT,
        amountWithoutTax:   PP_AMOUNT,
        amountWithTax:      0,
        tax:                0,
        service:            0,
        tip:                0,
        currency:           PP_CURRENCY,
        storeId:            PP_STORE,
        reference:          PP_REFERENCE,
      }).render("pp-button");
      initialized.current = true;
    }, 200);
  }, [open, scriptLoaded]);

  /* ── Bloquear scroll del body cuando el modal está abierto ── */
  useEffect(() => {
    if (open) {
      initialized.current = false;
      initWidget();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, initWidget]);

  /* ── Cerrar con Escape ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* ── Estilos que neutralizan restricciones del widget ── */}
      <style>{`
        #pp-button,
        #pp-button > *,
        #pp-button iframe,
        #pp-button .pp-container {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Sheet en móvil / Modal centrado en desktop ── */}
      <div
        role="dialog"
        aria-modal="true"
        className="fixed z-[201] inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4"
      >
        <div
          className="
            relative w-full sm:max-w-lg
            rounded-t-3xl sm:rounded-3xl
            flex flex-col
            max-h-[92dvh] sm:max-h-[90dvh]
          "
          style={{
            background: "linear-gradient(160deg, #1A0810 0%, #0D0305 100%)",
            border: "1px solid rgba(212,175,55,0.35)",
            boxShadow: "0 0 60px rgba(212,175,55,0.12), 0 -8px 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* ── Handle drag (solo móvil) ── */}
          <div className="sm:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-[rgba(212,175,55,0.3)]" />
          </div>

          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(212,175,55,0.2)] flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-base">
                🔒
              </div>
              <div>
                <p
                  className="text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase font-bold"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Pago 100% Seguro
                </p>
                <h3
                  className="text-white font-bold text-base leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  El UNO Bíblico —{" "}
                  <span className="text-[#D4AF37]">$14.99</span>
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(255,255,255,0.14)] flex items-center justify-center text-[#C8B49A] hover:text-white transition-colors text-sm flex-shrink-0"
            >
              ✕
            </button>
          </div>

          {/* ── Área scrollable que contiene el widget ── */}
          <div className="overflow-y-auto overscroll-contain flex-1 min-h-0">

            {/* Widget Payphone */}
            <div className="bg-white px-0 py-0">
              {!scriptLoaded || !cssLoaded ? (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
                  <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm font-medium">Cargando formulario seguro...</p>
                </div>
              ) : (
                <div
                  id="pp-button"
                  className="w-full"
                  style={{ minHeight: "420px" }}
                />
              )}
            </div>

            {/* ── Trust bar ── */}
            <div className="px-5 py-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {[
                { icon: "🔒", text: "Cifrado SSL" },
                { icon: "✅", text: "Pago verificado" },
                { icon: "↩️", text: "Garantía 7 días" },
                { icon: "⚡", text: "Acceso inmediato" },
              ].map(({ icon, text }) => (
                <span key={text} className="text-[#7A6050] text-xs flex items-center gap-1">
                  {icon} {text}
                </span>
              ))}
            </div>

          </div>{/* fin scroll area */}
        </div>
      </div>
    </>
  );
}
