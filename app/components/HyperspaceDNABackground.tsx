"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  s: number;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function HyperspaceDNABackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const particles: Particle[] = [];
    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const setSize = () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.length = 0;
      const count = Math.floor((w * h) / 9000); // density
      for (let i = 0; i < count; i++) {
        particles.push({
          x: rand(-w * 0.6, w * 0.6),
          y: rand(-h * 0.6, h * 0.6),
          z: rand(0.2, 1.0),
          vx: rand(-0.02, 0.02),
          vy: rand(-0.02, 0.02),
          vz: rand(0.004, 0.012),
          s: rand(0.6, 1.8),
        });
      }
    };

    const drawVignette = () => {
      const g = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
      g.addColorStop(0, "rgba(0,0,0,0.15)");
      g.addColorStop(0.55, "rgba(0,0,0,0.58)");
      g.addColorStop(1, "rgba(0,0,0,0.90)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const drawNebula = (t: number) => {
      // obsidian base with violet + turquoise aurora
      ctx.fillStyle = "#05050a";
      ctx.fillRect(0, 0, w, h);

      const blobs = [
        { x: w * 0.28, y: h * 0.25, r: Math.min(w, h) * 0.55, c1: "rgba(130,70,255,0.10)", c2: "rgba(0,0,0,0)" },
        { x: w * 0.78, y: h * 0.35, r: Math.min(w, h) * 0.48, c1: "rgba(40,220,255,0.09)", c2: "rgba(0,0,0,0)" },
        { x: w * 0.55, y: h * 0.78, r: Math.min(w, h) * 0.62, c1: "rgba(190,110,255,0.07)", c2: "rgba(0,0,0,0)" },
      ];

      const driftX = Math.sin(t * Math.PI * 2) * 18;
      const driftY = Math.cos(t * Math.PI * 2) * 14;

      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x + driftX, b.y + driftY, 0, b.x + driftX, b.y + driftY, b.r);
        g.addColorStop(0, b.c1);
        g.addColorStop(1, b.c2);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x + driftX, b.y + driftY, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawHyperspace = (t: number) => {
      // particles radiate from center -> streaks
      const cx = w * 0.5;
      const cy = h * 0.5;

      for (const p of particles) {
        // advance
        p.z -= p.vz;
        p.x += p.vx * (1.2 - p.z);
        p.y += p.vy * (1.2 - p.z);

        if (p.z <= 0.08) {
          p.x = rand(-w * 0.6, w * 0.6);
          p.y = rand(-h * 0.6, h * 0.6);
          p.z = rand(0.6, 1.0);
          p.vz = rand(0.006, 0.014);
          p.vx = rand(-0.02, 0.02);
          p.vy = rand(-0.02, 0.02);
          p.s = rand(0.6, 1.8);
        }

        const k = 1 / p.z;
        const x = cx + p.x * k;
        const y = cy + p.y * k;

        // previous position for streak
        const k2 = 1 / (p.z + p.vz * 8);
        const x2 = cx + p.x * k2;
        const y2 = cy + p.y * k2;

        const dist = Math.hypot(x - cx, y - cy);
        const alpha = clamp(0.02 + dist / Math.max(w, h), 0.03, 0.22);

        // subtle color shift
        const hueMix = (Math.sin((t + p.z) * Math.PI * 2) + 1) / 2; // 0..1
        const c = hueMix > 0.55 ? `rgba(40,220,255,${alpha})` : `rgba(170,110,255,${alpha})`;

        ctx.strokeStyle = c;
        ctx.lineWidth = clamp(p.s * (1.2 - p.z), 0.6, 2.2);
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x, y);
        ctx.stroke();

        // star head
        ctx.fillStyle = `rgba(255,255,255,${alpha * 1.2})`;
        ctx.beginPath();
        ctx.arc(x, y, clamp(p.s * 0.9, 0.6, 1.8), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawDNA = (t: number) => {
      const cx = w * 0.5;
      const amp = Math.min(w * 0.18, 260);
      const turns = 3.6;
      const step = 7;
      const pulse = 0.55 + 0.45 * Math.sin(t * Math.PI * 2); // 0..1

      const drawStrand = (phase: number, front: boolean) => {
        for (let y = -80; y <= h + 80; y += step) {
          const yn = y / h;
          const p = (yn + t) % 1; // seamless
          const ang = (p * turns) * Math.PI * 2 + phase;

          const x = cx + Math.sin(ang) * amp;
          const depth = (Math.cos(ang) + 1) / 2; // 0..1

          // strand color: turquoise front, violet back, both pulsing
          const a = (0.08 + depth * 0.26) * (0.7 + pulse * 0.8) * (front ? 1.0 : 0.75);
          const core = front ? `rgba(40,220,255,${a})` : `rgba(170,110,255,${a})`;

          // core point
          ctx.fillStyle = core;
          ctx.beginPath();
          ctx.arc(x, y, 1.0 + depth * 2.1, 0, Math.PI * 2);
          ctx.fill();

          // glow
          const g = ctx.createRadialGradient(x, y, 0, x, y, 20 + depth * 38);
          g.addColorStop(0, front ? `rgba(40,220,255,${0.09 + pulse * 0.10})` : `rgba(170,110,255,${0.08 + pulse * 0.09})`);
          g.addColorStop(0.45, `rgba(255,255,255,${0.02 + pulse * 0.03})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 20 + depth * 38, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      const drawRungs = () => {
        ctx.save();
        ctx.lineWidth = 1;
        for (let y = -80; y <= h + 80; y += 26) {
          const yn = y / h;
          const p = (yn + t) % 1;
          const angA = (p * turns) * Math.PI * 2;
          const angB = angA + Math.PI;

          const x1 = cx + Math.sin(angA) * amp;
          const x2 = cx + Math.sin(angB) * amp;

          const d1 = (Math.cos(angA) + 1) / 2;
          const d2 = (Math.cos(angB) + 1) / 2;
          const depth = (d1 + d2) / 2;

          const a = (0.03 + depth * 0.10) * (0.6 + pulse * 0.9);
          ctx.strokeStyle = `rgba(255,255,255,${a})`;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }
        ctx.restore();
      };

      // back then rungs then front
      drawStrand(Math.PI, false);
      drawRungs();
      drawStrand(0, true);
    };

    const loop = (now: number) => {
      const t = ((now / 1000) * 0.055) % 1; // speed (seamless)

      drawNebula(t);
      drawHyperspace(t);
      drawDNA(t);
      drawVignette();

      raf = requestAnimationFrame(loop);
    };

    setSize();
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", setSize);

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
