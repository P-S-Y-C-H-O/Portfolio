/*
 * Link-styled buttons. Navigation is a link, so these render <Link> or <a>,
 * never a clickable div. `variant` picks the filled accent look or the quiet
 * outlined one; both press down slightly on click.
 */
import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "outline";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition duration-200 active:scale-[0.97]";
const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-accent hover:text-accent-fg",
  outline: "border border-line text-fg hover:border-fg",
};

type CommonProps = { children: ReactNode; variant?: Variant; className?: string };

/** Route or in-page navigation (react-router). `to` may be "/#work". */
export function ButtonLink({ to, children, variant = "primary", className = "" }: CommonProps & { to: string }) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/** A link to another site or a file. Opens in a new tab and shows the arrow cue. */
export function ExternalLink({
  href,
  children,
  variant,
  className = "",
  download,
}: CommonProps & { href: string; download?: boolean }) {
  const style = variant ? `${base} ${variants[variant]}` : "inline-flex items-center gap-1 underline-offset-4 hover:underline";
  const mail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      className={`${style} ${className}`}
      {...(mail ? {} : { target: "_blank", rel: "noreferrer" })}
      {...(download ? { download: true } : {})}
    >
      {children}
      {!mail && !download && (
        <ArrowUpRight size={15} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </a>
  );
}
