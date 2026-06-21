"use client";
import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let raf = 0;
    const dots = Array.from({ length: 70 }, (_, i) => ({
      x: ((i * 97) % 100) / 100, y: ((i * 53) % 100) / 100,
      vx: (((i % 7) - 3) / 9000), vy: (((i % 5) - 2) / 9000),
    }));
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(139,92,246,0.45)";
      for (const d of dots) {
        d.x = (d.x + d.vx + 1) % 1; d.y = (d.y + d.vy + 1) % 1;
        ctx.beginPath();
        ctx.arc(d.x * canvas.width, d.y * canvas.height, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
