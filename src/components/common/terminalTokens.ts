/**
 * Colours, colour maths and spinner frames shared by the terminal mockups.
 *
 * Kept separate from any one animation so a second terminal mock reuses the
 * same surface treatment instead of re-deriving it.
 */

export type Rgb = [number, number, number]

export const TERMINAL_PALETTE = {
  dim: "#7d8794",
  dimmest: "#454d59",
  bright: "#e8ecf1",
  accent: "#4f8cf7",
  ok: "#46c46a",
  white: "#ffffff",
} as const

export type TerminalPaletteKey = keyof typeof TERMINAL_PALETTE

export const TERMINAL_RGB: Record<TerminalPaletteKey, Rgb> = {
  dim: [125, 135, 148],
  dimmest: [69, 77, 89],
  bright: [232, 236, 241],
  accent: [79, 140, 247],
  ok: [70, 196, 106],
  white: [255, 255, 255],
}

export const SPINNER_FRAMES = [
  "⠋",
  "⠙",
  "⠹",
  "⠸",
  "⠼",
  "⠴",
  "⠦",
  "⠧",
  "⠇",
  "⠏",
] as const

export const SPINNER_INTERVAL_MS = 80

export function lerpColor(from: Rgb, to: Rgb, t: number): string {
  const [r, g, b] = from.map((c, i) => Math.round(c + (to[i] - c) * t)) as Rgb
  return `rgb(${r} ${g} ${b})`
}

/** The spinner glyph for a point in time. Pure: same input, same glyph. */
export function spinnerAt(elapsed: number): string {
  return SPINNER_FRAMES[
    Math.floor(elapsed / SPINNER_INTERVAL_MS) % SPINNER_FRAMES.length
  ]
}
