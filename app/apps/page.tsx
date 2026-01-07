export default function AppsPage() {
  const apps = [
    { name: "Omni Wallet", slug: "/OmniWallet", status: "Phase Zero focus" },
    { name: "Gateway", slug: "/Gateway", status: "In development" },
    { name: "Atom Exchange", slug: "/AtomExchange", status: "In development" },
    { name: "DeFi Play", slug: "/DeFiPlay", status: "Planned" },
    { name: "DeFi Toon", slug: "/DeFiToon", status: "Planned" },
    { name: "Ride app", slug: "/Ride", status: "Planned" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="oo-glass rounded-3xl p-6 md:p-8">

      <h1 className="text-3xl font-semibold text-white/90">Apps</h1>
      <p className="mt-2 max-w-3xl text-white/60">
        This is the hub directory. Each app will live under its own route and deploy independently.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {apps.map((a) => (
          <div
            key={a.name}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-lg font-semibold text-white/90">{a.name}</div>
              <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/60">
                {a.status}
              </div>
            </div>
            <div className="mt-3 text-sm text-white/60">{a.slug}</div>
          </div>
        ))}
      </div>
    
      </div>
</div>
  );
}
