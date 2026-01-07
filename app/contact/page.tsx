import { TopNav } from "../components/TopNav";

const EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "defiweb4@icloud.com";

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <TopNav />

      <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl sm:p-8">
        <h1 className="text-3xl font-bold">Contact</h1>

        <p className="mt-3 text-sm text-white/70">
          Questions, validator onboarding, or anything network-related — reach us here.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs font-semibold tracking-widest text-white/60">
              EMAIL
            </div>

            <a
              className="mt-2 block text-lg font-semibold underline decoration-white/25 underline-offset-4 hover:decoration-white"
              href={`mailto:${EMAIL}`}
            >
              {EMAIL}
            </a>

            <p className="mt-2 text-sm text-white/60">
              We typically respond within 24–48 hours.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs font-semibold tracking-widest text-white/60">
              QUICK SUBJECTS
            </div>

            <div className="mt-3 space-y-2 text-sm">
              <a
                className="block rounded-xl border border-white/10 bg-black/30 px-4 py-3 hover:bg-black/45"
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  "Validator Application"
                )}`}
              >
                Validator Application
              </a>

              <a
                className="block rounded-xl border border-white/10 bg-black/30 px-4 py-3 hover:bg-black/45"
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  "Node Setup Question"
                )}`}
              >
                Node Setup Question
              </a>

              <a
                className="block rounded-xl border border-white/10 bg-black/30 px-4 py-3 hover:bg-black/45"
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  "Partnership / Integration"
                )}`}
              >
                Partnership / Integration
              </a>
            </div>

            <p className="mt-3 text-xs text-white/50">
              Tip: include your server specs + region if you’re asking about nodes/validators.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs font-semibold tracking-widest text-white/60">
            NETWORK
          </div>
          <p className="mt-2 text-sm text-white/70">
            OnlyOnDeFi is the landing hub for apps, infrastructure, and validator onboarding for the DeFi Network.
          </p>
        </div>
      </div>
    </main>
  );
}
