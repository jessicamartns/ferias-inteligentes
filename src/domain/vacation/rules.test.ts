import { describe, expect, it } from "vitest"
import { isValidVacationPlan } from "./rules"

describe("isValidVacationPlan", () => {
  it("accepts a single vacation period", () => {
    expect(isValidVacationPlan([30])).toBe(true)
  })

  it("accepts 20 + 5 + 5", () => {
    expect(isValidVacationPlan([20, 5, 5])).toBe(true)
  })

  it("accepts 14 + 11 + 5", () => {
    expect(isValidVacationPlan([14, 11, 5])).toBe(true)
  })

  it("rejects a split without a period of at least 14 days", () => {
    expect(isValidVacationPlan([13, 12, 5])).toBe(false)
  })

  it("rejects periods shorter than 5 days", () => {
    expect(isValidVacationPlan([20, 4, 6])).toBe(false)
  })

  it("rejects more than 3 periods", () => {
    expect(isValidVacationPlan([15, 5, 5, 5])).toBe(false)
  })

  it("rejects an empty plan", () => {
    expect(isValidVacationPlan([])).toBe(false)
  })

  it("rejects zero or negative periods", () => {
    expect(isValidVacationPlan([20, 10, 0])).toBe(false)
    expect(isValidVacationPlan([20, 15, -5])).toBe(false)
  })
})