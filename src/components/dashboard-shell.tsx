import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import Image from "next/image";
import { ArrowUpRight, Building2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export async function DashboardShell({
  children,
  active = "overview",
  role = "owner",
}: {
  children: React.ReactNode;
  active?: string;
  role?: "owner" | "head";
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const homeHref = role === "head" ? "/head/dashboard" : "/dashboard";
  const nav = role === "head" ? [{ label: "My daily reports", href: "/head/dashboard", key: "reports" }] : [{ label: "Overview", href: "/dashboard", key: "overview" }];
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href={homeHref} aria-label="Grolyx home" className="flex items-center"><Image src="/logo.png" alt="Grolyx" width={150} height={48} className="h-9 w-[112px] object-contain" priority /></Link>
          <div className="flex items-center gap-3 sm:gap-5"><div className="hidden text-right sm:block"><p className="text-sm font-medium">{session.user.name}</p><p className="mt-0.5 text-xs capitalize text-muted-foreground">{role === "head" ? "Business head" : "Business owner"}</p></div><div aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-sm font-semibold text-primary">{(session.user.name || "G").charAt(0).toUpperCase()}</div><form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}><button type="submit" aria-label="Sign out" title="Sign out" className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><LogOut size={17} /></button></form></div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden min-h-[calc(100vh-72px)] border-r border-border px-5 py-8 lg:block">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-muted-foreground">Workspace</p>
          <nav className="space-y-1">
            {nav.map((item) => <Link key={item.key} href={item.href} aria-current={active === item.key ? "page" : undefined} className={cn("flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors", active === item.key ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-card hover:text-foreground")}><Building2 size={17} className={active === item.key ? "text-primary" : ""} />{item.label}</Link>)}
          </nav>
          <div className="mt-10 rounded-2xl border border-border bg-card/70 p-4"><p className="text-sm font-semibold">Need a hand?</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Set up your team and daily reporting one business at a time.</p><Link href={role === "owner" ? "/dashboard/businesses/new" : "/head/dashboard"} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">Continue <ArrowUpRight size={13} /></Link></div>
        </aside>
        <main className="min-w-0 px-4 py-7 sm:px-6 sm:py-9 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
