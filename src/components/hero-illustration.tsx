import { ArrowUpRight, Check, LockKeyhole, TrendingUp } from "lucide-react";

const businesses = [
  { name: "Northstar Studio", value: "₹9,240", status: "Submitted", dot: "bg-primary", bar: "w-[82%]" },
  { name: "Field & Form", value: "₹8,120", status: "Submitted", dot: "bg-emerald", bar: "w-[68%]" },
  { name: "Cedar Supply", value: "₹7,320", status: "Due today", dot: "bg-white/30", bar: "w-[46%]" },
];

export function HeroIllustration() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full min-w-0 max-w-[560px] lg:mx-0 lg:ml-auto lg:max-w-none">
      <div className="absolute -inset-8 -z-10 rounded-[48px] bg-[radial-gradient(circle_at_35%_20%,rgba(255,201,0,0.16),transparent_58%)] blur-2xl" />
      <div className="absolute inset-x-10 -bottom-6 -z-10 h-24 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -inset-px -z-10 rounded-[27px] bg-[conic-gradient(from_140deg_at_50%_50%,rgba(255,201,0,0.55),transparent_25%,transparent_70%,rgba(255,201,0,0.28))] opacity-50 blur-[3px]" />

      <div className="relative rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-transparent p-1.5 shadow-[0_40px_120px_-24px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:-translate-y-1">
        <div className="relative overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#0a0c0f]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(255,201,0,0.08),transparent_70%)]" />
          <div className="relative flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
            </div>
            <div className="mx-auto flex items-center gap-2 rounded-md border border-white/[0.06] bg-black/40 px-2.5 py-1 text-[10px] text-muted-foreground">
              <LockKeyhole size={10} />
              app.grolyx.com
            </div>
            <span className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">Live</span>
          </div>

          <div className="relative space-y-3 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Portfolio overview</p>
                <p className="mt-1 text-sm font-semibold text-foreground sm:text-base">Daily snapshot</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
                </span>
                Synced
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5">
                <p className="text-[11px] text-muted-foreground">Revenue today</p>
                <p className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">₹24,680</p>
                <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-emerald">
                  <ArrowUpRight size={12} />
                  12.8%
                  <span className="text-muted-foreground">vs. last week</span>
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5">
                <p className="text-[11px] text-muted-foreground">Daily reports</p>
                <p className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">
                  3 <span className="text-sm font-normal text-muted-foreground">/ 4</span>
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary/70 to-primary" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-foreground">Daily revenue</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">Across all businesses · 7 days</p>
                </div>
                <span className="rounded-md border border-white/[0.07] bg-black/30 px-2 py-1 text-[10px] text-muted-foreground">This week</span>
              </div>
              <div className="relative mt-3 h-24 sm:h-28">
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3].map((line) => (
                    <div key={line} className="border-t border-white/[0.05]" />
                  ))}
                </div>
                <svg viewBox="0 0 520 125" className="relative h-full w-full overflow-visible" role="img" aria-label="Sample seven-day revenue trend">
                  <defs>
                    <linearGradient id="hero-chart-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#FFC900" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#FFC900" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="hero-chart-line" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#FFC900" stopOpacity="0.35" />
                      <stop offset="55%" stopColor="#FFC900" />
                      <stop offset="100%" stopColor="#FFE27A" />
                    </linearGradient>
                  </defs>
                  <path d="M0 98 C42 91 45 73 88 81 S141 87 172 59 S222 70 257 49 S305 59 342 38 S398 45 425 24 S478 37 520 7 V125 H0Z" fill="url(#hero-chart-fill)" />
                  <path d="M0 98 C42 91 45 73 88 81 S141 87 172 59 S222 70 257 49 S305 59 342 38 S398 45 425 24 S478 37 520 7" fill="none" stroke="url(#hero-chart-line)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="425" cy="24" r="4" fill="#FFC900" stroke="#0a0c0f" strokeWidth="3" />
                </svg>
              </div>
              <div className="mt-2 flex justify-between text-[9px] uppercase tracking-wide text-muted-foreground">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            <div className="space-y-1.5">
              {businesses.map(({ name, value, status, dot, bar }) => (
                <div key={name} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-xs font-medium text-foreground">{name}</p>
                      <p className="shrink-0 text-xs font-semibold text-foreground">{value}</p>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                        <div className={`h-full rounded-full bg-gradient-to-r from-primary/50 to-primary ${bar}`} />
                      </div>
                      <span className="shrink-0 text-[10px] text-muted-foreground">{status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="animate-float-slow absolute -right-3 top-20 hidden w-[188px] rounded-2xl border border-white/10 bg-[#0d0f13]/95 p-3 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:block lg:-right-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald/15 text-emerald">
            <Check size={15} strokeWidth={2.6} />
          </span>
          <div>
            <p className="text-xs font-semibold">Report submitted</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">Field &amp; Form · just now</p>
          </div>
        </div>
      </div>

      <div className="animate-float-slow absolute -left-4 bottom-24 hidden w-[176px] rounded-2xl border border-white/10 bg-[#0d0f13]/95 p-3 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:block lg:-left-8" style={{ animationDelay: "1.2s" }}>
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">This week</p>
          <TrendingUp size={13} className="text-primary" />
        </div>
        <p className="mt-2 text-lg font-semibold tracking-tight">+18.4%</p>
        <p className="text-[10px] text-muted-foreground">Revenue across portfolio</p>
      </div>
    </div>
  );
}
