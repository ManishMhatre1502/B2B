import { BarChart3, Boxes, Building2, Store } from "lucide-react";

const businessCards = [
  { icon: Building2, title: "Manufacturing" },
  { icon: Store, title: "Retail" },
  { icon: Boxes, title: "Inventory" },
];

export function HeroIllustration() {
  return (
    <div aria-hidden="true" className="relative isolate mt-5 h-[288px] w-full min-w-0 sm:mt-3 sm:h-[240px] xl:mt-4 xl:h-[260px] 2xl:-mt-4 2xl:h-[320px]">
      <div className="hero-art-glow absolute bottom-0 left-0 h-[56%] w-[82%] rounded-full blur-2xl" />
      <svg
        viewBox="0 0 520 250"
        preserveAspectRatio="xMidYMax meet"
        className="absolute left-1/2 top-0 h-[190px] w-[92%] -translate-x-1/2 overflow-visible sm:bottom-0 sm:left-0 sm:top-auto sm:h-full sm:w-[72%] sm:translate-x-0 2xl:translate-x-11 2xl:translate-y-3 drop-shadow-[0_10px_18px_rgba(0,0,0,.35)]"
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
            <stop offset=".5" stopColor="#ffc900" stopOpacity=".62" />
            <stop offset="1" stopColor="#ffc900" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="270" cy="231" rx="205" ry="12" fill="#000" opacity=".5" transform="matrix(1.31 0 0 1 -46 0)" />
        <path d="M73 22 323 16 374 183 120 197Z" fill="#090909" stroke="#8a8379" strokeWidth="2" />
        <path d="M87 32 313 27 359 172 132 184Z" fill="url(#grolyx-laptop-screen)" stroke="#2d2b28" strokeWidth="2" />
        <path d="M87 32 313 27 359 172 132 184Z" fill="none" stroke="url(#grolyx-laptop-edge)" strokeWidth="1.2" opacity=".55" />
        <path d="M120 197 374 183 467 211 179 241 91 211Z" fill="url(#grolyx-laptop-base)" stroke="#746d61" strokeWidth="1.4" transform="matrix(1.31 0 0 1 -46 0)" />
        <path d="m178 198 156-8 43 13-174 14Z" fill="#0c0c0c" stroke="#58534b" strokeWidth="1" transform="matrix(1.31 0 0 1 -46 0)" />
        <path d="m91 211 88 30 288-30" fill="none" stroke="#c7b99a" strokeOpacity=".22" strokeWidth="1.4" transform="matrix(1.31 0 0 1 -46 0)" />
        <text x="224" y="118" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="23" fontWeight="800" letterSpacing="-1.2" fill="#f5f2e9">
          GROLY<tspan fill="#ffc900">X</tspan>
        </text>
        <path d="M247 199h39" stroke="#c7b99a" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-3 gap-2 sm:inset-x-auto sm:bottom-[24%] sm:left-auto sm:right-0 sm:flex sm:w-[48%] sm:flex-col sm:gap-2 2xl:bottom-[22%] 2xl:w-[36.5%] 2xl:gap-3">
        {businessCards.map(({ icon: Icon, title }) => (
          <div
            key={title}
            className="flex min-h-[72px] flex-col items-center justify-center gap-1 rounded-xl border border-primary/20 bg-[#141414]/95 px-1.5 py-2 text-center shadow-[0_8px_20px_rgba(0,0,0,.3)] sm:h-12 sm:min-h-0 sm:flex-row sm:justify-between sm:gap-2 sm:px-3.5 sm:py-0 sm:text-left 2xl:h-[76px] 2xl:px-4"
          >
            <span className="flex min-w-0 flex-col items-center gap-1 sm:flex-row sm:gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-8 sm:w-8 2xl:h-10 2xl:w-10">
                <Icon size={17} strokeWidth={2} />
              </span>
              <span className="max-w-full truncate text-[9px] font-medium leading-tight text-foreground sm:text-sm 2xl:text-base">{title}</span>
            </span>
            <span className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-8 sm:w-8 2xl:h-10 2xl:w-10">
              <BarChart3 size={17} strokeWidth={2.2} className="2xl:h-5 2xl:w-5" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
