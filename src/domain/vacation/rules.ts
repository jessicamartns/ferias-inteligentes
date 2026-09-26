export const VACATION_RULES = {
  maxPeriods: 3,
  minimumLongPeriod: 14,
  minimumShortPeriod: 5,
} as const

export function isValidVacationPlan(periods: number[]): boolean {
  if (periods.length === 0) {
    return false
  }

  if (periods.length > VACATION_RULES.maxPeriods) {
    return false
  }

  if (periods.some((days) => days <= 0)) {
    return false
  }

  // Sem fracionamento
  if (periods.length === 1) {
    return true
  }

  const allPeriodsMeetMinimum = periods.every(
    (days) => days >= VACATION_RULES.minimumShortPeriod,
  )

  if (!allPeriodsMeetMinimum) {
    return false
  }

  const hasLongPeriod = periods.some(
    (days) => days >= VACATION_RULES.minimumLongPeriod,
  )

  return hasLongPeriod
}