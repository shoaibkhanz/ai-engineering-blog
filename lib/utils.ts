/**
 * Parse a hex-valued CSS custom property into an "r, g, b" string
 * for use in rgba() / canvas drawing.
 */
export function getCssVarRgb(varName: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  const hex = value.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

/** RGB string of the current --color-accent. */
export function getAccentRgb(): string {
  return getCssVarRgb("--color-accent");
}
