import type { ISODate } from "./date"
import type { WorkSchedule } from "./workSchedule"

export interface VacationInput {
  availableDays: number
  alreadyUsedDays: number
  alreadyUsedPeriods: number

  availableFrom: ISODate
  deadline: ISODate

  city: string
  state: string

  workSchedule: WorkSchedule
}