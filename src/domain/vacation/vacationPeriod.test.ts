import {
  describe,
  expect,
  it,
} from "vitest"

import {
  createVacationPeriod,
  getVacationPeriodDays,
  isVacationPeriodWithinDeadline,
} from "./vacationPeriod"

describe("vacation period", () => {
  describe("createVacationPeriod", () => {
    it("creates a 5-day vacation period", () => {
      const period = createVacationPeriod({
        startDate: "2027-01-04",
        days: 5,
      })

      expect(period).toEqual({
        startDate: "2027-01-04",
        endDate: "2027-01-08",
        days: 5,
      })
    })

    it("creates a 20-day vacation period", () => {
      const period = createVacationPeriod({
        startDate: "2027-03-29",
        days: 20,
      })

      expect(period.endDate).toBe(
        "2027-04-17",
      )
    })

    it("works across month boundaries", () => {
      const period = createVacationPeriod({
        startDate: "2027-01-25",
        days: 10,
      })

      expect(period.endDate).toBe(
        "2027-02-03",
      )
    })

    it("works across year boundaries", () => {
      const period = createVacationPeriod({
        startDate: "2026-12-28",
        days: 10,
      })

      expect(period.endDate).toBe(
        "2027-01-06",
      )
    })

    it("rejects zero days", () => {
      expect(() =>
        createVacationPeriod({
          startDate: "2027-01-04",
          days: 0,
        }),
      ).toThrow()
    })

    it("rejects negative days", () => {
      expect(() =>
        createVacationPeriod({
          startDate: "2027-01-04",
          days: -5,
        }),
      ).toThrow()
    })

    it("rejects fractional days", () => {
      expect(() =>
        createVacationPeriod({
          startDate: "2027-01-04",
          days: 5.5,
        }),
      ).toThrow()
    })
  })

  describe("getVacationPeriodDays", () => {
    it("calculates inclusive period days", () => {
      expect(
        getVacationPeriodDays({
          startDate: "2027-01-04",
          endDate: "2027-01-08",
        }),
      ).toBe(5)
    })
  })

  describe("isVacationPeriodWithinDeadline", () => {
    it("accepts period ending before deadline", () => {
      const period = createVacationPeriod({
        startDate: "2027-06-01",
        days: 20,
      })

      expect(
        isVacationPeriodWithinDeadline(
          period,
          "2027-07-04",
        ),
      ).toBe(true)
    })

    it("accepts period ending exactly on deadline", () => {
      const period = createVacationPeriod({
        startDate: "2027-06-30",
        days: 5,
      })

      expect(period.endDate).toBe(
        "2027-07-04",
      )

      expect(
        isVacationPeriodWithinDeadline(
          period,
          "2027-07-04",
        ),
      ).toBe(true)
    })

    it("rejects period ending after deadline", () => {
      const period = createVacationPeriod({
        startDate: "2027-07-01",
        days: 5,
      })

      expect(
        isVacationPeriodWithinDeadline(
          period,
          "2027-07-04",
        ),
      ).toBe(false)
    })
  })
})