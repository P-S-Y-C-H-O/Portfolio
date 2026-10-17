/*
 * Pure helpers for the project slider. The slider scrolls natively with
 * scroll-snap, so these only translate between a scroll position and a slide
 * index, and keep an index inside the list. They are separate from the
 * component so the edge cases (first and last slide, empty list) are tested
 * without a DOM.
 */

export function clampIndex(index: number, count: number): number {
  if (count <= 0) return 0;
  return Math.min(Math.max(index, 0), count - 1);
}

/** Index of the slide whose left edge is nearest the current scroll position. */
export function indexFromScroll(scrollLeft: number, slideWidth: number, count: number): number {
  if (slideWidth <= 0) return 0;
  return clampIndex(Math.round(scrollLeft / slideWidth), count);
}

export function canGoPrevious(index: number): boolean {
  return index > 0;
}

export function canGoNext(index: number, count: number): boolean {
  return index < count - 1;
}
