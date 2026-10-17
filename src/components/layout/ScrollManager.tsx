/*
 * Client-side navigation does not reset scroll the way a page load does, so
 * this does it: to the top on a new route, or to the #section the link named.
 * The section may mount a frame after the route changes, hence the retry.
 */
import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    let frame = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView();
        return;
      }
      if (attempts++ < 10) frame = requestAnimationFrame(tryScroll);
    };
    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
