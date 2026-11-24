/**
 * A typing rhythm that reads as a person at the keyboard.
 *
 * The alternative — characters appearing at an even rate — reads as a machine
 * filling a field, which is the one thing a terminal is never meant to look like.
 * What makes typing read as human is the *irregularity*: most keystrokes are
 * quick, some hesitate, spaces and punctuation cost a beat, and no two runs of
 * the same word are identical.
 *
 * Two constraints shape the implementation:
 *
 *   - **Pure.** The count is a function of `elapsedMs` alone. No state
 *     accumulates per frame, no timer is queued per character, and scrubbing to
 *     any point in a loop yields exactly the frame that point belongs to. This
 *     is the same invariant the terminal players are built on: a frame is a
 *     function of elapsed time.
 *   - **Stable.** The weight of each keystroke comes from a hash of its
 *     character and position, not from a random draw. The same word types the
 *     same way on every pass, so a visitor who watches two loops does not see
 *     the command type itself differently each time.
 */

/** Keystroke cost as a fraction of the mean stroke. */
const MIN_STROKE = 0.55
const MAX_STROKE = 1.9

/** Characters that cost a beat of their own, on top of their stroke. */
const SPACE_STROKE = 2.4
const PUNCTUATION_STROKE = 1.8
const PUNCTUATION = ".,:;'\"|()[]{}<>?!+-*/\\=&%"

/**
 * The cost of one keystroke, relative to the mean.
 *
 * The hash is an integer avalanche over the character's code point and its
 * position in the string: cheap, well spread, and free of the banding a plain
 * modulo of the code point would produce across digits.
 */
function strokeWeight(text: string, index: number): number {
  const character = text[index] ?? ""
  let hash = Math.imul(text.charCodeAt(index) + 1, 2654435761) + Math.imul(index + 1, 40503)
  hash ^= hash >>> 15
  hash = Math.imul(hash, 2246822519)
  hash ^= hash >>> 13

  const noise = (hash >>> 0) / 4294967295
  const base = MIN_STROKE + noise * (MAX_STROKE - MIN_STROKE)

  if (character === " ") return base + SPACE_STROKE
  if (PUNCTUATION.includes(character)) return base + PUNCTUATION_STROKE
  return base
}

/**
 * How many characters of `text` have been typed `elapsedMs` into a pass of
 * `durationMs`.
 *
 * The per-character weights are normalised into `durationMs`, so the caller
 * keeps saying "this command takes this long" while the rhythm inside it comes
 * from the weights. Clamped at both ends: before 0 nothing is typed, after the
 * duration everything is.
 */
export function typedCount(elapsedMs: number, text: string, durationMs: number): number {
  const length = text.length
  if (length === 0 || durationMs <= 0) return length

  // Reaching the end types everything. The weighted walk below subtracts each
  // keystroke's cost in turn, and that accumulation drifts: by the last
  // character the remaining budget can land a fraction *under* its cost, the
  // walk stops, and the final character never appears at all — a command that
  // typed "case lis" and stayed there. Taking the end from the elapsed time
  // instead makes it exact whatever the arithmetic does on the way.
  if (elapsedMs >= durationMs) return length

  let total = 0
  for (let index = 0; index < length; index += 1) total += strokeWeight(text, index)

  // How much of the total weight the elapsed time has bought.
  let budget =
    (Math.min(Math.max(elapsedMs, 0), durationMs) / durationMs) * total

  let typed = 0
  for (let index = 0; index < length; index += 1) {
    const weight = strokeWeight(text, index)
    if (budget < weight) break
    budget -= weight
    typed += 1
  }

  return typed
}