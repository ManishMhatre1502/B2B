import { AuthPageFrame, LoginForm } from "@/components/auth-forms";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string; registered?: string; accepted?: string; role?: string }> }) {
  const params = await searchParams;
  return <AuthPageFrame eyebrow="Welcome back" title="Sign in to Grolyx" description="Pick up the daily picture where your team left it.">{params.registered === "1" && <p className="mb-5 rounded-xl border border-emerald/30 bg-emerald/10 px-3 py-2.5 text-sm text-emerald">Your owner account is ready. Sign in to continue.</p>}{params.accepted === "1" && <p className="mb-5 rounded-xl border border-emerald/30 bg-emerald/10 px-3 py-2.5 text-sm text-emerald">Appointment accepted. Sign in as a business head to open your workspace.</p>}<LoginForm callbackUrl={params.callbackUrl} defaultRole={params.role === "head" ? "head" : "owner"} /></AuthPageFrame>;
}
