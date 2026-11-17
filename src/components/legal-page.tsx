import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export function LegalPage({ title, description, checklist }: { title: string; description: string; checklist: string[] }) {
  return <main className="min-h-dvh bg-background px-5 py-10 sm:px-8 sm:py-16">
    <article className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 sm:p-10">
      <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Back to Grolyx</Link>
      <p className="mt-10 text-xs font-semibold uppercase tracking-[.18em] text-primary">GROLYX · {title}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
      <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/5 p-5"><p className="font-semibold">Draft page — not a finalized legal policy</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Complete and review this document with your organization before relying on it for customers. The current app does not contain the details needed to publish a complete policy.</p></div>
      <section className="mt-8"><h2 className="text-lg font-semibold">Details to finalize</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">{checklist.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <a href="mailto:support@grolyx.com" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline"><Mail size={16} /> Contact Grolyx support</a>
    </article>
  </main>;
}
