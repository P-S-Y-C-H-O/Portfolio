/*
 * Sticky header. It compacts and gains a border once the page scrolls, marks
 * the section in view with a sliding underline (home page only), and collapses
 * to a menu on small screens. The menu closes on Escape, on navigation and on
 * outside focus loss, traps Tab while open, and returns focus to its button.
 */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { person } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function useActiveSection(enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => {
      observer.disconnect();
      setActive(null);
    };
  }, [enabled]);

  return enabled ? active : null;
}

export function SiteHeader() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  // The menu is open only on the route it was opened on, so navigating closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (value: boolean | ((current: boolean) => boolean)) => {
    const next = typeof value === "function" ? value(open) : value;
    setOpenAt(next ? pathname : null);
  };
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const active = useActiveSection(pathname === "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const focusables = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>("a[href], button") ?? []).filter((el) => !el.hasAttribute("disabled"));
    focusables()[0]?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenAt(null);
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [buttonRef.current, ...focusables()].filter((el): el is HTMLElement => el !== null);
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,padding] duration-300 ${
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className={`container-x flex items-center justify-between transition-[height] duration-300 ${scrolled ? "h-14" : "h-20"}`}>
        <Link to="/" className="font-display text-xl font-semibold tracking-tight" aria-label={`${person.name}, home`}>
          {person.wordmark}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              className="relative py-1 text-sm text-muted transition-colors hover:text-fg aria-[current=true]:text-fg"
              aria-current={active === link.id ? "true" : undefined}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={person.resumePath}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm transition hover:border-fg active:scale-95 sm:inline-flex"
          >
            Resume <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="container-x flex h-[calc(100dvh-3.5rem)] flex-col gap-1 bg-bg pb-10 pt-6 md:hidden"
        >
          <nav aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.id}
                to={`/#${link.id}`}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-5 font-display text-3xl font-semibold tracking-tight"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={person.resumePath}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-lg text-accent"
          >
            View resume <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      )}
    </header>
  );
}
