import { useEffect } from "react";

const ICONS = ["🍬", "🎄", "⭐", "❄️", "🎁", "🔔", "🦌", "🍭"];

export function CursorTrail() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 45) return;
      last = now;
      const el = document.createElement("span");
      el.className = "cursor-sparkle";
      el.textContent = ICONS[Math.floor(Math.random() * ICONS.length)]!;
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.setProperty("--dx", `${(Math.random() - 0.5) * 60}px`);
      el.style.setProperty("--rot", `${(Math.random() - 0.5) * 120}deg`);
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 900);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}
