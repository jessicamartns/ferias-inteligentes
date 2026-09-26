import { describe, expect, it } from "vitest"

import {
  isScheduledWorkDay,
  isValidWorkSchedule,
  isWeeklyRestDay,
  MONDAY_TO_FRIDAY,
  MONDAY_TO_SATURDAY,
} from "./workSchedule"

describe("work schedule", () => {
  describe("isScheduledWorkDay", () => {
    it("considers Monday a working day", () => {
      expect(
        isScheduledWorkDay(
          "2027-01-04",
          MONDAY_TO_FRIDAY,
        ),
      ).toBe(true)
    })

    it("considers Friday a working day", () => {
      expect(
        isScheduledWorkDay(
          "2027-01-08",
          MONDAY_TO_FRIDAY,
        ),
      ).toBe(true)
    })

    it("considers Saturday non-working for Monday-to-Friday schedule", () => {
      expect(
        isScheduledWorkDay(
          "2027-01-09",
          MONDAY_TO_FRIDAY,
        ),
      ).toBe(false)
    })

    it("considers Saturday working for Monday-to-Saturday schedule", () => {
      expect(
        isScheduledWorkDay(
          "2027-01-09",
          MONDAY_TO_SATURDAY,
        ),
      ).toBe(true)
    })

    it("considers Sunday non-working", () => {
      expect(
        isScheduledWorkDay(
          "2027-01-10",
          MONDAY_TO_FRIDAY,
        ),
      ).toBe(false)
    })
  })

  describe("isWeeklyRestDay", () => {
    it("identifies Sunday as weekly rest day", () => {
      expect(
        isWeeklyRestDay(
          "2027-01-10",
          MONDAY_TO_FRIDAY,
        ),
      ).toBe(true)
    })

    it("does not identify Saturday as weekly rest day", () => {
      expect(
        isWeeklyRestDay(
          "2027-01-09",
          MONDAY_TO_FRIDAY,
        ),
      ).toBe(false)
    })
  })

  describe("isValidWorkSchedule", () => {
    it("accepts Monday-to-Friday schedule", () => {
      expect(
        isValidWorkSchedule(MONDAY_TO_FRIDAY),
      ).toBe(true)
    })

    it("rejects an empty work schedule", () => {
      expect(
        isValidWorkSchedule({
          workingWeekdays: [],
          weeklyRestDay: 0,
        }),
      ).toBe(false)
    })

    it("rejects duplicate working days", () => {
      expect(
        isValidWorkSchedule({
          workingWeekdays: [1, 2, 3, 3, 4, 5],
          weeklyRestDay: 0,
        }),
      ).toBe(false)
    })

    it("rejects weekly rest day as a working day", () => {
      expect(
        isValidWorkSchedule({
          workingWeekdays: [0, 1, 2, 3, 4, 5],
          weeklyRestDay: 0,
        }),
      ).toBe(false)
    })
  })
})