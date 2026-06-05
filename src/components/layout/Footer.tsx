"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ─── ASCII art GRSSALEX PORTFOLIO ─────────────────────────────────────────────
const ASCII_LOGO = `
  ██████╗ ██████╗ ███████╗███████╗ █████╗ ██╗     ███████╗██╗  ██╗
 ██╔════╝ ██╔══██╗██╔════╝██╔════╝██╔══██╗██║     ██╔════╝╚██╗██╔╝
 ██║  ███╗██████╔╝███████╗███████╗███████║██║     █████╗   ╚███╔╝ 
 ██║   ██║██╔══██╗╚════██║╚════██║██╔══██║██║     ██╔══╝   ██╔██╗ 
 ╚██████╔╝██║  ██║███████║███████║██║  ██║███████╗███████╗██╔╝ ██╗
  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝

 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
`.trim();

// ─── Boot sequence lines ──────────────────────────────────────────────────────
const BOOT_LINES = [
  { text: "BIOS v2.4.1 — grssalex.dev firmware", delay: 0,    color: "#888888" },
  { text: "Detecting hardware...", delay: 120, color: "#888888" },
  { text: "CPU: Raspberry Pi 4 @ 1.8GHz [OK]", delay: 260, color: "#22c55e" },
  { text: "RAM: 8GB LPDDR4 [OK]", delay: 380, color: "#22c55e" },
  { text: "Storage: NVMe 512GB [OK]", delay: 480, color: "#22c55e" },
  { text: "Initializing kernel 6.1.0-portfolio...", delay: 620, color: "#888888" },
  { text: "[ OK ] Mounted /dev/portfolio", delay: 780, color: "#22c55e" },
  { text: "[ OK ] Started Docker daemon", delay: 880, color: "#22c55e" },
  { text: "[ OK ] WireGuard VPN established", delay: 980, color: "#22c55e" },
  { text: "[ OK ] nginx — reverse proxy active", delay: 1080, color: "#22c55e" },
  { text: "[ OK ] Loaded grssalex.dev static bundle", delay: 1200, color: "#22c55e" },
  { text: "", delay: 1320, color: "#888888" },
  { text: "Preparing portfolio experience...", delay: 1420, color: "#888888" },
  { text: "WARNING: Rogue button detected. Initiating chaos mode.", delay: 1600, color: "#f59e0b" },
  { text: "", delay: 1750, color: "#888888" },
  { text: "$ sl", delay: 1900, color: "#EDEDED" },
  { text: "", delay: 2000, color: "#888888" },
];

// ─── SL Train frames ──────────────────────────────────────────────────────────
const TRAIN_FRAMES = [
  [
    "      ====        ________                ___________ ",
    "  _D _|  |_______/        \\__I_I_____===__|_________| ",
    "   |(_)---  |   H\\________/ |   |        =|___ ___|  ",
    "   /     |  |   H  |  |     |   |         ||_| |_||  ",
    "  |      |  |   H  |__--------------------| [___] |  ",
    "  | ________|___H__/__|_____/[][]~\\_______|       |  ",
    "  |/ |   |-----------I_____I [][] []  D   |=======|__",
    "__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__",
    " |/-=|___|=    ||    ||    ||    |_____/~\\___/        ",
    "  \\_/      \\O=====O=====O=====O_/      \\_/            ",
  ],
  [
    "      ====        ________                ___________ ",
    "  _D _|  |_______/        \\__I_I_____===__|_________| ",
    "   |(_)---  |   H\\________/ |   |        =|___ ___|  ",
    "   /     |  |   H  |  |     |   |         ||_| |_||  ",
    "  |      |  |   H  |__--------------------| [___] |  ",
    "  | ________|___H__/__|_____/[][]~\\_______|       |  ",
    "  |/ |   |-----------I_____I [][] []  D   |=======|__",
    "__/ =| o |=-O~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__",
    " |/-=|___|=    ||    ||    ||    |_____/~\\___/        ",
    "  \\_/      \\_/=====O=====O=====O/      \\_/            ",
  ],
  [
    "      ====        ________                ___________ ",
    "  _D _|  |_______/        \\__I_I_____===__|_________| ",
    "   |(_)---  |   H\\________/ |   |        =|___ ___|  ",
    "   /     |  |   H  |  |     |   |         ||_| |_||  ",
    "  |      |  |   H  |__--------------------| [___] |  ",
    "  | ________|___H__/__|_____/[][]~\\_______|       |  ",
    "  |/ |   |-----------I_____I [][] []  D   |=======|__",
    "__/ =| o |=--O-\\  /~~\\  /~~\\  /~~\\ ____Y___________|_",
    " |/-=|___|=    ||    ||    ||    |_____/~\\___/        ",
    "  \\_/      \\_/-----O=====O=====O/      \\_/            ",
  ],
];

// ─── Overlay component ────────────────────────────────────────────────────────
function BootOverlay({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<{ text: string; color: string }[]>([]);
  const [showLogo, setShowLogo] = useState(false);
  const [showTrain, setShowTrain] = useState(false);
  const [trainOffset, setTrainOffset] = useState(120); // vw units, starts off-screen right
  const [trainFrame, setTrainFrame] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);
  const startRef = useRef<number | undefined>(undefined);

  // Boot lines
  useEffect(() => {
    BOOT_LINES.forEach(({ text, delay, color }) => {
      setTimeout(() => setVisibleLines(prev => [...prev, { text, color }]), delay);
    });
    // Show logo after boot
    setTimeout(() => setShowLogo(true), 2300);
    // Show train after logo
    setTimeout(() => setShowTrain(true), 3200);
  }, []);

  // Train animation
  useEffect(() => {
    if (!showTrain) return;
    let offset = 110; // start right of screen (vw %)
    let lastFrame = performance.now();
    let frame = 0;

    const animate = (now: number) => {
      const dt = now - lastFrame;
      if (dt > 16) {
        offset -= 0.8;
        frame = (frame + 1) % TRAIN_FRAMES.length;
        setTrainOffset(offset);
        setTrainFrame(frame);
        lastFrame = now;
      }
      if (offset > -120) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Train passed — done
        setTimeout(onDone, 400);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [showTrain, onDone]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 999998,
        background: "#0A0A0A", color: "#EDEDED",
        fontFamily: "monospace", fontSize: "13px",
        display: "flex", flexDirection: "column",
        padding: "32px", boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* Boot lines */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {visibleLines.map((line, i) => (
          <div key={i} style={{ color: line.color, lineHeight: "1.7", whiteSpace: "pre" }}>
            {line.text || "\u00A0"}
          </div>
        ))}
      </div>

      {/* ASCII logo */}
      {showLogo && (
        <div style={{ marginTop: "24px", marginBottom: "16px" }}>
          <pre style={{
            color: "#22c55e",
            fontSize: "clamp(5px, 0.9vw, 12px)",
            lineHeight: "1.2",
            margin: 0,
            overflowX: "hidden",
          }}>
            {ASCII_LOGO}
          </pre>
        </div>
      )}

      {/* SL Train */}
      {showTrain && (
        <div style={{
          position: "relative",
          height: "220px",
          overflow: "hidden",
          marginTop: "8px",
          borderTop: "1px solid #222",
        }}>
          <div style={{
            position: "absolute",
            left: `${trainOffset}vw`,
            bottom: "8px",
            whiteSpace: "pre",
            color: "#f59e0b",
            lineHeight: "1.4",
            fontSize: "clamp(8px, 1.1vw, 14px)",
          }}>
            {TRAIN_FRAMES[trainFrame].map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleHover = () => {
    if (!buttonRef.current || clicked) return;
    const newX = (Math.random() - 0.5) * 200;
    const newY = (Math.random() - 0.5) * 100;
    setButtonPos({ x: newX, y: newY });
  };

  const handleClick = () => {
    setClicked(true);
    setShowOverlay(true);
  };

  const handleDone = useCallback(() => {
    setShowOverlay(false);
  }, []);

  return (
    <>
      {showOverlay && <BootOverlay onDone={handleDone} />}

      <footer className="py-8 mt-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#666666] dark:text-[#888888] w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 relative">
        <p>© {new Date().getFullYear()} Alexandre. Tous droits réservés.</p>

        {clicked ? (
          <span className="absolute left-1/2 -translate-x-1/2 text-red-500 font-mono text-xs animate-pulse hidden md:block">
            Je t&apos;avais dit de ne pas cliquer...
          </span>
        ) : (
          <button
            ref={buttonRef}
            onMouseEnter={handleHover}
            onClick={handleClick}
            style={{
              transform: `translate(${buttonPos.x}px, ${buttonPos.y}px)`,
              transition: "transform 0.2s ease-out",
            }}
            className="absolute left-1/2 -translate-x-1/2 px-3 py-1 text-xs border border-red-500/30 text-red-500 rounded-full hover:bg-red-500/10 hidden md:block"
          >
            Ne pas cliquer
          </button>
        )}

        <div className="flex items-center gap-6">
          <a href="https://github.com/grssalex" target="_blank" rel="noopener noreferrer" className="hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/grssalex" target="_blank" rel="noopener noreferrer" className="hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors">
            LinkedIn
          </a>
        </div>
      </footer>
    </>
  );
}
