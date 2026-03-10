"use client";

import { useState } from "react";
import PaymentModal from "./PaymentModal";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function BuyButton({ className = "", children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <PaymentModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
