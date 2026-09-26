import {
  addDays,
  differenceInDays,
  getDateRange,
  getDayOfWeek,
  isSaturday,
  isSunday,
  isWeekend,
} from "./date"

import {
  describe,
  expect,
  it,
} from "vitest"

describe("date utilities", () => {
  describe("addDays", () => {
    it("adds one day", () => {
      expect(
        addDays("2027-01-01", 1),
      ).toBe("2027-01-02")
    })

    it("changes month correctly", () => {
      expect(
        addDays("2027-01-31", 1),
      ).toBe("2027-02-01")
    })

    it("changes year correctly", () => {
      expect(
        addDays("2026-12-31", 1),
      ).toBe("2027-01-01")
    })

    it("supports negative days", () => {
      expect(
        addDays("2027-01-01", -1),
      ).toBe("2026-12-31")
    })
  })

  describe("differenceInDays", () => {
    it("calculates difference between dates", () => {
      expect(
        differenceInDays(
          "2027-01-01",
          "2027-01-10",
        ),
      ).toBe(9)
    })

    it("returns zero for the same date", () => {
      expect(
        differenceInDays(
          "2027-01-01",
          "2027-01-01",
        ),
      ).toBe(0)
    })
  })

  describe("weekend helpers", () => {
    it("identifies Saturday", () => {
      expect(
        isSaturday("2027-01-02"),
      ).toBe(true)
    })

    it("identifies Sunday", () => {
      expect(
        isSunday("2027-01-03"),
      ).toBe(true)
    })

    it("identifies weekends", () => {
      expect(
        isWeekend("2027-01-02"),
      ).toBe(true)

      expect(
        isWeekend("2027-01-03"),
      ).toBe(true)

      expect(
        isWeekend("2027-01-04"),
      ).toBe(false)
    })
  })

  describe("getDayOfWeek", () => {
    it("returns Monday correctly", () => {
      expect(
        getDayOfWeek("2027-01-04"),
      ).toBe(1)
    })
  })

  describe("getDateRange", () => {
    it("creates an inclusive date range", () => {
      expect(
        getDateRange(
          "2027-01-01",
          "2027-01-05",
        ),
      ).toEqual([
        "2027-01-01",
        "2027-01-02",
        "2027-01-03",
        "2027-01-04",
        "2027-01-05",
      ])
    })

    it("returns empty array for inverted range", () => {
      expect(
        getDateRange(
          "2027-01-05",
          "2027-01-01",
        ),
      ).toEqual([])
    })
  })
})