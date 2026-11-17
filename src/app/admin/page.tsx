import { redirect } from "next/navigation";
import { Activity, Building2, Users } from "lucide-react";
import { auth } from "@/auth";
import { AdminUsersTable, type AdminUserRow } from "@/components/admin-users-table";
import { dbConnect } from "@/lib/db";
import Business from "@/models/Business";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?role=admin");
  const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
  if (session.user.roleContext !== "admin" || !session.user.email || !adminEmails.includes(session.user.email.toLowerCase())) redirect("/dashboard");

  await dbConnect();
  const [users, businessCounts] = await Promise.all([
    User.find({}).select("fullName email createdAt").sort({ createdAt: -1 }).lean(),
    Business.aggregate<{ _id: string; count: number }>([{ $group: { _id: { $toString: "$ownerId" }, count: { $sum: 1 } } }]),
  ]);
  const counts = new Map(businessCounts.map((row) => [row._id, row.count]));
  const rows: AdminUserRow[] = users.map((user) => ({
    id: String(user._id),
    name: user.fullName,
    email: user.email,
    plan: "Free",
    businesses: counts.get(String(user._id)) || 0,
    status: "Active",
    lastActive: null,
    createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : null,
  }));
  const businessTotal = businessCounts.reduce((sum, item) => sum + item.count, 0);

  return <main className="min-h-dvh bg-background px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <header className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">GROLYX ADMIN</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">User monitoring</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">A view of registered accounts and the businesses in their workspaces.</p></div><a href="/dashboard" className="inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground hover:text-foreground">Back to app</a></header>
      <section aria-label="Platform metrics" className="mb-8 grid gap-4 md:grid-cols-3">
        <Metric icon={<Users size={18} />} label="Total users" value={users.length.toLocaleString()} note="Registered accounts" />
        <div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Activity size={18} className="text-primary" />Active subscriptions</div><p className="mt-4 text-2xl font-semibold">Plan overview</p><div className="mt-3 flex flex-wrap gap-2 text-xs"><span className="rounded-full border border-border bg-background px-2.5 py-1.5">Free · {users.length}</span><span className="rounded-full border border-border bg-background px-2.5 py-1.5">Growth · 0</span><span className="rounded-full border border-border bg-background px-2.5 py-1.5">Portfolio · 0</span></div><p className="mt-3 text-xs text-muted-foreground">Billing data is not connected; all accounts are shown as Free.</p></div>
        <Metric icon={<Building2 size={18} />} label="Businesses created" value={businessTotal.toLocaleString()} note="Across all registered owners" />
      </section>
      <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="mb-5"><h2 className="text-lg font-semibold">User accounts</h2><p className="mt-1 text-sm text-muted-foreground">Search and filter registered accounts. Account status changes in this view are temporary.</p></div>
        <AdminUsersTable users={rows} />
      </section>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">Last active and subscription data are not recorded in the current app. Suspend / activate controls are visual placeholders and do not change user sign-in access.</p>
    </div>
  </main>;
}

function Metric({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string; note: string }) {
  return <div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center gap-2 text-sm text-muted-foreground">{icon}<span>{label}</span></div><p className="mt-4 text-3xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-muted-foreground">{note}</p></div>;
}
