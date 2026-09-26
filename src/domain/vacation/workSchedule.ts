import type { ISODate } from "./date"
import { getDayOfWeek } from "./date"

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface WorkSchedule {
  workingWeekdays: Weekday[]
  weeklyRestDay: Weekday
}

export const MONDAY_TO_FRIDAY: WorkSchedule = {
  workingWeekdays: [1, 2, 3, 4, 5],
  weeklyRestDay: 0,
}

export const MONDAY_TO_SATURDAY: WorkSchedule = {
  workingWeekdays: [1, 2, 3, 4, 5, 6],
  weeklyRestDay: 0,
}

export function isScheduledWorkDay(
  date: ISODate,
  schedule: WorkSchedule,
): boolean {
  const weekday = getDayOfWeek(date) as Weekday

  return schedule.workingWeekdays.includes(weekday)
}

export function isWeeklyRestDay(
  date: ISODate,
  schedule: WorkSchedule,
): boolean {
  const weekday = getDayOfWeek(date) as Weekday

  return weekday === schedule.weeklyRestDay
}

export function isValidWorkSchedule(
  schedule: WorkSchedule,
): boolean {
  if (schedule.workingWeekdays.length === 0) {
    return false
  }

  const uniqueWorkingDays = new Set(
    schedule.workingWeekdays,
  )

  if (
    uniqueWorkingDays.size !==
    schedule.workingWeekdays.length
  ) {
    return false
  }

  if (
    schedule.workingWeekdays.includes(
      schedule.weeklyRestDay,
    )
  ) {
    return false
  }

  return true
}