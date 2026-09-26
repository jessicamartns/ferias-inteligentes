import type { ISODate } from "./date"
import { addDays } from "./date"

import type { WorkSchedule } from "./workSchedule"

import type {
  Holiday,
  HolidayLocation,
} from "./holiday"

import { buildCalendarDay } from "./calendar"

export type VacationStartBlockReason =
  | "LEGAL_HOLIDAY"
  | "WEEKLY_REST_DAY"

export interface VacationStartBlocker {
  date: ISODate
  reason: VacationStartBlockReason
  holidayNames?: string[]
}

export interface VacationStartValidation {
  allowed: boolean
  blockers: VacationStartBlocker[]
}

interface ValidateVacationStartInput {
  startDate: ISODate
  schedule: WorkSchedule
  holidays: Holiday[]
  location: HolidayLocation
}

export function validateVacationStart({
  startDate,
  schedule,
  holidays,
  location,
}: ValidateVacationStartInput): VacationStartValidation {
  const blockers: VacationStartBlocker[] = []

  const nextTwoDays = [
    addDays(startDate, 1),
    addDays(startDate, 2),
  ]

  for (const date of nextTwoDays) {
    const day = buildCalendarDay({
      date,
      schedule,
      holidays,
      location,
    })

    if (day.weeklyRestDay) {
      blockers.push({
        date,
        reason: "WEEKLY_REST_DAY",
      })
    }

    if (day.legalHolidays.length > 0) {
      blockers.push({
        date,
        reason: "LEGAL_HOLIDAY",
        holidayNames: day.legalHolidays.map(
          (holiday) => holiday.name,
        ),
      })
    }
  }

  return {
    allowed: blockers.length === 0,
    blockers,
  }
}