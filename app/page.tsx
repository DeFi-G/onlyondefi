import Link from "next/link";
export default function HomePage() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6">
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
          <div className="select-none">
            <div className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
              <span className="oo-wordmark">OnlyOn</span>
              <span className="oo-defiGlow">DeFi</span>
            </div>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              The home for everything that powers the DeFi Network: apps, infrastructure, and validator onboarding.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/apps"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
            >
              Explore Apps
            </Link>
            <Link
              href="/infrastructure"
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Nodes vs Validators
            </Link>
            <Link
              href="/apply"
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Apply to Become a Validator
            </Link>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm text-white/60">
            <a className="hover:text-white" href="/slides/nodes.pdf" target="_blank" rel="noreferrer">
              View Node Slides (PDF)
            </a>
            <span className="text-white/30">•</span>
            <a className="hover:text-white" href="/slides/validators.pdf" target="_blank" rel="noreferrer">
              View Validator Slides (PDF)
            </a>
          </div>
        </div>
</section>

      {/* QUICK APP HIGHLIGHTS */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs font-semibold tracking-widest text-white/60">PHASE ZERO</div>
            <div className="mt-2 text-lg font-semibold text-white/90">Omni Wallet</div>
            <p className="mt-2 text-sm text-white/70">
              Dashboard-first wallet for validators and nodes.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs font-semibold tracking-widest text-white/60">ACCESS LAYER</div>
            <div className="mt-2 text-lg font-semibold text-white/90">Gateway</div>
            <p className="mt-2 text-sm text-white/70">
              Creator + user entry point for Web4 activity.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs font-semibold tracking-widest text-white/60">INFRA</div>
            <div className="mt-2 text-lg font-semibold text-white/90">Validators & Nodes</div>
            <p className="mt-2 text-sm text-white/70">
              Secure consensus, maintain uptime, and keep the chain alive.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
