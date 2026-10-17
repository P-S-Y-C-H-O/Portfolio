import { describe, expect, it } from "vitest";
import { parseStoredTheme, resolveTheme } from "./theme";

describe("theme preference", () => {
  it("follows the system when nothing is saved", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
  });

  it("lets a saved choice override the system", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("ignores a corrupted stored value", () => {
    expect(parseStoredTheme("purple")).toBeNull();
    expect(resolveTheme("purple", true)).toBe("dark");
    expect(resolveTheme(undefined, false)).toBe("light");
  });
});
