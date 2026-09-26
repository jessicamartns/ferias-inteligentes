import type{ VacationInput } from "./types"

export function optimizeVacation(input: VacationInput) {
//   const { availableDays, alreadyUsedDays, alreadyUsedPeriods, availableFrom, deadline, city, state } = input;

  return [
    {
      periods: [],
      vacationDaysUsed: input.availableDays,
      totalRestDays: input.availableDays,
    },
]
}