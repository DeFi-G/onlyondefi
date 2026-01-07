import React from "react";

/**
 * DeFi wordmark with a pulsing lightning bolt behind it.
 * Pure SVG + CSS animation.
 */
export function LightningLogo() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Lightning bolt */}
      <svg
        className="absolute -z-10 h-[280px] w-[280px] boltPulse"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="boltGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7DD3FC" />
            <stop offset="0.5" stopColor="#60A5FA" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
        </defs>

        <path
          d="M112 10 L58 108 H98 L86 190 L152 90 H112 L128 10 Z"
          fill="url(#boltGrad)"
          filter="url(#glow)"
          opacity="0.95"
        />
      </svg>

      <div className="select-none text-center">
        <div className="text-6xl md:text-7xl font-extrabold tracking-wide defiGlow">
          DeFi
        </div>
        <div className="mt-3 text-sm md:text-base text-white/70">
          OnlyOnDeFi
        </div>
      </div>
    </div>
  );
}
