import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El UNO Bíblico — El Juego que Acerca a tu Familia a Dios",
  description: "El juego de cartas bíblico que transforma el tiempo familiar en momentos de fe. Aprenden, ríen y crecen juntos en la Palabra de Dios.",
  openGraph: {
    title: "El UNO Bíblico — El Juego que Acerca a tu Familia a Dios",
    description: "4,127 familias ya lo tienen. ¿La tuya todavía no?",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
