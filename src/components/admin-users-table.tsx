"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Growth" | "Portfolio";
  businesses: number;
  status: "Active" | "Suspended";
  lastActive: string | null;
  createdAt: string | null;
};

export function AdminUsersTable({ users }: { users: AdminUserRow[] }) {
  const [query, setQuery] = useState("");
  const [plan, setPlan] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [statuses, setStatuses] = useState<Record<string, AdminUserRow["status"]>>({});
  const [selected, setSelected] = useState<AdminUserRow | null>(null);
  const filtered = useMemo(() => users.filter((user) => {
    const status = statuses[user.id] || user.status;
    const matchesSearch = `${user.name} ${user.email}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesSearch && (plan === "all" || user.plan.toLowerCase() === plan) && (statusFilter === "all" || status.toLowerCase() === statusFilter);
  }), [users, query, plan, statusFilter, statuses]);

  return <>
    <div className="mb-4 flex flex-col gap-3 sm:flex-row">
      <label className="relative min-w-0 flex-1"><span className="sr-only">Search users</span><Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or email" className="min-h-11 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20" /></label>
      <label className="flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-3 text-sm"><span className="text-muted-foreground">Plan</span><select value={plan} onChange={(event) => setPlan(event.target.value)} className="bg-transparent font-medium outline-none"><option value="all">All plans</option><option value="free">Free</option><option value="growth">Growth</option><option value="portfolio">Portfolio</option></select></label>
      <label className="flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-3 text-sm"><span className="text-muted-foreground">Status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="bg-transparent font-medium outline-none"><option value="all">All statuses</option><option value="active">Active</option><option value="suspended">Suspended</option></select></label>
    </div>
    <div className="soft-scrollbar overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm">
        <thead className="bg-background text-xs uppercase tracking-wide text-muted-foreground"><tr><th scope="col" className="px-4 py-3 font-medium">User</th><th scope="col" className="px-4 py-3 font-medium">Current plan</th><th scope="col" className="px-4 py-3 font-medium">Businesses</th><th scope="col" className="px-4 py-3 font-medium">Status</th><th scope="col" className="px-4 py-3 font-medium">Last active</th><th scope="col" className="px-4 py-3 font-medium">Actions</th></tr></thead>
        <tbody className="divide-y divide-border">
          {filtered.map((user) => {
            const status = statuses[user.id] || user.status;
            return <tr key={user.id} className="align-middle transition-colors hover:bg-background/60"><td className="px-4 py-3.5"><p className="font-medium">{user.name}</p><p className="mt-0.5 text-xs text-muted-foreground">{user.email}</p></td><td className="px-4 py-3.5"><span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs">{user.plan}</span></td><td className="px-4 py-3.5 tabular-nums">{user.businesses}</td><td className="px-4 py-3.5"><span className={`inline-flex items-center gap-2 text-xs ${status === "Active" ? "text-emerald" : "text-coral"}`}><span className={`h-1.5 w-1.5 rounded-full ${status === "Active" ? "bg-emerald" : "bg-coral"}`} />{status}</span></td><td className="px-4 py-3.5 text-xs text-muted-foreground">{user.lastActive ? new Date(user.lastActive).toLocaleDateString() : "Not tracked"}</td><td className="px-4 py-3.5"><div className="flex items-center gap-3"><button type="button" onClick={() => setSelected(user)} className="min-h-10 rounded-lg px-2 font-medium text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Details</button><button type="button" onClick={() => setStatuses((previous) => ({ ...previous, [user.id]: status === "Active" ? "Suspended" : "Active" }))} className="min-h-10 rounded-lg px-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{status === "Active" ? "Suspend" : "Activate"}</button></div></td></tr>;
          })}
          {filtered.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-sm text-muted-foreground">No users match those filters.</td></tr>}
        </tbody>
      </table>
    </div>
    <p className="mt-3 text-xs text-muted-foreground">Showing {filtered.length} of {users.length} users</p>
    {selected && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}><section role="dialog" aria-modal="true" aria-labelledby="user-details-title" className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-primary">User account</p><h2 id="user-details-title" className="mt-2 text-xl font-semibold">{selected.name}</h2></div><button type="button" onClick={() => setSelected(null)} aria-label="Close user details" className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><X size={18} /></button></div><dl className="mt-6 space-y-4 text-sm"><Detail label="Email" value={selected.email} /><Detail label="Plan" value={selected.plan} /><Detail label="Businesses created" value={String(selected.businesses)} /><Detail label="Account created" value={selected.createdAt ? new Date(selected.createdAt).toLocaleDateString() : "Unknown"} /><Detail label="Last active" value="Not tracked yet" /></dl><p className="mt-5 text-xs leading-5 text-muted-foreground">Account details are read-only in this preview. Changes to status are not saved to the database.</p></section></div>}
  </>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="flex flex-col gap-1 border-b border-border pb-3"><dt className="text-xs text-muted-foreground">{label}</dt><dd className="break-all font-medium">{value}</dd></div>;
}
