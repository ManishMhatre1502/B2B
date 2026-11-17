import { Activity, ArrowUpRight, Building2, Check, ChevronRight, CircleUserRound, Plus, ShieldCheck, Users } from "lucide-react";

const businesses = [
  { name: "Northstar Studio", sector: "Design & manufacturing", lead: "Neha Kulkarni", initials: "NK", color: "bg-violet-400/15 text-violet-200", activity: "Daily update in", state: "On track", progress: "w-[78%]" },
  { name: "Field & Form", sector: "Retail & distribution", lead: "Ayaan Shah", initials: "AS", color: "bg-sky-400/15 text-sky-200", activity: "2 reports today", state: "On track", progress: "w-[62%]" },
  { name: "Cedar Supply", sector: "Wholesale", lead: "Rohan Mehta", initials: "RM", color: "bg-amber-400/15 text-amber-200", activity: "Check-in due", state: "Needs a look", progress: "w-[40%]" },
];

export function HeroIllustration() {
  return (
    <div role="img" aria-label="Portfolio dashboard with three businesses and their plant heads, plus a rising weekly revenue trend of ₹24,680" className="relative mx-auto w-full min-w-0 max-w-[560px] lg:mx-0 lg:ml-auto lg:max-w-none">
      <div className="absolute -inset-8 -z-10 rounded-[48px] bg-[radial-gradient(circle_at_42%_25%,rgba(255,201,0,0.17),transparent_62%)] blur-2xl" />
      <div className="absolute inset-x-10 -bottom-6 -z-10 h-24 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -inset-px -z-10 rounded-[27px] bg-[conic-gradient(from_140deg_at_50%_50%,rgba(255,201,0,0.55),transparent_25%,transparent_70%,rgba(255,201,0,0.28))] opacity-50 blur-[3px]" />

      <div className="relative rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-transparent p-1.5 shadow-[0_40px_120px_-24px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:-translate-y-1">
        <div className="relative overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#0a0c0f]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(255,201,0,0.08),transparent_70%)]" />
          <div className="relative flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/15" /><span className="h-2 w-2 rounded-full bg-white/15" /><span className="h-2 w-2 rounded-full bg-white/15" /></div>
            <div className="mx-auto flex items-center gap-2 rounded-md border border-white/[0.06] bg-black/40 px-2.5 py-1 text-[10px] text-muted-foreground"><ShieldCheck size={10} className="text-primary" /> owner.grolyx.com</div>
            <span className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">OWNER VIEW</span>
          </div>

          <div className="relative space-y-3 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div><p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Your portfolio</p><p className="mt-1 text-base font-semibold text-foreground">People in charge. You in control.</p></div>
              <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-[10px] text-muted-foreground"><Users size={12} className="text-primary" /> 3 plant heads</div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/[0.06] p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary"><CircleUserRound size={20} /></span>
              <div className="min-w-0 flex-1"><p className="text-xs font-semibold text-foreground">You · Portfolio owner</p><p className="mt-0.5 text-[10px] text-muted-foreground">One view across all your businesses</p></div>
              <div className="hidden items-center gap-1 text-[10px] font-medium text-primary sm:flex">Full control <ArrowUpRight size={12} /></div>
            </div>

            <div className="flex items-center justify-between px-1 pt-1"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Business teams</p><span className="inline-flex items-center gap-1 rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[10px] font-medium text-foreground"><Plus size={11} className="text-primary" /> Add business</span></div>

            <div className="space-y-2">
              {businesses.map((business) => (
                <div key={business.name} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 transition-colors hover:border-primary/20 hover:bg-white/[0.04]">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.04] text-primary"><Building2 size={17} /></span>
                    <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-foreground">{business.name}</p><p className="mt-0.5 truncate text-[10px] text-muted-foreground">{business.sector}</p></div>
                    <ChevronRight size={14} className="shrink-0 text-muted-foreground/70" />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-white/[0.06] pt-2.5">
                    <div className="flex min-w-0 items-center gap-2"><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${business.color}`}>{business.initials}</span><div className="min-w-0"><p className="truncate text-[10px] font-medium text-foreground">{business.lead}</p><p className="text-[9px] text-muted-foreground">Plant head</p></div><span className="mx-1 hidden h-6 w-px bg-white/10 sm:block" /><span className="hidden text-[9px] text-muted-foreground sm:inline">{business.activity}</span></div>
                    <span className={`inline-flex items-center gap-1.5 text-[9px] font-medium ${business.state === "On track" ? "text-emerald" : "text-primary"}`}><span className={`h-1.5 w-1.5 rounded-full ${business.state === "On track" ? "bg-emerald" : "bg-primary"}`} />{business.state}</span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.07]"><div className={`h-full rounded-full bg-gradient-to-r from-primary/50 to-primary ${business.progress}`} /></div>
                </div>
              ))}
            </div>

            <figure className="min-w-0 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <figcaption className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-foreground">Portfolio revenue</p>
                  <p className="mt-0.5 text-[9px] text-muted-foreground">Last 7 days · all businesses</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs font-semibold text-foreground">₹24,680</p>
                  <p className="mt-0.5 text-[9px] font-medium text-emerald">↗ 12.8% this week</p>
                </div>
              </figcaption>
              <svg aria-hidden="true" viewBox="0 0 360 108" preserveAspectRatio="none" className="mt-2 block h-auto w-full">
                <defs>
                  <linearGradient id="portfolio-revenue-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ffc900" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="#ffc900" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M4 22H356M4 54H356M4 86H356" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                <path d="M4 88 C26 82 28 68 54 72 S86 86 110 63 S142 69 166 56 S198 62 222 44 S254 52 278 36 S314 44 338 24 S350 26 356 16 V104 H4 Z" fill="url(#portfolio-revenue-fill)" />
                <path d="M4 88 C26 82 28 68 54 72 S86 86 110 63 S142 69 166 56 S198 62 222 44 S254 52 278 36 S314 44 338 24 S350 26 356 16" fill="none" stroke="#ffc900" strokeWidth="3" strokeLinecap="round" />
                <circle cx="278" cy="36" r="4" fill="#ffc900" stroke="#0a0c0f" strokeWidth="2" />
              </svg>
              <div className="mt-1 flex justify-between text-[9px] text-muted-foreground" aria-hidden="true">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </figure>

            <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"><div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald/10 text-emerald"><Activity size={14} /></span><div><p className="text-[10px] font-semibold text-foreground">Today’s portfolio pulse</p><p className="text-[9px] text-muted-foreground">Updates from your plant heads</p></div></div><span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald"><Check size={12} /> 2 of 3 in</span></div>
          </div>
        </div>
      </div>

      <div className="animate-float-slow absolute -right-3 top-[5.25rem] hidden w-[176px] rounded-2xl border border-white/10 bg-[#0d0f13]/95 p-3 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:block lg:-right-6">
        <div className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"><Users size={15} /></span><div><p className="text-xs font-semibold">Plant head assigned</p><p className="mt-0.5 text-[10px] text-muted-foreground">Field &amp; Form · invite sent</p></div></div>
      </div>

      <div className="animate-float-slow absolute -left-4 bottom-8 hidden w-[176px] rounded-2xl border border-white/10 bg-[#0d0f13]/95 p-3 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:block lg:-left-8" style={{ animationDelay: "1.2s" }}>
        <div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">A new business?</p><Plus size={13} className="text-primary" /></div><p className="mt-2 text-sm font-semibold tracking-tight">Add it in seconds.</p><p className="text-[10px] text-muted-foreground">Then choose who runs it.</p>
      </div>
    </div>
  );
}
