import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard-shell";
import { BusinessForm } from "@/components/business-form";

export default async function NewBusinessPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.roleContext !== "owner") redirect("/head/dashboard");
  return <DashboardShell><div className="mx-auto max-w-4xl">
    <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={15} /> Back to overview</Link>
    <div className="mb-8 mt-6"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Building2 size={20} /></div><h1 className="mt-5 text-3xl font-semibold tracking-tight">Add a business</h1><p className="mt-2 text-muted-foreground">Give your team the context and daily metrics they need to share.</p></div>
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-7"><BusinessForm /></div>
  </div></DashboardShell>;
}
