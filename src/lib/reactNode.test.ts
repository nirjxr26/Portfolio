import { describe, expect, it } from "vitest"
import { toPlainText } from "./reactNode"

describe("toPlainText", () => {
  it("passes strings through and stringifies numbers", () => {
    expect(toPlainText("a")).toBe("a")
    expect(toPlainText(7)).toBe("7")
  })

  it("joins arrays and unwraps nested element children", () => {
    expect(toPlainText(["a", "b"])).toBe("ab")
    expect(toPlainText({ props: { children: ["x", { props: { children: "y" } }] } })).toBe("xy")
  })

  it("returns an empty string for anything without text content", () => {
    expect(toPlainText(null)).toBe("")
    expect(toPlainText(undefined)).toBe("")
    expect(toPlainText(true)).toBe("")
    expect(toPlainText({})).toBe("")
    expect(toPlainText({ props: {} })).toBe("")
  })
})
