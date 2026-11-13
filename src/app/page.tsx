import Link from "next/link";
import Image from "next/image";
import { Activity, ArrowRight, ArrowUpRight, BarChart3, Building2, Check, CircleDollarSign, ClipboardCheck, Layers3, ShieldCheck, ArrowDown } from "lucide-react";
import { LandingNavbar } from "@/components/landing-navbar";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Building2, title: "Every business, one view", copy: "Switch between your companies and see the signal across your whole portfolio." },
  { icon: ClipboardCheck, title: "Reporting that fits", copy: "Choose the daily numbers each team should track, from revenue to custom metrics." },
  { icon: BarChart3, title: "A clearer daily picture", copy: "Read submission status, trends, and operational notes without chasing updates." },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <LandingNavbar />
      <main className="relative pt-28 sm:pt-32">
        <div aria-hidden="true" className="hero-wash pointer-events-none absolute inset-x-0 top-0 -z-10 h-[780px]" />
        <div aria-hidden="true" className="grid-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] opacity-30" />
        <section id="hero" aria-labelledby="hero-title" className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-12 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-10 lg:pb-32 lg:pt-16">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex min-h-9 items-center gap-2.5 rounded-full border border-border bg-card/80 px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_#FFC900]" />A daily operating picture for owners</div>
            <h1 id="hero-title" className="max-w-[700px] text-balance text-[clamp(3.25rem,6.5vw,5.25rem)] font-semibold leading-[.99] tracking-[-.06em] text-foreground">One clear view<br className="hidden sm:block" /><span className="text-primary"> for every business.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">Bring daily numbers, team updates, and business trends into one calm workspace—so you can spend less time chasing reports and more time moving the work forward.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/register"><Button size="lg" className="w-full sm:w-auto">Create your workspace <ArrowRight size={17} /></Button></Link><Link href="#platform"><Button variant="secondary" size="lg" className="w-full sm:w-auto">Explore the platform <ArrowDown size={16} /></Button></Link></div>
            <div className="mt-9 flex flex-col gap-3 border-t border-border/80 pt-5 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6"><span className="inline-flex items-center gap-2"><Check size={15} className="shrink-0 text-primary" />Metrics that fit each business</span><span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="shrink-0 text-primary" />Access by invitation</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-[600px]">
            <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
            <div className="glass-panel relative overflow-hidden rounded-[28px] p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-border/80 px-2 pb-4"><div><p className="text-xs text-muted-foreground">Portfolio overview</p><p className="mt-1 text-sm font-semibold">Daily snapshot</p></div><div className="inline-flex min-h-8 items-center gap-2 rounded-full border border-border bg-background/80 px-3 text-[11px] font-medium text-muted-foreground"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald" />Sample data</div></div>
              <div className="grid grid-cols-2 gap-3 py-4">
                <div className="rounded-2xl border border-border bg-background/70 p-4"><p className="text-xs text-muted-foreground">Revenue today</p><p className="mt-2 text-2xl font-semibold tracking-tight">$24,680</p><p className="mt-2 inline-flex items-center gap-1 text-xs text-emerald"><ArrowUpRight size={14} />12.8% <span className="text-muted-foreground">vs. last week</span></p></div>
                <div className="rounded-2xl border border-border bg-background/70 p-4"><p className="text-xs text-muted-foreground">Daily reports</p><p className="mt-2 text-2xl font-semibold tracking-tight">3 <span className="text-base text-muted-foreground">/ 4</span></p><p className="mt-2 inline-flex items-center gap-1 text-xs text-primary"><Activity size={14} />One needs a check-in</p></div>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-medium">Daily revenue</p><p className="mt-1 text-xs text-muted-foreground">Across your businesses · last 7 days</p></div><div className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px] text-muted-foreground">This week</div></div>
                <div className="relative h-32 sm:h-36"><div aria-hidden="true" className="absolute inset-0 flex flex-col justify-between">{[0, 1, 2, 3].map((line) => <div key={line} className="border-t border-border/60" />)}</div><svg viewBox="0 0 520 125" className="relative h-full w-full overflow-visible" role="img" aria-label="Sample seven-day revenue trend"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#FFC900" stopOpacity=".24" /><stop offset="100%" stopColor="#FFC900" stopOpacity="0" /></linearGradient></defs><path d="M0 98 C42 91 45 73 88 81 S141 87 172 59 S222 70 257 49 S305 59 342 38 S398 45 425 24 S478 37 520 7 V125 H0Z" fill="url(#chart-fill)" /><path d="M0 98 C42 91 45 73 88 81 S141 87 172 59 S222 70 257 49 S305 59 342 38 S398 45 425 24 S478 37 520 7" fill="none" stroke="#FFC900" strokeWidth="3" strokeLinecap="round" /><circle cx="425" cy="24" r="4.5" fill="#FFC900" stroke="#111317" strokeWidth="3" /></svg></div>
                <div className="mt-3 flex justify-between text-[10px] text-muted-foreground"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">{["Northstar Studio", "Field & Form", "Cedar Supply"].map((name, index) => <div key={name} className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-background/70 px-2.5 py-2.5"><span className={index === 1 ? "h-2 w-2 rounded-full bg-primary" : "h-2 w-2 rounded-full bg-emerald"} /><span className="truncate text-[10px] font-medium sm:text-xs">{name}</span></div>)}</div>
            </div>
            <div className="absolute -right-2 top-14 hidden -translate-y-1/2 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-xl sm:flex lg:-right-8"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><CircleDollarSign size={18} /></div><div><p className="text-[11px] text-muted-foreground">Portfolio signal</p><p className="text-sm font-semibold">All in one place</p></div></div>
            <div className="absolute -bottom-6 left-0 hidden items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-xl sm:flex lg:-left-8"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald/10 text-emerald"><ShieldCheck size={18} /></div><div><p className="text-[11px] text-muted-foreground">Clear access</p><p className="text-sm font-semibold">Each team, scoped</p></div></div>
          </div>
        </section>
        <section id="platform" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.22em] text-primary">One operating rhythm</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">The day-to-day, without the chase.</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">Make the numbers easy to share and the next step easier to see.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">{features.map(({ icon: Icon, title, copy }, index) => <article key={title} className="group rounded-3xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/30 hover:bg-card sm:p-7"><div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10"><Icon size={21} /></div><p className="mt-8 text-xs font-medium text-muted-foreground">0{index + 1}</p><h3 className="mt-2 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-muted-foreground">{copy}</p></article>)}</div>
        </section>
        <section id="how-it-works" className="scroll-mt-28 border-y border-border bg-card/35">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:py-28">
            <div><p className="text-xs font-semibold uppercase tracking-[.22em] text-primary">A simpler cadence</p><h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight sm:text-5xl">A daily habit that scales with you.</h2><p className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground">Set the measures for each business. Appoint the people closest to the work. See each update land in one shared picture.</p><Link href="/register" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3">Build your workspace <ArrowRight size={16} className="transition-all" /></Link></div>
            <div className="grid gap-3 sm:grid-cols-2">{[
              { icon: Layers3, title: "Set up a business", text: "Bring in the context and the metrics that matter." },
              { icon: ShieldCheck, title: "Appoint a team lead", text: "Give each head access only to their business." },
              { icon: ClipboardCheck, title: "Capture the day", text: "Submit numbers and notes in a few minutes." },
              { icon: BarChart3, title: "Spot the pattern", text: "Use a shared view to follow up with confidence." },
            ].map(({ icon: Icon, title, text }, i) => <div key={title} className="rounded-2xl border border-border bg-background p-5"><div className="flex items-center justify-between"><Icon size={19} className="text-primary" /><span className="text-xs text-muted-foreground">0{i + 1}</span></div><h3 className="mt-6 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div>
          </div>
        </section>
        <section id="security" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 sm:px-8 lg:py-28"><div className="relative overflow-hidden rounded-[32px] border border-border bg-card px-6 py-12 sm:px-12 sm:py-16"><div aria-hidden="true" className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" /><div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div className="max-w-2xl"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><ShieldCheck size={23} /></div><h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">The right people see the right business.</h2><p className="mt-4 leading-7 text-muted-foreground">Owner and head access is checked on every protected request. Invitations expire after 48 hours and are accepted only by the invited email.</p></div><Link href="/register"><Button size="lg">Create your workspace <ArrowRight size={16} /></Button></Link></div></div></section>
      </main>
      <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-3"><Image src="/logo.png" alt="Grolyx logo" width={128} height={40} className="h-8 w-24 object-contain" /><span className="text-xs text-muted-foreground">Daily operations, in focus.</span></div><p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Grolyx. Built for the way you work.</p><div className="flex gap-5 text-sm text-muted-foreground"><Link href="/login" className="hover:text-foreground">Sign in</Link><Link href="/register" className="hover:text-foreground">Get started</Link></div></div></footer>
    </div>
  );
}
