import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="font-body text-xs font-semibold tracking-[0.08em] text-text-muted uppercase">
        Tech4Bharat 2026
      </p>
      <h1 className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">
        Scalable Innovations for Next-Gen India
      </h1>
      <p className="max-w-xl font-body text-text-secondary">
        The public site is being built page by page per the current build
        plan. In the meantime, review the design-system primitives at{" "}
        <Link href="/dev/components" className="text-primary underline underline-offset-4">
          /dev/components
        </Link>
        .
      </p>
    </main>
  );
}
