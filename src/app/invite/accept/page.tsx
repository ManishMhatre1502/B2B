import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { AcceptInviteForm } from "@/app/invite/accept/accept-form";

export default async function AcceptInvitePage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,201,0,.11),transparent_48%)]" />
      <div className="relative w-full max-w-lg rounded-[28px] border border-border bg-card p-6 shadow-2xl shadow-black/40 sm:p-10">
        <Link href="/" className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={15} /> Grwolyx home</Link>
        <Image src="/logo.png" alt="Grwolyx" width={166} height={52} className="mb-7 h-10 w-[132px] object-contain" priority />
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">You’re invited</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Accept your appointment</h1>
        <p className="mb-8 mt-3 leading-6 text-muted-foreground">Join the business workspace and share the daily picture with your team.</p>
        {token ? <AcceptInviteForm token={token} /> : <p role="alert" className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">This invitation link is missing its token.</p>}
      </div>
    </main>
  );
}
