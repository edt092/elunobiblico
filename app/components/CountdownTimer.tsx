"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [time, setTime] = useState({ h: 2, m: 47, s: 13 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 2; m = 47; s = 13; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-2 justify-center">
      {[
        { val: pad(time.h), label: "HRS" },
        { val: pad(time.m), label: "MIN" },
        { val: pad(time.s), label: "SEG" },
      ].map(({ val, label }, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className="countdown-tick min-w-[52px] bg-[#1A0810] border border-[rgba(212,175,55,0.4)] rounded-lg px-3 py-2 text-center"
            style={{ boxShadow: "0 0 12px rgba(230,48,0,0.3)" }}
          >
            <span className="text-2xl font-black text-[#FF4500] font-mono tabular-nums">
              {val}
            </span>
          </div>
          <span className="text-[9px] font-bold text-[#A88B1A] mt-1 tracking-widest uppercase">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
