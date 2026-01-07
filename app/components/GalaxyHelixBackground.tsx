"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; a: number };
type Blob = { x: number; y: number; r: number; a: number };

export default function GalaxyHelixBackground() {
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

    const bgStars: Star[] = [];
    const blobs: Blob[] = [];

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const resize = () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      bgStars.length = 0;
      const starCount = Math.floor((w * h) / 12000);
      for (let i = 0; i < starCount; i++) {
        bgStars.push({
          x: rand(0, w),
          y: rand(0, h),
          r: rand(0.5, 1.8),
          a: rand(0.08, 0.35),
        });
      }

      blobs.length = 0;
      const blobCount = Math.max(6, Math.floor((w * h) / 160000));
      for (let i = 0; i < blobCount; i++) {
        blobs.push({
          x: rand(w * 0.1, w * 0.9),
          y: rand(h * 0.1, h * 0.9),
          r: rand(Math.min(w, h) * 0.18, Math.min(w, h) * 0.48),
          a: rand(0.05, 0.12),
        });
      }
    };

    const drawVignette = () => {
      const g = ctx.createRadialGradient(
        w * 0.5,
        h * 0.45,
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.78
      );
      g.addColorStop(0, "rgba(0,0,0,0.10)");
      g.addColorStop(0.55, "rgba(0,0,0,0.55)");
      g.addColorStop(1, "rgba(0,0,0,0.90)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const drawNebula = () => {
      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        // Nebula palette: white + faint cosmic purple/ice (subtle; not "blue bolt")
        g.addColorStop(0, `rgba(255,255,255,${b.a})`);
        g.addColorStop(0.33, `rgba(210,220,255,${b.a * 0.55})`);
        g.addColorStop(0.68, `rgba(175,160,255,${b.a * 0.35})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawBackgroundStars = (t: number) => {
      const dx = Math.sin(t * Math.PI * 2) * 0.7;
      const dy = Math.cos(t * Math.PI * 2) * 0.7;

      for (const s of bgStars) {
        ctx.globalAlpha = s.a;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(s.x + dx, s.y + dy, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawHelix = (t: number) => {
      const cx = w * 0.5;

      // Bigger and clearer than the previous "pixel" helix
      const amp = Math.min(w * 0.22, 320); // width of helix swing
      const turnsVisible = 3.0; // twists visible on screen
      const step = 5; // vertical resolution
      const rungEvery = 20;

      const drawStrand = (phase: number) => {
        for (let y = -80; y <= h + 80; y += step) {
          const yn = y / h;
          // Seamless loop: everything is based on modulo-1 phase
          const p = (yn + t) % 1;
          const ang = p * turnsVisible * Math.PI * 2 + phase;

          const x = cx + Math.sin(ang) * amp;
          const depth = (Math.cos(ang) + 1) / 2; // 0..1 (front/back)

          const r = 1.1 + depth * 2.8;
          const a = 0.10 + depth * 0.32;

          // Core star point
          ctx.globalAlpha = a;
          ctx.fillStyle = "white";
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();

          // Cluster glow
          const glowR = 22 + depth * 34;
          const g = ctx.createRadialGradient(x, y, 0, x, y, glowR);
          g.addColorStop(0, `rgba(255,255,255,${0.10 + depth * 0.12})`);
          g.addColorStop(0.35, `rgba(220,230,255,${0.06 + depth * 0.08})`);
          g.addColorStop(0.72, `rgba(185,170,255,${0.04 + depth * 0.05})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, glowR, 0, Math.PI * 2);
          ctx.fill();

          // Extra speckle (deterministic-ish)
          if (((y * 7 + Math.floor(t * 1000)) | 0) % 41 === 0) {
            ctx.globalAlpha = a * 0.9;
            ctx.fillStyle = "white";
            ctx.fillRect(x + rand(-12, 12), y + rand(-12, 12), 1, 1);
          }
        }
      };

      const drawRungs = () => {
        ctx.save();
        ctx.lineWidth = 1;

        for (let y = -80; y <= h + 80; y += rungEvery) {
          const yn = y / h;
          const p = (yn + t) % 1;
          const angA = p * turnsVisible * Math.PI * 2;
          const angB = angA + Math.PI;

          const x1 = cx + Math.sin(angA) * amp;
          const x2 = cx + Math.sin(angB) * amp;

          const d1 = (Math.cos(angA) + 1) / 2;
          const d2 = (Math.cos(angB) + 1) / 2;
          const depth = (d1 + d2) / 2;

          ctx.globalAlpha = 0.05 + depth * 0.14;
          ctx.strokeStyle = "white";
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }

        ctx.restore();
        ctx.globalAlpha = 1;
      };

      // back strand -> rungs -> front strand
      drawStrand(Math.PI);
      drawRungs();
      drawStrand(0);

      ctx.globalAlpha = 1;
    };

    let start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) / 1000;
      const t = (elapsed * 0.042) % 1; // speed (smaller = slower)

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      drawNebula();
      drawBackgroundStars(t);
      drawHelix(t);
      drawVignette();

      raf = requestAnimationFrame(loop);
    };

    resize();
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />;
}
