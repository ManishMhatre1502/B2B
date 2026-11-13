"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, LoaderCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InviteInfo = { email: string; businessName: string; existingUser: boolean };
export function AcceptInviteForm({ token }: { token: string }) {
  const router = useRouter();
  const [invite, setInvite] = useState<InviteInfo | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [signedEmail, setSignedEmail] = useState("");
  const [signedRole, setSignedRole] = useState("");
  useEffect(() => {
    Promise.all([
      fetch("/api/invitations/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) }).then((response) => response.json()),
      fetch("/api/auth/session").then((response) => response.json()),
    ]).then(([info, session]) => {
      if (!info.email) setError(info.error || "This invitation could not be verified.");
      else { setInvite(info); setSignedEmail(String(session?.user?.email || "").toLowerCase()); setSignedRole(String(session?.user?.roleContext || "")); }
      setLoading(false);
    }).catch(() => { setError("This invitation could not be verified."); setLoading(false); });
  }, [token]);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!invite) return;
    setSubmitting(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") || "");
    const response = await fetch("/api/invitations/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, fullName: String(data.get("fullName") || ""), password }),
    });
    const result = await response.json();
    if (!response.ok) {
      if (result.requiresLogin) setError("Sign in with the invited email, then return here to accept.");
      else setError(result.error || "We could not accept this appointment.");
      setSubmitting(false);
      return;
    }
    if (result.createdAccount) {
      const signInResult = await signIn("credentials", { email: result.email, password, roleContext: "head", redirect: false });
      if (signInResult?.error) { router.push("/login?role=head"); return; }
      router.push("/head/dashboard");
    } else if (signedRole === "head") {
      router.push("/head/dashboard");
    } else {
      router.push("/login?role=head&accepted=1");
    }
    router.refresh();
  }
  const callbackUrl = "/invite/accept?token=" + encodeURIComponent(token);
  return (
    <div>
      {loading ? <div className="flex items-center gap-3 rounded-2xl border border-border bg-background p-5 text-sm text-muted-foreground"><LoaderCircle size={17} className="animate-spin text-primary" /> Checking your invitation…</div> : null}
      {!loading && error && !invite ? <p role="alert" className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm leading-6 text-coral">{error}</p> : null}
      {invite && <form onSubmit={submit} className="space-y-5">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary"><ShieldCheck size={15} /> Appointment invitation</div><p className="mt-3 text-lg font-semibold">{invite.businessName}</p><p className="mt-1 text-sm text-muted-foreground">Business head access for <span className="text-foreground">{invite.email}</span></p></div>
        {!invite.existingUser && <><div><Label htmlFor="fullName">Full name</Label><Input id="fullName" name="fullName" autoComplete="name" minLength={2} maxLength={100} required placeholder="Your name" /></div><div><Label htmlFor="password">Create a password</Label><Input id="password" name="password" type="password" autoComplete="new-password" minLength={10} required placeholder="At least 10 characters" /><p className="mt-2 text-xs text-muted-foreground">Use at least 10 characters.</p></div></>}
        {invite.existingUser && signedEmail !== invite.email && <p className="rounded-xl border border-border bg-background px-3 py-3 text-sm leading-6 text-muted-foreground">This email already has a Grwolyx account. Sign in with the invited email to confirm the appointment.</p>}
        {error && <p role="alert" className="rounded-xl border border-coral/30 bg-coral/10 px-3 py-2.5 text-sm text-coral">{error}</p>}
        {invite.existingUser && signedEmail !== invite.email
          ? <Link href={"/login?callbackUrl=" + encodeURIComponent(callbackUrl)}><Button type="button" className="w-full">Sign in to accept <ArrowRight size={16} /></Button></Link>
          : <Button type="submit" className="w-full" disabled={submitting}>{submitting ? <><LoaderCircle size={16} className="animate-spin" /> Accepting appointment…</> : <>Accept appointment <ArrowRight size={16} /></>}</Button>}
      </form>}
    </div>
  );
}
