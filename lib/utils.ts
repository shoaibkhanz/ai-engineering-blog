/**
 * Parse the current --color-accent CSS variable into an RGB string
 * for use in rgba() / canvas drawing.
 */
export function getAccentRgb(): string {
  const accent = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-accent")
    .trim();
  const hex = accent.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
