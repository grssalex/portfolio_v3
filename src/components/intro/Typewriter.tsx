"use client";

import { useEffect, useState } from "react";

const LINE1 = "Alexandre Grosse.";
const LINE2 = "Ingénieur IA.";
const TOTAL = LINE1.length + LINE2.length;

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="cursor-blink inline-block w-[0.08em] h-[0.9em] ml-[0.06em] align-[-0.08em] bg-accent"
    />
  );
}

/** Titre tapé lettre par lettre ; le texte complet reste lisible par les lecteurs d'écran et les moteurs. */
export default function Typewriter() {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setN(TOTAL), 0);
      return () => clearTimeout(id);
    }
    let i = 0;
    let tick: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      tick = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= TOTAL && tick) clearInterval(tick);
      }, 75);
    }, 300);
    return () => {
      clearTimeout(start);
      if (tick) clearInterval(tick);
    };
  }, []);

  const l1 = LINE1.slice(0, Math.min(n, LINE1.length));
  const l2 = n > LINE1.length ? LINE2.slice(0, n - LINE1.length) : "";

  return (
    <h1 className="text-[clamp(36px,4.8vw,52px)] leading-[1.06] font-bold tracking-[-0.04em] mb-4">
      <span className="sr-only">
        {LINE1} {LINE2}
      </span>
      <span aria-hidden="true" className="block min-h-[1.06em]">
        {l1}
        {n <= LINE1.length && <Cursor />}
      </span>
      <span aria-hidden="true" className="block min-h-[1.06em] text-muted">
        {l2}
        {n > LINE1.length && <Cursor />}
      </span>
    </h1>
  );
}
