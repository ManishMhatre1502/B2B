import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ClipboardCheck,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import { LandingNavbar } from "@/components/landing-navbar";
import { HeroIllustration } from "@/components/hero-illustration";

const features = [
  {
    icon: Building2,
    title: "Every business, one view",
    copy: "Switch between companies and see the signal across your whole portfolio without losing context.",
  },
  {
    icon: ClipboardCheck,
    title: "Reporting that fits",
    copy: "Choose the daily numbers each team should track, from revenue to the metrics only you care about.",
  },
  {
    icon: BarChart3,
    title: "A clearer daily picture",
    copy: "Read submission status, trends, and operational notes in one place instead of chasing updates.",
  },
];

const steps = [
  { icon: Layers3, title: "Set up a business", text: "Bring in the context and the metrics that matter." },
  { icon: ShieldCheck, title: "Appoint a team lead", text: "Give each head access only to their business." },
  { icon: ClipboardCheck, title: "Capture the day", text: "Submit numbers and notes in a few minutes." },
  { icon: BarChart3, title: "Spot the pattern", text: "Use a shared view to follow up with confidence." },
];

const assurances = [
  { label: "One workspace", copy: "Every business under one roof" },
  { label: "Daily cadence", copy: "Numbers captured in minutes" },
  { label: "Invite-only", copy: "The right people, right access" },
];

const securityPoints = [
  "Owner and head access checked on every request",
  "Invitations expire automatically after 48 hours",
  "Only the invited email can accept an invite",
];

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
      <span aria-hidden="true" className="h-px w-6 bg-primary/50" />
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen w-full overflow-x-clip">
      <LandingNavbar />
      <main className="relative w-full">
        <section id="hero" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 -z-10 hero-wash" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 hero-grid opacity-40" />
          <div aria-hidden="true" className="absolute -left-48 top-6 -z-10 h-[440px] w-[440px] rounded-full bg-primary/[0.08] blur-[130px]" />
          <div aria-hidden="true" className="absolute -right-32 -top-10 -z-10 h-[560px] w-[560px] rounded-full bg-primary/[0.07] blur-[150px]" />

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:pb-24 lg:pt-20">
            <div className="flex min-w-0 flex-col items-start">
              <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                A daily operating picture for owners
              </div>

              <h1
                id="hero-title"
                style={{ animationDelay: "60ms" }}
                className="animate-fade-up mt-6 text-balance text-[clamp(2.6rem,4.9vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:mt-7"
              >
                One clear view
                <span className="block bg-gradient-to-r from-[#ffe9a3] via-primary to-[#e8b900] bg-clip-text text-transparent">
                  of every business.
                </span>
              </h1>

              <p style={{ animationDelay: "120ms" }} className="animate-fade-up mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Bring daily numbers, team updates, and business trends into one calm workspace—so you spend less time
                chasing reports and more time moving the work forward.
              </p>

              <div style={{ animationDelay: "180ms" }} className="animate-fade-up mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Link
                  href="/register"
                  className="btn-gold group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Create your workspace
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="#platform"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Explore the platform
                </Link>
              </div>

              <div style={{ animationDelay: "240ms" }} className="animate-fade-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Check size={15} className="shrink-0 text-primary" />
                  Metrics that fit each business
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck size={15} className="shrink-0 text-primary" />
                  Access by invitation
                </span>
              </div>
            </div>

            <div style={{ animationDelay: "200ms" }} className="min-w-0 animate-fade-up">
              <HeroIllustration />
            </div>
          </div>

          <div className="border-t border-white/[0.06]">
            <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/[0.06] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
              {assurances.map(({ label, copy }) => (
                <div key={label} className="flex items-center gap-3 py-4 sm:justify-center sm:py-5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                  <p className="text-sm">
                    <span className="font-medium text-foreground">{label}</span>
                    <span className="text-muted-foreground"> — {copy}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="platform" className="scroll-mt-28 border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>One operating rhythm</Eyebrow>
                <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                  The day-to-day, without the chase.
                </h2>
              </div>
              <p className="max-w-sm text-base leading-7 text-muted-foreground">
                Make the numbers easy to share and the next step easier to see—for every business you run.
              </p>
            </div>

            <div className="mt-12 grid gap-3 md:grid-cols-3 lg:mt-14">
              {features.map(({ icon: Icon, title, copy }, index) => (
                <article
                  key={title}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01))] p-6 transition-colors hover:border-primary/25 sm:p-7"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="relative flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-primary">
                      <Icon size={21} />
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 text-xl font-semibold tracking-tight">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-28 border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:py-28">
            <div>
              <Eyebrow>A simpler cadence</Eyebrow>
              <h2 className="mt-4 max-w-lg text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                A daily habit that scales with you.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
                Set the measures for each business. Appoint the people closest to the work. See each update land in one
                shared picture.
              </p>
              <Link
                href="/register"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Build your workspace
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {steps.map(({ icon: Icon, title, text }, index) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-white/10 bg-background/60 p-5 transition-colors hover:border-primary/20 hover:bg-background/80"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-primary transition-colors group-hover:border-primary/20 group-hover:bg-primary/10">
                      <Icon size={18} />
                    </span>
                    <span className="text-xs text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="security" className="scroll-mt-28">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
              <div aria-hidden="true" className="absolute inset-0 -z-10 hero-grid opacity-20" />
              <div aria-hidden="true" className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-[110px]" />

              <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    <ShieldCheck size={23} />
                  </span>
                  <h2 className="mt-6 max-w-xl text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                    The right people see the right business.
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                    Access is deliberate. Every protected request is checked, so owners keep the full picture and heads
                    only see what they run.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <ul className="space-y-3">
                    {securityPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className="btn-gold group mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
                  >
                    Create your workspace
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Grolyx logo" width={128} height={40} className="h-8 w-24 object-contain" />
            <span className="text-xs text-muted-foreground">Daily operations, in focus.</span>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Grolyx. Built for the way you work.</p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <Link href="/login" className="transition-colors hover:text-foreground">
              Sign in
            </Link>
            <Link href="/register" className="transition-colors hover:text-foreground">
              Get started
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
