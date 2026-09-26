import type { ISODate } from "./date"
import {
  addDays,
  differenceInDays,
} from "./date"

export interface VacationPeriod {
  startDate: ISODate
  endDate: ISODate
  days: number
}

interface CreateVacationPeriodInput {
  startDate: ISODate
  days: number
}

export function createVacationPeriod({
  startDate,
  days,
}: CreateVacationPeriodInput): VacationPeriod {
  if (!Number.isInteger(days) || days <= 0) {
    throw new Error(
      "Vacation period days must be a positive integer",
    )
  }

  const endDate = addDays(
    startDate,
    days - 1,
  )

  return {
    startDate,
    endDate,
    days,
  }
}

export function getVacationPeriodDays(
  period: Pick<
    VacationPeriod,
    "startDate" | "endDate"
  >,
): number {
  return (
    differenceInDays(
      period.startDate,
      period.endDate,
    ) + 1
  )
}

export function isVacationPeriodWithinDeadline(
  period: VacationPeriod,
  deadline: ISODate,
): boolean {
  return period.endDate <= deadline
}