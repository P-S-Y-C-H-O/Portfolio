/*
 * Theme resolution. A saved choice always wins; with none saved the visitor's
 * operating-system preference decides. The inline script in index.html repeats
 * this rule before first paint to avoid a flash of the wrong theme, so change
 * the two together.
 */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

export function parseStoredTheme(value: string | null | undefined): Theme | null {
  return value === "light" || value === "dark" ? value : null;
}

export function resolveTheme(stored: string | null | undefined, systemPrefersDark: boolean): Theme {
  return parseStoredTheme(stored) ?? (systemPrefersDark ? "dark" : "light");
}

export function readStoredTheme(): Theme | null {
  try {
    return parseStoredTheme(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    // Storage can be blocked (private mode, strict settings). The theme still works for the session.
    return null;
  }
}

export function writeStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* see readStoredTheme */
  }
}
