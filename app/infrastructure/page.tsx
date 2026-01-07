import Link from "next/link";

export default function InfrastructurePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="oo-glass rounded-3xl p-6 md:p-8">
        <h1 className="text-3xl font-semibold text-white/90">Nodes vs Validators</h1>
        <p className="mt-2 max-w-3xl text-white/60">
          Nodes verify and relay. Validators produce blocks and participate in consensus.
          Use the decks below to learn the difference and to onboard operators.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/slides/nodes.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15"
          >
            Open Nodes Slides (PDF)
          </a>
          <a
            href="/slides/validators.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15"
          >
            Open Validators Slides (PDF)
          </a>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white/90">Nodes</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              <li>• Download & verify the blockchain state</li>
              <li>• Relay blocks and transactions across the network</li>
              <li>• Strengthen decentralization & resilience</li>
              <li>• Anyone can run a node (no validator slot required)</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white/90">Validators</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              <li>• Run a full node + validator process</li>
              <li>• Propose and sign blocks (consensus participation)</li>
              <li>• Earn block rewards + fees (per protocol rules)</li>
              <li>• Limited & curated slots for network stability</li>
            </ul>
            <div className="mt-4 text-sm">
              <Link
                className="font-semibold text-white underline decoration-white/25 underline-offset-4 hover:decoration-white"
                href="/apply"
              >
                Apply to Become a Validator →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white/90">Need help?</h3>
          <p className="mt-2 text-sm text-white/65">
            If you have questions about hardware, uptime, region selection, or security practices,
            reach out via the Contact page.
          </p>
          <div className="mt-3 text-sm">
            <Link
              className="font-semibold text-white underline decoration-white/25 underline-offset-4 hover:decoration-white"
              href="/contact"
            >
              Contact →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
