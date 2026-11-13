"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function LoginForm({ callbackUrl, defaultRole = "owner" }: { callbackUrl?: string; defaultRole?: "owner" | "head" }) {
  const router = useRouter();
  const [roleContext, setRoleContext] = useState<"owner" | "head">(defaultRole);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const result = await signIn("credentials", { email: String(data.get("email") || ""), password: String(data.get("password") || ""), roleContext, redirect: false });
    if (result?.error) { setError("Those sign-in details did not match an account with that role."); setLoading(false); return; }
    const safeCallback = callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//") ? callbackUrl : "";
    router.push(safeCallback || (roleContext === "head" ? "/head/dashboard" : "/dashboard"));
    router.refresh();
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      <div><Label htmlFor="roleContext">Sign in as</Label><div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-background p-1">{(["owner", "head"] as const).map((role) => <button key={role} type="button" onClick={() => setRoleContext(role)} aria-pressed={roleContext === role} className={cn("min-h-10 rounded-lg text-sm font-medium capitalize transition-colors", roleContext === role ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground")}>{role === "head" ? "Business head" : "Owner"}</button>)}</div></div>
      <div><Label htmlFor="email">Email address</Label><Input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></div>
      <div><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required /></div>
      {error && <p role="alert" className="rounded-xl border border-coral/30 bg-coral/10 px-3 py-2.5 text-sm text-coral">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>{loading ? <><LoaderCircle size={16} className="animate-spin" /> Signing in…</> : <>Sign in <ArrowRight size={16} /></>}</Button>
      <p className="text-center text-sm text-muted-foreground">New to Grwolyx? <Link href="/register" className="font-semibold text-primary hover:underline">Create an owner account</Link></p>
    </form>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName: String(form.get("fullName") || ""), email: String(form.get("email") || ""), password: String(form.get("password") || "") }),
    });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "Could not create your account."); setLoading(false); return; }
    router.push("/login?registered=1");
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      <div><Label htmlFor="fullName">Full name</Label><Input id="fullName" name="fullName" autoComplete="name" placeholder="Your name" minLength={2} maxLength={100} required /></div>
      <div><Label htmlFor="email">Work email</Label><Input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></div>
      <div><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" autoComplete="new-password" minLength={10} placeholder="At least 10 characters" required /><p className="mt-2 text-xs text-muted-foreground">Use at least 10 characters. A password manager is welcome.</p></div>
      {error && <p role="alert" className="rounded-xl border border-coral/30 bg-coral/10 px-3 py-2.5 text-sm text-coral">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>{loading ? <><LoaderCircle size={16} className="animate-spin" /> Creating workspace…</> : <>Create owner account <ArrowRight size={16} /></>}</Button>
      <p className="text-center text-sm text-muted-foreground">Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Sign in</Link></p>
    </form>
  );
}

export function AuthPageFrame({ children, eyebrow, title, description }: { children: React.ReactNode; eyebrow: string; title: string; description: string }) {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,201,0,.11),transparent_48%)]" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-border bg-card shadow-2xl shadow-black/40 md:grid-cols-[.9fr_1.1fr]">
        <div className="hidden min-h-[620px] flex-col justify-between bg-[linear-gradient(150deg,rgba(255,201,0,.12),transparent_45%),#0D0F12] p-10 md:flex">
          <Link href="/" className="inline-flex w-fit items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Image src="/logo.png" alt="Grwolyx" width={166} height={52} className="h-11 w-[132px] object-contain" priority /></Link>
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Daily operations, in focus</p><h2 className="mt-4 text-3xl font-semibold leading-tight">Make every business easier to run.</h2><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">A consistent daily picture for the people leading the work and the people seeing the whole portfolio.</p></div>
          <p className="text-xs text-muted-foreground">One workspace. A clearer next move.</p>
        </div>
        <div className="p-6 sm:p-10 md:p-12">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={15} /> Back to Grwolyx</Link>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">{eyebrow}</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h1><p className="mt-3 mb-8 leading-6 text-muted-foreground">{description}</p>{children}
        </div>
      </div>
    </main>
  );
}
