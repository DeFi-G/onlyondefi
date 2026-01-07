import Link from "next/link";

export function TopNav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-semibold tracking-wider text-white">
          OnlyOnDeFi
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-200">
          <Link className="hover:text-white" href="/infrastructure">
            Nodes vs Validators
          </Link>
          <a className="hover:text-white" href="#apps">
            Apps
          </a>
        </nav>
      </div>
    </header>
  );
}
