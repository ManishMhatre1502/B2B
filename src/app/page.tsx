import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
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
  { icon: ShieldCheck, title: "Appoint a plant head", text: "Give each trusted lead access to the business they run." },
  { icon: ClipboardCheck, title: "Capture the day", text: "Submit numbers and notes in a few minutes." },
  { icon: BarChart3, title: "Spot the pattern", text: "Use a shared view to follow up with confidence." },
];

const assurances = [
  { label: "Add a business", copy: "Bring each company into one portfolio" },
  { label: "Assign a plant head", copy: "Put a trusted lead in charge" },
  { label: "See daily updates", copy: "Stay close without chasing teams" },
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
              <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[.08em] text-primary backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Your businesses. Your control.
              </div>

              <h1
                id="hero-title"
                style={{ animationDelay: "60ms" }}
                className="animate-fade-up mt-6 text-balance text-[clamp(2.6rem,4.9vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:mt-7"
              >
                You Own the Portfolio.
                <span className="block bg-gradient-to-r from-[#ffe9a3] via-primary to-[#e8b900] bg-clip-text text-transparent">
                  Plant Heads Run the Day.
                </span>
              </h1>

              <p style={{ animationDelay: "120ms" }} className="animate-fade-up mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Add a business, assign its plant head, and see daily updates come together in one owner’s workspace.
                Each team gets a clear lead; you keep every business in view.
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
                  See how it works
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
        <section id="pricing" className="scroll-mt-28 border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
            <div className="mx-auto max-w-2xl text-center"><Eyebrow>Straightforward plans</Eyebrow><h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">Room for every portfolio.</h2><p className="mt-4 text-base leading-7 text-muted-foreground">Choose the number of businesses that fits how you work today.</p></div>
            <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-3">
              {[
                { name: "GROLYX Free", price: "₹0", cadence: "forever", features: ["1 business", "1 owner account", "Private business workspace"], cta: "Get Started", badge: "" },
                { name: "GROLYX Growth", price: "₹999", cadence: "/ month", features: ["Up to 3 businesses", "1 owner account", "Private workspaces", "Core business features"], cta: "Choose Growth", badge: "Most popular" },
                { name: "GROLYX Portfolio", price: "₹1,499", cadence: "/ month", features: ["Up to 5 businesses", "1 owner account", "Private workspaces", "Core business features"], cta: "Choose Portfolio", badge: "Best value" },
              ].map((plan) => <article key={plan.name} className={`relative flex flex-col rounded-3xl border bg-background/60 p-6 sm:p-7 ${plan.badge === "Most popular" ? "border-primary/60 shadow-[0_0_40px_rgba(255,201,0,0.1)]" : "border-white/10"}`}>
                {plan.badge && <span className="absolute -top-3 left-6 rounded-full border border-primary/30 bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-primary">{plan.badge}</span>}
                <h3 className="text-lg font-semibold">{plan.name}</h3><p className="mt-6 flex items-baseline gap-2"><span className="text-4xl font-semibold tracking-tight">{plan.price}</span><span className="text-sm text-muted-foreground">{plan.cadence}</span></p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-6">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-3 text-sm"><Check size={16} className="shrink-0 text-primary" />{feature}</li>)}</ul>
                <Link href={`/register?plan=${plan.name.replace("GROLYX ", "").toLowerCase()}`} className={`mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5 ${plan.badge === "Most popular" ? "btn-gold text-primary-foreground" : "border border-white/10 bg-white/[0.04] text-foreground hover:bg-white/[0.08]"}`}>{plan.cta}<ArrowRight size={16} /></Link>
              </article>)}
            </div>
            <p className="mt-5 text-center text-xs text-muted-foreground">Plan selection is for reference; subscription billing is not connected yet.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-8 lg:py-16">
          <div><Image src="/grolyx-mark.png" alt="Grolyx" width={64} height={48} className="h-12 w-16 object-contain" /><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">Your businesses. Your control. One private workspace for the work you own.</p></div>
          <div><h2 className="text-sm font-semibold">Explore</h2><ul className="mt-4 space-y-3 text-sm text-muted-foreground"><li><Link href="#platform" className="hover:text-foreground">Platform</Link></li><li><Link href="#how-it-works" className="hover:text-foreground">How it works</Link></li><li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li></ul></div>
          <div><h2 className="text-sm font-semibold">Account &amp; legal</h2><ul className="mt-4 space-y-3 text-sm text-muted-foreground"><li><Link href="/login" className="hover:text-foreground">Sign in</Link></li><li><Link href="/register" className="hover:text-foreground">Create account</Link></li><li><Link href="/privacy" className="hover:text-foreground">Privacy</Link></li><li><Link href="/terms" className="hover:text-foreground">Terms</Link></li></ul></div>
          <div><h2 className="text-sm font-semibold">Contact us</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">Questions about your workspace or getting started?</p><a href="mailto:support@grolyx.com" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline">support@grolyx.com <ArrowUpRight size={14} /></a></div>
        </div>
        <div className="border-t border-white/[0.06]"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-muted-foreground sm:px-8 md:flex-row md:justify-between"><p>© {new Date().getFullYear()} Grolyx. Built for the way you work.</p><p>Private workspaces for every business you own.</p></div></div>
      </footer>
    </div>
  );
}
