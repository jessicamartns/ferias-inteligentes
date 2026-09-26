import type { ISODate } from "./date"

import {
  getDateRange,
  getDayOfWeek,
} from "./date"

import type { WorkSchedule } from "./workSchedule"

import {
  isScheduledWorkDay,
  isWeeklyRestDay,
} from "./workSchedule"

import type {
  Holiday,
  HolidayLocation,
} from "./holiday"

import {
  getApplicableHolidaysByDate,
  getLegalHolidaysByDate,
} from "./holiday"

export interface CalendarDay {
  date: ISODate
  weekday: number

  scheduledWorkDay: boolean
  weeklyRestDay: boolean

  legalHolidays: Holiday[]
  optionalDays: Holiday[]

  isWorkingDay: boolean
}

interface BuildCalendarDayInput {
  date: ISODate
  schedule: WorkSchedule
  holidays: Holiday[]
  location: HolidayLocation
}

export function buildCalendarDay({
  date,
  schedule,
  holidays,
  location,
}: BuildCalendarDayInput): CalendarDay {
  const scheduledWorkDay =
    isScheduledWorkDay(date, schedule)

  const weeklyRestDay =
    isWeeklyRestDay(date, schedule)

  const applicableHolidays =
    getApplicableHolidaysByDate(
      date,
      holidays,
      location,
    )

  const legalHolidays =
    getLegalHolidaysByDate(
      date,
      holidays,
      location,
    )

  const optionalDays =
    applicableHolidays.filter(
      (holiday) => holiday.type === "OPTIONAL",
    )

  const isWorkingDay =
    scheduledWorkDay &&
    legalHolidays.length === 0

  return {
    date,
    weekday: getDayOfWeek(date),

    scheduledWorkDay,
    weeklyRestDay,

    legalHolidays,
    optionalDays,

    isWorkingDay,
  }
}

interface BuildCalendarInput {
  startDate: ISODate
  endDate: ISODate

  schedule: WorkSchedule
  holidays: Holiday[]
  location: HolidayLocation
}

export function buildCalendar({
  startDate,
  endDate,
  schedule,
  holidays,
  location,
}: BuildCalendarInput): CalendarDay[] {
  const dates = getDateRange(
    startDate,
    endDate,
  )

  return dates.map((date) =>
    buildCalendarDay({
      date,
      schedule,
      holidays,
      location,
    }),
  )
}