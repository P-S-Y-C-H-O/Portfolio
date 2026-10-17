/*
 * Sets the document title and description for the current route. This is a
 * client-rendered app, so it edits the tags that index.html already holds
 * (React 19's own <title> hoisting would add a second tag and the first would
 * keep winning). The canonical link is only written when VITE_SITE_URL is set,
 * because there is no production domain to claim yet.
 */
import { useEffect } from "react";
import { useLocation } from "react-router";

type Props = { title: string; description: string; noindex?: boolean };

function setMeta(selector: string, create: () => HTMLElement, attr: string, value: string): HTMLElement {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
  return el;
}

function meta(attrName: "name" | "property", key: string): () => HTMLElement {
  return () => {
    const el = document.createElement("meta");
    el.setAttribute(attrName, key);
    return el;
  };
}

export function PageMeta({ title, description, noindex = false }: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', meta("name", "description"), "content", description);
    setMeta('meta[property="og:title"]', meta("property", "og:title"), "content", title);
    setMeta('meta[property="og:description"]', meta("property", "og:description"), "content", description);

    const site = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "");
    let canonical: HTMLElement | null = null;
    if (site) {
      canonical = setMeta(
        'link[rel="canonical"]',
        () => {
          const el = document.createElement("link");
          el.setAttribute("rel", "canonical");
          return el;
        },
        "href",
        `${site}${pathname}`,
      );
      setMeta('meta[property="og:url"]', meta("property", "og:url"), "content", `${site}${pathname}`);
    }

    let robots: HTMLElement | null = null;
    if (noindex) robots = setMeta('meta[name="robots"]', meta("name", "robots"), "content", "noindex");

    return () => {
      robots?.remove();
      canonical?.remove();
    };
  }, [title, description, noindex, pathname]);

  return null;
}
