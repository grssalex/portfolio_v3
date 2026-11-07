"use client";

import { Code2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EMAIL } from "@/lib/data";

type Line = { cmd: string; out: string };

const COMMANDS: Record<string, () => string> = {
  help: () => "Commandes : whoami, poste, missions, stack, contact, date, clear",
  whoami: () => "Alexandre Grosse — Ingénieur IA chez Carrefour, fondateur d’AGWS.",
  poste: () => "Ingénieur en Intelligence Artificielle · Direction des Achats Non Marchands · depuis juil. 2026",
  missions: () => "NTP AI · Datalake finance groupe · Contrôle & performance achats · Acculturation IA",
  stack: () => "Python · BigQuery · LangGraph · Gemini · FastAPI · React · GCP",
  contact: () => `${EMAIL} — ou linkedin.com/in/grssalex`,
  date: () => new Date().toLocaleString("fr-FR"),
};

const SUGGESTIONS = ["help", "whoami", "poste", "missions", "stack", "contact"];

export default function Terminal() {
  const [history, setHistory] = useState<Line[]>([{ cmd: "whoami", out: COMMANDS.whoami() }]);
  const [cmd, setCmd] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  const run = (raw: string) => {
    const input = raw.trim();
    if (!input) return;
    const key = input.toLowerCase();
    setCmd("");
    if (key === "clear") return setHistory([]);
    const out =
      COMMANDS[key]?.() ??
      (key.startsWith("sudo") ? "Bien essayé. Cet incident sera signalé." : `commande introuvable : ${input} — tape help`);
    setHistory((h) => [...h, { cmd: input, out }].slice(-8));
  };

  return (
    <>
      <div className="flex flex-wrap items-baseline gap-2 mb-2.5">
        <h3 className="text-[15px] font-semibold">Essayer</h3>
        <span className="text-[13px] text-muted">— tape une commande, ou clique sur une suggestion</span>
      </div>
      <div className="border border-line rounded-xl overflow-hidden bg-term mb-14">
        <div className="flex flex-wrap items-center gap-1.5 px-2.5 py-2 border-b border-line bg-subtle">
          <span className="inline-flex items-center gap-1.5 text-[12.5px] text-muted mr-1.5">
            <Code2 className="w-[13px] h-[13px]" /> alex@grssalex
          </span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => run(s)}
              className="min-h-[30px] px-2.5 border border-line rounded-md bg-bg text-muted font-mono text-xs hover:border-accent hover:text-fg transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
        <div ref={bodyRef} className="px-4 py-3.5 font-mono text-[13.5px] leading-[1.75] min-h-[150px] max-h-[260px] overflow-y-auto">
          {history.map((l, i) => (
            <div key={i}>
              <div>
                <span className="text-accent">➜</span> <span className="text-muted">~</span> {l.cmd}
              </div>
              <div className="text-muted pl-[22px] mb-1.5 whitespace-pre-wrap">{l.out}</div>
            </div>
          ))}
          <label className="flex items-center gap-2">
            <span className="text-accent">➜</span>
            <span className="text-muted">~</span>
            <span className="sr-only">Commande</span>
            <input
              type="text"
              value={cmd}
              onChange={(e) => setCmd(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run(cmd)}
              placeholder="help"
              spellCheck={false}
              autoComplete="off"
              className="flex-1 min-w-0 bg-transparent outline-none placeholder:text-muted/60"
            />
          </label>
        </div>
      </div>
    </>
  );
}
