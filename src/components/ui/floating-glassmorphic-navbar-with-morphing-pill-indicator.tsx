"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem { label: string; href: string }
export interface ComponentProps {
  brandName: string;
  brandIcon?: ReactNode;
  navItems: NavItem[];
  ctaLabel: string;
  onCtaClick: () => void;
  brandHref?: string;
  activeHref?: string;
  defaultActiveHref?: string;
  onNavigate?: (href: string) => void;
  trackSections?: boolean;
  position?: "fixed" | "sticky" | "absolute" | "static";
  className?: string;
}

interface NavLinksProps {
  items: NavItem[];
  active: string;
  hovered: string | null;
  layoutId: string;
  vertical?: boolean;
  reduceMotion: boolean;
  onHover: (href: string | null) => void;
  onSelect: (href: string) => void;
}

const POSITION: Record<NonNullable<ComponentProps["position"]>, string> = {
  fixed: "fixed inset-x-0 top-3 sm:top-4",
  sticky: "sticky top-3 sm:top-4",
  absolute: "absolute inset-x-0 top-3 sm:top-4",
  static: "relative mt-3",
};
const SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.8 } as const;

function NavLinks({ items, active, hovered, layoutId, vertical = false, reduceMotion, onHover, onSelect }: NavLinksProps) {
  const highlighted = hovered ?? active;
  return (
    <ul role="list" className={cn("flex", vertical ? "flex-col gap-1" : "items-center gap-0 lg:gap-1 2xl:gap-2")}>
      {items.map((item) => {
        const isActive = item.href === active;
        const isHighlighted = item.href === highlighted;
        return (
          <li key={item.href}>
            <a
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelect(item.href)}
              onPointerEnter={(event) => event.pointerType === "mouse" && onHover(item.href)}
              onPointerLeave={() => onHover(null)}
              onFocus={() => onHover(item.href)}
              onBlur={() => onHover(null)}
              className={cn(
                "relative isolate flex min-h-10 items-center whitespace-nowrap rounded-full px-2 py-2 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring lg:px-3 lg:text-sm 2xl:px-4 2xl:text-base",
                vertical && "py-3",
                isHighlighted ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {isHighlighted && (
                <motion.span
                  layoutId={layoutId}
                  aria-hidden="true"
                  transition={reduceMotion ? { duration: 0 } : SPRING}
                  className="absolute inset-0 -z-10 rounded-full bg-accent"
                />
              )}
              {item.label}
              {isActive && <span aria-hidden="true" className="ml-2 h-1.5 w-1.5 rounded-full bg-primary" />}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function Component({
  brandName,
  brandIcon,
  navItems,
  ctaLabel,
  onCtaClick,
  brandHref = "#",
  activeHref,
  defaultActiveHref,
  onNavigate,
  trackSections = false,
  position = "fixed",
  className,
}: ComponentProps) {
  const [internalActive, setInternalActive] = useState(defaultActiveHref ?? navItems[0]?.href ?? "");
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const desktopId = useId();
  const mobileId = useId();
  const panelId = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const active = activeHref ?? internalActive;

  const handleSelect = useCallback((href: string) => {
    setInternalActive(href);
    setOpen(false);
    onNavigate?.(href);
  }, [onNavigate]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!trackSections) return;
    const sections = navItems
      .map((item) => item.href)
      .filter((href) => href.startsWith("#") && href.length > 1)
      .map((href) => document.getElementById(href.slice(1)))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      const inView = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (inView) setInternalActive("#" + inView.target.id);
    }, { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [trackSections, navItems]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const wide = window.matchMedia("(min-width: 768px)");
    const onResize = (event: MediaQueryListEvent) => event.matches && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    wide.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      wide.removeEventListener("change", onResize);
    };
  }, [open]);

  const ctaClasses = "inline-flex h-10 items-center justify-center rounded-full bg-primary px-3 text-sm font-semibold text-primary-foreground shadow-sm outline-none transition-all hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[.97] lg:px-5 2xl:h-12 2xl:px-6 2xl:text-base";
  return (
    <header className={cn("pointer-events-none z-50 flex justify-center px-4 2xl:top-[1.7rem]", POSITION[position], className)}>
      <motion.div
        ref={rootRef}
        initial={reduceMotion ? false : { y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26, delay: 0.1 }}
        className="pointer-events-auto relative w-full max-w-[calc(100vw_-_2rem)] min-w-0"
      >
        <nav
          aria-label="Main"
          className={cn("relative mx-auto flex w-fit max-w-full min-w-0 items-center justify-between gap-1 rounded-full border border-border px-1 py-1.5 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow] duration-300 sm:gap-2 sm:px-2 sm:py-2 lg:gap-4 2xl:gap-5 2xl:px-3 2xl:py-2.5", scrolled ? "bg-background/90 shadow-xl shadow-black/30" : "bg-background/80 shadow-lg shadow-black/20")}
        >
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <a
            href={brandHref}
            aria-label={brandName}
            className="flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full px-1.5 py-1 2xl:px-3 outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
          >
            {brandIcon ?? <><span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{brandName.charAt(0).toUpperCase()}</span><span className="pr-2 text-sm font-semibold tracking-tight text-foreground">{brandName}</span></>}
          </a>
          <div className="hidden min-w-0 md:block">
            <NavLinks active={active} hovered={hovered} items={navItems} layoutId={"nav-pill-" + desktopId} onHover={setHovered} onSelect={handleSelect} reduceMotion={reduceMotion} />
          </div>
          <button type="button" onClick={onCtaClick} className={cn(ctaClasses, "hidden md:inline-flex")}>{ctaLabel}</button>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          >
            <span aria-hidden="true" className="relative block h-3.5 w-5">
              <span className={cn("absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 motion-reduce:transition-none", open ? "top-1.5 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 top-1.5 block h-0.5 w-5 rounded-full bg-current transition-all duration-200 motion-reduce:transition-none", open ? "scale-x-0 opacity-0" : "opacity-100")} />
              <span className={cn("absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 motion-reduce:transition-none", open ? "top-1.5 -rotate-45" : "top-3")} />
            </span>
          </button>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.div
              id={panelId}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: .97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: .97 }}
              transition={reduceMotion ? { duration: .1 } : SPRING}
              style={{ transformOrigin: "top center" }}
              className="absolute inset-x-0 top-full mx-auto mt-2 w-full max-w-[28rem] rounded-3xl border border-border bg-background/95 p-2 shadow-xl shadow-black/40 backdrop-blur-xl backdrop-saturate-150 md:hidden"
            >
              <NavLinks active={active} hovered={hovered} items={navItems} layoutId={"nav-pill-" + mobileId} onHover={setHovered} onSelect={handleSelect} reduceMotion={reduceMotion} vertical />
              <div className="mt-2 border-t border-border p-1 pt-3">
                <button type="button" onClick={() => { setOpen(false); onCtaClick(); }} className={cn(ctaClasses, "h-12 w-full")}>{ctaLabel}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}

export default Component;
