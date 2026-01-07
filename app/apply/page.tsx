import Link from "next/link";
import { MailtoValidatorApplyForm } from "../components/MailtoValidatorApplyForm";

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="oo-glass rounded-3xl p-6 md:p-8">

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white/90">Apply to Become a Validator</h1>
          <p className="mt-2 max-w-3xl text-white/60">
            Validators are the backbone of DeFi Network: they run full nodes, sign blocks, and keep
            consensus honest. Rewards come with real responsibility.
          </p>
        </div>
        <Link
          href="/infrastructure"
          className="text-sm text-white/60 hover:text-white"
        >
          View slides →
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white/90">Minimum expectations</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/60">
            <li>Stake DeFi tokens (required by the protocol to validate).</li>
            <li>High uptime and reliable networking ("always-on" mindset).</li>
            <li>Secure key management and clean operational hygiene.</li>
            <li>Willingness to monitor alerts and respond to incidents.</li>
            <li>Participate in governance votes and upgrades when required.</li>
          </ul>

          <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-sm font-semibold text-white/80">Mental model</div>
            <p className="mt-2 text-sm text-white/60">
              <span className="text-white/80">Nodes</span> are watchers.
              <span className="ml-2 text-white/80">Validators</span> are judges.
            </p>
          </div>
        </div>

        <MailtoValidatorApplyForm />
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white/90">Have questions first?</h3>
        <p className="mt-2 text-sm text-white/60">
          No problem—send questions any time and we&apos;ll help you get aligned.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Contact
          </Link>
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "validators@proton.me"}?subject=${encodeURIComponent(
              "Validator Questions"
            )}`}
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
          >
            Email us
          </a>
        </div>
      </div>
    
      </div>
</div>
  );
}
