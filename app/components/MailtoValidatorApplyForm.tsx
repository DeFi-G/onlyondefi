"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  xHandle: string;
  location: string;
  hardware: string;
  experience: string;
  notes: string;
};

function enc(v: string) {
  return encodeURIComponent(v);
}

export function MailtoValidatorApplyForm() {
  const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "defiweb4@icloud.com";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    xHandle: "",
    location: "",
    hardware: "",
    experience: "",
    notes: "",
  });

  const subject = useMemo(() => {
    const who = form.name?.trim() ? ` — ${form.name.trim()}` : "";
    return `Validator Application${who}`;
  }, [form.name]);

  const body = useMemo(() => {
    const lines = [
      "Validator Application — OnlyOnDeFi.com",
      "",
      `Name: ${form.name || ""}`,
      `Email: ${form.email || ""}`,
      `X handle: ${form.xHandle || ""}`,
      `Location/Region: ${form.location || ""}`,
      "",
      "Hardware / Hosting:",
      form.hardware || "",
      "",
      "Experience:",
      form.experience || "",
      "",
      "Additional notes:",
      form.notes || "",
      "",
      "—",
      "(Submitted via OnlyOnDeFi.com)",
    ];
    return lines.join("\n");
  }, [form]);

  const mailtoHref = useMemo(() => {
    return `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`;
  }, [to, subject, body]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-lg font-semibold text-white/90">Application</div>
      <p className="mt-2 text-sm text-white/60">
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field
          label="Name"
          value={form.name}
          onChange={(v) => setForm((s) => ({ ...s, name: v }))}
        />
        <Field
          label="Email"
          value={form.email}
          onChange={(v) => setForm((s) => ({ ...s, email: v }))}
          type="email"
        />
        <Field
          label="X handle (optional)"
          value={form.xHandle}
          onChange={(v) => setForm((s) => ({ ...s, xHandle: v }))}
          placeholder="@yourhandle"
        />
        <Field
          label="Location / Region"
          value={form.location}
          onChange={(v) => setForm((s) => ({ ...s, location: v }))}
          placeholder="Central US / EU-West / etc"
        />
      </div>

      <div className="mt-4">
        <TextArea
          label="Hardware / Hosting"
          value={form.hardware}
          onChange={(v) => setForm((s) => ({ ...s, hardware: v }))}
          placeholder="VPS provider / dedicated server specs / uptime plan..."
        />
      </div>

      <div className="mt-4">
        <TextArea
          label="Experience"
          value={form.experience}
          onChange={(v) => setForm((s) => ({ ...s, experience: v }))}
          placeholder="Linux, monitoring, Cosmos/Tendermint, infra ops, security..."
        />
      </div>

      <div className="mt-4">
        <TextArea
          label="Anything else"
          value={form.notes}
          onChange={(v) => setForm((s) => ({ ...s, notes: v }))}
          placeholder="Why you want to validate, community background, questions..."
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={mailtoHref}
          className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
        >
          Send Application
        </a>
        <div className="text-xs text-white/50">
          Destination: <span className="text-white/70">{to}</span>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <div className="text-xs font-semibold tracking-wide text-white/70">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/25"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="text-xs font-semibold tracking-wide text-white/70">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/25"
      />
    </label>
  );
}
