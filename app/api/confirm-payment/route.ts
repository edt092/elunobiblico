import { NextRequest, NextResponse } from "next/server";

const PP_TOKEN       = process.env.NEXT_PUBLIC_PP_TOKEN ?? "";
const TG_BOT_TOKEN   = process.env.TELEGRAM_BOT_TOKEN  ?? "";
const TG_CHAT_ID     = process.env.TELEGRAM_CHAT_ID    ?? "";

/* ─────────────────────────────────────────────
   Confirmar pago con Payphone
───────────────────────────────────────────── */
async function confirmPayphone(id: string, clientTxId: string) {
  const res = await fetch(
    "https://pay.payphonetodoesposible.com/api/button/V2/Confirm",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${PP_TOKEN}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({ id: Number(id), clientTxId }),
    }
  );
  if (!res.ok) throw new Error(`Payphone confirm error: ${res.status}`);
  return res.json();
}

/* ─────────────────────────────────────────────
   Enviar notificación a Telegram
───────────────────────────────────────────── */
async function sendTelegram(message: string) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return;
  await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id:    TG_CHAT_ID,
      text:       message,
      parse_mode: "HTML",
    }),
  });
}

/* ─────────────────────────────────────────────
   Formatear el mensaje de Telegram
───────────────────────────────────────────── */
function buildTelegramMessage(data: Record<string, unknown>, status: "approved" | "failed") {
  const fecha = new Date().toLocaleString("es-EC", { timeZone: "America/Guayaquil" });

  if (status === "approved") {
    return `
🎉 <b>¡NUEVA VENTA — El UNO Bíblico!</b>

💰 <b>Monto:</b> $${((Number(data.amount) || 0) / 100).toFixed(2)}
📧 <b>Email:</b> ${data.email || data.buyerEmail || "—"}
👤 <b>Nombre:</b> ${data.cardHolderName || data.holderName || "—"}
📱 <b>Teléfono:</b> ${data.phone || data.buyerPhone || "—"}
💳 <b>Tarjeta:</b> ${data.cardType || "—"} **** ${data.lastDigits || "****"}
✅ <b>Autorización:</b> ${data.authorizationCode || "—"}
🆔 <b>Transaction ID:</b> ${data.transactionId || "—"}
🔑 <b>Client TX ID:</b> ${data.clientTransactionId || "—"}
⏰ <b>Fecha/hora (EC):</b> ${fecha}

📦 <b>Acción requerida:</b> Enviar acceso al producto al email del cliente.
`.trim();
  }

  return `
⚠️ <b>Pago NO aprobado — El UNO Bíblico</b>

❌ <b>Estado:</b> ${data.statusCode} - ${data.message || "Cancelado o rechazado"}
🔑 <b>Client TX ID:</b> ${data.clientTransactionId || "—"}
⏰ <b>Fecha/hora (EC):</b> ${fecha}
`.trim();
}

/* ─────────────────────────────────────────────
   POST /api/confirm-payment
   Body: { id: string, clientTransactionId: string }
───────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const { id, clientTransactionId } = await req.json();

    if (!id || !clientTransactionId) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    const data = await confirmPayphone(String(id), String(clientTransactionId));

    // statusCode 3 = Aprobado
    const approved = data.statusCode === 3;

    await sendTelegram(buildTelegramMessage(data, approved ? "approved" : "failed"));

    return NextResponse.json({
      approved,
      email:             data.email ?? data.buyerEmail ?? null,
      name:              data.cardHolderName ?? data.holderName ?? null,
      transactionId:     data.transactionId ?? null,
      authorizationCode: data.authorizationCode ?? null,
      amount:            data.amount ?? null,
      statusCode:        data.statusCode,
      message:           data.message ?? null,
    });
  } catch (err) {
    console.error("[confirm-payment]", err);
    return NextResponse.json({ error: "Error interno al confirmar pago" }, { status: 500 });
  }
}

/* ─────────────────────────────────────────────
   GET /api/confirm-payment?id=&clientTransactionId=
   (Para cuando Payphone redirige con query params)
───────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id                = searchParams.get("id")                  ?? "";
  const clientTransactionId = searchParams.get("clientTransactionId") ?? "";

  if (!id || !clientTransactionId) {
    return NextResponse.redirect(new URL("/?error=params", req.url));
  }

  // Redirigir a la página de éxito con los params
  return NextResponse.redirect(
    new URL(`/success?id=${id}&clientTransactionId=${clientTransactionId}`, req.url)
  );
}
