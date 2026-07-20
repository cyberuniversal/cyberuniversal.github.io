/**
 * Link that copes with three cases:
 *  - external URL  → new tab
 *  - internal path → same tab
 *  - no URL yet    → styled placeholder, not clickable (no invented URLs)
 */
import Link from "next/link";

export function L({ href, children }: { href: string | null; children: React.ReactNode }) {
  if (!href) {
    return (
      <span className="link-pending" title="link coming soon">
        {children}
      </span>
    );
  }
  if (/^https?:/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  }
  // Internal route — Next wants next/link, not <a>.
  return <Link href={href}>{children}</Link>;
}
