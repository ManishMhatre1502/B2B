import { BarChart3, Boxes, Building2, Store } from "lucide-react";

const businessCards = [
  { icon: Building2, title: "Manufacturing", position: "w-[84%] self-end -translate-x-1 -rotate-6" },
  { icon: Store, title: "Retail", position: "w-[94%] self-end -translate-x-5 -rotate-3" },
  { icon: Boxes, title: "Inventory", position: "w-full self-start -translate-x-8 -rotate-1" },
];

export function HeroIllustration() {
  return (
    <div aria-hidden="true" className="relative isolate mt-3 hidden h-[210px] w-full sm:block sm:h-[240px] lg:-mt-8 lg:h-[260px]">
      <div className="hero-art-glow absolute bottom-0 left-0 h-[56%] w-[88%] rounded-full blur-2xl" />
      <svg
        viewBox="0 0 520 250"
        preserveAspectRatio="xMidYMax meet"
        className="absolute bottom-0 left-0 h-full w-[84%] overflow-visible drop-shadow-[0_18px_18px_rgba(0,0,0,.5)]"
      >
        <defs>
          <linearGradient id="grolyx-laptop-screen" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#383532" />
            <stop offset=".52" stopColor="#151515" />
            <stop offset="1" stopColor="#080909" />
          </linearGradient>
          <linearGradient id="grolyx-laptop-base" x1="0" x2=".8" y1="0" y2="1">
            <stop offset="0" stopColor="#a39a8b" />
            <stop offset=".16" stopColor="#343332" />
            <stop offset=".62" stopColor="#181818" />
            <stop offset="1" stopColor="#090909" />
          </linearGradient>
          <linearGradient id="grolyx-laptop-edge" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#ffc900" stopOpacity="0" />
            <stop offset=".5" stopColor="#ffc900" stopOpacity=".72" />
            <stop offset="1" stopColor="#ffc900" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="270" cy="231" rx="205" ry="12" fill="#000" opacity=".62" />
        <path d="M73 22 323 16 374 183 120 197Z" fill="#090909" stroke="#8a8379" strokeWidth="2.2" />
        <path d="M87 32 313 27 359 172 132 184Z" fill="url(#grolyx-laptop-screen)" stroke="#2d2b28" strokeWidth="2" />
        <path d="M87 32 313 27 359 172 132 184Z" fill="none" stroke="url(#grolyx-laptop-edge)" strokeWidth="1.2" opacity=".6" />
        <path d="M120 197 374 183 467 211 179 241 91 211Z" fill="url(#grolyx-laptop-base)" stroke="#746d61" strokeWidth="1.4" />
        <path d="m178 198 156-8 43 13-174 14Z" fill="#0c0c0c" stroke="#58534b" strokeWidth="1" />
        <path d="m91 211 88 30 288-30" fill="none" stroke="#c7b99a" strokeOpacity=".26" strokeWidth="1.4" />
        <text x="224" y="118" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="23" fontWeight="800" letterSpacing="-1.2" fill="#f5f2e9">
          GROLY<tspan fill="#ffc900">X</tspan>
        </text>
        <path d="M170 139c25-20 43-13 63-22s38 6 62-12 40-2 54-18" fill="none" stroke="#ffc900" strokeOpacity=".28" strokeWidth="2" />
        <circle cx="349" cy="87" r="3" fill="#ffc900" opacity=".72" />
        <path d="M247 199h39" stroke="#c7b99a" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="absolute bottom-[12%] right-0 z-10 flex w-[51%] flex-col gap-2.5">
        {businessCards.map(({ icon: Icon, title, position }) => (
          <div
            key={title}
            className={"flex h-[54px] items-center justify-between rounded-2xl border border-primary/25 bg-[#151515]/90 px-3.5 shadow-[0_12px_32px_rgba(0,0,0,.38)] backdrop-blur-md sm:h-[58px] sm:px-4 " + position}
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <span className="truncate text-xs font-semibold italic text-foreground sm:text-sm">{title}</span>
            </span>
            <span className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BarChart3 size={18} strokeWidth={2.4} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
