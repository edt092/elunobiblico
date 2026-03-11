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

// WhatsApp de soporte
const WA_NUMBER  = "593979097543";
const WA_MESSAGE = encodeURIComponent("Hola, necesito ayuda con mi compra de El UNO Bíblico 🙏");
const WA_LINK    = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

// Segundos de inactividad antes de mostrar el nudge
const IDLE_SECONDS = 35;

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
  const [showNudge, setShowNudge]       = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);

  const initialized = useRef(false);
  const idleTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      const txId    = `unobiblico-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const baseUrl = window.location.origin;
      new window.PPaymentButtonBox({
        token:               PP_TOKEN,
        clientTransactionId: txId,
        amount:              PP_AMOUNT,
        amountWithoutTax:    PP_AMOUNT,
        amountWithTax:       0,
        tax:                 0,
        service:             0,
        tip:                 0,
        currency:            PP_CURRENCY,
        storeId:             PP_STORE,
        reference:           PP_REFERENCE,
        responseUrl:         `${baseUrl}/success`,
      }).render("pp-button");
      initialized.current = true;
    }, 200);
  }, [open, scriptLoaded]);

  /* ── Detector de inactividad dentro del modal ── */
  const resetIdle = useCallback(() => {
    if (nudgeDismissed) return;
    setShowNudge(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setShowNudge(true), IDLE_SECONDS * 1000);
  }, [nudgeDismissed]);

  /* ── Arrancar / detener el timer de inactividad con el modal ── */
  useEffect(() => {
    if (!open) {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      setShowNudge(false);
      setNudgeDismissed(false);
      return;
    }
    resetIdle();
    return () => { if (idleTimer.current) clearTimeout(idleTimer.current); };
  }, [open, resetIdle]);

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
      {/* ── Estilos Payphone + animaciones nudge ── */}
      <style>{`
        #pp-button,
        #pp-button > *,
        #pp-button iframe,
        #pp-button .pp-container {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }
        @keyframes nudge-in {
          0%   { opacity: 0; transform: scale(0.8) translateY(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          50%       { box-shadow: 0 0 0 10px rgba(37,211,102,0); }
        }
        .nudge-bubble  { animation: nudge-in 0.35s cubic-bezier(.34,1.56,.64,1) forwards; }
        .wa-btn-pulse  { animation: wa-pulse 2s ease-in-out infinite; }
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
        /* Resetear inactividad con cualquier interacción dentro del modal */
        onMouseMove={resetIdle}
        onPointerDown={resetIdle}
        onKeyDown={resetIdle}
        onTouchStart={resetIdle}
      >
        <div
          className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl flex flex-col max-h-[92dvh] sm:max-h-[90dvh]"
          style={{
            background:  "linear-gradient(160deg, #1A0810 0%, #0D0305 100%)",
            border:      "1px solid rgba(212,175,55,0.35)",
            boxShadow:   "0 0 60px rgba(212,175,55,0.12), 0 -8px 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* ── Handle drag móvil ── */}
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
                <p className="text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase font-bold"
                   style={{ fontFamily: "'Cinzel', serif" }}>
                  Pago 100% Seguro
                </p>
                <h3 className="text-white font-bold text-base leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                  El UNO Bíblico — <span className="text-[#D4AF37]">$14.99</span>
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

          {/* ── Área scrollable ── */}
          <div className="overflow-y-auto overscroll-contain flex-1 min-h-0">

            {/* Widget Payphone */}
            <div className="bg-white">
              {!scriptLoaded || !cssLoaded ? (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
                  <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm font-medium">Cargando formulario seguro...</p>
                </div>
              ) : (
                <div id="pp-button" className="w-full" style={{ minHeight: "420px" }} />
              )}
            </div>

            {/* Trust bar */}
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

          </div>

          {/* ── WhatsApp help bar (siempre visible al fondo) ── */}
          <div className="flex-shrink-0 border-t border-[rgba(37,211,102,0.2)] bg-[rgba(37,211,102,0.05)] px-5 py-3 flex items-center justify-between gap-3">
            <p className="text-[#A0C8A0] text-xs leading-snug">
              ¿Tienes dudas sobre el pago?
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn-pulse flex-shrink-0 flex items-center gap-2 bg-[#25D366] hover:bg-[#20C25A] text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
            >
              {/* WhatsApp SVG icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

        </div>{/* fin modal box */}

        {/* ── Nudge bubble de inactividad ── */}
        {showNudge && !nudgeDismissed && (
          <div
            className="nudge-bubble fixed z-[202] bottom-[140px] sm:bottom-auto sm:top-auto right-4 sm:right-[calc(50%-280px)] max-w-[260px]"
            style={{
              filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
            }}
          >
            {/* Bubble */}
            <div
              className="relative rounded-2xl rounded-br-sm px-4 py-3"
              style={{
                background: "linear-gradient(135deg, #1A3A1A 0%, #0D200D 100%)",
                border: "1px solid rgba(37,211,102,0.4)",
              }}
            >
              {/* Dismiss */}
              <button
                onClick={() => { setShowNudge(false); setNudgeDismissed(true); }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#0D0305] border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[#A89070] text-[10px] hover:text-white transition-colors"
              >
                ✕
              </button>

              <p className="text-white font-bold text-sm mb-1 leading-snug">
                ¿Necesitas ayuda con tu compra?
              </p>
              <p className="text-[#A0C8A0] text-xs mb-3 leading-snug">
                Estamos aquí para ayudarte en segundos 🙏
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setNudgeDismissed(true)}
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20C25A] text-white text-xs font-black px-4 py-2 rounded-full transition-colors w-full"
              >
                <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Escribir por WhatsApp
              </a>
            </div>
            {/* Tail de la burbuja */}
            <div
              className="ml-auto mr-3 w-0 h-0"
              style={{
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid rgba(37,211,102,0.4)",
              }}
            />
          </div>
        )}

      </div>
    </>
  );
}
