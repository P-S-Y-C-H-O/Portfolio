/*
 * Owns the theme. index.html already set data-theme before first paint, so the
 * initial state is read back from the document rather than recomputed. A saved
 * choice is written to localStorage; with none saved, the theme keeps following
 * the operating system until the visitor picks one.
 */
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { readStoredTheme, resolveTheme, writeStoredTheme, type Theme } from "@/lib/theme";
import { ThemeContext } from "./theme-context";

function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  }
  root.setAttribute("data-theme", theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readStoredTheme() !== null) return; // an explicit choice beats the system
      const next = resolveTheme(null, query.matches);
      applyTheme(next, true);
      setTheme(next);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    applyTheme(next, !reduce);
    writeStoredTheme(next);
    setTheme(next);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
