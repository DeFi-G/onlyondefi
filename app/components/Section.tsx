import React from "react";

export function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-3xl text-white/70">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
