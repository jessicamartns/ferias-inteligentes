import type { ISODate } from "./date"

export interface VacationInput {
  availableDays: number
  alreadyUsedDays: number
  alreadyUsedPeriods: number

  availableFrom: ISODate
  deadline: ISODate

  city: string
  state: string
}