"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface ConfirmResult {
  approved: boolean;
  email:    string | null;
  name:     string | null;
  transactionId: string | null;
  authorizationCode: string | null;
  amount:   number | null;
  message:  string | null;
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<PageShell><div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" /></PageShell>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const params  = useSearchParams();
  const called  = useRef(false);

  const [state, setState] = useState<"loading" | "approved" | "failed" | "error">("loading");
  const [data,  setData]  = useState<ConfirmResult | null>(null);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const id  = params.get("id");
    const cid = params.get("clientTransactionId");

    if (!id || !cid) { setState("error"); return; }

    fetch("/api/confirm-payment", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ id, clientTransactionId: cid }),
    })
      .then((r) => r.json())
      .then((result: ConfirmResult) => {
        setData(result);
        setState(result.approved ? "approved" : "failed");
      })
      .catch(() => setState("error"));
  }, [params]);

  /* ── Pantalla de carga ── */
  if (state === "loading") {
    return (
      <PageShell>
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin" />
          <p className="text-[#C8B49A] text-lg font-medium">Verificando tu pago...</p>
        </div>
      </PageShell>
    );
  }

  /* ── Pago aprobado ── */
  if (state === "approved" && data) {
    return (
      <PageShell>
        <div className="text-center max-w-md mx-auto">
          {/* Checkmark animado */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-[rgba(46,160,67,0.15)] animate-ping" />
            <div className="relative w-24 h-24 rounded-full bg-[rgba(46,160,67,0.2)] border-2 border-[#2EA643] flex items-center justify-center">
              <svg className="w-12 h-12 text-[#2EA643]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <p
            className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            ¡Compra exitosa!
          </p>
          <h1
            className="text-white text-3xl sm:text-4xl font-black mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ¡Bienvenido a la familia <span className="text-[#D4AF37]">del UNO Bíblico!</span>
          </h1>
          <p className="text-[#C8B49A] text-lg mb-8 leading-relaxed">
            Tu compra fue aprobada. Recibirás el acceso a tu producto en{" "}
            <strong className="text-white">
              {data.email ?? "tu correo electrónico"}
            </strong>{" "}
            en los próximos minutos.
          </p>

          {/* Detalles de la compra */}
          <div
            className="rounded-2xl p-6 mb-8 text-left space-y-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
          >
            {[
              { label: "Producto",      value: "El UNO Bíblico — Paquete Completo" },
              { label: "Monto",         value: data.amount ? `$${(data.amount / 100).toFixed(2)}` : "$14.99" },
              { label: "Email",         value: data.email ?? "—" },
              { label: "Autorización",  value: data.authorizationCode ?? "—" },
              { label: "ID Transacción",value: data.transactionId ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4 text-sm">
                <span className="text-[#7A6050]">{label}</span>
                <span className="text-[#E8D5C0] font-medium text-right max-w-[60%] break-all">{value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-[#A89070] text-sm">
              📧 Revisa tu bandeja de entrada (y spam). Si en 30 minutos no recibes nada,{" "}
              escríbenos directo.
            </p>
            <Link
              href="/"
              className="inline-block text-[#D4AF37] hover:text-[#F0D060] text-sm font-bold transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  /* ── Pago cancelado / rechazado ── */
  if (state === "failed") {
    return (
      <PageShell>
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-[rgba(230,48,0,0.15)] border-2 border-[#E63000] flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✕</span>
          </div>
          <p
            className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Pago no completado
          </p>
          <h1
            className="text-white text-3xl font-black mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            El pago fue cancelado o rechazado
          </h1>
          <p className="text-[#C8B49A] mb-8 leading-relaxed">
            No se realizó ningún cargo. Puedes intentarlo de nuevo con otro método de pago.
          </p>
          <Link
            href="/#comprar"
            className="inline-flex items-center gap-2 bg-[#E63000] hover:bg-[#FF4500] text-white font-black px-8 py-4 rounded-full uppercase tracking-wider transition-colors text-sm"
          >
            Intentar nuevamente →
          </Link>
        </div>
      </PageShell>
    );
  }

  /* ── Error genérico ── */
  return (
    <PageShell>
      <div className="text-center max-w-md mx-auto">
        <span className="text-5xl block mb-6">⚠️</span>
        <h1
          className="text-white text-2xl font-black mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Algo salió mal
        </h1>
        <p className="text-[#C8B49A] mb-8">
          No pudimos verificar tu pago. Si realizaste el pago, contáctanos con tu ID de transacción.
        </p>
        <Link
          href="/"
          className="text-[#D4AF37] hover:text-[#F0D060] font-bold transition-colors"
        >
          ← Volver al inicio
        </Link>
      </div>
    </PageShell>
  );
}

/* ── Layout wrapper reutilizable ── */
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "radial-gradient(ellipse at 30% 40%, rgba(139,26,26,0.25) 0%, transparent 55%), linear-gradient(160deg, #0D0305 0%, #1A0810 50%, #0D0305 100%)",
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cinzel:wght@600&display=swap"
      />
      {children}
    </div>
  );
}
