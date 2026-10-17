import { describe, expect, it } from "vitest";
import { canGoNext, canGoPrevious, clampIndex, indexFromScroll } from "./slider";

describe("slider helpers", () => {
  it("clamps an index into the list", () => {
    expect(clampIndex(-3, 3)).toBe(0);
    expect(clampIndex(1, 3)).toBe(1);
    expect(clampIndex(9, 3)).toBe(2);
    expect(clampIndex(5, 0)).toBe(0);
  });

  it("maps scroll position to the nearest slide", () => {
    expect(indexFromScroll(0, 800, 3)).toBe(0);
    expect(indexFromScroll(390, 800, 3)).toBe(0);
    expect(indexFromScroll(410, 800, 3)).toBe(1);
    expect(indexFromScroll(5000, 800, 3)).toBe(2);
    expect(indexFromScroll(100, 0, 3)).toBe(0);
  });

  it("knows the first and last slide", () => {
    expect(canGoPrevious(0)).toBe(false);
    expect(canGoPrevious(1)).toBe(true);
    expect(canGoNext(2, 3)).toBe(false);
    expect(canGoNext(1, 3)).toBe(true);
  });
});
