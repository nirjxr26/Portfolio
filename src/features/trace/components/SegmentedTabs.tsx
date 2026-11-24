import { createContext, useContext } from "react"

/**
 * Which tab is showing, for a preview that needs to know.
 *
 * Every preview stays mounted so switching costs nothing, which means a preview
 * cannot infer from the DOM whether anyone is looking at it. A playback that
 * should start when its tab is selected — and only then — has to be told, and
 * context is the smallest way to say that without threading a prop through the
 * `preview` field and every call site that builds one.
 */
const ActiveTabContext = createContext("")

/** True while `label`'s tab is the one on screen. */
export function useIsTabActive(label: string) {
  return useContext(ActiveTabContext) === label
}
