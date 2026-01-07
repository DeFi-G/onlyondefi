import React from "react";

export function Starfield() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 starfield" />
      <div className="absolute inset-0 starfield starfield2" />
    </div>
  );
}
