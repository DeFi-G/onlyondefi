import Link from "next/link";

export function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-semibold tracking-wide text-white/90 hover:text-white">
          OnlyOnDeFi
        </Link>
        <nav className="flex items-center gap-5 text-sm text-white/70">
          <Link href="/apps" className="hover:text-white">
            Apps
          </Link>
          <Link href="/infrastructure" className="hover:text-white">
            Nodes & Validators
          </Link>
          <Link href="/apply" className="hover:text-white">
            Apply
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          <a
            href="/slides/nodes.pdf"
            className="hidden sm:inline hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Slides (PDF)
          </a>
        </nav>
      </div>
    </header>
  );
}
