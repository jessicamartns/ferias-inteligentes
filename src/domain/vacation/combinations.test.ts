import { describe, expect, it } from "vitest"
import { generateVacationSplits } from "./combinations"

describe("generateVacationSplits", () => {
  it("generates valid options for 30 days", () => {
    const result = generateVacationSplits({
      remainingDays: 30,
    })

    expect(result).toContainEqual([30])

    expect(result).toContainEqual([25, 5])

    expect(result).toContainEqual([20, 5, 5])

    expect(result).toContainEqual([14, 11, 5])
  })

  it("respects periods already used", () => {
    const result = generateVacationSplits({
      remainingDays: 25,
      existingPeriods: [5],
    })

    expect(result).toContainEqual([25])

    expect(result).toContainEqual([20, 5])

    expect(result).toContainEqual([14, 11])
  })

  it("does not allow an invalid 13 + 12 split when 5 days were already used", () => {
    const result = generateVacationSplits({
      remainingDays: 25,
      existingPeriods: [5],
    })

    expect(result).not.toContainEqual([13, 12])
  })

  it("does not generate more periods when all 3 were already used", () => {
    const result = generateVacationSplits({
      remainingDays: 5,
      existingPeriods: [14, 6, 5],
    })

    expect(result).toEqual([])
  })
})